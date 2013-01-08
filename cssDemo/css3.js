
var app = new Function();
app.f = new Object; // custom syntax-building functions, each...
app.p = new Object; // ...corresponding to cache of custom property values
// app.c = new Object; // ... jsPropName cached in js-prop-name form

window.onload = function() {

    // POPULATE

    // gather all navigation items:
    app.tabs = document.querySelectorAll('nav > span');

    // gather all corresponding display panels:
    app.panels = document.querySelectorAll('#code > pre, #main > section > div');

    // gather all form inputs:
    app.inputs = document.querySelectorAll('input:not(.exclude), select:not(.exclude)');

    // gather all control panels
    app.controls = document.querySelectorAll('#controls > div');

    // debugger
    app.dbg = document.querySelector('#dbg');

    // ACTIVATE

    // need topics before initializing each input
    app.assignTopicsToInputs();

    // activate tab navigation...
    for (var i = 0, l = app.tabs.length; i < l; i++) {
        app.tabs[i].addEventListener('click', app.navTab);
    }
    // ...and initialize to display a single panel:
    app.navTab('box');

    // activate dynamic inputs
    for (var i = 0, l = app.inputs.length; i < l; i++) {
        // reflect initial value in example & code...
        app.modify(app.inputs[i]);
        // ...and respond to changes thereafter
        app.inputs[i].addEventListener('change', function(e) { app.modify(e.target) });
    }

    app.assignTogglers();
    app.smartSelect();

    app.tr2d = document.querySelector('#x_transform2d');
    app.tr3d = document.querySelector('#x_transform3d');
    app.tr2dCode = document.querySelector('#c_WebkitTransform_2dMatrix');
    app.tr3dCode = document.querySelector('#c_WebkitTransform_3dMatrix');
};

app.smartSelect = function() {

    document.querySelector('#WebkitTextFillColor_enable').addEventListener('click', app.toggleDownstreamInputs);
    document.querySelector('#WebkitBorderImage_enable').addEventListener('click', app.toggleDownstreamInputs);
    document.querySelector('#WebkitLinearGradient_StopEnable').addEventListener('click', app.toggleDownstreamInputs);
    document.querySelector('#WebkitRadialGradient_StopEnable').addEventListener('click', app.toggleDownstreamInputs);
    document.querySelector('#WebkitRepeatingLinearGradient_StopEnable').addEventListener('click', app.toggleDownstreamInputs);
    document.querySelector('#WebkitRepeatingRadialGradient_StopEnable').addEventListener('click', app.toggleDownstreamInputs);
    //    document.querySelector('#WebkitScrollbar_enable').addEventListener('click', app.toggleDownstreamInputs);

    document.querySelector('#WebkitGradient_isRadial').addEventListener('click', function(e){
        var from = document.querySelector('#WebkitGradient_fromrad');
        var to = document.querySelector('#WebkitGradient_torad');
        if (e.target.value) {
            from.disabled = false;
            to.disabled = false;
        } else {
            from.disabled = 'disabled';
            to.disabled = 'disabled';
        }
    });

    document.querySelector('#WebkitTransform_3dLevel').addEventListener('click', function(e){
        document.querySelector('#fs_ancestor').style.display = 'none';
        document.querySelector('#fs_parent').style.display = 'none';
        document.querySelector('#fs_child').style.display = 'none';
        document.querySelector('#fs_' + e.currentTarget.value).style.display = 'block';
    });

    document.querySelector('#backgroundColor_isHSLA').addEventListener('click', function(e){
        var hsl = document.querySelector('#fs_hsl');
        var rgb = document.querySelector('#fs_rgb');
        if (e.target.value) {
            hsl.style.display = 'block';
            rgb.style.display = 'none';
        } else {
            rgb.style.display = 'block';
            hsl.style.display = 'none';
        }
    });
};

app.toggleDownstreamInputs = function(e){
    // toggler must be first element, i.e. within fieldset
    var d = e.target.parentNode.querySelectorAll('input ~ input, input ~ select')
    for (var i = 0, l = d.length; i < l; i++ ) {
        if (e.target.value) {
            d[i].disabled = false;
        } else {
            d[i].disabled = 'disabled';
        }
    }
};

app.assignTogglers = function() {
    // anything classed 'toggle' gets to toggle that class
    var tog = document.querySelectorAll('.toggle')
    for (var i = 0, l = tog.length; i < l; i++) {
        tog[i].addEventListener('click', function(e){e.currentTarget.classList.toggle('toggle')});
    }
};

