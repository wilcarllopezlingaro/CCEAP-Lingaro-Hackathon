# Stepper / Progress

## Purpose
Shows the user their current stage in a process and guides them step by step.

## Anatomy
- Container: horizontal line or sequence of steps.
- Step: circle 24 px + number/icon.
- Step label: Manrope, 14 px, Regular, #000000.
- Connecting lines: 2 px, color depends on step state.

## Variants
- Numbered stepper (1, 2, 3…).
- Icon-based (checkmark for completed).
- Progress bar (solid line with fill).

## States
- Active: circle filled purple #662E90, label bold #000000.
- Completed: circle with checkmark, background light purple #EBDCF4, label gray #757779.
- Upcoming: white circle with border #E1E2E4, label #757779.
- Disabled: circle and label #757779 @40%.

## Specs
- Step diameter: 24 px.
- Line thickness: 2 px.
- Spacing between steps: 40–64 px (grid aligned).
- Spacing circle → label: 8 px.

## Usage
- ✅ Use for processes with 3–7 steps.
- ✅ Label each step clearly.
- ❌ Don’t use for single-step actions.
- ❌ Don’t overload with long labels.