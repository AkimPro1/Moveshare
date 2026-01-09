# MoveShare Design System - Visual Reference

## Color Palette

### Primary Colors
```
Cyan Primary      #00d4ff  ████████ Main brand color
Electric Cyan     #00f5ff  ████████ Highlights & focus
Purple Secondary  #a855f7  ████████ Complementary actions
```

### Status Colors
```
Success Green     #22c55e  ████████ Positive feedback
Error Red         #ef4444  ████████ Destructive actions
Warning Amber     #fbbf24  ████████ Cautionary messages
Info Cyan         #00d4ff  ████████ Informational
```

### Neutral Colors
```
Foreground Text   #1e293b  ████████ Primary text
Muted Gray        #64748b  ████████ Secondary text
Border Light      #e2e8f0  ████████ Subtle borders
Background White  #ffffff  ████████ Clean backgrounds
```

## Gradient Combinations

### Button Gradients
```
Primary Button:
linear-gradient(135deg, #00d4ff 0%, #00f5ff 100%)
[Cyan → Electric Cyan]

Secondary Button:
linear-gradient(135deg, #a855f7 0%, #d8b4fe 100%)
[Purple → Light Purple]

Danger Button:
linear-gradient(135deg, #ef4444 0%, #f87171 100%)
[Red → Light Red]
```

### Background Gradients
```
Card Gradient:
linear-gradient(135deg, #ffffff 0%, rgba(0, 212, 255, 0.03) 100%)
[White → Subtle Cyan Tint]

Modal Gradient:
linear-gradient(135deg, #ffffff 0%, rgba(0, 212, 255, 0.03) 100%)
[Clean White → Minimal Cyan]

Header Gradient:
linear-gradient(135deg, #ffffff 0%, rgba(0, 212, 255, 0.02) 100%)
[Minimal Gradient - Subtle]
```

## Typography Scale

### Font Sizes
```
Extra Small   0.75rem (12px)  - Small labels, timestamps
Small         0.875rem (14px) - Secondary text, captions
Base          1rem (16px)     - Default body text
Large         1.125rem (18px) - Subheadings
XL            1.25rem (20px)  - Section titles
2XL           1.5rem (24px)   - Page titles
3XL           1.875rem (30px) - Hero headlines
4XL           2.25rem (36px)  - Main headlines
```

### Font Weights
```
Regular       400  - Body text, normal content
Medium        500  - Emphasis, secondary headings
SemiBold      600  - Important text
Bold          700  - Headings, strong emphasis
ExtraBold     800  - Logo, major headings
```

### Font Families
```
Headlines     Sora (Google Fonts)
              - Modern, geometric
              - Weights: 600, 700, 800
              
Body Text     Inter (Google Fonts)
              - Clean, legible
              - Weights: 400, 500
```

## Shadow System

### Elevation Levels
```
Level 1 (Subtle)
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03)

Level 2 (Standard)
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08)

Level 3 (Prominent)
box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12)

Level 4 (Modal)
box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15)
```

### Color-Specific Shadows
```
Cyan Shadow:
box-shadow: 0 8px 24px rgba(0, 212, 255, 0.15)

Purple Shadow:
box-shadow: 0 8px 24px rgba(168, 85, 247, 0.15)

Red Shadow (Error):
box-shadow: 0 8px 24px rgba(239, 68, 68, 0.15)

Green Shadow (Success):
box-shadow: 0 8px 24px rgba(34, 197, 94, 0.15)
```

## Spacing Scale

```
4px   (0.25rem)   - xs
8px   (0.5rem)    - sm
12px  (0.75rem)   - md
16px  (1rem)      - lg
24px  (1.5rem)    - xl
32px  (2rem)      - 2xl
40px  (2.5rem)    - 3xl
```

## Border Radius

```
6px   (0.375rem)  - sm (subtle)
10px  (0.625rem)  - md (default)
14px  (0.875rem)  - lg (cards/modals)
18px  (1.125rem)  - xl (large elements)
9999px            - full (pills, avatars)
```

## Animation Timing Functions

### Standard Animation
```
cubic-bezier(0.4, 0.0, 0.2, 1)
- Smooth, natural motion
- Used for most animations
- Duration: 300ms
```

### Emphasis Animation (Spring Effect)
```
cubic-bezier(0.34, 1.56, 0.64, 1)
- Bouncy, energetic feel
- Used for entrance animations
- Duration: 400ms
- Creates depth perception
```

### Fast Animation
```
cubic-bezier(0.4, 0.0, 0.6, 1)
- Quick feedback
- Used for micro-interactions
- Duration: 150-200ms
```

## Component Usage Guidelines

### Buttons
- Use gradient fills for primary actions
- Shimmer effect for emphasis
- 8-12px padding, 10px border-radius
- Shadow: 0 10px 30px rgba(0, 212, 255, 0.3)

### Cards
- Default shadow: shadow-md or shadow-lg
- Gradient border on hover
- Subtle background gradient
- 14px border-radius for prominence

### Input Fields
- 1.5px border with cyan accent
- Gradient background for depth
- Multi-layer shadow on focus
- Focus color: #00d4ff with 0.6 opacity

### Modals
- Glass-morphism with backdrop-filter
- 24px shadow for elevation
- Gradient text for titles
- Spring animation entrance

### Navigation
- Active state with gradient underline
- Color transition on hover
- Avatar with border animation
- Smooth slide animations

## Responsive Design Notes

### Mobile Breakpoints
```
Extra Small   < 480px   - Mobile phones
Small         480-640px - Tablets
Medium        640-1024px - Tablets/Small laptops
Large         > 1024px  - Desktops
```

### Adaptive Changes
- Font sizes reduce by 1-2px on mobile
- Padding reduces to maintain spacing
- Animations remain consistent
- Shadows scale with viewport
- Grid adjusts to single column

## Accessibility Considerations

### Color Contrast
- Text on backgrounds: Minimum WCAG AA (4.5:1)
- Primary text: Dark gray on white (14:1)
- Secondary text: Muted gray on white (7:1)
- Buttons: White text on cyan (8:1)

### Focus States
- Clear focus rings with cyan glow
- 3px multi-layer shadow for visibility
- Color + shape change for clarity
- Visible on all interactive elements

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Dark Mode Ready

All CSS variables support dark mode implementation:
- Color values can be overridden with `@media (prefers-color-scheme: dark)`
- Opacity values maintain contrast in both themes
- Gradient directions remain consistent
- Shadow opacity adjusts for dark backgrounds
