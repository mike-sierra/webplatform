app.f.WebkitBoxShadow = function() {
    var v = '';
    v += app.p.WebkitBoxShadow_x + 'px ';
    v += app.p.WebkitBoxShadow_y + 'px ';
    v += app.p.WebkitBoxShadow_blur + 'px ';
    v += app.p.WebkitBoxShadow_spread + 'px ';
    v += 'rgba(';
    v += app.p.WebkitBoxShadow_r + '%, ';
    v += app.p.WebkitBoxShadow_g + '%, ';
    v += app.p.WebkitBoxShadow_b + '%, ';
    v += app.p.WebkitBoxShadow_a + '';
    v += ')';
    v += app.p.WebkitBoxShadow_inset && ' inset';
    return v;
}

app.f.textShadow = function() {
    var v = '';
    v += app.p.textShadow_x + 'px ';
    v += app.p.textShadow_y + 'px ';
    v += app.p.textShadow_blur + 'px ';
    v += 'rgba(';
    v += app.p.textShadow_r + '%, ';
    v += app.p.textShadow_g + '%, ';
    v += app.p.textShadow_b + '%, ';
    v += app.p.textShadow_a + '';
    v += ')';
    return v;
}

app.f.color = function() {
    var v = '';
    v += 'rgba(';
    v += app.p.color_r + '%, ';
    v += app.p.color_g + '%, ';
    v += app.p.color_b + '%, ';
    v += app.p.color_a + '';
    v += ')';
    return v;
}

app.f.WebkitTextStrokeColor = function() {
    var v = '';
    v += 'rgba(';
    v += app.p.WebkitTextStrokeColor_r + '%, ';
    v += app.p.WebkitTextStrokeColor_g + '%, ';
    v += app.p.WebkitTextStrokeColor_b + '%, ';
    v += app.p.WebkitTextStrokeColor_a + '';
    v += ')';
    return v;
}

app.f.WebkitTextFillColor = function() {
    var v = '';
    if (! app.p.WebkitTextFillColor_enable) return ('currentcolor');

    v += 'rgba(';
    v += app.p.WebkitTextFillColor_r + '%, ';
    v += app.p.WebkitTextFillColor_g + '%, ';
    v += app.p.WebkitTextFillColor_b + '%, ';
    v += app.p.WebkitTextFillColor_a + '';
    v += ')';
    return v;
}

app.f.backgroundColor = function() {
    var v = '';
    if (app.p.backgroundColor_isHSLA) {
        v += 'hsla(';
        v += app.p.backgroundColor_hslah + ', ';
        v += app.p.backgroundColor_hslas + '%, ';
        v += app.p.backgroundColor_hslal + '%, ';
        v += app.p.backgroundColor_hslaa + '';
        v += ')';
    } else {
        v += 'rgba(';
        v += app.p.backgroundColor_rgbar + '%, ';
        v += app.p.backgroundColor_rgbag + '%, ';
        v += app.p.backgroundColor_rgbab + '%, ';
        v += app.p.backgroundColor_rgbaa + '';
        v += ')';
    }
    return v;
}

app.f.WebkitTextFillColor = function() {
    var v = '';
    if (! app.p.WebkitTextFillColor_enable) return ('currentcolor');

    v += 'rgba(';
    v += app.p.WebkitTextFillColor_r + '%, ';
    v += app.p.WebkitTextFillColor_g + '%, ';
    v += app.p.WebkitTextFillColor_b + '%, ';
    v += app.p.WebkitTextFillColor_a + '';
    v += ')';
    return v;
}

app.f.WebkitMaskSize = function() {
    var v = '';
    v += app.p.WebkitMaskSize_x + '% ';
    v += app.p.WebkitMaskSize_y + '%';
    return v;
}

app.f.WebkitMaskPosition = function() {
    var v = '';
    v += app.p.WebkitMaskPosition_x + ' ';
    v += app.p.WebkitMaskPosition_y;
    return v;
}

