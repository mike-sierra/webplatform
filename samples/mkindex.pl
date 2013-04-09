use strict;
use warnings;
use Data::Dumper;
use Slurp;

my @f;
my ($t, $x);

chomp(@f = `ls *.html`);

$x .= q~<style>tr:nth-of-type(odd) { background: #ddd } tr:nth-of-type(even) { background: #eee }</style>~;
$x .= q~<table border="0">~;
for my $f (@f) {    
    next if $f =~ m~^_~;
    next if $f =~ m~^scr_~;
    next if $f =~ m~^index.htm~;
    chomp($t = `grep '<title>' $f`);
    $t =~ s~<title>(.+?)</title>~$1~;
    $x .= qq~<tr><td><a href="$f" target="new">$f</a></td><td>$t</td></tr>~;
}
$x .= q~</table>~;

open X, qq~>index.html~;

print X $x;
