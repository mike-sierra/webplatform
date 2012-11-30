var app = new Function();

// kill; // rather than wait for it to die...

app.debug = 0;

app.init = function() {
    app.flowName = 'main_flow';
    app.flow = document.webkitGetNamedFlows()[app.flowName];
    app.body = document.querySelector('body');
    app.page = document.querySelector('div.page');
    app.template = app.page.innerHTML;
    app.pulls = document.querySelectorAll('figure, pre, table, aside').toArray();
    app.pageCount = 1;
    app.pullCount = 0;
    app.dbgPageThreshold = 10;
};

app.fixPage = function() {
    if (!app.debug) return(false);
    return(false);
    if (content.classList.contains('wide')) {
        // 2do
    else if (content.classList.contains('narrow')) {
        // 2do
    }
};

app.pageNeedsFix = function() {
    // AKA exclusions appear on page's main flow & need to be diverted
    if (!app.debug) return(false);
    if (! app.pulls.length) return(false);
    app.regions = app.flow.getRegionsByContent( app.pulls[0] );
    if (! app.regions.length) return(false);
    return(true);
};

app.run = function() {
    //    while (app.pageNeedsFix()) app.fixPage();
    if (app.debug)    return(1);
    //    for (var i = 0; i < app.dbgPageThreshold; i++) {
    while (app.flow.overset) {
        app.page = app.addNewPage();
    }
};

app.addNewPage = function(id) {
    var sect = document.createElement('div');
    sect.id = 'page' + (++app.pageCount);
    sect.classList.add('page');
    sect.innerHTML = app.template;
    app.body.appendChild(sect);
    return(sect);
};

NodeList.prototype.toArray = function() {
    for( var arr=new Array(), i=0, l=this.length; i < l; i++) { arr.push(this[i]) }
    return(arr);
};

window.onload = function() {
    app.init();
    app.run();
};
