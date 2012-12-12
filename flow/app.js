var app = new Function();

app.debug = true;

app.init = function() {
    app.flowName = 'main_flow';
    app.flow = document.webkitGetNamedFlows()[app.flowName];
    app.body = document.querySelector('body');
    app.page = document.querySelector('#page1');
    app.template = app.page.innerHTML;
    app.pageCount = 1;
    app.pullCount = 0;
    app.dbgPageThreshold = 2;
};

app.initPulls = function() {
    var selectors = '';

    // Maps content selectors to container selectors.  To determine
    // correct content selector, would ideally iterate over this with
    // matchesSelector():

    app.map = {
        'aside.pullquote' : '.sidebar > div'                 ,
        '.wide'           : '.exclusion:first-of-type > div' ,
        'figure'          : '.exclusion:first-of-type > div' ,
    };
    for (sel in app.map) selectors += sel + ', ';
    selectors = selectors.replace(/, $/, '');
    app.pulls = document.querySelectorAll(selectors).toArray();
};

app.placePull = function() {
    var matches = false;
    var container;
    var content = app.pulls.shift();

    // console.log(!!content.matchesSelector); // too bad!
    if ( content.className == 'pullquote') {
        container = app.page.querySelector( app.map['aside.pullquote']);
    }
    else if ( content.className == 'wide') {
        container = app.page.querySelector( app.map['.wide']);
    }
    else if ( content.tagName == 'figure') {
        container = app.page.querySelector( app.map['figure']);
    }
    else {
        console.log('WHOOPS');
        return(false);
    }

    app.pullCount++;    

    content.style.WebkitFlowInto   = 'pull' + app.pullCount;
    container.style.WebkitFlowFrom = 'pull' + app.pullCount;

    //    console.log(container);

};

app.pullNeedPlacement = function() {
    // AKA exclusions appear on page's main flow & need to be diverted
    if (! app.pulls.length) return(false);
    app.regions = app.flow.getRegionsByContent( app.pulls[0] );
    if (! app.regions.length) return(false);
    return(true);
};

app.run = function() {
    //    while (app.pullNeedPlacement()) app.placePull();
    // for (var i = 0; i < app.dbgPageThreshold; i++) {
    while (app.flow.overset) {
        app.page = app.addPage();
        // while (app.pullNeedPlacement()) app.placePull();
    }
};

app.addPage = function(id) {
    var sect = document.createElement('section');
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

app.wtf = function() {
    var node, nodes, regions;

    nodes = document.querySelectorAll('.pullquote');
    node = nodes[nodes.length - 1];
    node = nodes[0];

    regions = app.flow.getRegionsByContent( node );

    console.log(node.textContent);
    console.log(regions.length);
    console.log(regions[0]);
    console.log(regions[0].regionOverset);
    console.log(regions[0].getRegionFlowRanges());
};

window.onload = function() {
    app.init();
    app.initPulls();
    //    app.run();
    app.wtf();
};
