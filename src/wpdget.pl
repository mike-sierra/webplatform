#!/usr/bin/perl

use Storable;
use Digest::MD5 qw~md5_hex~;
use WWW::Mechanize;

$0 =~ s~.+/~~;

my $syntax = qq~
$0 (get|check) stub

Grab a wiki source file from webplatform.org, printing to STDOUT

  EXAMPLES:

* Get raw source for a page:
    $0 get css/properties/opacity > opacity.txt

* Warn if page has changed on server since last 'get' command:
    $0 check css/properties/opacity

Croaks on stubs for non-existent pages

Use Boris Smus's wpd utility to push source back to server:

    wpd edit css/properties/opacity "`cat opacity.txt`" -u Yourlogin

More info: https://github.com/borismus/webplatform-tools

~;

my $store_file = q~.wpd_store~;
my $prefix = q~http://docs.webplatform.org/w/index.php?title=~;
my $suffix = q~&action=edit~;
my ($stub, $command, $bot, $wiki_text, $digest, $store);
my $re_valid_commands = qr~^(get|check)$~;

@ARGV == 2 or die $syntax;
($command, $stub) = @ARGV;
die $syntax if ($command !~ m~$re_valid_commands~ );;

if (-s $store_file) {
    $store = retrieve($store_file);
} else {
    $store->{_} = 1;
    store $store, $store_file;
}

$bot = WWW::Mechanize->new();
$bot->get( $prefix . $stub . $suffix );
die qq~Can't get file~ if (! $bot->success());
$wiki_text = $bot->content;
die qq~Not an existing page: $stub~ if ($wiki_text !~ m~<textarea~i);

$wiki_text =~ m~<textarea[^>]+?>(.+?)</textarea>~si and ($wiki_text = $1);
$wiki_text =~ s~&amp;~&~gi;
$wiki_text =~ s~&lt;~<~gi;

$digest = md5_hex($wiki_text);

print STDERR qq~$stub\n~;

if ($command eq q~get~) {
    $store->{$stub} = $digest;
    store $store, $store_file;
    print $wiki_text;
} elsif ($command eq q~check~) {
    die qq~PAGE HAS CHANGED: $stub~ if ($digest ne $store->{$stub});
}