app.f.WebkitBoxReflect = function() {
    var v = '';
    v += app.p.WebkitBoxReflect_direction + ' ';
    v += app.p.WebkitBoxReflect_gap + 'px ';
    v += app.p.WebkitBoxReflect_image + '';
    return v;
}

app.f.backgroundPosition = function() {
    var v = '';
    v += app.p.backgroundPosition_x + '% ';
    v += app.p.backgroundPosition_y + '%';
    return v;
}

app.f.backgroundSize = function() {
    var v = '';
    v += app.p.backgroundSize_x + '% ';
    v += app.p.backgroundSize_y +'%';
    return v;
}

app.f.WebkitBorderImage = function() {
    var v = '';
    if (! app.p.WebkitBorderImage_enable) return('');
    v += app.p.WebkitBorderImage_image + ' ';
    v += app.p.WebkitBorderImage_top + ' ';
    v += app.p.WebkitBorderImage_right + ' ';
    v += app.p.WebkitBorderImage_bottom + ' ';
    v += app.p.WebkitBorderImage_left + ' ';
    v += app.p.WebkitBorderImage_repeatX + ' ';
    v += app.p.WebkitBorderImage_repeatY + '';
    return v;
}

app.f.borderImageSlice = function() {
    var v = '';
    v += app.p.borderImageSlice_meas + '%';
    if (app.p.borderImageSlice_fill) v += ' fill';
    return v;
}

app.f.WebkitTransitionTimingFunction = function(s) {
    var v;;
    if (s.match(/step/)) return (s);
    if (s == 'ease') return('cubic-bezier(0.25, 0.1, 0.25, 1)');
    if (s == 'linear') return('cubic-bezier(0, 0, 1, 1)');
    if (s == 'ease-in') return('cubic-bezier(0.42, 0, 1, 1)');
    if (s == 'ease-out') return('cubic-bezier(0, 0, 0.58, 1)');
    if (s == 'ease-in-out') return('cubic-bezier(0.42, 0, 0.58, 1)');
    if (s.match(/^steps/)) return(s);
    v = 'cubic-bezier(';
    v += app.p.WebkitTransitionTimingFunction_x1 + ', ';
    v += app.p.WebkitTransitionTimingFunction_y1 + ', ';
    v += app.p.WebkitTransitionTimingFunction_x2 + ', ';
    v += app.p.WebkitTransitionTimingFunction_y2 + ')';
    return v;
}

app.f.WebkitAnimationTimingFunction = function(s) {
    var v;;
    if (s == 'ease') return('cubic-bezier(0.25, 0.1, 0.25, 1)');
    if (s == 'linear') return('cubic-bezier(0, 0, 1, 1)');
    if (s == 'ease-in') return('cubic-bezier(0.42, 0, 1, 1)');
    if (s == 'ease-out') return('cubic-bezier(0, 0, 0.58, 1)');
    if (s == 'ease-in-out') return('cubic-bezier(0.42, 0, 0.58, 1)');
    v = 'cubic-bezier(';
    v += app.p.WebkitAnimationTimingFunction_x1 + ', ';
    v += app.p.WebkitAnimationTimingFunction_y1 + ', ';
    v += app.p.WebkitAnimationTimingFunction_x2 + ', ';
    v += app.p.WebkitAnimationTimingFunction_y2 + ')';
    return v;
}

app.f.WebkitTransformOrigin = function() {
    var v = '';
    v += app.p.WebkitTransformOriginX + '% ';
    v += app.p.WebkitTransformOriginY + '%';
    return v;
}

app.f.WebkitPerspectiveOrigin = function() {
    var v = '';
    v += app.p.WebkitPerspectiveOrigin_X + '% ';
    v += app.p.WebkitPerspectiveOrigin_Y + '%';
    return v;
}

