DemoCSS is a simple utility that allows you to set up interactive
demos of various CSS properties. Users manipulate numeric sliders or
choose keywords from option lists, and see the results both in a live
sample and in CSS code they can copy off their screens.  Features:

* Can assign more than 1 control to a property, such as a mix of
  numeric values or keywords for font-size.

* Build complex property values such as for gradients, transforms, and
  border images.

* Apply properties to the example by default, or to other elements
  within the example. E.g., apply multicolumn formatting to a block
  element, but a column span to a heading within the block.

* Where appropriate, reflect vendor-specific properties in both the
  code and example

* Smooth transitions indicate properties that can be animated.

* 2DO: Generate a permalink that present a specific combination of
  property values.

* 2DO: Slide-in information panel provides cheat-sheet information for
  the displaying properties.

* 2DO: Toggle a background image behind the example to illustrate
  transparency effects.

INSTRUCTIONS:

* Each instance of the script should correspond to a confined topic,
  such as "Gradients" or "3D Transforms".

* Place cssDemo.html, .js, and .css in directory as is. Make sure
  custom _topic variants (.html/.css/.js) are referenced from
  cssDemo.html. These contain all custom content that appears within
  the interface.

* Within the custom HTML, place various inputs within the <form>
  element.  The initial values of these inputs reflect in both example
  and code.

* Within the <form>, the various a#demo_tab* and div#demo_panel*
  elements provide a tabbed interface with which to group related
  properties.  If you don't want the tabs, remove these elements and
  place inputs directly within the <form>. (2DO: fix CSS)

* By default, each input ID must be the CSS property to affect, e.g.
  'fontFamily', representing the camel-case CSSOM property name,

* Use <select> inputs to nest keyword values as <option> elements.
  Whatever option has a 'selected' attribute reflects in the example.

* Use <input type="range"/> for numeric inputs. Specify min/max/step
  attributes and a desired default 'value' attribute to reflect in
  example and code.

* The custom HTML's <pre> block needs a corresponding element tagged
  <span id="c_fontFamily"></span>. (2DO: if not, generate one?)

* Use the 'data-tgtprop' attribute if you want more than one input to
  specify alternate numeric and keyword values. Specify the property
  to change, and make sure the alternate input's ID differs, e.g.:

  <input type="range" id="fontSize" ... />
  <select id="fontSize_keywords" data-tgtprop="fontSize" ...>

* To spawn additional -vendor-prefixed syntax and apply the
  corresponding CSSOM to the example, apply any combination of
  'Webkit', 'Moz', 'O', or 'IE' classes to the input. (2DO: fix case
  sensitivity)

* By default, the first element within the <section> serves as the
  example to style. (Any additional child elements are placed in the
  interface as is, unstyled by default.)

* Use the custom CSS file to provide additional styles for the example
  element, or its descendants.

* Use the 'data-unit' attribute to specify any suffix required to
  interpret a numeric input value as a unit, e.g.:

  <input type="range" id="fontSize" min="6" max="48" value="24"
    data-unit="px"/>

* If you're specifying your own element within the example in which to
  reflect the property value, specify a data-tgtexample attribute:
  <input data-tgtexample="#custom"/> and reflect it in the example as
  <tag id="custom">...</tag>.
  
* If the input provides a value that is a component of a more complex
  property value, specify a 'data-metaprop' attribute:

  <input id="boxShadow_x" type="range" min="-30" max="30"
    value="10" data-metaprop="boxShadow" data-unit="px"/>
  
  By default, the value of 'data-metaprop' becomes the CSS property
  affected by the input, 'boxShadow' in this case.  (The ID can now be
  arbitrary, but it's a good idea to reference the targeted property
  name.)  To apply the generated value to a different property,
  specify an additional 'data-tgtprop' attribute; e.g., building a
  'linearGradient', then applying the value to the 'backgroundImage'
  property.

  Every 'data-metaprop' value must have a corresponding converter
  function in the custom JS file that returns a complex property value
  culled from various raw components that correspond to input IDs,
  e.g.:

  app.converter.boxShadow = function(inputVal) {
      var v = '';
      v += app.component.boxShadow_x + 'px ';
      v += app.component.boxShadow_y + 'px ';
      v += app.component.boxShadow_blur + 'px ';
      v += app.component.boxShadow_spread + 'px ';
      v += 'rgba(';
      v += app.component.boxShadow_r + '%, ';
      v += app.component.boxShadow_g + '%, ';
      v += app.component.boxShadow_b + '%, ';
      v += app.component.boxShadow_a;
      v += ')';
      v += app.component.boxShadow_inset && ' inset';
      return v;
  }

  By default, the function is supplied with the input's raw value,
  which may provide useful fallback behavior.

* Place explanatory text detailing the set of CSS properties within
  the <aside> element.

* 2DO: In some cases you may want different inputs to apply the same
  property to different example elements and have it reflect in two
  different places in the code, e.g., different 'flex' property values
  for child elements within a flexbox. In that case, pair a
  'data-tgtcode' attribute to the ID of a custom <span> within the
  code block: 2DO

* 2DO: The 'data-depends' attribute indicates the ID of a check box
  which, while unselected, disables the input. E.g., you may want to
  allow for optional color-stop syntax when compiling gradient values.

* 2DO: When the user presses the image button, the entire example area
  is filled with a background image to clarify how transparency
  effects appear. To customize the image, ...

* 2DO: reset inputs to initial values

* 2DO: generate permalink

* 2DO: Represent color inputs as either of these sets of four-in-a-row
  inputs:

  <input class="red"   id="boxShadow_rgbR" data-metaprop="boxShadow"/>
  <input class="green" id="boxShadow_rgbG" data-metaprop="boxShadow"/>
  <input class="blue"  id="boxShadow_rgbB" data-metaprop="boxShadow"/>
  <input class="alpha" id="boxShadow_rgbA" data-metaprop="boxShadow"/>

  <input class="hue"        id="boxShadow_hslH" data-metaprop="boxShadow"/>
  <input class="luminance"  id="boxShadow_hslL" data-metaprop="boxShadow"/>
  <input class="saturation" id="boxShadow_hslS" data-metaprop="boxShadow"/>
  <input class="alpha"      id="boxShadow_hslA" data-metaprop="boxShadow"/>

  No need to specify input type/min/max attributes; they will present
  a custom UI. Assumes default values for black: 0% for RGB values and
  1 for alpha channel.

* 2DO: Whatever example element is currently targeted is available as
  app.example, useful if you want to access its getComputedStyle.

* 2DO: data-shorthand attribute to autogenerate shorthand syntax in
  code?
