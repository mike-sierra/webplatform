// get flow
var flow = document.webkitGetNamedFlows()['main'];

// get second region that displays content
var region = flow.getRegions()[1];

// how many content fragments display there?
var ranges = region.getRegionFlowRanges();

// perhaps do something to fix layout if content has been interrupted:
if (ranges.length > 1) {
    adjustlayout(region) // custom function
}

// get all top-level flow-into elements that contribute to flow:
var elements = flow.getContent();

// get first element's first paragraph...
var firstPara = elements[0].querySelector('p:first-of-type');

// ...and the regions in which it appears:
var regions = flow.getRegionsByContent(firstPara);

// If the element splits across two regions, dosomething to modify
// the layout or the content:
if (regions.length > 1) {
    adjustLayout(regions[0], firstPara); // custom function
}
