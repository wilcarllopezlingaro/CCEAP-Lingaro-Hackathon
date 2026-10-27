# Card (Expanded)

## Purpose
Displays more detailed information with expandable content. Suitable for showing details without navigating to a separate page.

## Anatomy
- Container: rectangle with 16 px corner radius, background #FFFFFF, shadow Level 1 (hover → Level 2).
- Title: Maven Pro, 16 px, Medium, placed at the top.
- Subtitle/short description: Manrope, 14 px, Regular, #757779.
- Expand button or icon (24 px) on the right in the header.
- Expanded block: additional text, list, table, or forms.

## Variants
- Text expansion (extra paragraph or list).
- Media expansion (image, preview).
- Action expansion (buttons, chips, icons inside the expanded area).

## States
- Default: white background, shadow Level 1.
- Hover: shadow Level 2, cursor pointer on expand icon.
- Expanded: white background, shadow Level 2, extra content visible.
- Focused: 2 px outline in purple #662E90.
- Disabled: background #F6F7F9, text #000000 at 40%.

## Specs
- Width: 320–360 px (grid aligned).
- Inner padding: 16–24 px.
- Spacing between title and content: 8–12 px.
- Height: dynamic (increases when expanded).

## Usage
- ✅ Use for combining summary and details in one block.
- ✅ Make expansion obvious (arrow down or plus icon).
- ❌ Don’t hide critical data inside the expandable block.
- ❌ Don’t use expanded cards for very long content — use a dialog instead.