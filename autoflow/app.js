var app = new Function();

app.debug = 0;

app.init = function() {
    app.flowName = 'main_flow';
    app.flow = document.webkitGetNamedFlows()[app.flowName];
    app.body = document.querySelector('body');
    app.page = document.querySelector('div.page');
    app.template = app.page.innerHTML;
    app.exclusions = document.querySelectorAll('figure, pre, table, aside').toArray();
    app.pageCount = 1;
    app.exclusionCount = 0;
    app.dbgPageThreshold = 10;
};

app.fixPage = function() {
    if (!app.debug) return(false);
};

app.pageNeedsFix = function() {
    if (!app.debug) return(false);
    if (! app.exclusions.length) return(false);
    app.regions = app.flow.getRegionsByContent( app.exclusions[0] )
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

app.exclude = function() {
    var content = app.exclusions[0];
    var region;
    var target;
    var regions = app.flow.getRegionsByContent(content);
    if (! regions) return(false);
    app.exclusionCount++;

    console.log(regions);
    if (content.classList.contains('wide')) {
        target = app.page.querySelector('div.row:last-of-type');
        target.style.WebkitFlowFrom = 'excl_' + app.exclusionCount;
        content.style.WebkitFlowInto = 'excl_' + app.exclusionCount;
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
    for(var arr=new Array(),i=0,l=this.length;i<l;i++){arr.push(this[i])}
    return(arr);
};

window.onload = function() {
    app.init();
    app.run();
};

