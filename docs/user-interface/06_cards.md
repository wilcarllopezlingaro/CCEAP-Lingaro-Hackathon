# Cards

## Purpose
Group related information into a single visual block: previews, summaries, or entry points.

## Anatomy
- Container: rectangle with 16 px corner radius.
- Background: white #FFFFFF.
- Shadow: Level 1 (hover → Level 2).
- Content:
	- Title (Maven Pro, 16 px, Medium).
	- Subtitle/description (Manrope, 14 px, Regular, #757779).
	- Optional image/thumbnail.
	- Optional actions (buttons, icons) at the bottom or top-right.

## Variants
- Preview card (image + title + description).
- Info card (text only).
- Interactive card (with actions: buttons or icons).

## States
- Default: background #FFFFFF, no border, shadow Level 1.
- Hover: shadow Level 2, cursor pointer.
- Focused: 2 px outline in purple #662E90.
- Disabled: background #F6F7F9, text #000000 @40%.

## Specs
- Width: 320–360 px (grid aligned).
- Inner padding: 16–24 px.
- Spacing between elements: 8–16 px.

## Usage
- ✅ Use cards for grouped or preview content.
- ✅ Keep consistent layout (title always on top).
- ❌ Don’t overload a card with too many actions.
- ❌ Don’t nest one card inside another.