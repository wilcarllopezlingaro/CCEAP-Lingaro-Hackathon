# Tabs

## Purpose
Navigation between up to 5 sections on one screen. If more — use separate pages.

## Anatomy
- Container: background #FFFFFF or #F6F7F9, height 48 px.
- Item: text (Maven Pro, 14 px, Medium), optional icon 24 px left, indicator 2 px #662E90.

## Behavior
- One active tab only.
- Keyboard: ←/→ to move, Enter/Space to select.

## States
- Default: text #757779.
- Hover: text #000000, indicator #662E90 @60%.
- Focused: ring 2 px #E1E2E4.
- Selected: text #662E90, indicator 2 px.
- Disabled: text #000000 @40%, no indicator.

## Variants
- Text only.
- Text + Icon (gap 8 px).
- Fixed width (tabs evenly spread, ≤5).

## Specs
- Tab height: 48 px.
- Click target ≥ 44×44 px.
- Padding 16–24 px.
- Indicator thickness: 2 px.

## Usage
- ✅ Use for 3–5 sections.
- ❌ Don’t mix with side nav or exceed 5 tabs.