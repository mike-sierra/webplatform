var app = new Function();

window.onload = function() {
    app.x = document.querySelector('#example');
    app.d = document.querySelector('#debug');
    app.inputs = document.querySelectorAll('input, select');
    for (var i = 0, l = app.inputs.length; i<l; i++) {
        app.x.setAttribute(app.inputs[i].id, app.inputs[i].value);
        app.inputs[i].addEventListener('change', app.modify);
    }
};

app.modify = function(e) {
    var id = e.target.id;
    var value = e.target.value;
    app.x.setAttribute(id, value);

    app.log();
    app.log("<" + app.x.tagName + " ");
    for (var i = 0, l = app.inputs.length; i<l; i++) {
        app.log(' ' + app.inputs[i].id + '="' + app.inputs[i].value + '"');
    }
    app.log(">");
};

app.points = function(n) {
    console.log(this);

    return("100,20 20,100 100,100 200,200");
}

app.log = function(s) {
    if (!s) {
        app.d.textContent = '';
        return(false);
    }
    app.d.textContent += s;
};

