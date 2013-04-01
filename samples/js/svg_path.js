// features that should be implemented after a refactor:
// * show control-point splines for most recent bezier curve
// * modify most recently placed elliptical curve
// * history API for multiple undo

var app = new Function();

app.rotateArc = 0;
app.sweepArc = 0;
app.largeArc = 0;
app.arcRadiusX = 200;
app.arcRadiusY = 200;

app.marker = '#arrowhead';

window.onload = function() {
    app.dbg = document.querySelector("p");
    app.path = document.querySelector("path");
    app.sect = document.querySelector("section");
    app.svg = document.querySelector("svg");

    app.toolSelect = document.querySelector("select.tool");

    app.svg.addEventListener("mousedown", app.handleClick);

    app.toolSelect.addEventListener("change", app.changeTool);
    app.tool = app.toolSelect.value;

    app.req = {"M":1,"L":1,"H":1,"V":1,"Q":2,"C":3,"T":1,"S":2,"A":1};
    app.refresh();
}

app.refresh = function() {
    app.points = [];
};

app.changeTool = function(e) {
    var d;
    app.tool = e.target.value;
    app.refresh();
    if (app.tool == 'z') {
        d = app.path.getAttribute("d") + ", Z";
        app.path.setAttribute("d", d);        
        e.target.value = "M";
        app.tool = "M";
    }
};

app.handleClick = function(e) {
    app.points.push(e.clientX + "," + e.clientY);
    app.render();
}

app.render = function() {
    var attr;
    var d;

    if (app.points.length < app.req[app.tool]) {
        return(false);
    }

    if (app.tool == "A") {
        attr = " A ";
        attr += app.arcRadiusX + ",";
        attr += app.arcRadiusY + " ";
        attr += app.rotateArc + " ";
        attr += app.largeArc + " ";
        attr += app.sweepArc + " ";
        attr += app.points[0];
    } else {
        attr = " " + app.tool + " ";
        attr += app.points.join(" ");
    }

    d = app.path.getAttribute("d") + attr;
    app.path.setAttribute("d", d);

    app.refresh();
    app.d( app.sect.innerHTML.replace(/<defs[^`]+?<\/defs>/gim, "") );
};

app.d = function(s) {
    app.dbg.textContent = s;
}

// BUG: syntax displays spurious "fill='transparent'" even after
// modifying

