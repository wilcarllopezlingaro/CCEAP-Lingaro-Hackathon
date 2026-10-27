# Top App Bar

## Purpose
Main navigation and actions visible at the top of the screen.

## Anatomy
- Container: background #FFFFFF, height 64–72 px, elevation 3.
- Left: logo (max 100×55 px) + product name (Maven Pro, Headline Large, ~20–22 px).
- Right: utility icons 24 px, user avatar 48 px, optional primary button.
- Bottom divider: 1 px line #E1E2E4 (if no elevation).

## Behavior
- Always fixed at top.
- Icons = interactive, target ≥ 44×44 px.
- Logo links to dashboard/home.

## States
- Default: background white.
- Hover (icons): color #000000.
- Focused: 2 px outline #E1E2E4.
- Disabled: icon #000000 @40%.

## Specs
- Horizontal padding 24 px.
- Vertical padding 12 px.
- Icon spacing 16 px.

## Usage
- ✅ Keep only global actions.
- ✅ Use single primary button at most.
- ❌ Don’t overload with >3–4 icons.
- ❌ Don’t use dense variant on desktop.