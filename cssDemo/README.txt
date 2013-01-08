* panels feature CONTROLS, sample visual EXAMPLE, and css CODE
* manipulating controls is reflected in both EXAMPLE & css CODE
* represent modified values in URL
* additional slide-in INFO panel summarizing CSS features

CONTROLS:

* choose range slider to alter numeric values
* choose from option list to alter discrete values
* choose color input to alter color values
* fallback if no support for color input?
* check boxes for boolean or other 2-state values
* disable controls that depend on alues of others
* use fieldsets to group related controls
* reload to revert to original values

* controls don't necessarily correspond directly to property values;
  can also be components of property values. E.g., individual
  transform functions.

CODE:

* generate redundant -vendor-prefixed property names where necessary.

EXAMPLE

* in EXAMPLE, apply transitions to clarify which CSS can be animated
* properties can be targeted to various elements within EXAMPLE
  (e.g. multicolumn box vs span element within box)
* toggle background image to demostrate opacity effects




How to configure & extend this app:

== TOPICS

Each displaying panel represents a CSS "topic" that groups related CSS
properties. Display is controlled by matching each tab's ID to various
panels, which assumes this system of topic prefixes:

  = t_ navigation tab (inline SPAN)
  = c_ syntax region (PRE blocks)
  = n_ control panels
  = x_ example element on which to reflect CSS property
  = i_ explanatory text

Commenting out individual navigation tabs hides the corresponding
topic at runtime.

Input values for each control panel (n_topic) are applied to the
corresponding x_topic sample element.  (The assignTopicsToInputs()
routine embeds each input with a "data-topic" attribute.)

== PROPERTIES

By default, the IDs of inputs within control panels match an
individual CSS property, expressed as a JS propertyName rather than a
CSS property-name. (Starts lowercase by default; exception is
vendor-prefixed WebkitPropertyName.)

Each property is reflected in a syntax container (PRE > SPAN) whose ID
is c_propertyName.  (Note the same c_ prefix used for PRE regions;
avoid collisions e.g., between 'colors' topic and 'color' property)

== CUSTOMIZATION

A "data-metaprop" attribute specifies a property name for which the
input value merely serves as a component. There must be a matching
app.f.METAPROP function defined to assemble these components from
individual inputs, each available as app.p.ID where ID is the input's
ID.

While inputs are assumed by default to correspond to property names,
sometimes they refer to custom property values. E.g., a webkit
gradient is not an independent property, but a value that's assigned
to the background-image property.  A "data-tgtprop" attribute specifies
an alternate property to which to assign the value.

A "data-tgtcode" attribute selects a different syntax container than
the default. For example, there are two different places to reflect
CSS transforms, one for 2D and one for 3D.

A "data-tgtexample" attribute specifies a different sample element to
reflect the change. E.g., most multicolumn properties apply to a
default block element, but span and column-break properties only apply
to its child elements.

For range inputs, a "data-unit" attribute specifies any required unit
suffix for the value to be interpreted properly as CSS. E.g., a #ms
duration or a #% percentage.

http://www.w3schools.com/cssref/default.asp

-webkit-dashboard-region azimuth bookmark-label bookmark-level
bookmark-target caption-side clear clip counter-increment
counter-reset crop cue cursor elevation empty-cells fit fit-position
icon marker-offset marks move-to presentation-level quotes rotation
rotation-point string-set tab-side target vertical-align

