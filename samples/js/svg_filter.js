var app = new Function();

app.img = '001';

app.c = 0;

window.onload = function() {

    if (!app.browserSupport()) return(false);

    // classes on this determine app state:
    app.body = document.querySelector('body');

    // populate channel select:
    app.initSelect();

    // associate controls that build complex values:
    app.initComponents();

    // by default, both channels & subregion controls display; this
    // CSS selector reflects that:
    app.optionSelector = '.subregionPanel > .subregion, .channelPanel > .channel';

    // each filter effect is represented as a details element, often
    // referred to in code as a "panel"

    app.effects = document.querySelectorAll('section#effects > details');
    for (var i = 0, l = app.effects.length; i < l; i++) {
        app.effects[i].draggable = 'true';
        app.effects[i].addEventListener('dragstart', app.dragstart);
        // this attaches a dismiss icon:
        app.effects[i].querySelector('summary').innerHTML += '<nav></nav>';
    }
    // This element serves as container for filter effect sequence
    app.filter = document.querySelector('section#filter');
    app.filter.addEventListener('dragover', app.dragover);
    app.filter.addEventListener('drop', app.drop);
    // This is where the code displays:
    app.debug = document.querySelector('#code');
    // This is where the SVG code executes & displays
    app.g = document.querySelector('#graphic');
    // display empty default code:
    app.assemble();
};

app.d = function(s) {
    app.debug.textContent = s;
};

app.browserSupport = function() {

    // excludes browsers that don't do details element or drag & drop

    var support = 'open' in document.createElement('details');
    if (!support) {
        alert("Your browser can't display the 'details' element; try Chrome");
        return(false);
    }
    support = 'draggable' in document.createElement('span');
    if (!support) {
        alert("Your browser doesn't drag and drop; try Chrome");
        return(false);
    }
    return(true);
};

app.initSelect = function() {

    // populate <select> tags that specify input-channel keywords, and
    // provide a few present channels to play with

    var sel = document.querySelectorAll('.channel');
    var markup = '';
    for (var i = 0, l = sel.length; i < l; i++) {
        markup = '';
        if (sel[i].dataset.attr != 'result') {
            markup += '<option selected>SourceAlpha</option><option selected>SourceGraphic</option>';
            markup += '<option>fillPaint</option><option>strokePaint</option>';
            //            markup += '<option>BackgroundAlpha</option><option>BackgroundImage</option>';
        }
        for (var n = 1; n < 5; n++) {
            markup += '<option>channel' + n + '</option>';
        }
        sel[i].innerHTML = markup;
    }
};

app.changePanel = function(el) {

    // stupid little routine used to key CSS to toggle display of
    // nested fieldsets for feColorMatrix panel's "values" attribute

    el.dataset.value = el.value;
    el.parentNode.dataset.topic = el.value;
}

app.initComponents = function() {

    // For attributes requiring a series of more than one value, these
    // are called components. Each component 'map' identifies a
    // sequence of other components associated with that of the
    // current input. The 'value' provides a cache of the component's
    // value for each input. REQ: each component ID must be defined in
    // a string sequence.  This could use some error checking.

    app.component = {};
    app.component.map = {};
    app.component.value = {};

    var components;
    var strings = [
                   'cmx01 cmx02 cmx03 cmx04 cmx05 cmx06 cmx07 cmx08 cmx09 cmx10 cmx11 cmx12 cmx13 cmx14 cmx15 cmx16 cmx17 cmx18 cmx19 cmx20',

                   'cvmx01 cvmx02 cvmx03 cvmx04 cvmx05 cvmx06 cvmx07 cvmx08 cvmx09',
                   'blurX blurY'

             ];

    // each component ID maps to an array of components within which
    // it appears:

    for (i = 0; i < strings.length; i++) {
        components = strings[i].split(/ +/);
        for (i2 = 0; i2 < components.length; i2++) {
            app.component.map[components[i2]] = components;
        }
    }

    // initialize value of each component.

    app.inputs = document.querySelectorAll('input, select');
    for (var i = 0, l = app.inputs.length; i < l; i++) {
        if (app.inputs[i].dataset.component) {
            app.component.value[app.inputs[i].dataset.component] = app.inputs[i].value;
        }
    }

    // BUG: drag in a filter effect that uses components, then modify
    // those values; if you then delete the effect or drag in a new
    // instance, its component values won't match those already
    // modified. Possible fix would be to cache modified values on the
    // panel (details element).

};

app.drop = function(e) {
    e.preventDefault();
    // get ID of dragged element:
    var data = e.dataTransfer.getData("Text");
    // ...and clone it
    var el = document.getElementById(data).cloneNode(true)
    // does it have any panels for nested tags within filter effects?
    var nested = el.querySelectorAll('details');
    // REQ: all inputs on dragged element should already be disabled
    var inputs = el.querySelectorAll('*[disabled]');
    for (var i = 0; i < inputs.length; i++) {
        // enable inputs
        inputs[i].disabled = false;
    }
    for (var i = 0; i < nested.length; i++) {
        // allow inputs in nested panels to build their own markup
        nested[i].addEventListener('change', app.modify);
    }
    // REQ: each top-level panel's ID corresponds to top-level filter effect tagName:
    el.dataset.tag = el.id;
    el.removeAttribute('id');
    el.removeAttribute('draggable');
    // allow inputs within panel to build markup
    el.addEventListener('change', app.modify);
    // enable deletion of effect
    el.addEventListener('click', app.removeEffect);
    // attach it to sequence of filter effects
    e.currentTarget.appendChild(el);
};

