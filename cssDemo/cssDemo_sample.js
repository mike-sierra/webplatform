// if (! app.converter)  app.converter = new Object;
// if (! app.component)  app.component = new Object;

app.converter.filter = function(s) {
    var v = '';
    
    v += app.component['filter_blur'];
    return v;
}


// app.f.WebkitBoxShadow = function() {
//     var v = '';
//     v += app.p.WebkitBoxShadow_x + 'px ';
//     v += app.p.WebkitBoxShadow_y + 'px ';
//     v += app.p.WebkitBoxShadow_blur + 'px ';
//     v += app.p.WebkitBoxShadow_spread + 'px ';
//     v += 'rgba(';
//     v += app.p.WebkitBoxShadow_r + '%, ';
//     v += app.p.WebkitBoxShadow_g + '%, ';
//     v += app.p.WebkitBoxShadow_b + '%, ';
//     v += app.p.WebkitBoxShadow_a + '';
//     v += ')';
//     v += app.p.WebkitBoxShadow_inset && ' inset';
//     return v;
// }
// 