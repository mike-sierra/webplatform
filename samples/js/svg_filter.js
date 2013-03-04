var app = new Function();

app.img = '001';

app.c = 0;

window.onload = function() {

    if (!app.browserSupport()) return(false);

    // populate channel select:
    app.initSelect();

    // associate controls that build complex values:
    app.initComponents();

    // conditional interfaces
    // app.initPanels();

    // EFFECTS
    app.effects = document.querySelectorAll('section#effects > details');
    for (var i = 0, l = app.effects.length; i < l; i++) {
        app.effects[i].draggable = 'true';
        app.effects[i].addEventListener('dragstart', app.dragstart);
        app.effects[i].querySelector('summary').innerHTML += '<nav></nav>';
    }
    // FILTER
    app.filter = document.querySelector('section#filter');
    app.filter.addEventListener('dragover', app.dragover);
    app.filter.addEventListener('drop', app.drop);
    // CONTROLS
    app.filter.addEventListener('change', app.assemble);
    // DEBUG
    app.debug = document.querySelector('#code');
    // GRAPHIC
    app.g = document.querySelector('#graphic');
};

app.browserSupport = function() {
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
    var sel = document.querySelectorAll('.channel');
    var markup;
    for (var i = 0, l = sel.length; i<l; i++) {
        markup = '<option selected>SourceAlpha</option><option>SourceGraphic</option><option>BackgroundAlpha</option><option>BackgroundGraphic</option><option>fillPaint</option><option>strokePaint</option>';
        for (var n = 1; n < 10; n++) {
            markup += '<option>channel' + n + '</option>';
        }
        sel[i].innerHTML = markup;
    }
};

app.initPanels = function() {

    // console.log( document.querySelector("#fsColorMatrix") );
    // document.querySelector("#fsColorMatrix").addEventListener('change', app.changePanel);

    // <select disabled data-attr="type" id="fsColorMatrix" onchange="this.dataset.value = this.value" data-value="matrix">
        // onchange="this.dataset.value = this.value" 

};

app.changePanel = function(el) {
    var p = el.parentNode;
    var fs = p.querySelectorAll('fieldset');
    var tgt;
    el.dataset.value = el.value;
    for (var i = 0, l = fs.length; i < l; i++) {
        // fs[i].dataset.enabled = 'no';
    }    
    tgt = document.getElementById(el.id + "_" + el.value);
    
    // console.log(tgt.tagName);
    tgt.dataset.enabled = 'yes';
    // console.log(tgt);
    // console.log(el.id);
    // console.log(el.value);
}


app.initComponents = function() {

    // For attributes requiring a series of more than one value, these
    // are called components. The component 'map' identifies sequence
    // of other component IDs associated with the current input's.
    // The 'value' caches the component's value for each input.

    app.component = {};
    app.component.map = {};
    app.component.value = {};

    var components;
    var strings = [
                   'cmx01 cmx02 cmx03 cmx04 cmx05 cmx06 cmx07 cmx08 cmx09 cmx10 cmx11 cmx12 cmx13 cmx14 cmx15 cmx16 cmx17 cmx18 cmx19 cmx20',

                   'cvmx01 cvmx02 cvmx03 cvmx04 cvmx05 cvmx06 cvmx07 cvmx08 cvmx09'

             ];

    for (i = 0; i < strings.length; i++) {
        components = strings[i].split(/ +/);
        for (i2 = 0; i2 < components.length; i2++) {
            app.component.map[components[i2]] = components;
        }
    }

    app.inputs = document.querySelectorAll('input, select');
    for (var i = 0, l = app.inputs.length; i < l; i++) {
        if (app.inputs[i].dataset.component) {
            app.component.value[app.inputs[i].dataset.component] = app.inputs[i].value;
        }
    }

};


app.d = function(s) {
    app.debug.textContent = s;
};

app.drop = function(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("Text");
    var el = document.getElementById(data).cloneNode(true)
    var inputs = el.querySelectorAll('*[disabled]');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }
    el.dataset.tag = el.id;
    el.removeAttribute('id');
    el.removeAttribute('draggable');
    el.addEventListener('change', app.modify);
    el.addEventListener('click', app.removeEffect);
    e.currentTarget.appendChild(el);
};

app.removeEffect = function(e) {
    if (e.target.tagName != 'NAV') return(false);
    var node = e.currentTarget;
    node.parentNode.removeChild(node);
    app.assemble();
};

app.dragover = function(e) {
    e.preventDefault();
};

app.dragstart = function(e) {
    e.dataTransfer.setData("Text", e.target.id);
};

app.modify = function(e) {
    var panel = e.currentTarget;
    var input = e.target;
    var ctrls = e.currentTarget.querySelectorAll('*[data-attr]');
    var comp;
    var myComponents = false;

    // console.log(input.parentNode.tagName);
    // console.log(input.parentNode.dataset.enabled);

    panel.dataset.markup = '<' + panel.dataset.tag;

    for (var i = 0, l = ctrls.length; i < l; i++) {


        // special case: input is component of larger attribute
        if (ctrls[i].dataset.component) {
            app.component.value[input.dataset.component] = input.value;
            if (myComponents) break;
            myComponents = app.component.map[ ctrls[i].dataset.component ];
            panel.dataset.markup += ' ' + ctrls[i].dataset.attr + '="';
            for (var inner = 0; inner < myComponents.length; inner++) {
                panel.dataset.markup += app.component.value[ myComponents[inner]] + ' ';
            }
            panel.dataset.markup += '"';
        } 
        // default case: input directly corresponds to attribute output
        else {
            panel.dataset.markup += ' ' + ctrls[i].dataset.attr + '="' + ctrls[i].value + '"';
        }
    }
    panel.dataset.markup += '>';
    panel.dataset.markup += '</' + panel.dataset.tag + '>\n';
};

app.assemble = function(e) {
    var g;
    app.fes = document.querySelectorAll('section#filter > details');
    g = '<svg>\n';
    g += '<defs>\n';

    if (app.fes.length) {
        g += '<filter id="F">\n';
        for (var i = 0, l = app.fes.length; i<l; i++) {
            g += app.fes[i].dataset.markup;
        }
        g += '</filter>\n';
        g += '</defs>\n';
        g += '<image xlink:href="img/Objects' + app.img + '.jpg" x="0" y="0" width="320" height="480" filter="url(#F)"/>\n';
    }
    else {
        g += '</defs>\n';
        g += '<image xlink:href="img/Objects' + app.img + '.jpg" x="0" y="0" width="320" height="480"/>\n';
    }

    g += '</svg>\n';

    app.g.innerHTML = g;
    app.d(g);
};

// code for using object as hash key...

function HashTable() {
    this.hashes = {};
};

HashTable.prototype = {
    constructor: HashTable,

    put: function( key, value ) {
        this.hashes[ JSON.stringify( key ) ] = value;
    },

    get: function( key ) {
        return this.hashes[ JSON.stringify( key ) ];
    }
};

// var object1 = new Object();
// var object2 = new Object();
// 
// var myHash = new HashTable();
// 
// myHash.put(object1, "value1");
// myHash.put(object2, "value2");
// 
// alert(myHash.get(object1), myHash.get(object2)); // I wish that it will print value1 value2
