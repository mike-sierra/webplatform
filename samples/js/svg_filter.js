var app = new Function();

app.img = '001';

app.c = 0;

window.onload = function() {

    if (!app.browserSupport()) return(false);

    // populate channel select:
    app.initSelect();

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
    app.filter.addEventListener('change', app.assemble); // 2DO: DOM mutation handler
    // DEBUG
    app.debug = document.querySelector('#code');
    // GRAPHIC
    app.g = document.querySelector('#graphic');
}

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
}

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
}

app.d = function(s) {
    app.debug.textContent = s;
}

app.drop = function(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("Text");
    var el = document.getElementById(data).cloneNode(true)
    el.dataset.tag = el.id;
    el.removeAttribute('id');
    el.addEventListener('change', app.modify);
    el.addEventListener('click', app.removeEffect);
    e.currentTarget.appendChild(el);
}

app.removeEffect = function(e) {
    if (e.target.tagName != 'NAV') return(false);
    var node = e.currentTarget;
    node.parentNode.removeChild(node);
    app.assemble();
}

app.dragover = function(e) {
    e.preventDefault();
}

app.dragstart = function(e) {
    e.dataTransfer.setData("Text", e.target.id);
}

app.modify = function(e) {
    var ctrl = e.currentTarget;
    var ctrls = e.currentTarget.querySelectorAll('*[data-attr]');
    ctrl.dataset.markup = '<' + ctrl.dataset.tag;
    for (var i = 0, l = ctrls.length; i < l; i++) {
        ctrl.dataset.markup += ' ' + ctrls[i].dataset.attr + '="' + ctrls[i].value + '"';
    }
    ctrl.dataset.markup += '>';
    ctrl.dataset.markup += '</' + ctrl.dataset.tag + '>\n';
}

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

