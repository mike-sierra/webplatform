var app = new Function();

window.onload = function() {
    app.svg = document.querySelector('svg');
    app.eyelids = document.querySelector('#eyelids');
    app.eyelashes = document.querySelector('#eyelashTextRef');
    app.eyeball = document.querySelector('#eyeball');
    app.pupil = document.querySelector('#pupil');
    app.iris = document.querySelector('#iris');
    app.glanceStart = document.querySelector('#glanceStart');
    app.blink = document.querySelector('#blink');

    app.glanceX = 0;
    app.glanceY = 0;

    app.colorInput = document.querySelector('select');
    app.colorInput.addEventListener('change', app.changeEyeColor);

    app.blinkInput = document.querySelector('#blinkInput');
    app.blinkInput.addEventListener('change', app.moveEyelid);
    app.glanceXinput = document.querySelector('#glanceXinput');
    app.glanceYinput = document.querySelector('#glanceYinput');
    app.glanceXinput.addEventListener('change', app.moveEyeball);
    app.glanceYinput.addEventListener('change', app.moveEyeball);
}

app.changeEyeColor = function(e) {
    app.pupil.setAttribute('style', "stop-color:" + e.target.value);
    app.iris.setAttribute('style', "stop-color:" + e.target.value);
}

app.moveEyeball = function(e) {
    app[e.target.className] = e.target.value;
    console.log(app.glanceX + " " + app.glanceY);
    app.eyeball.setAttribute('transform', 'translate(' + app.glanceX + " " + app.glanceY + ')');
}

app.moveEyelid = function(e) {
    var m = 0.05;
    var path = 'M 200,100 Q 100,' + (100 + e.target.valueAsNumber)
        + ' 0,100 Q 100,' + (100 - e.target.valueAsNumber) + ' 200,100';
    app.eyelids.setAttribute('d', path);
};
