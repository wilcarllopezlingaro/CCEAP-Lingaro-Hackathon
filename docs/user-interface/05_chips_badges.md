# Chips / Badges

## Purpose
Used to display statuses, filters, and short labels. Designed to look subtle and lightweight, not like buttons.

## Anatomy
- Container: pill shape, height 24–28 px, corner radius 16–24 px.
- Text: Manrope, 12–14 px, Medium, in a dark tone of the same color family (not pure black).
- Icon (optional): 16–20 px on the left.

## Color Principle
- Each chip uses a single color scale for consistency:
	- Background: light shade.
	- Border: medium/darker shade.
	- Text: darkest shade of the same color family, ensuring readability (contrast ≥ 4.5:1).

## Specs
- Height: 24–28 px.
- Horizontal padding: 8–12 px.
- Spacing between icon and text: 4–8 px.

## Chip States
### Success (Green)
- Default: background light green #E9F7EA, border medium green #38B13C, text dark green #054B07.
- Hover: background slightly darker green (~+5–10%), border unchanged, text dark green.
- Selected (filters): same style replaced by purple (see Filter Active).
- Disabled: background light gray #F6F7F9, border gray #E1E2E4, text gray #757779 at 40%.

### Warning (Yellow)
- Default: background light yellow #FFF9E0, border medium yellow #FABD29, text dark yellow/brown #6C4E00.
- Hover: background slightly darker yellow, border unchanged, text dark yellow/brown.
- Selected (filters): replaced by purple scheme.
- Disabled: background light gray #F6F7F9, border gray #E1E2E4, text gray #757779 at 40%.

### Error (Red)
- Default: background light red #FDECEA, border medium red #E2302D, text dark red #8A0C0C.
- Hover: background slightly darker red, border unchanged, text dark red.
- Selected (filters): replaced by purple scheme.
- Disabled: background light gray #F6F7F9, border gray #E1E2E4, text gray #757779 at 40%.

### Draft (Orange)
- Default: background light orange #FFF4E5, border medium orange #FAB15E, text dark orange/brown #862800.
- Hover: background slightly darker orange, border unchanged, text dark orange/brown.
- Selected (filters): replaced by purple scheme.
- Disabled: background light gray #F6F7F9, border gray #E1E2E4, text gray #757779 at 40%.

### Filter Active (Purple)
- Default/Selected: background light purple #EBDCF4, border purple #662E90, text dark purple #3E1B55.
- Hover: background slightly darker purple, border unchanged, text dark purple.
- Disabled: background light gray #F6F7F9, border gray #E1E2E4, text gray #757779 at 40%.

## Usage
- ✅ Use one consistent color family per chip.
- ✅ Keep background light, border medium, text darker but not black.
- ❌ Don’t use highly saturated fills (to avoid looking like buttons).
- ❌ Don’t use chips as action triggers — only for statuses and filters.