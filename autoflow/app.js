var app = new Function();

NodeList.prototype.toArray = function() {
    for(var arr=new Array(),i=0,l=this.length;i<l;i++){arr.push(this[i])}
    return(arr);
};

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

app.run = function() {
    //    if (! app.flow ) return(false);
    //    app.exclude(); ;;;


    //    for (var i = 0; i < app.dbgPageThreshold; i++) {
    while (app.flow.overset) {
        app.page = app.addNewPage();
        app.page.id = 'page' + (++app.pageCount);
        //        console.log('added ' + app.page.id);
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

window.onload = function() {
    app.init();
    app.run();
};


