use Data::Dumper;
@f = <DATA>;
for $f (@f) {
    $f =~ m~(.+)\t(.+)~ or die;
    ($cat, $file) = ($1, $2);
    $h{$1}{$2}++;
}

for $k (sort keys %h) {
    print "\n==$k==\n";
    for $k2 (sort keys %{$h{$k}}) {
        print $k2 . "\n";
    }
}

__END__
SVG 2.0	svg_properties_focusable.txt
Appendix B.4	svg_objects_SVGException.txt
Appendix B.4	svg_properties_code.txt
Appendix C	svg_properties_r1.txt
Appendix C	svg_properties_r2.txt
Appendix M	svg_properties_cx.txt
Appendix M	svg_properties_cy.txt
Appendix M	svg_properties_height.txt
Appendix M	svg_properties_rotate.txt
Appendix M	svg_properties_width.txt
Appendix M	svg_properties_x.txt
Appendix M	svg_properties_x1.txt
Appendix M	svg_properties_x2.txt
Appendix M	svg_properties_y.txt
Appendix M	svg_properties_y1.txt
Appendix M	svg_properties_y2.txt
Clipping, Masking and Compositing	svg_attributes_mask.txt
Clipping, Masking and Compositing	svg_attributes_clip-rule.txt
Clipping, Masking and Compositing	svg_properties_clipPath.txt
Clipping, Masking and Compositing	svg_elements_clipPath.txt
Clipping, Masking and Compositing	svg_properties_clipPathUnits.txt
Clipping, Masking and Compositing	svg_elements_mask.txt
Clipping, Masking and Compositing	svg_properties_maskContentUnits.txt
Clipping, Masking and Compositing	svg_properties_maskUnits.txt
Gradients and Patterns	svg_attributes_stop-color.txt
Gradients and Patterns	svg_attributes_stop-opacity.txt
Gradients and Patterns	svg_elements_gradient.txt
Gradients and Patterns	svg_properties_gradientTransform.txt
Gradients and Patterns	svg_properties_gradientUnits.txt
Gradients and Patterns	svg_properties_spread.txt
Gradients and Patterns	svg_elements_linearGradient.txt
Gradients and Patterns	svg_properties_x1_SVGLinearGradientElement.txt
Gradients and Patterns	svg_properties_x2_SVGLinearGradientElement.txt
Gradients and Patterns	svg_properties_y1_SVGLinearGradientElement.txt
Gradients and Patterns	svg_properties_y2_SVGLinearGradientElement.txt
Gradients and Patterns	svg_elements_radialGradient.txt
Gradients and Patterns	svg_properties_cx_SVGRadialGradientElement.txt
Gradients and Patterns	svg_properties_cy_SVGRadialGradientElement.txt
Gradients and Patterns	svg_properties_fx.txt
Gradients and Patterns	svg_properties_fy.txt
Gradients and Patterns	svg_properties_r_SVGRadialGradientElement.txt
Gradients and Patterns	svg_elements_stop.txt
Gradients and Patterns	svg_properties_offset.txt
Gradients and Patterns	svg_elements_patterrn.txt
Gradients and Patterns	svg_properties_patternContentUnits.txt
Gradients and Patterns	svg_properties_patternTransform.txt
Gradients and Patterns	svg_properties_patternUnits.txt
Linking	svg_properties_target.txt
Linking	svg_elements_a.txt
Linking	svg_elements_view.txt
Linking	svg_properties_viewTarget.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_fill-opacity.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_fill-rule.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_fill.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-dasharray.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-dashoffset.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-linecap.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-linejoin.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-miterlimit.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-opacity.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke-width.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_stroke.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_marker-end.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_marker-mid.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_marker-start.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_marker.txt
Painting, Filling, Stroking and Marker Symbols	svg_attributes_color-interpolation-filters.txt
Painting, Filling, Stroking and Marker Symbols	svg_elements_marker.txt
Painting, Filling, Stroking and Marker Symbols	svg_methods_setOrientToAngle.txt
Painting, Filling, Stroking and Marker Symbols	svg_methods_setOrientToAuto.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_markerHeight.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_markerUnits.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_markerWidth.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_orientAngle.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_orientType.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_refX.txt
Painting, Filling, Stroking and Marker Symbols	svg_properties_refY.txt
Text	svg_attributes_kerning.txt
Text	svg_elements_etextContent.txt
Text	svg_methods_getCharNumAtPosition.txt
Text	svg_methods_getComputedTextLength.txt
Text	svg_methods_getEndPositionOfChar.txt
Text	svg_methods_getExtentOfChar.txt
Text	svg_methods_getNumberOfChars.txt
Text	svg_methods_getRotationOfChar.txt
Text	svg_methods_getStartPositionOfChar.txt
Text	svg_methods_getSubStringLength.txt
Text	svg_methods_selectSubString.txt
Text	svg_properties_textLength.txt
Text	svg_elements_textPositioning.txt
Text	svg_properties_dx.txt
Text	svg_properties_dy.txt
Text	svg_elements_text.txt
Text	svg_elements_tspan.txt
Text	svg_elements_textPath.txt
Text	svg_properties_spacing.txt
Text	svg_properties_startOffset.txt
Text	svg_properties_lengthAdjust.txt
Text	svg_attributes_glyph-orientation-horizontal.txt
Text	svg_attributes_glyph-orientation-vertical.txt
Text	svg_attributes_text-anchor.txt
Text	svg_attributes_alignment-baseline.txt
Text	svg_attributes_baseline-shift.txt
Text	svg_attributes_dominant-baseline.txt
DOM2	svg_methods_addListener.txt
DOM2	svg_methods_dispatchEvent.txt
DOM2	svg_methods_removeListener.txt
DOM2	svg_methods_create.txt
DOM STYLE	svg_methods_getComputedStyle.txt
Basic Data Types and Interfaces	svg_methods_clear.txt
Basic Data Types and Interfaces	svg_methods_newValueSpecifiedUnits.txt
Basic Data Types and Interfaces	svg_properties_numberOfItems.txt
Basic Data Types and Interfaces	svg_properties_angle.txt
Basic Data Types and Interfaces	svg_objects_SVGElement.txt
Basic Data Types and Interfaces	svg_properties_id.txt
Basic Data Types and Interfaces	svg_properties_ownerSVGElement.txt
Basic Data Types and Interfaces	svg_properties_viewportElement.txt
Basic Data Types and Interfaces	svg_properties_xmlbase.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedNumberList.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedNumberList.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedNumberList.txt
Basic Data Types and Interfaces	svg_methods_convertToSpecifiedUnits.txt
Basic Data Types and Interfaces	svg_objects_SVGLength.txt
Basic Data Types and Interfaces	svg_properties_unitType_SVGLength.txt
Basic Data Types and Interfaces	svg_properties_value.txt
Basic Data Types and Interfaces	svg_properties_valueAsString.txt
Basic Data Types and Interfaces	svg_properties_valueInSpecifiedUnits.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedLength.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedLength.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedLength.txt
Basic Data Types and Interfaces	svg_objects_SVGLengthList.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedLengthList.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedLengthList.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedLengthList.txt
Basic Data Types and Interfaces	svg_objects_SVGAngle.txt
Basic Data Types and Interfaces	svg_properties_unitType.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedAngle.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedAngle.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedAngle.txt
Basic Data Types and Interfaces	svg_objects_SVGRect.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedBoolean.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedBoolean.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedBoolean.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedRect.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedRect.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedRect.txt
Basic Data Types and Interfaces	svg_properties_className.txt
Basic Data Types and Interfaces	svg_methods_getBBox.txt
Basic Data Types and Interfaces	svg_methods_getCTM.txt
Basic Data Types and Interfaces	svg_methods_getScreenCTM.txt
Basic Data Types and Interfaces	svg_methods_getTransformToElement.txt
Basic Data Types and Interfaces	svg_properties_farthestViewportElement.txt
Basic Data Types and Interfaces	svg_properties_nearestViewportElement.txt
Basic Data Types and Interfaces	svg_properties_transform.txt
Basic Data Types and Interfaces	svg_methods_hasExtension.txt
Basic Data Types and Interfaces	svg_properties_requiredExtensions.txt
Basic Data Types and Interfaces	svg_properties_requiredFeatures.txt
Basic Data Types and Interfaces	svg_properties_systemLanguage.txt
Basic Data Types and Interfaces	svg_properties_xmllang.txt
Basic Data Types and Interfaces	svg_properties_xmlspace.txt
Basic Data Types and Interfaces	svg_properties_externalResourcesRequired.txt
Basic Data Types and Interfaces	svg_properties_preserveAspectRatio.txt
Basic Data Types and Interfaces	svg_properties_viewBox.txt
Basic Data Types and Interfaces	svg_objects_SVGZoomAndPan.txt
Basic Data Types and Interfaces	svg_properties_zoomAndPan.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedString.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedString.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedString.txt
Basic Data Types and Interfaces	svg_properties_href.txt
Basic Data Types and Interfaces	svg_methods_appendItem.txt
Basic Data Types and Interfaces	svg_methods_getItem.txt
Basic Data Types and Interfaces	svg_methods_initialize.txt
Basic Data Types and Interfaces	svg_methods_insertItemBefore.txt
Basic Data Types and Interfaces	svg_methods_removeItem.txt
Basic Data Types and Interfaces	svg_methods_replaceItem.txt
Basic Data Types and Interfaces	svg_objects_SVGStringList.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedEnumeration.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedEnumeration.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedEnumeration.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedInteger.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedInteger.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedInteger.txt
Basic Data Types and Interfaces	svg_objects_SVGNumber.txt
Basic Data Types and Interfaces	svg_objects_SVGAnimatedNumber.txt
Basic Data Types and Interfaces	svg_properties_animVal_SVGAnimatedNumber.txt
Basic Data Types and Interfaces	svg_properties_baseVal_SVGAnimatedNumber.txt
Basic Data Types and Interfaces	svg_objects_SVGNumberList.txt
Document Structure	svg_properties_rootElement.txt
Document Structure	svg_methods_item.txt
Document Structure	svg_objects_SVGElementInstanceList.txt
Document Structure	svg_properties_length.txt
Document Structure	svg_elements_image.txt
Document Structure	svg_elements_switch.txt
Document Structure	svg_methods_getSVGDocument.txt
Document Structure	svg_elements_svg.txt
Document Structure	svg_methods_animationsPaused.txt
Document Structure	svg_methods_checkEnclosure.txt
Document Structure	svg_methods_checkIntersection.txt
Document Structure	svg_methods_createSVGAngle.txt
Document Structure	svg_methods_createSVGLength.txt
Document Structure	svg_methods_createSVGMatrix.txt
Document Structure	svg_methods_createSVGNumber.txt
Document Structure	svg_methods_createSVGPoint.txt
Document Structure	svg_methods_createSVGRect.txt
Document Structure	svg_methods_createSVGTransform.txt
Document Structure	svg_methods_deselectAll.txt
Document Structure	svg_methods_forceRedraw.txt
Document Structure	svg_methods_getCurrentTime.txt
Document Structure	svg_methods_getElementById.txt
Document Structure	svg_methods_getEnclosureList.txt
Document Structure	svg_methods_getIntersectionList.txt
Document Structure	svg_methods_pauseAnimations.txt
Document Structure	svg_methods_setCurrentTime.txt
Document Structure	svg_methods_suspendRedraw.txt
Document Structure	svg_methods_unpauseAnimations.txt
Document Structure	svg_methods_unsuspendRedraw.txt
Document Structure	svg_methods_unsuspendRedrawAll.txt
Document Structure	svg_properties_contentScriptType.txt
Document Structure	svg_properties_contentStyleType.txt
Document Structure	svg_properties_currentScale.txt
Document Structure	svg_properties_currentTranslate.txt
Document Structure	svg_properties_pixelUnitToMillimeterX.txt
Document Structure	svg_properties_pixelUnitToMillimeterY.txt
Document Structure	svg_properties_screenPixelToMillimeterX.txt
Document Structure	svg_properties_screenPixelToMillimeterY.txt
Document Structure	svg_properties_useCurrentView.txt
Document Structure	svg_properties_viewport.txt
Document Structure	svg_elements_g.txt
Document Structure	svg_elements_defs.txt
Document Structure	svg_elements_desc.txt
Document Structure	svg_elements_title.txt
Document Structure	svg_elements_symbol.txt
Document Structure	svg_elements_use.txt
Document Structure	svg_properties_animatedInstanceRoot.txt
Document Structure	svg_properties_instanceRoot.txt
Document Structure	svg_objects_SVGElementInstance.txt
Document Structure	svg_properties_childNodes.txt
Document Structure	svg_properties_correspondingElement.txt
Document Structure	svg_properties_correspondingUseElement.txt
Document Structure	svg_properties_firstChild.txt
Document Structure	svg_properties_lastChild.txt
Document Structure	svg_properties_nextSibling.txt
Document Structure	svg_properties_parentNode.txt
Document Structure	svg_properties_previousSibling.txt
Styling	svg_properties_style.txt
Styling	svg_elements_style.txt
Styling	svg_properties_media.txt
Styling	svg_properties_title.txt
Styling	svg_properties_type_SVGStyleElement.txt
Coordinate Systems, Transformations and Units	svg_methods_matrixTransform.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGPoint.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGPointList.txt
Coordinate Systems, Transformations and Units	svg_methods_flipX.txt
Coordinate Systems, Transformations and Units	svg_methods_flipY.txt
Coordinate Systems, Transformations and Units	svg_methods_inverse.txt
Coordinate Systems, Transformations and Units	svg_methods_multiply.txt
Coordinate Systems, Transformations and Units	svg_methods_rotate.txt
Coordinate Systems, Transformations and Units	svg_methods_rotateFromVector.txt
Coordinate Systems, Transformations and Units	svg_methods_scale.txt
Coordinate Systems, Transformations and Units	svg_methods_scaleNonUniform.txt
Coordinate Systems, Transformations and Units	svg_methods_skewX.txt
Coordinate Systems, Transformations and Units	svg_methods_skewY.txt
Coordinate Systems, Transformations and Units	svg_methods_translate.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGMatrix.txt
Coordinate Systems, Transformations and Units	svg_properties_a.txt
Coordinate Systems, Transformations and Units	svg_properties_b.txt
Coordinate Systems, Transformations and Units	svg_properties_c.txt
Coordinate Systems, Transformations and Units	svg_properties_d.txt
Coordinate Systems, Transformations and Units	svg_properties_e.txt
Coordinate Systems, Transformations and Units	svg_properties_f.txt
Coordinate Systems, Transformations and Units	svg_methods_setMatrix.txt
Coordinate Systems, Transformations and Units	svg_methods_setRotate.txt
Coordinate Systems, Transformations and Units	svg_methods_setScale.txt
Coordinate Systems, Transformations and Units	svg_methods_setSkewX.txt
Coordinate Systems, Transformations and Units	svg_methods_setSkewY.txt
Coordinate Systems, Transformations and Units	svg_methods_setTranslate.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGTransform.txt
Coordinate Systems, Transformations and Units	svg_properties_matrix.txt
Coordinate Systems, Transformations and Units	svg_properties_type_SVGTransform.txt
Coordinate Systems, Transformations and Units	svg_methods_consolidate.txt
Coordinate Systems, Transformations and Units	svg_methods_createSVGTransformFromMatrix.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGTransformList.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGAnimatedTransformList.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGPreserveAspectRatio.txt
Coordinate Systems, Transformations and Units	svg_properties_align.txt
Coordinate Systems, Transformations and Units	svg_properties_meetOrSlice.txt
Coordinate Systems, Transformations and Units	svg_objects_SVGAnimatedPreserveAspectRatio.txt
Coordinate Systems, Transformations and Units	svg_properties_animVal_SVGAnimatedTransformList.txt
Coordinate Systems, Transformations and Units	svg_properties_baseVal_SVGAnimatedTransformList.txt
Coordinate Systems, Transformations and Units	svg_properties_animVal_SVGAnimatedPreserveAspectRatio.txt
Coordinate Systems, Transformations and Units	svg_properties_baseVal_SVGAnimatedPreserveAspectRatio.txt
Paths	svg_objects_SVGPathSeg.txt
Paths	svg_properties_pathSegType.txt
Paths	svg_properties_pathSegTypeAsLetter.txt
Paths	svg_objects_SVGPathSegCurvetoQuadraticRel.txt
Paths	svg_objects_SVGPathSegArcAbs.txt
Paths	svg_properties_largeArcFlag.txt
Paths	svg_objects_SVGPathSegArcRel.txt
Paths	svg_properties_sweepFlag.txt
Paths	svg_objects_SVGPathSegLinetoHorizontalAbs.txt
Paths	svg_objects_SVGPathSegLinetoHorizontalRel.txt
Paths	svg_objects_SVGPathSegLinetoVerticalAbs.txt
Paths	svg_objects_SVGPathSegLinetoVerticalRel.txt
Paths	svg_objects_SVGPathSegCurvetoCubicSmoothAbs.txt
Paths	svg_objects_SVGPathSegCurvetoCubicSmoothRel.txt
Paths	svg_objects_SVGPathSegCurvetoQuadraticSmoothAbs.txt
Paths	svg_objects_SVGPathSegClosePath.txt
Paths	svg_objects_SVGPathSegCurvetoQuadraticSmoothRel.txt
Paths	svg_objects_SVGPathSegList.txt
Paths	svg_properties_animatedNormalizedPathSegList.txt
Paths	svg_properties_animatedPathSegList.txt
Paths	svg_properties_normalizedPathSegList.txt
Paths	svg_properties_pathSegList.txt
Paths	svg_elements_path.txt
Paths	svg_methods_createSVGPathSegArcAbs.txt
Paths	svg_methods_createSVGPathSegArcRel.txt
Paths	svg_methods_createSVGPathSegClosePath.txt
Paths	svg_methods_createSVGPathSegCurvetoCubicAbs.txt
Paths	svg_methods_createSVGPathSegCurvetoCubicRel.txt
Paths	svg_methods_createSVGPathSegCurvetoCubicSmoothAbs.txt
Paths	svg_methods_createSVGPathSegCurvetoCubicSmoothRel.txt
Paths	svg_methods_createSVGPathSegCurvetoQuadraticAbs.txt
Paths	svg_methods_createSVGPathSegCurvetoQuadraticRel.txt
Paths	svg_methods_createSVGPathSegCurvetoQuadraticSmoothAbs.txt
Paths	svg_methods_createSVGPathSegCurvetoQuadraticSmoothRel.txt
Paths	svg_methods_createSVGPathSegLinetoAbs.txt
Paths	svg_methods_createSVGPathSegLinetoHorizontalAbs.txt
Paths	svg_methods_createSVGPathSegLinetoHorizontalRel.txt
Paths	svg_methods_createSVGPathSegLinetoRel.txt
Paths	svg_methods_createSVGPathSegLinetoVerticalAbs.txt
Paths	svg_methods_createSVGPathSegLinetoVerticalRel.txt
Paths	svg_methods_createSVGPathSegMovetoAbs.txt
Paths	svg_methods_createSVGPathSegMovetoRel.txt
Paths	svg_methods_getPathSegAtLength.txt
Paths	svg_methods_getPointAtLength.txt
Paths	svg_methods_getTotalLength.txt
Paths	svg_objects_SVGPathSegMovetoAbs.txt
Paths	svg_objects_SVGPathSegMovetoRel.txt
Paths	svg_objects_SVGPathSegLinetoAbs.txt
Paths	svg_objects_SVGPathSegLinetoRel.txt
Paths	svg_objects_SVGPathSegCurvetoCubicAbs.txt
Paths	svg_objects_SVGPathSegCurvetoCubicRel.txt
Paths	svg_objects_SVGPathSegCurvetoQuadraticAbs.txt
Basic Shapes	svg_elements_rect.txt
Basic Shapes	svg_properties_rx_SVGRectElement.txt
Basic Shapes	svg_properties_ry_SVGRectElement.txt
Basic Shapes	svg_elements_circle.txt
Basic Shapes	svg_properties_r.txt
Basic Shapes	svg_elements_ellipse.txt
Basic Shapes	svg_properties_rx_SVGEllipseElement.txt
Basic Shapes	svg_properties_ry_SVGEllipseElement.txt
Basic Shapes	svg_elements_line.txt
Basic Shapes	svg_properties_x1_SVGLineElement.txt
Basic Shapes	svg_properties_x2_SVGLineElement.txt
Basic Shapes	svg_properties_y1_SVGLineElement.txt
Basic Shapes	svg_properties_y2_SVGLineElement.txt
Basic Shapes	svg_properties_animatedPoints.txt
Basic Shapes	svg_properties_points.txt
Basic Shapes	svg_elements_polyline.txt
Basic Shapes	svg_elements_polygon.txt
Interactivity	svg_attributes_pointers.txt
Scripting	svg_events_load.txt
Scripting	svg_events_error.txt
Scripting	svg_events_onabort.txt
Scripting	svg_events_onzoom.txt
Scripting	svg_events_resize.txt
Scripting	svg_events_scroll.txt
Scripting	svg_events_unload.txt
Scripting	svg_elements_script.txt
Scripting	svg_properties_type_SVGScriptElement.txt
Scripting	svg_objects_SVGZoom.txt
Scripting	svg_properties_newScale.txt
Scripting	svg_properties_newTranslate.txt
Scripting	svg_properties_previousScale.txt
Scripting	svg_properties_previousTranslate.txt
Metadata	svg_elements_metadata.txt
Filter Effects	svg_properties_type_SVGComponentTransferFunctionElement.txt
Filter Effects	svg_attributes_flood-color.txt
Filter Effects	svg_attributes_flood-opacity.txt
Filter Effects	svg_methods_setFilterRes.txt
Filter Effects	svg_properties_filterResX.txt
Filter Effects	svg_properties_filterResY.txt
Filter Effects	svg_properties_primitiveUnits.txt
Filter Effects	svg_elements_feFuncA.txt
Filter Effects	svg_elements_feComposite.txt
Filter Effects	svg_properties_k1.txt
Filter Effects	svg_properties_k2.txt
Filter Effects	svg_properties_k3.txt
Filter Effects	svg_properties_k4.txt
Filter Effects	svg_elements_feConvolveMatrix.txt
Filter Effects	svg_properties_bias.txt
Filter Effects	svg_properties_divisor.txt
Filter Effects	svg_properties_edgeMode.txt
Filter Effects	svg_properties_kernelMatrix.txt
Filter Effects	svg_properties_kernelUnitLengthX.txt
Filter Effects	svg_properties_kernelUnitLengthY.txt
Filter Effects	svg_properties_orderX.txt
Filter Effects	svg_properties_orderY.txt
Filter Effects	svg_properties_preserveAlpha.txt
Filter Effects	svg_properties_targetX.txt
Filter Effects	svg_properties_targetY.txt
Filter Effects	svg_elements_feDiffuseLighting.txt
Filter Effects	svg_properties_diffuseConstant.txt
Filter Effects	svg_elements_feDistantLight.txt
Filter Effects	svg_properties_azimuth.txt
Filter Effects	svg_properties_elevation.txt
Filter Effects	svg_elements_fePointLight.txt
Filter Effects	svg_elements_feSpotlight.txt
Filter Effects	svg_properties_limitingConeAngle.txt
Filter Effects	svg_properties_pointsAtX.txt
Filter Effects	svg_properties_pointsAtY.txt
Filter Effects	svg_properties_pointsAtZ.txt
Filter Effects	svg_properties_specularExponent.txt
Filter Effects	svg_properties_z.txt
Filter Effects	svg_elements_feDisplacementMap.txt
Filter Effects	svg_properties_xChannelSelector.txt
Filter Effects	svg_properties_yChannelSelector.txt
Filter Effects	svg_elements_feFlood.txt
Filter Effects	svg_elements_feGaussianBlur.txt
Filter Effects	svg_methods_setStdDeviation.txt
Filter Effects	svg_properties_stdDeviationX.txt
Filter Effects	svg_properties_stdDeviationY.txt
Filter Effects	svg_elements_feImage.txt
Filter Effects	svg_elements_feMerge.txt
Filter Effects	svg_elements_feMergeNode.txt
Filter Effects	svg_elements_feMorphology.txt
Filter Effects	svg_properties_operator.txt
Filter Effects	svg_properties_radiusX.txt
Filter Effects	svg_properties_radiusY.txt
Filter Effects	svg_elements_feOffset.txt
Filter Effects	svg_elements_feSpecularLighting.txt
Filter Effects	svg_properties_specularConstant.txt
Filter Effects	svg_properties_surfaceScale.txt
Filter Effects	svg_elements_feTile.txt
Filter Effects	svg_elements_feTurbulence.txt
Filter Effects	svg_properties_baseFrequencyX.txt
Filter Effects	svg_properties_baseFrequencyY.txt
Filter Effects	svg_properties_seed.txt
Filter Effects	svg_properties_stitchTiles.txt
Filter Effects	svg_elements_feBlend.txt
Filter Effects	svg_properties_mode.txt
Filter Effects	svg_elements_feColorMatrix.txt
Filter Effects	svg_properties_values.txt
Filter Effects	svg_properties_amplitude.txt
Filter Effects	svg_properties_exponent.txt
Filter Effects	svg_elements_feFuncR.txt
Filter Effects	svg_properties_intercept.txt
Filter Effects	svg_elements_feFuncG.txt
Filter Effects	svg_properties_slope.txt
Filter Effects	svg_elements_feFuncB.txt
Filter Effects	svg_properties_tableValues.txt
Filter Effects	svg_attributes_enable-background.txt
Filter Effects	svg_properties_in1.txt
Filter Effects	svg_properties_in2.txt
Filter Effects	svg_attributes_lighting-color.txt
