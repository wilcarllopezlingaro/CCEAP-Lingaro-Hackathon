# Dialogs

## Purpose
Used for confirming actions, showing details, or quick data entry without leaving the current page.

## Anatomy
- Container: rectangle with 16–20 px corner radius, background #FFFFFF.
- Shadow: Level 5 (above all surfaces).
- Title: Maven Pro, 16–18 px, Medium, color #000000.
- Content: Manrope, 14 px, Regular, color #000000.
- Actions: buttons aligned bottom-right (Primary + Secondary).

## Variants
- Confirmation (short text + 2 buttons).
- Details (text, lists, statuses).
- Form (multiple input fields).

## States
- Default: white background, black text.
- Hover (buttons): standard button hover states.
- Focused: dialog gets a 2 px outline in purple #662E90 when keyboard focused.
- Disabled: inner elements may be inactive (text gray #757779 @40%).

## Specs
- Width: 720–840 px.
- Inner padding: 24 px.
- Spacing between elements: 16–24 px.

## Usage
- ✅ Use only for important content or actions.
- ✅ Always include a clear close button (24 px icon, top-right).
- ❌ Don’t overload with too much content.
- ❌ Don’t use dialogs for main navigation (only local tasks).