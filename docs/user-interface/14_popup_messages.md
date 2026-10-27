# Popup Messages (Toasts)

## Purpose
Briefly inform the user about action results, statuses, or important updates. They appear over the interface and disappear automatically.

## Anatomy
- Container: rectangle with 12 px corner radius.
- Background: light shade of the status color.
- Border: stronger shade of the same color.
- Icon (24 px): matches the status (checkmark, cross, exclamation, “i”).
- Text: Manrope, 14 px, Regular.
- Inner padding: 12–16 px.
- Icon–text spacing: 8 px.

## General characteristics
- Position: bottom-right (default) or centered above content for global messages.
- Display time: 3–7 seconds depending on type.
- Dismissal: automatically or by clicking “X”.
- No more than 2–3 messages visible at once.

## Notification Types
### Success
- Background: light green #E9F7EA.
- Border: green #38B13C.
- Icon: checkmark, green.
- Text: dark green #054B07.
- Duration: 3–5 seconds.

### Error
- Background: light red #FDECEA.
- Border: red #E2302D.
- Icon: cross or “!”, red.
- Text: dark red #8A0C0C.
- Duration: 5–7 seconds.

### Warning
- Background: light yellow #FFF9E0.
- Border: yellow #FABD29.
- Icon: exclamation in triangle, yellow.
- Text: dark yellow/brown #6C4E00.
- Duration: 4–6 seconds.

### Info
- Background: light purple #EBDCF4.
- Border: purple #662E90.
- Icon: “i”, purple.
- Text: dark purple #3E1B55.
- Duration: 3–5 seconds.

## Usage
- ✅ Use for short feedback and notifications.
- ✅ Keep text specific and concise (1–2 sentences).
- ❌ Don’t replace dialogs for critical actions with toasts.
- ❌ Don’t use toasts as permanent interface elements.