app.assignTopicsToInputs = function() {
    var ctrl, inputs, topic;
    for (var i = 0, l = app.controls.length; i < l; i++) {
        ctrl = app.controls[i];
        topic = ctrl.id.replace(/^n_/, "");
        inputs = ctrl.querySelectorAll('input, select');
        for (var ii = 0, ll = inputs.length; ii < ll; ii++) {
            inputs[ii].dataset.topic = topic;
        }
    }
}

app.navTab = function(e) {

    // relies on t_topic target ID or unprefixed string value;
    // displays corresponding i_, n_, x_, & c_ panels;

    var topic;
    if (typeof(e) == 'object') {
        e.target.classList.add('selected');
        topic = e.target.id.replace(/^t_/, '');
    } else {
        topic = e;
    }

    for (var i = 0, l = app.panels.length; i < l; i++) {
        app.panels[i].hidden = true;
        app.panels[i].classList.remove('show');
    }

    try {
        document.querySelector('#i_' + topic).hidden = false;
    } catch(err) {
        app.d("NO INFO BOX: " + topic)
    }

    try {
        document.querySelector('#n_' + topic).hidden = false;
    } catch(err) {
        app.d("NO CONTROLS: " + topic)
    }

    try {
        document.querySelector('#x_' + topic).hidden = false;
        document.querySelector('#x_' + topic).classList.add('show');
    } catch(err) {
        app.d("NO SAMPLE: " + topic)
    }

    try {
        document.querySelector('#c_' + topic).hidden = false;
    } catch(err) {
        app.d("NO CODE BLOCK: " + topic)
    }
};

app.sanitize = function(n) {
    return n.replace(/(\.[0-9][0-9])[0-9]+/, "$1");
}

app.modify = function(input) {
    var id = input.id;
    var topic = input.dataset.topic || app.d('no topic???');
    var unit, value, metaprop, rValue, rProp, rPropCSS, tgtCode, tgtExample, tgtProp;



    //// INIT DEBUG
    app.d('');

    //// PROCESS VALUE
    if (input.classList.contains('hex')) {
        // +case: sanitize hex color values
        value = "#" + (input.value * 1).toString(16);
    } else if (input.type == 'range') {
        // +case: range inputs produce unrounded results
        value = app.sanitize(input.value);
    } else {
        value = input.value;
    }

    //// PROCESS UNITS
    // +case: numeric data may need to specify units (%/deg/s/dpi)
    // "data-unit"
    unit = input.dataset.unit || '';

    //// CACHE RAW VALUES, necessary to build larger metaprops
    app.p[id] = value;

    //// NEED TO BUILD METAPROP?

    metaprop = input.dataset.metaprop || false;

    if (metaprop) {
        try {
            rValue = app.f[metaprop](value);
        }
        catch(err) {
            app.d('NO CONVERSION FUNCTION ASSOCIATED WITH ' + metaprop + " " + id);
        }
    } else {
        rValue = value;
        app.d('');
    }

    //// NEED TO ASSIGN TO DIFFERENT PROPERTY?
    tgtProp = input.dataset.tgtprop || '';

    //// PROCESS PROPERTY NAME
    rProp = tgtProp || metaprop || id;
    rPropCSS = rProp.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/(webkit)/i, "-$1").toLowerCase();

//data-tgtexample


    //// EXAMPLE TARGET (2fix!)
    try {
// app.d(input.dataset.tgtexample + " " + rValue);;;
        tgtExample = document.querySelector(input.dataset.tgtexample || ('#x_' + topic) );
        tgtExample.style[rProp] = rValue;
    } catch(err) {
        app.d('NO EXAMPLE TARGET ASSOCIATED WITH ' + topic + ' [' + id + ']');
    }

//data-tgtcode

    //// CODE TARGET (2fix!)
    try {
        tgtCode = document.querySelector(input.dataset.tgtcode || ('#c_' + rProp ) );
        tgtCode.innerHTML = rPropCSS + ": " + rValue + unit + ';';
    } catch(err) {
        app.d('NO CODE TARGET ASSOCIATED WITH ' + rProp  + ' [' + id + '] ' + input.dataset.tgtcode);
    }

    return(true);

    // default case: ID == target property (simple)
    // +case: ID is syntax component of a more complex
    // "data-metaprop"
    // +case: thingie may be targeted as value to another property
    // (backgroundImage:gradient) "data-tgtProp"
    // +case: need to reflect *change* in different element than
    // default "data-tgtExample"
    // +case: need to reflect *syntax* in different element than
    // default "data-tgtCode"
    // +case: mixing range/select controls for same target?
    // +scrollbars handled separately?

}

app.d = function(s) { app.dbg.innerHTML = s + "\n"; }

