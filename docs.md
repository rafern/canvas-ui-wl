## Modules

<dl>
<dt><a href="#module_canvas-ui-wl">canvas-ui-wl</a></dt>
<dd></dd>
<dt><a href="#module_canvas-ui-wl">canvas-ui-wl</a></dt>
<dd></dd>
</dl>

<a name="module_canvas-ui-wl"></a>

## canvas-ui-wl

* [canvas-ui-wl](#module_canvas-ui-wl)
    * [.WLRoot](#module_canvas-ui-wl.WLRoot)
        * [new exports.WLRoot(wlObject, material, child, theme, unitsPerPixel, registerPointerDriver, registerKeyboardDriver)](#new_module_canvas-ui-wl.WLRoot_new)
        * _instance_
            * [.update()](#module_canvas-ui-wl.WLRoot+update)
        * _static_
            * [.pointerDriver](#module_canvas-ui-wl.WLRoot.pointerDriver) : <code>PointerDriver</code>
            * [.keyboardDriver](#module_canvas-ui-wl.WLRoot.keyboardDriver) : <code>DOMKeyboardDriver</code>
            * [.pointerIDs](#module_canvas-ui-wl.WLRoot.pointerIDs) : <code>Map</code>
            * [.getPointerID(cursor)](#module_canvas-ui-wl.WLRoot.getPointerID) : <code>number</code>
    * [.WLVirtualKeyboardRoot](#module_canvas-ui-wl.WLVirtualKeyboardRoot)
        * [new exports.WLVirtualKeyboardRoot(wlObject, material, keyboardTemplate, keyboardDriver, theme, unitsPerPixel, registerPointerDriver)](#new_module_canvas-ui-wl.WLVirtualKeyboardRoot_new)
        * [.updateVisibility()](#module_canvas-ui-wl.WLVirtualKeyboardRoot+updateVisibility)

<a name="module_canvas-ui-wl.WLRoot"></a>

### canvas-ui-wl.WLRoot
A canvas-ui Root which automatically manages a mesh and input. For an example
on how to use this in a component, see example-components/test-ui-root.js

**Kind**: static class of [<code>canvas-ui-wl</code>](#module_canvas-ui-wl)  

* [.WLRoot](#module_canvas-ui-wl.WLRoot)
    * [new exports.WLRoot(wlObject, material, child, theme, unitsPerPixel, registerPointerDriver, registerKeyboardDriver)](#new_module_canvas-ui-wl.WLRoot_new)
    * _instance_
        * [.update()](#module_canvas-ui-wl.WLRoot+update)
    * _static_
        * [.pointerDriver](#module_canvas-ui-wl.WLRoot.pointerDriver) : <code>PointerDriver</code>
        * [.keyboardDriver](#module_canvas-ui-wl.WLRoot.keyboardDriver) : <code>DOMKeyboardDriver</code>
        * [.pointerIDs](#module_canvas-ui-wl.WLRoot.pointerIDs) : <code>Map</code>
        * [.getPointerID(cursor)](#module_canvas-ui-wl.WLRoot.getPointerID) : <code>number</code>

<a name="new_module_canvas-ui-wl.WLRoot_new"></a>

#### new exports.WLRoot(wlObject, material, child, theme, unitsPerPixel, registerPointerDriver, registerKeyboardDriver)
Create a new WLRoot.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wlObject | <code>Object</code> |  | The object where the mesh will be added |
| material | <code>Material</code> |  | The material to use for this root's mesh. The material will be cloned |
| child | <code>Widget</code> |  | The root's child widget |
| theme | <code>Theme</code> |  | The root's theme. If none is supplied, the default theme is used |
| unitsPerPixel | <code>number</code> | <code>0.01</code> | The amount of world units per canvas pixel. Determines the pixel density of the mesh |
| registerPointerDriver | <code>boolean</code> | <code>true</code> | Register the default pointer driver to this root? |
| registerKeyboardDriver | <code>boolean</code> | <code>true</code> | Register the default keyboard driver to this root? |

<a name="module_canvas-ui-wl.WLRoot+update"></a>

#### wlRoot.update()
Do a full update of this root. Does a pre-layout update, resolves the
layout, does a post-layout update and paints. Call this instead of the
individual Root update methods.

**Kind**: instance method of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.pointerDriver"></a>

#### WLRoot.pointerDriver : <code>PointerDriver</code>
The shared PointerDriver instance. Getter only. The PointerDriver will
only be created when needed. Used for pointer (mouse & XR controller)
input.

**Kind**: static property of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.keyboardDriver"></a>

#### WLRoot.keyboardDriver : <code>DOMKeyboardDriver</code>
The shared DOMKeyboardDriver instance. Getter only. The DOMKeyboardDriver
will only be created when needed. Used for keyboard input.

**Kind**: static property of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.pointerIDs"></a>

#### WLRoot.pointerIDs : <code>Map</code>
A Map mapping each cursor component to a PointerDriver's pointer ID.

**Kind**: static property of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.getPointerID"></a>

#### WLRoot.getPointerID(cursor) : <code>number</code>
Get the pointer ID assigned to a given cursor component. If the cursor
has no pointer ID assigned, a new pointer ID is registered to the
PointerDriver.

**Kind**: static method of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  

| Param | Description |
| --- | --- |
| cursor | The cursor component |

<a name="module_canvas-ui-wl.WLVirtualKeyboardRoot"></a>

### canvas-ui-wl.WLVirtualKeyboardRoot
A WLRoot with a virtual keyboard, similar to VirtualKeyboardRoot from
canvas-ui. Can also be automatically hidden when there is no keyboard focus
by callid updateVisibility before calling update. This doesn't need to be
directly used, the virtual-keyboard-ui-root component can be used instead.

**Kind**: static class of [<code>canvas-ui-wl</code>](#module_canvas-ui-wl)  

* [.WLVirtualKeyboardRoot](#module_canvas-ui-wl.WLVirtualKeyboardRoot)
    * [new exports.WLVirtualKeyboardRoot(wlObject, material, keyboardTemplate, keyboardDriver, theme, unitsPerPixel, registerPointerDriver)](#new_module_canvas-ui-wl.WLVirtualKeyboardRoot_new)
    * [.updateVisibility()](#module_canvas-ui-wl.WLVirtualKeyboardRoot+updateVisibility)

<a name="new_module_canvas-ui-wl.WLVirtualKeyboardRoot_new"></a>

#### new exports.WLVirtualKeyboardRoot(wlObject, material, keyboardTemplate, keyboardDriver, theme, unitsPerPixel, registerPointerDriver)
Create a new WLVirtualKeyboardRoot.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wlObject | <code>Object</code> |  | The object where the mesh will be added |
| material | <code>Material</code> |  | The material to use for this root's mesh. The material will be cloned |
| keyboardTemplate | <code>VirtualKeyboardTemplate</code> |  | The virtual keyboard's layout template. Uses the US QWERTY layout by default. |
| keyboardDriver | <code>KeyboardDriver</code> \| <code>null</code> | <code></code> | The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used. |
| theme | <code>Theme</code> |  | The root's theme. If none is supplied, the default theme is used |
| unitsPerPixel | <code>number</code> | <code>0.01</code> | The amount of world units per canvas pixel. Determines the pixel density of the mesh |
| registerPointerDriver | <code>boolean</code> | <code>true</code> | Register the default pointer driver to this root? |

<a name="module_canvas-ui-wl.WLVirtualKeyboardRoot+updateVisibility"></a>

#### wlVirtualKeyboardRoot.updateVisibility()
Automatically enables/disables this root if needed/unneeded. Call this
before calling update.

**Kind**: instance method of [<code>WLVirtualKeyboardRoot</code>](#module_canvas-ui-wl.WLVirtualKeyboardRoot)  
<a name="module_canvas-ui-wl"></a>

## canvas-ui-wl

* [canvas-ui-wl](#module_canvas-ui-wl)
    * [.WLRoot](#module_canvas-ui-wl.WLRoot)
        * [new exports.WLRoot(wlObject, material, child, theme, unitsPerPixel, registerPointerDriver, registerKeyboardDriver)](#new_module_canvas-ui-wl.WLRoot_new)
        * _instance_
            * [.update()](#module_canvas-ui-wl.WLRoot+update)
        * _static_
            * [.pointerDriver](#module_canvas-ui-wl.WLRoot.pointerDriver) : <code>PointerDriver</code>
            * [.keyboardDriver](#module_canvas-ui-wl.WLRoot.keyboardDriver) : <code>DOMKeyboardDriver</code>
            * [.pointerIDs](#module_canvas-ui-wl.WLRoot.pointerIDs) : <code>Map</code>
            * [.getPointerID(cursor)](#module_canvas-ui-wl.WLRoot.getPointerID) : <code>number</code>
    * [.WLVirtualKeyboardRoot](#module_canvas-ui-wl.WLVirtualKeyboardRoot)
        * [new exports.WLVirtualKeyboardRoot(wlObject, material, keyboardTemplate, keyboardDriver, theme, unitsPerPixel, registerPointerDriver)](#new_module_canvas-ui-wl.WLVirtualKeyboardRoot_new)
        * [.updateVisibility()](#module_canvas-ui-wl.WLVirtualKeyboardRoot+updateVisibility)

<a name="module_canvas-ui-wl.WLRoot"></a>

### canvas-ui-wl.WLRoot
A canvas-ui Root which automatically manages a mesh and input. For an example
on how to use this in a component, see example-components/test-ui-root.js

**Kind**: static class of [<code>canvas-ui-wl</code>](#module_canvas-ui-wl)  

* [.WLRoot](#module_canvas-ui-wl.WLRoot)
    * [new exports.WLRoot(wlObject, material, child, theme, unitsPerPixel, registerPointerDriver, registerKeyboardDriver)](#new_module_canvas-ui-wl.WLRoot_new)
    * _instance_
        * [.update()](#module_canvas-ui-wl.WLRoot+update)
    * _static_
        * [.pointerDriver](#module_canvas-ui-wl.WLRoot.pointerDriver) : <code>PointerDriver</code>
        * [.keyboardDriver](#module_canvas-ui-wl.WLRoot.keyboardDriver) : <code>DOMKeyboardDriver</code>
        * [.pointerIDs](#module_canvas-ui-wl.WLRoot.pointerIDs) : <code>Map</code>
        * [.getPointerID(cursor)](#module_canvas-ui-wl.WLRoot.getPointerID) : <code>number</code>

<a name="new_module_canvas-ui-wl.WLRoot_new"></a>

#### new exports.WLRoot(wlObject, material, child, theme, unitsPerPixel, registerPointerDriver, registerKeyboardDriver)
Create a new WLRoot.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wlObject | <code>Object</code> |  | The object where the mesh will be added |
| material | <code>Material</code> |  | The material to use for this root's mesh. The material will be cloned |
| child | <code>Widget</code> |  | The root's child widget |
| theme | <code>Theme</code> |  | The root's theme. If none is supplied, the default theme is used |
| unitsPerPixel | <code>number</code> | <code>0.01</code> | The amount of world units per canvas pixel. Determines the pixel density of the mesh |
| registerPointerDriver | <code>boolean</code> | <code>true</code> | Register the default pointer driver to this root? |
| registerKeyboardDriver | <code>boolean</code> | <code>true</code> | Register the default keyboard driver to this root? |

<a name="module_canvas-ui-wl.WLRoot+update"></a>

#### wlRoot.update()
Do a full update of this root. Does a pre-layout update, resolves the
layout, does a post-layout update and paints. Call this instead of the
individual Root update methods.

**Kind**: instance method of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.pointerDriver"></a>

#### WLRoot.pointerDriver : <code>PointerDriver</code>
The shared PointerDriver instance. Getter only. The PointerDriver will
only be created when needed. Used for pointer (mouse & XR controller)
input.

**Kind**: static property of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.keyboardDriver"></a>

#### WLRoot.keyboardDriver : <code>DOMKeyboardDriver</code>
The shared DOMKeyboardDriver instance. Getter only. The DOMKeyboardDriver
will only be created when needed. Used for keyboard input.

**Kind**: static property of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.pointerIDs"></a>

#### WLRoot.pointerIDs : <code>Map</code>
A Map mapping each cursor component to a PointerDriver's pointer ID.

**Kind**: static property of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  
<a name="module_canvas-ui-wl.WLRoot.getPointerID"></a>

#### WLRoot.getPointerID(cursor) : <code>number</code>
Get the pointer ID assigned to a given cursor component. If the cursor
has no pointer ID assigned, a new pointer ID is registered to the
PointerDriver.

**Kind**: static method of [<code>WLRoot</code>](#module_canvas-ui-wl.WLRoot)  

| Param | Description |
| --- | --- |
| cursor | The cursor component |

<a name="module_canvas-ui-wl.WLVirtualKeyboardRoot"></a>

### canvas-ui-wl.WLVirtualKeyboardRoot
A WLRoot with a virtual keyboard, similar to VirtualKeyboardRoot from
canvas-ui. Can also be automatically hidden when there is no keyboard focus
by callid updateVisibility before calling update. This doesn't need to be
directly used, the virtual-keyboard-ui-root component can be used instead.

**Kind**: static class of [<code>canvas-ui-wl</code>](#module_canvas-ui-wl)  

* [.WLVirtualKeyboardRoot](#module_canvas-ui-wl.WLVirtualKeyboardRoot)
    * [new exports.WLVirtualKeyboardRoot(wlObject, material, keyboardTemplate, keyboardDriver, theme, unitsPerPixel, registerPointerDriver)](#new_module_canvas-ui-wl.WLVirtualKeyboardRoot_new)
    * [.updateVisibility()](#module_canvas-ui-wl.WLVirtualKeyboardRoot+updateVisibility)

<a name="new_module_canvas-ui-wl.WLVirtualKeyboardRoot_new"></a>

#### new exports.WLVirtualKeyboardRoot(wlObject, material, keyboardTemplate, keyboardDriver, theme, unitsPerPixel, registerPointerDriver)
Create a new WLVirtualKeyboardRoot.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wlObject | <code>Object</code> |  | The object where the mesh will be added |
| material | <code>Material</code> |  | The material to use for this root's mesh. The material will be cloned |
| keyboardTemplate | <code>VirtualKeyboardTemplate</code> |  | The virtual keyboard's layout template. Uses the US QWERTY layout by default. |
| keyboardDriver | <code>KeyboardDriver</code> \| <code>null</code> | <code></code> | The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used. |
| theme | <code>Theme</code> |  | The root's theme. If none is supplied, the default theme is used |
| unitsPerPixel | <code>number</code> | <code>0.01</code> | The amount of world units per canvas pixel. Determines the pixel density of the mesh |
| registerPointerDriver | <code>boolean</code> | <code>true</code> | Register the default pointer driver to this root? |

<a name="module_canvas-ui-wl.WLVirtualKeyboardRoot+updateVisibility"></a>

#### wlVirtualKeyboardRoot.updateVisibility()
Automatically enables/disables this root if needed/unneeded. Call this
before calling update.

**Kind**: instance method of [<code>WLVirtualKeyboardRoot</code>](#module_canvas-ui-wl.WLVirtualKeyboardRoot)  
