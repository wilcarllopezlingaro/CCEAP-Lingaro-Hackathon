# Buttons

## Purpose
Trigger key actions, emphasize hierarchy.

## Anatomy
- Container: rounded rect, radius 16 px.
- Label: Maven Pro, 14 px, Medium.
- Optional icon: 24 px left/right, gap 8 px.

## Variants
- Filled: bg #662E90, text white.
- Outlined: border 1 px #E1E2E4, text #000000.
- Tonal: bg light purple #EBDCF4, text #662E90.
- Text: transparent, text #662E90.

## States
- Default: per variant.
- Hover: bg darkens 10% (filled/tonal), border/text #000000 (outlined), underline text (text).
- Focused: 2 px outline #E1E2E4.
- Pressed: bg darkens 20% (filled/tonal), border #757779.
- Disabled: bg #F6F7F9, text #000000 @40%.

## Specs
- Height: 44–48 px.
- Min width: 88 px.
- Horizontal padding: 16–24 px.
- Gap label–icon: 8 px.

## Button States (Desktop only)
### Main (Primary)
- Default: background purple #662E90, text and icons white #FFFFFF.
- Hover: background dark purple #522470, text and icons white.
- Pressed: background even darker purple #3E1B55, text and icons white.
- Focus: background #662E90, 2 px outline gray #E1E2E4, text and icons white.
- Disabled: background light gray #F6F7F9, text and icons black #000000 at 40% opacity.

### Secondary
- Default: background white #FFFFFF, border 1 px gray #E1E2E4, text and icons black #000000.
- Hover: background light gray #F6F7F9, border dark gray #757779, text and icons black.
- Pressed: background gray #E1E2E4, border dark gray #757779, text and icons black.
- Focus: background white #FFFFFF, 2 px outline gray #E1E2E4, text and icons black.
- Disabled: background light gray #F6F7F9, border gray #E1E2E4, text and icons black #000000 at 40%.

### Tertiary (Text button)
- Default: background transparent, text and icons purple #662E90.
- Hover: background transparent, text and icons dark purple #522470, underline on text.
- Pressed: background transparent, text and icons even darker purple #3E1B55.
- Focus: background transparent, 2 px outline gray #E1E2E4, text and icons purple #662E90.
- Disabled: background transparent, text and icons black #000000 at 40%.

## Usage
- ✅ Only one Main (primary) button per screen.
- ✅ Secondary for supporting actions.
- ✅ Tertiary for less important actions.
- ❌ Don’t stack >3 button styles in one place.
- ❌ Don’t use tonal + text together.