var app = new Object();

app.isMobile = false;

app.ry = document.querySelector('#ry');
app.rx = document.querySelector('#rx');

window.addEventListener('deviceorientation', function(e) {
    var threshold = 5;
    app.isMobile = true;

    app.rotY = app.ry.dataset.y * 1;
    app.rotY += Math.floor(e.gamma);

    app.rotX = app.rx.dataset.x * 1;
    app.rotX += Math.floor(e.beta);

    (app.rotX < -threshold) && ( app.rotX = -threshold);
    (app.rotX > threshold)  && ( app.rotX =  threshold);

    app.ry.dataset.y = app.rotY;
    app.rx.dataset.x = app.rotX;

    app.ry.style.WebkitTransform = 'rotateY(' + app.rotY + 'deg)';
    app.rx.style.WebkitTransform = 'rotateX(' + (app.rotX * -1) + 'deg)' + ' translateZ(400px)';
    app.ry.style.MozTransform    = 'rotateY(' + app.rotY + 'deg)';
    app.rx.style.MozTransform    = 'rotateX(' + (app.rotX * -1) + 'deg)' + ' translateZ(400px)';
    app.ry.style.transform       = 'rotateY(' + app.rotY + 'deg)';
    app.rx.style.transform       = 'rotateX(' + (app.rotX * -1) + 'deg)' + ' translateZ(400px)';
});

setTimeout(function(){
    if (app.isMobile) return (false);
    setInterval(function(){
        app.rotY = app.ry.dataset.y * 1;
        app.rotY += 3;
        app.ry.dataset.y = app.rotY;
        app.ry.style.WebkitTransform = 'rotateY(' + app.rotY + 'deg)';
        app.ry.style.MozTransform    = 'rotateY(' + app.rotY + 'deg)';
        app.ry.style.transform       = 'rotateY(' + app.rotY + 'deg)';
    }, 100);
},1000);