app.f.WebkitLinearGradient = function(s) {
    var v = '';
    v += '-webkit-linear-gradient(';
    // named or numeric degree origin?
    if (s.match(/^[a-z]/i)) {
        v += app.p.WebkitLinearGradient_Origin;
    } else {
        v += app.p.WebkitLinearGradient_OriginDeg + 'deg';
    }
    v += ', ';
    v += app.p.WebkitLinearGradient_FromColor + ', ';

    if (app.p.WebkitLinearGradient_StopEnable) {
        v += app.p.WebkitLinearGradient_StopColor + ' ';
        v += app.p.WebkitLinearGradient_StopPos + '%, ';
    }

    v += app.p.WebkitLinearGradient_ToColor + ')';
    return v;
};

app.f.WebkitRepeatingLinearGradient = function(s) {
    var v = '';
    v += '-webkit-repeating-linear-gradient(';
    // named or numeric degree origin?
    if (s.match(/^[a-z]/i)) {
        v += app.p.WebkitRepeatingLinearGradient_Origin;
    } else {
        v += app.p.WebkitRepeatingLinearGradient_OriginDeg + 'deg';
    }
    v += ', ';
    v += app.p.WebkitRepeatingLinearGradient_FromColor + ' ';
    v += app.p.WebkitRepeatingLinearGradient_FromPos + '%, ';
    if (app.p.WebkitRepeatingLinearGradient_StopEnable) {
        v += app.p.WebkitRepeatingLinearGradient_StopColor + ' ';
        v += app.p.WebkitRepeatingLinearGradient_StopPos + '%, ';
    }
    v += app.p.WebkitRepeatingLinearGradient_ToColor + ' ';
    v += app.p.WebkitRepeatingLinearGradient_ToPos + '%)';
    return v;
};

app.f.WebkitRadialGradient = function(s) {
    var v = '';
    v += '-webkit-radial-gradient(';
    v += app.p.WebkitRadialGradient_X + '% ';
    v += app.p.WebkitRadialGradient_Y + '%, ';
    v += app.p.WebkitRadialGradient_Shape + ' ';
    v += app.p.WebkitRadialGradient_Size + ', ';
    v += app.p.WebkitRadialGradient_FromColor + ', ';
    if (app.p.WebkitRadialGradient_StopEnable) {
        v += app.p.WebkitRadialGradient_StopColor + ' ';
        v += app.p.WebkitRadialGradient_StopPos + '%, ';
    }
    v += app.p.WebkitRadialGradient_ToColor + '';
    v += ')';
    return v;
}

app.f.WebkitRepeatingRadialGradient = function(s) {
    var v = '';
    v += '-webkit-repeating-radial-gradient(';
    v += app.p.WebkitRepeatingRadialGradient_X + '% ';
    v += app.p.WebkitRepeatingRadialGradient_Y + '%, ';
    v += app.p.WebkitRepeatingRadialGradient_Shape + ' ';
    v += app.p.WebkitRepeatingRadialGradient_Size + ', ';
    v += app.p.WebkitRepeatingRadialGradient_FromColor + ' ';
    v += app.p.WebkitRepeatingRadialGradient_FromPos + '%, ';
    if (app.p.WebkitRepeatingRadialGradient_StopEnable) {
        v += app.p.WebkitRepeatingRadialGradient_StopColor + ' ';
        v += app.p.WebkitRepeatingRadialGradient_StopPos + '%, ';
    }
    v += app.p.WebkitRepeatingRadialGradient_ToColor + ' ';
    v += app.p.WebkitRepeatingRadialGradient_ToPos + '%';
    v += ')';
    return v;
}

app.f.WebkitGradient = function() {
    var v = '';
    v += '-webkit-gradient(';
    if (app.p.WebkitGradient_isRadial) {
        v += 'radial, ';
    } else {
        v += 'linear, ';
    }

    v += app.p.WebkitGradient_fromx + '% ';
    v += app.p.WebkitGradient_fromy + '%, ';
    if (app.p.WebkitGradient_isRadial) v += app.p.WebkitGradient_fromrad + ', ';

    v += app.p.WebkitGradient_tox + '% ';
    v += app.p.WebkitGradient_toy + '%, ';
    if (app.p.WebkitGradient_isRadial) v += app.p.WebkitGradient_torad + ', ';

    v += 'from(';
    v += app.p.WebkitGradient_fromcolor;
    v += '), ';

    v += 'color-stop(';
    v += app.p.WebkitGradient_stoppos + '%, ';
    v += app.p.WebkitGradient_stopcolor;
    v += '), ';

    v += 'to(';
    v += app.p.WebkitGradient_tocolor;
    v += '))';

    return v;
};

