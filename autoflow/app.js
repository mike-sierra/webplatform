var app = new Function();

kill; // rather than wait for it to die...

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
    // 2do
};

app.pageNeedsFix = function() {
    if (!app.debug) return(false);
    if (! app.pulls.length) return(false);
    app.regions = app.flow.getRegionsByContent( app.pulls[0] )
    if (! app.regions.length) return(false)
    return(true);
};

app.run = function() {
    while (app.pageNeedsFix()) app.fixPage();
    if (app.debug)    return(1);
    //    for (var i = 0; i < app.dbgPageThreshold; i++) {
    while (app.flow.overset) {
        app.page = app.addNewPage();
        app.page.id = 'page' + (++app.pageCount);
    }
};

app.addNewPage = function() {
    var sect = document.createElement('div');
    sect.classList.add('page');
    sect.innerHTML = app.template;
    app.body.appendChild(sect);
    return(sect);
};

app._exclude = function() {
    // 1st try
    var content = app.pulls[0];
    var region;
    var target;
    var regions = app.flow.getRegionsByContent(content);
    if (! regions) return(false);
    app.pullCount++;

    console.log(regions);
    if (content.classList.contains('wide')) {
        target = app.page.querySelector('div.row:last-of-type');
        target.style.WebkitFlowFrom = 'excl_' + app.pullCount;
        content.style.WebkitFlowInto = 'excl_' + app.pullCount;
        console.log(target);
        console.log(content);
    }
    else if (content.classList.contains('narrow')) {
        console.log('2DO');
        //        target = document.createElement('')
        //app.page.querySelector('div.row:last-of-type');
    }
}

NodeList.prototype.toArray = function() {
    for( var arr=new Array(), i=0, l=this.length; i < l; i++) { arr.push(this[i]) }
    return(arr);
};

window.onload = function() {
    app.init();
    app.run();
};

