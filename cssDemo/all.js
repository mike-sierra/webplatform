function testWebKit() {
    return(false);;
    if (! window.matchMedia("(-webkit-transform-3d)").matches) 
        alert("This browser may not render this page; consider Chrome or Safari");
}
testWebKit();
