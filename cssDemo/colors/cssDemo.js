var app = new Function();

window.onload = function() {
    app.initContent();
};

app.initContent = function() {
    var iframe;
    document.querySelector('#example').innerHTML = frames[0].document.querySelector('section').innerHTML;
    document.querySelector('#code').innerHTML = frames[0].document.querySelector('pre').innerHTML;
    document.querySelector('#controls').innerHTML = frames[0].document.querySelector('form').innerHTML;
    document.querySelector('body').removeChild(document.querySelector('iframe'));
};
