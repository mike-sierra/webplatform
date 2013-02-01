var app = new Function();

window.onload = function() {
    var sel = document.querySelector('aside > select');
    sel.addEventListener('change', function(e){
        document.querySelector('image').setAttribute('xlink:href', ('img/Objects' + e.target.value));
    });
    for (var i = 1 ; i < 10 ; i++ ) {
        sel.innerHTML += '<option>00' + i + '.jpg</option>';
    }
    sel.innerHTML += '<option>010.jpg</option>';
    sel.innerHTML += '<option>011.jpg</option>';
    sel.innerHTML += '<option>012.jpg</option>';

    app.filter = document.querySelector("#fe");
    app.form = document.querySelector('form');
    app.inputs = app.form.querySelectorAll('select, input');
    app.dbg = document.querySelector('pre');

    app.dbg.textContent = document.querySelector('body').outerHTML;

    for (var i=0, l=app.inputs.length; i<l; i++) {
        app.inputs[i].dataset.prefix || (app.inputs[i].dataset.prefix = '');
        app.inputs[i].dataset.suffix || (app.inputs[i].dataset.suffix = '');
        app.filter[app.inputs[i].dataset.alt || app.inputs[i].id] = (app.inputs[i].dataset.prefix + app.inputs[i].value + app.inputs[i].dataset.suffix);
        app.inputs[i].addEventListener('change', app.modify);
    }
};

app.modify = function(e) {
    app.filter.setAttribute((e.target.dataset.alt || e.target.id), (e.target.dataset.prefix + e.target.value + e.target.dataset.suffix ));
    app.dbg.textContent = "";
    app.dbg.textContent = document.querySelector('body').outerHTML;
}