# Sourdough Color Palette

This document describes the color palette used in the iOS app, themed around sourdough bread making.

## Core Colors

### Deep Sourdough Brown
**Hex:** `#8B6F47` | **RGB:** `139, 111, 71`
- **Usage:** Primary brand color for headers, navigation, key UI elements
- **Mapped to:** `primary` color scale in config

### Uncooked Dough
**Hex:** `#F5EDE3` | **RGB:** `245, 237, 227`
- **Usage:** Background color, cards, sections
- **Mapped to:** `background` and `tertiary` color scales in config

### Crispy Bits
**Hex:** `#3D2817` | **RGB:** `61, 40, 23`
- **Usage:** Body text, icons, dark elements
- **Mapped to:** `typography` color scale in config

### Golden Butter
**Hex:** `#FFF2B3` | **RGB:** `255, 242, 179`
- **Usage:** Accent color, highlights, active states, CTAs on dark backgrounds
- **Mapped to:** `secondary` color scale in config

## Usage Guide

### Backgrounds
- **Main backgrounds:** Use `background-200` (Uncooked Dough base) or `tertiary-200`
- **Section headers:** Use `primary-500` (Deep Sourdough Brown)
- **Cards:** Use `background-50` or `background-100` for subtle elevation

### Text
- **Body text on light backgrounds:** Use `typography-600` (Crispy Bits base)
- **Headings:** Use `typography-700` to `typography-900` for emphasis
- **Text on dark backgrounds:** Use `typography-0` or `typography-50` (Uncooked Dough tones)

### Accents & Highlights
- **Active timers:** Use `secondary-300` (Golden Butter base)
- **Notifications:** Use `secondary-400` or `secondary-500`
- **CTAs (Call-to-Actions):** Use `secondary-300` on dark backgrounds, `primary-500` on light backgrounds
- **Progress indicators:** Use `secondary-300` to `secondary-500`

### Navigation & Headers
- **Navigation bars:** Use `primary-500` (Deep Sourdough Brown)
- **Navigation text:** Use `secondary-300` (Golden Butter) or `typography-0` (light Uncooked Dough)
- **Active nav items:** Use `secondary-300` for highlighting

## Color Scales

Each color is available in multiple shades (0-950):
- **0-100:** Lightest tints
- **200-300:** Light variations
- **400-600:** Mid-tones (base colors typically at 500)
- **700-800:** Dark variations
- **900-950:** Darkest shades

## Dark Mode

The palette automatically adapts for dark mode:
- Primary colors become lighter for better visibility
- Backgrounds use darker, warmer tones
- Typography inverts to use lighter shades
- Golden Butter accent remains vibrant for contrast

## Implementation

Colors are configured in `/ios/components/ui/gluestack-ui-provider/config.ts` using CSS variables and the nativewind `vars()` function.

Example usage:
```tsx
// Using Tailwind classes
<View className="bg-background-200">
  <Text className="text-typography-600">Body text</Text>
  <Button className="bg-primary-500">
    <ButtonText className="text-typography-0">Click me</ButtonText>
  </Button>
</View>
```
