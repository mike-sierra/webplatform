var app = new Function();

window.onload = function() {
    app.component = new Object; // cache of values to assemble into complex property values
    app.converter = new Object; // 2doc
    app.touched = new Object; // 2doc 2DO

    setTimeout(function() {
        app.initContent();
        app.initBrowserEngineType();
        app.initInputs();
    }, 500);
};

app.initContent = function() {

    // populate interface with content from iframe page, then remove
    // the iframe.

    try {
        document.querySelector('#demo_topic').innerHTML  = frames[0].document.querySelector('title').innerHTML;
        document.querySelector('title').innerHTML  = frames[0].document.querySelector('title').innerHTML;
        document.querySelector('#demo_example').innerHTML  = frames[0].document.querySelector('section').innerHTML;
        document.querySelector('#demo_controls').innerHTML = frames[0].document.querySelector('form').innerHTML;
        document.querySelector('#demo_code').innerHTML     = frames[0].document.querySelector('pre').outerHTML;
        document.querySelector('body').removeChild(document.querySelector('iframe'));
    }
    catch(err) {
        alert("Can't run locally on this browser.\nTry Mozilla/Opera.");
    }
};

app.initBrowserEngineType = function() {

    // identify browser in order to generate -vendor-prefixed property
    // names: webkit, moz, & o;

    var ua = navigator.userAgent;
    if (ua.match(/webkit/i)) {
         app.browserEngine = 'Webkit';
    } else if (ua.match(/gecko/i)) {
         app.browserEngine = 'Moz';
    } else if (ua.match(/opera/i)) {
         app.browserEngine = 'O';
    } else if (ua.match(/explorer/i)) {
         app.browserEngine = 'IE';
    } else {
         alert("unknown browser: " + ua);
    }
};

app.initInputs = function() {
    app.inputs = document.querySelectorAll('input:not(.exclude), select:not(.exclude)');
    for (var i = 0, l = app.inputs.length; i < l; i++) {
        // make sure content is wired correctly:
        app.validateInput(app.inputs[i]);
        // remember initial value:
        app.inputs[i].dataset.init = app.inputs[i].value;
        // reflect initial value in example & code...
        app.modify(app.inputs[i]);
        // ...and respond to changes thereafter
        app.inputs[i].addEventListener('change', function(e) { app.modify(e.target) });
    }
}

app.validateInput = function(input) {
    if (! input.value) console.log("needs default 'value': " + app.inputs[i].outerHTML);
    if (! input.id) console.log("needs 'id': " + app.inputs[i].outerHTML);
}

app.trimDecimal = function(n) {
    return n.replace(/(\.[0-9][0-9])[0-9]+/, "$1");
}

app.modify = function(input) {
    var id;              // used for CSSOM property name, or name of property component
    var value;           // input value
    var unit;            // if necessary, e.g. %/deg/s/dpi for numeric units
    var vendor;          // 2do: spawn vendor prefixed syntax?
    var metaProp;        // property for which current value serves as a
                         // component, e.g. individual transform functions
    var tgtProp;         // alternate property name to which to assign complex
                         // value; e.g. assign gradient values to background-image
    var tgtExample;      // alternate ID for node to modify
    var tgtCode;         // alternate ID for code block <span> in which to
                         // reflect property name/value
    var cssValue;        // final property value, including units
    var cssomProp;       // property name used to manipulate example
    var cssProp;         // property name reflected in code
    var cssPropVendor;   //
    var cssomPropVendor; //

    id = input.id;

    // cache raw value, if modified from original, for use in URL permalink
    if (input.value != input.dataset.init) app.touched[id] = input.value;

    // process value:

    if (input.classList.contains('hex')) {
        // convert to hex string:
        value = "#" + (input.value * 1).toString(16) + '00000';
        value = value.replace(/^(#......).+/, "$1");
    } else if (input.type == 'range') {
        // sanitize unrounded decimal range input values:
         value = app.trimDecimal(input.value);
     } else {
         value = input.value;
     }

    // any unit to be appended to property value?
    unit = input.dataset.unit || '';

    // cache the input value in case complex property values need to
    // be built from many components:
    app.component[id] = value;

    // Is there any need to build a complex 'meta' property?
    metaProp = input.dataset.metaprop || false;

    // Is there a need to assign the compiled value to an arbitrary
    // property name? (E.g., gradient values assigned to
    // background-image)
    tgtProp = input.dataset.tgtprop || '';

    // spawn vendor-prefixed property?
    if (input.classList.contains(app.browserEngine)) vendor = app.browserEngine;

    // calculate final property value:

    if (metaProp) {
        // console.log('######################');
        // console.log(metaProp);
        // console.log(app.converter);
        // console.log(app.converter[metaProp]);
        try {
            // pass current value to function in case it's useful as a fallback return value:
            cssValue = app.converter[metaProp](value);
        }
        catch(err) {
            console.log("no metaprop function (app.converter." + metaProp + ") defined for ID " + id);
        }
    }
    else {
        cssValue = value + unit;
    }

    // calculate final property names:
    cssomProp = tgtProp || metaProp || id;
    cssProp = cssomProp.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    // calculate vendor-prefixed property name variants:
    if (vendor) {
        cssomPropVendor = app.browserEngine + cssomProp.charAt(0).toUpperCase() + cssomProp.slice(1);
        cssPropVendor = '-' + app.browserEngine.toLowerCase() + '-' + cssProp;
    }

    //// REFLECT IN EXAMPLE

    // get target example (2do: support alternate example target)
    tgtExample = document.querySelector(input.dataset.tgtexample || '#demo_example > *');

    try {
        tgtExample.style[cssomProp] = cssValue;
        if (vendor) tgtExample.style[cssomPropVendor] = cssValue;
    }
    catch(err) {
        console.log("no example target defined; need #x_" + cssomProp + " element.");
    }

    //// REFLECT IN CODE:

    try {
        tgtCode = document.querySelector(input.dataset.tgtcode || ('#c_' + cssomProp ) );
        tgtCode.textContent = cssProp + ": " + cssValue + ';';
        if (vendor) tgtCode.textContent += "\n" + cssPropVendor + ": " + cssValue + ';';
    }
    catch(err) {
        console.log("no code target defined; need #c_" + cssomProp + " element.");
    }

    // console.log("=====================");
    // console.log("tgtProp: "+ tgtProp);
    // console.log("metaProp: "+ metaProp);
    // console.log("id: "+ id);
    // console.log("vendor: "+ vendor);
    // console.log("_____________________");
    // console.log("cssomProp: " + cssomProp);
    // console.log("cssProp: "+ cssProp);
    // console.log("cssomPropVendor: " + cssomPropVendor);
    // console.log("cssPropVendor: "+ cssPropVendor);
    // console.log("cssValue: "+ cssValue);


};
