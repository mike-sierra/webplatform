var app = new Function();

window.onload = function() {
    console.log('==============================================================');

    app.root = document.querySelector('body');

    app.width = 320;
    app.height = 480;

    // master array of all images
    app.items = [];
    var all = document.querySelectorAll('section > div');
    for (var i = 0, l = all.length; i < l; i++) {
        app.items.push(all[i]);
    }

    // orientation-specific images, by master[index];
    app.port     = [];
    app.land     = [];

    // current position within each orientation's view
    app.portPos = 0;
    app.landPos = 0;

    // progress trackers
    app.portProg = document.querySelector('#portProg');
    app.landProg = document.querySelector('#landProg');

    app.initTouch();
    app.initOrient();
    app.initGesture();
    app.initImages();
};

app.getOrient = function(e) {
    var img = e.target;
    var div = img.parentNode;
    var height = img.height;
    var width = img.width;
    var scaleW, scaleH, scale;

    if (width <= height) {
        div.classList.add('portrait');
        app.port.push(app.items.indexOf(div));
        scaleH = app.height / height;
        scaleW = app.width / width;
    }
    else {
        div.classList.add('landscape');
        app.land.push(app.items.indexOf(div));
        scaleH = app.width / height;
        scaleW = app.height / width;
    }

    if (app.port.length + app.land.length == app.items.length) {
        app.initProg();
    }

    scale = Math.min(scaleW, scaleH);
    div.dataset.scale = scale;

    if (scale < 1) return(false);

    img.style.WebkitTransform = 'scale(' + scale + ')';
    img.style.MozTransform    = 'scale(' + scale + ')';
    img.style.transform       = 'scale(' + scale + ')';

};

app.nav = function(dir) {
    var from;
    var to;
    var o = app.orient; // current orientation
    var arr = app[o]; // current port/land array
    var newPos;

    // get current selection
    from = app.items[ app[o][app[o+"Pos"]] ];

    // get new port/land index
    newPos = app[o + 'Pos'] + dir;

    // check for edge of gallery
    if ((newPos < 0) || (newPos > app[o].length - 1)) {
        app.nudge(from,dir)
        return(false);
    }

    app[o + 'Pos'] = newPos;

    // get target image
    to = app.items[ app[o][app[o+"Pos"]] ];

    from.classList.toggle('selected');
    to.classList.toggle('selected');

    // change porgress tracker;
    app[o+'Prog'].setAttribute('value', newPos);
};

app.nudge = function(img,dir) {
    console.log("WALL: " + dir);
};

app.reorient = function(mq) {
    (mq.matches) ? (app.orient = 'port') : (app.orient = 'land');
    app.startGesture();
};

app.initTouch = function() {
    app.root.addEventListener('click', app.click);
};

app.click = function(e) {
    //    app.root.classList.toggle('speed');
};

app.foo = function() {
};

app.foo = function() {
};

app.foo = function() {
};

app.foo = function() {
};

app.startGesture = function() {
    app.initTiltX = app.tiltX;
    app.initTiltY = app.tiltY;
    app.tiltedSideways = false;
    app.tiltedDown = false;
};

app.handleTilt = function(e) {

    app.tiltY = e.beta;
    app.tiltX = e.gamma;
    app.tiltDeltaX = app.tiltX - app.initTiltX;
    app.tiltDeltaY = app.tiltY - app.initTiltY;

    // toggle gesture mode
    if ((app.orient == 'port') && (app.tiltDeltaY > app.tiltThreshold) ) {
        if (app.tiltedDown) return(false);
        app.root.classList.toggle('speed');
        app.tiltedDown = true;
    }
    else if ((app.orient == 'land') && (app.tiltDeltaX > app.tiltThreshold) ) {
        if (app.tiltedDown) return(false);
        app.root.classList.toggle('speed');
        app.tiltedDown = true;
    }
    else {
        app.tiltedDown = false;
    }

    if ( app.root.classList.contains('speed') ) {
        
    } else {
        if ((app.orient == 'port') && (Math.abs(app.tiltDeltaX) > app.tiltThreshold )) {
            if (app.tiltedSideways) return(false);
            (app.tiltDeltaX < 0) ? app.nav(-1) : app.nav(1);
            app.tiltedSideways = true;
        }
        else if ((app.orient == 'land') && (Math.abs(app.tiltDeltaY) > app.tiltThreshold)) {
            if (app.tiltedSideways) return(false);
            (app.tiltDeltaY < 0) ? app.nav(-1) : app.nav(1);
            app.tiltedSideways = true;
        }
        else {
            app.tiltedSideways = false;
        }
    }
};

app.initGesture = function() {
    app.tiltedSideways = false;
    app.tiltedDown = false;
    app.tiltThreshold = 10;
    window.addEventListener('deviceorientation', app.handleTilt);
    setTimeout(app.startGesture, 50);
};

app.initOrient = function() {
    app.mq = window.matchMedia("(orientation: portrait)");
    (app.mq.matches) ? (app.orient = 'port') : (app.orient = 'land');
    app.mq.addListener(app.reorient);
};

app.initProg = function() {
    // in case images loaded oiut of sequence:
    app.port = app.port.sort(function(a,b){return a-b});
    app.land = app.land.sort(function(a,b){return a-b});
    app.portProg.setAttribute('max', app.port.length - 1);
    app.landProg.setAttribute('max', app.land.length - 1);
};

app.initImages = function() {
    var div, img, height, width;

    for (var i = 0, l = app.items.length; i < l; i++) {
        div = app.items[i];
        img = new Image();
        img.addEventListener('load', app.getOrient);
        img.src = div.dataset.src;
        div.removeAttribute('data-src');
        div.appendChild(img);
    }
};

// * fine gesture mode
// * tap image:
//   = draw
//   = crop
//   = freehand select
//     - copy
//   = paste
//   = add
