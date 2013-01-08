#!/usr/bin/perl

use strict;
use warnings;

my $out;

my @d = qw~ box text colors gradient mask background border overflow
            multicol transition animation transform2d transform3d
            flexbox interface region ~;

for my $d (@d) {
    ! -d $d and system qq~mkdir $d~;
    system qq~cat cssDemo.html | sed 's/_sample/_$d/' > $d/cssDemo.html~;
    system qq~cp cssDemo.css $d~;
    system qq~cp cssDemo.js $d~;
    $out .= qq~<li><a href="$d/cssDemo.html" target="new">$d</a>~;
}

open OUT, ">index.html";
print OUT $out;