app.removeEffect = function(e) {
    // click must be in dismiss box:
    if (e.target.tagName != 'NAV') return(false);
    // remove this node...
    var node = e.currentTarget;
    node.parentNode.removeChild(node);
    // ...and recalculate SVG markup
    app.assemble();
};

app.dragover = function(e) {
    // might add a visual effect here?
    e.preventDefault();
};

app.dragstart = function(e) {
    // ID of dragged element used for cloneNode
    e.dataTransfer.setData("Text", e.target.id);
};

app.toggleOption = function(el) {
    app.body.classList.toggle(el.dataset.toggle)
    app.optionSelector = app.body.className.replace(/(showSubregions)/, ".subregionPanel~>~.subregion").replace(/showChannels/, ".channelPanel~>~.channel").replace(/ /, ", ").replace(/~/g, " ");
    app.assemble();
};


app.assemble = function() {

    // build SVG markup based on sequence of "filter" section's details
    // nodes, including their nested panels, then execute & display code

    var markup;
    app.fes = document.querySelectorAll('section#filter > details');
    var nested;
    markup = '<svg>\n';
    markup += '<defs>\n';

    if (app.fes.length) {
        markup += '<filter id="F">\n';
        // gather previously assembled markup from each filter effect node
        for (var i = 0, l = app.fes.length; i<l; i++) {
            markup += app.fes[i].dataset.markup;
            nested = app.fes[i].querySelectorAll('details');
            for (var ni = 0, nl = nested.length; ni < nl; ni++) {
                markup += "\n" + nested[ni].dataset.markup;
                markup += "\n</" + nested[ni].dataset.tag + ">";
            }
            markup += "\n</" + app.fes[i].dataset.tag + ">";
        }
        markup += '\n</filter>';
        markup += '\n</defs>\n';
        markup += '<image xlink:href="img/Objects' + app.img + '.jpg" x="0" y="0" width="320" height="480" filter="url(#F)"/>\n';
    }
    // show default image with no filter present
    else {
        markup += '</defs>\n';
        markup += '<image xlink:href="img/Objects' + app.img + '.jpg" x="0" y="0" width="320" height="480"/>\n';
    }

    markup += '</svg>\n';

    // execute SVG
    app.g.innerHTML = markup;
    // display SVG code
    app.d(markup);

};

app.modify = function(e) {

    // Convert element attribute values to SVG markup, and cache in
    // element for later app.assemble pass. This may fire on the main
    // filter-effect panel, or a panel for a nested tag. 

    // keep from firing on both nested & main panels
    e.stopPropagation();

    var panel = e.currentTarget;
    var input = e.target;
    var children = e.currentTarget.children;
    var panels; 
    var inputs; // used for all 3 steps
    var components;

    var markup = '';
    var optionalMarkup = '';
    var nestedMarkup = '';

    // 1: gather attr values from optional inputs within nested fieldsets

    if (app.optionSelector) {
        inputs = e.currentTarget.querySelectorAll(app.optionSelector);
        for (var i = 0, l = inputs.length; i < l; i++) {
            optionalMarkup += ' ' + inputs[i].dataset.attr + '="' + inputs[i].value + '"';
        }
    }

    // messy special case: matrixes & components
    if (panel.dataset.topic) {
        inputs = panel.querySelectorAll('#' + panel.dataset.tag.replace(/^fe/,"fs") + "_" + panel.dataset.topic + " *[data-attr], #fsConvolveMatrix *[data-attr]");
        for (var i = 0, l = inputs.length; i < l; i++) {

            if (inputs[i].dataset.component) {
                if (components) break;
                app.component.value[input.dataset.component] = input.value;
                components = app.component.map[ inputs[i].dataset.component ];
                optionalMarkup += ' ' + inputs[i].dataset.attr + '="';
                for (var inner = 0; inner < components.length; inner++) {
                    optionalMarkup += app.component.value[ components[inner]] + ' ';
                }
                optionalMarkup += '"';
            }
            else {
                optionalMarkup += ' ' + inputs[i].dataset.attr + '="' + inputs[i].value + '"';
            }
        }        
    }

    // 2: Iterate over main inputs within children, and cache each
    // attr value.

    markup += '<' + panel.dataset.tag;

    inputs = e.currentTarget.children;
    for (var i = 0, l = inputs.length; i < l; i++) {
        if (! inputs[i].dataset.attr) continue;

        // default case:
        markup += ' ' + inputs[i].dataset.attr + '="' + inputs[i].value + '"';        
        // console.log(inputs[i].tagName);
    }

    markup += optionalMarkup + '>';
    panel.dataset.markup = markup;

    app.assemble();

};


// BUGS:
// * feConvolveMatrix fixed at 3x3
// * bug when modifying nested tag's attr values before parent's

// WISHES:
// * localStorage to cache state

