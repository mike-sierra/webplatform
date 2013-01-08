var app = new Function();

window.onload = function() {
    app.initContent();
    app.initBrowserEngineType();
};

app.initContent = function() {

    // populate interface with content from iframe page, then remove
    // iframe.

    try {
        document.querySelector('#example').innerHTML = frames[0].document.querySelector('section').innerHTML;
        document.querySelector('#code').innerHTML = frames[0].document.querySelector('pre').innerHTML;
        document.querySelector('#controls').innerHTML = frames[0].document.querySelector('form').innerHTML;
        document.querySelector('body').removeChild(document.querySelector('iframe'));
    }
    catch(e) {
        alert("Can't run locally on this browser.\nTry Safari/Mozilla/Opera.");
    }
};

app.initBrowserEngineType = function() {

    // identify browser in order to generate -vendor-prefixed property
    // names: webkit, moz, & o;
    // PROP: app.browserEngine (browser engine prefix)
    var ua = navigator.userAgent;
    if (ua.match(/webkit/i)) {
         app.browserEngine = 'webkit';
    }
    else if (ua.match(/gecko/i)) {
         app.browserEngine = 'moz';
    }
    else if (ua.match(/opera/i)) {
         app.browserEngine = 'o';
    }
    else {
         alert("unknown browser: " + ua);
    }
};

