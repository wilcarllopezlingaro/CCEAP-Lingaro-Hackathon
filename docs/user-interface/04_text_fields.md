# Text Fields

## Purpose
Used for entering or selecting data in forms and filters.

## Anatomy
- Container: rectangle, height 44 px, border 1 px #E1E2E4, radius 8 px.
- Label (mandatory, above field): Manrope, 12 px, Medium, color #000000.
- Input text: Manrope, 14 px, Regular, #000000.
- Placeholder: Manrope, 14 px, Regular, #757779.
- Icon (optional): 20–24 px, left or right.
- Helper/error text (below): Manrope, 12 px.

## Variants
- Standard text field.
- Dropdown (with chevron icon).
- Date picker (with calendar icon).

## States
- Default: border #E1E2E4, bg #FFFFFF, text #000000.
- Hover: border #757779.
- Focused: border #662E90, 2 px outline.
- Disabled: bg #F6F7F9, text #000000 @40%.
- Error: border red #E2302D, error text red.

## Specs
- Height: 44 px.
- Horizontal padding: 12–16 px.
- Spacing label → field: 4 px.
- Spacing field → helper text: 4 px.

## Usage
- ✅ Every field must have a label.
- ✅ Provide helper or error messages.
- ❌ Don’t use placeholder as a label substitute.
- ❌ Don’t place more than 2 icons inside a field.