app.f.WebkitTransform = function() {
    var v = '';

    v += 'translate(';
    v += app.p.WebkitTransform_2DtranslateX + '%, ';
    v += app.p.WebkitTransform_2DtranslateY + '%) ';

    v += 'scale(';
    v += app.p.WebkitTransform_2DscaleX + ', ';
    v += app.p.WebkitTransform_2DscaleY + ') ';

    v += 'skew(';
    v += app.p.WebkitTransform_2DskewX + 'deg, ';
    v += app.p.WebkitTransform_2DskewY + 'deg) ';

    v += 'rotate(' + app.p.WebkitTransform_2Drotate+ 'deg)';

    app.tr2dCode.textContent = window.getComputedStyle(app.tr2d).WebkitTransform.replace(/(\.[0-9][0-9])[0-9]+/g, "$1");

    return v;
}

app.f.WebkitTransform_3dMain = function() {
    var v = '';

    v += 'rotateX(' + app.p.WebkitTransform_3dRotateX + 'deg) ';
    v += 'rotateY(' + app.p.WebkitTransform_3dRotateY + 'deg) ';
    v += 'rotateZ(' + app.p.WebkitTransform_3dRotateZ + 'deg) ';

    v += 'translate3d(';
    v += app.p.WebkitTransform_3dTranslateX + '%, ';
    v += app.p.WebkitTransform_3dTranslateY + '%, ';
    v += app.p.WebkitTransform_3dTranslateZ + 'px) ';

    v += 'scale3d(';
    v += app.p.WebkitTransform_3dScaleX + ', ';
    v += app.p.WebkitTransform_3dScaleY + ', ';
    v += app.p.WebkitTransform_3dScaleZ + ')';

    app.tr3dCode.textContent = window.getComputedStyle(app.tr3d).WebkitTransform.replace(/(\.[0-9][0-9])[0-9]+/g, "$1");

    return v;
}

app.f.WebkitTransform_3dNested = function() {
    var v = '';

    v += 'rotate3D(';
    v += app.p.WebkitTransform_3dNestedRotate + 'deg, ';
    v += app.p.WebkitTransform_3dNestedRotateX + ', ';
    v += app.p.WebkitTransform_3dNestedRotateY + ', ';
    v += app.p.WebkitTransform_3dNestedRotateZ + ') ';

    v += 'translate3D(';
    v += app.p.WebkitTransform_3dNestedTranslateX + '%, ';
    v += app.p.WebkitTransform_3dNestedTranslateY + '%, ';
    v += app.p.WebkitTransform_3dNestedTranslateZ + 'px) ';

    v += 'scale3D(';
    v += app.p.WebkitTransform_3dNestedScaleX + ', ';
    v += app.p.WebkitTransform_3dNestedScaleY + ', ';
    v += app.p.WebkitTransform_3dNestedScaleZ + ') ';

    return v;
}

app.f.WebkitTransformOrigin_3dMain = function() {
    var v = '';
    v += app.p.WebkitTransformOrigin_3dMainX + '% ';
    v += app.p.WebkitTransformOrigin_3dMainY + '% ';
    v += app.p.WebkitTransformOrigin_3dMainZ + '';
    return v;
}

app.f.WebkitTransformOrigin_3dNested = function() {
    var v = '';
    v += app.p.WebkitTransformOrigin_3dNestedX + '% ';
    v += app.p.WebkitTransformOrigin_3dNestedY + '% ';
    v += app.p.WebkitTransformOrigin_3dNestedZ;
    return v;
}

app.f.WebkitTransformStyle_3dNested = function() {
    return app.p.WebkitTransformStyle_3dNested;
}

app.f.WebkitBackfaceVisibility_3dNested = function() {
    return app.p.WebkitBackfaceVisibility_3dNested;
}

