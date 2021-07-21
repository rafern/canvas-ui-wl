## Modules

<dl>
<dt><a href="#module_WLRoot">WLRoot</a></dt>
<dd></dd>
<dt><a href="#module_WLVirtualKeyboardRoot">WLVirtualKeyboardRoot</a></dt>
<dd></dd>
</dl>

<a name="module_WLRoot"></a>

## WLRoot

* [WLRoot](#module_WLRoot)
    * [.exports.WLRoot](#exp_module_WLRoot--exports.WLRoot) ⏏
        * [new exports.WLRoot(wlObject, material, child, [theme], [unitsPerPixel], [registerPointerDriver], [registerKeyboardDriver])](#new_module_WLRoot--exports.WLRoot_new)
        * _instance_
            * [.update()](#module_WLRoot--exports.WLRoot.WLRoot+update)
        * _static_
            * [.pointerDriver](#module_WLRoot--exports.WLRoot.WLRoot.pointerDriver) : <code>PointerDriver</code>
            * [.keyboardDriver](#module_WLRoot--exports.WLRoot.WLRoot.keyboardDriver) : <code>DOMKeyboardDriver</code>
            * [.pointerIDs](#module_WLRoot--exports.WLRoot.WLRoot.pointerIDs) : <code>Map</code>
            * [.getPointerID(cursor)](#module_WLRoot--exports.WLRoot.WLRoot.getPointerID) : <code>number</code>

<a name="exp_module_WLRoot--exports.WLRoot"></a>

### .exports.WLRoot ⏏
A canvas-ui Root which automatically manages a mesh and input. For an example
on how to use this in a component, see example-components/test-ui-root.js

**Kind**: static class of [<code>WLRoot</code>](#module_WLRoot)  
<a name="new_module_WLRoot--exports.WLRoot_new"></a>

#### new exports.WLRoot(wlObject, material, child, [theme], [unitsPerPixel], [registerPointerDriver], [registerKeyboardDriver])
Create a new WLRoot.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wlObject | <code>Object</code> |  | The object where the mesh will be added |
| material | <code>Material</code> |  | The material to use for this root's mesh. The material will be cloned |
| child | <code>Widget</code> |  | The root's child widget |
| [theme] | <code>Theme</code> | <code>new Theme()</code> | The root's theme. If none is supplied, the default theme is used |
| [unitsPerPixel] | <code>number</code> | <code>0.01</code> | The amount of world units per canvas pixel. Determines the pixel density of the mesh |
| [registerPointerDriver] | <code>boolean</code> | <code>true</code> | Register the default pointer driver to this root? |
| [registerKeyboardDriver] | <code>boolean</code> | <code>true</code> | Register the default keyboard driver to this root? |

<a name="module_WLRoot--exports.WLRoot.WLRoot+update"></a>

#### exports.WLRoot.update()
Do a full update of this root. Does a pre-layout update, resolves the
layout, does a post-layout update and paints. Call this instead of the
individual Root update methods.

**Kind**: instance method of [<code>exports.WLRoot</code>](#exp_module_WLRoot--exports.WLRoot)  
<a name="module_WLRoot--exports.WLRoot.WLRoot.pointerDriver"></a>

#### exports.WLRoot.pointerDriver : <code>PointerDriver</code>
The shared PointerDriver instance. Getter only. The PointerDriver will
only be created when needed. Used for pointer (mouse & XR controller)
input.

**Kind**: static property of [<code>exports.WLRoot</code>](#exp_module_WLRoot--exports.WLRoot)  
<a name="module_WLRoot--exports.WLRoot.WLRoot.keyboardDriver"></a>

#### exports.WLRoot.keyboardDriver : <code>DOMKeyboardDriver</code>
The shared DOMKeyboardDriver instance. Getter only. The DOMKeyboardDriver
will only be created when needed. Used for keyboard input.

**Kind**: static property of [<code>exports.WLRoot</code>](#exp_module_WLRoot--exports.WLRoot)  
<a name="module_WLRoot--exports.WLRoot.WLRoot.pointerIDs"></a>

#### exports.WLRoot.pointerIDs : <code>Map</code>
A Map mapping each cursor component to a PointerDriver's pointer ID.

**Kind**: static property of [<code>exports.WLRoot</code>](#exp_module_WLRoot--exports.WLRoot)  
<a name="module_WLRoot--exports.WLRoot.WLRoot.getPointerID"></a>

#### exports.WLRoot.getPointerID(cursor) : <code>number</code>
Get the pointer ID assigned to a given cursor component. If the cursor
has no pointer ID assigned, a new pointer ID is registered to the
PointerDriver.

**Kind**: static method of [<code>exports.WLRoot</code>](#exp_module_WLRoot--exports.WLRoot)  

| Param | Description |
| --- | --- |
| cursor | The cursor component |

<a name="module_WLVirtualKeyboardRoot"></a>

## WLVirtualKeyboardRoot

* [WLVirtualKeyboardRoot](#module_WLVirtualKeyboardRoot)
    * [.exports.WLVirtualKeyboardRoot](#exp_module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot) ⏏
        * [new exports.WLVirtualKeyboardRoot(wlObject, material, [keyboardTemplate], [keyboardDriver], [theme], [unitsPerPixel], [registerPointerDriver])](#new_module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot_new)
        * [.updateVisibility()](#module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot.WLVirtualKeyboardRoot+updateVisibility)

<a name="exp_module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot"></a>

### .exports.WLVirtualKeyboardRoot ⏏
A WLRoot with a virtual keyboard, similar to VirtualKeyboardRoot from
canvas-ui. Can also be automatically hidden when there is no keyboard focus
by callid updateVisibility before calling update. This doesn't need to be
directly used, the virtual-keyboard-ui-root component can be used instead.

**Kind**: static class of [<code>WLVirtualKeyboardRoot</code>](#module_WLVirtualKeyboardRoot)  
<a name="new_module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot_new"></a>

#### new exports.WLVirtualKeyboardRoot(wlObject, material, [keyboardTemplate], [keyboardDriver], [theme], [unitsPerPixel], [registerPointerDriver])
Create a new WLVirtualKeyboardRoot.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wlObject | <code>Object</code> |  | The object where the mesh will be added |
| material | <code>Material</code> |  | The material to use for this root's mesh. The material will be cloned |
| [keyboardTemplate] | <code>VirtualKeyboardTemplate</code> | <code>defaultVirtualKeyboardTemplate</code> | The virtual keyboard's layout template. Uses the US QWERTY layout by default. |
| [keyboardDriver] | <code>KeyboardDriver</code> \| <code>null</code> | <code></code> | The KeyboardDriver to dispatch key events to. If null (default), WLRoot.keyboardDriver is used. |
| [theme] | <code>Theme</code> | <code>new Theme()</code> | The root's theme. If none is supplied, the default theme is used |
| [unitsPerPixel] | <code>number</code> | <code>0.01</code> | The amount of world units per canvas pixel. Determines the pixel density of the mesh |
| [registerPointerDriver] | <code>boolean</code> | <code>true</code> | Register the default pointer driver to this root? |

<a name="module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot.WLVirtualKeyboardRoot+updateVisibility"></a>

#### exports.WLVirtualKeyboardRoot.updateVisibility()
Automatically enables/disables this root if needed/unneeded. Call this
before calling update.

**Kind**: instance method of [<code>exports.WLVirtualKeyboardRoot</code>](#exp_module_WLVirtualKeyboardRoot--exports.WLVirtualKeyboardRoot)  
