# Tooltips

## Purpose
Provide explanations for interface elements or show additional info on hover.

## Anatomy
- Container: rectangle with 8 px corner radius.
- Background: dark gray #333333.
- Text: Manrope, 12–14 px, Regular, white #FFFFFF.
- Inner padding: 8 px.
- Tail (optional): small triangle pointing to the element.

## Variants
- Help text: short explanation on hover over an icon or button.
- Dropdown tooltip: contextual info for menu/list items.

## States
- Default: background #333333, text white.
- Hover/Focus (of element): tooltip appears.
- Disabled: not used.

## Specs
- Min width: 48 px.
- Max width: 240 px.
- Corner radius: 8 px.
- Distance from element: 4–8 px.

## Usage
- ✅ Keep text short and clear (max 2 lines).
- ✅ Show only on hover or focus.
- ❌ Don’t display tooltips permanently.
- ❌ Don’t use for critical information (it must be visible directly).