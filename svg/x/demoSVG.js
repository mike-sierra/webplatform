var app = new Function();

window.onload = function() {
    app.examples = document.querySelectorAll('g > *');
    app.d = document.querySelector('#debug');
    app.inputs = document.querySelectorAll('input, select');
    for (var i = 0, l = app.inputs.length; i<l; i++) {
        for (var xi = 0, xl = app.examples.length; xi<xl; xi++) {
            app.examples[xi].setAttribute(app.inputs[i].id, app.inputs[i].value);
        }
        app.inputs[i].addEventListener('change', app.modify);
    }
};

app.modify = function(e) {
    var id = e.target.id;
    var value = e.target.value;
    for (var xi = 0, xl = app.examples.length; xi<xl; xi++) {
        app.examples[xi].setAttribute(id, value);
    }
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

