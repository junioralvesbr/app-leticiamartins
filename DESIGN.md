---
name: Serene Method
colors:
  surface: '#fff8f9'
  surface-dim: '#edd3e0'
  surface-bright: '#fff8f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f6'
  surface-container: '#ffe8f3'
  surface-container-high: '#fbe1ee'
  surface-container-highest: '#f5dce9'
  on-surface: '#251720'
  on-surface-variant: '#514348'
  inverse-surface: '#3c2c36'
  inverse-on-surface: '#ffecf5'
  outline: '#837379'
  outline-variant: '#d5c2c8'
  surface-tint: '#884a6a'
  primary: '#4a1633'
  on-primary: '#ffffff'
  primary-container: '#642c4a'
  on-primary-container: '#df95b8'
  inverse-primary: '#fdb0d4'
  secondary: '#9c3a70'
  on-secondary: '#ffffff'
  secondary-container: '#ff8bc5'
  on-secondary-container: '#7a1d54'
  tertiary: '#4d1135'
  on-tertiary: '#ffffff'
  tertiary-container: '#68284c'
  on-tertiary-container: '#e491ba'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e8'
  primary-fixed-dim: '#fdb0d4'
  on-primary-fixed: '#380725'
  on-primary-fixed-variant: '#6d3352'
  secondary-fixed: '#ffd8e7'
  secondary-fixed-dim: '#ffafd4'
  on-secondary-fixed: '#3d0026'
  on-secondary-fixed-variant: '#7e2158'
  tertiary-fixed: '#ffd8e8'
  tertiary-fixed-dim: '#ffafd5'
  on-tertiary-fixed: '#3b0227'
  on-tertiary-fixed-variant: '#713054'
  background: '#fff8f9'
  on-background: '#251720'
  surface-variant: '#f5dce9'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  h3:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  button:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is rooted in the philosophy of "Sophisticated Order." It targets professionals seeking a sanctuary for their daily tasks, blending a high-end editorial aesthetic with functional utility. The brand personality is poised, methodical, and calm.

The visual style follows **Minimalism** with subtle **Tonal Layering**. It prioritizes heavy whitespace and intentional content hierarchy to reduce cognitive load. By utilizing a palette of deep plums and muted roses against crisp neutrals, the UI evokes the feeling of a high-end physical stationery set transitioned into a digital workspace.

## Colors

This design system utilizes a sophisticated monochromatic-adjacent palette.

- **Primary (#642C4A):** A deep, authoritative plum used for primary actions, navigation headers, and high-emphasis text.
- **Secondary (#B14B82):** A mid-tone magenta used for interactive elements like active states, toggles, and selection indicators.
- **Tertiary (#BA6D94):** A softer rose used for accents, secondary buttons, and decorative elements.
- **Neutral (#E5CCD9):** A warm, desaturated pink-grey used for backgrounds, borders, and input fields to soften the interface compared to standard grays.
- **Background (#FFFFFF):** Pure white remains the base to maintain a clean, professional "canvas" feel.

## Typography

The typography strategy balances the classic authority of serifs with the modern clarity of geometric sans-serifs.

- **Noto Serif** (replacing PT Serif) is reserved for headlines and titles to provide a literary, premium feel. It should be used sparingly to draw the eye to core sections.
- **Manrope** (replacing DM Sans) serves as the workhorse for all functional text, including body copy, labels, and inputs. Its balanced proportions ensure high readability in dense organizational views like calendars and task lists.
- **Letter Spacing:** Headlines use slight negative tracking for a tighter, more "designed" look, while labels use generous tracking for immediate scannability.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop dashboards to ensure the personal organizer feels structured and dependable. The layout is built on an 8px rhythmic scale.

- **Grid:** A 12-column grid with 24px gutters is the standard.
- **Margins:** Generous 32px or 48px page margins are used to prevent content from feeling cramped, reinforcing the "minimalist" brand profile.
- **Rhythm:** Spacing between sections (Vertical Rhythm) should always favor larger increments (lg/xl) to create a sense of breathability and calm.

## Elevation & Depth

To maintain a sophisticated and flat aesthetic, depth is primarily communicated through **Tonal Layers** rather than heavy shadows.

- **Surface Tiers:** The base layer is white (#FFFFFF). Secondary containers (like sidebars or info panels) use the Neutral tone (#E5CCD9) at 20-40% opacity to create subtle separation.
- **Shadows:** When necessary (e.g., for modals or floating action buttons), use "Ambient Shadows"—extremely soft, diffused blurs (30px-50px) with a 5% opacity tint of the Primary color (#642C4A) instead of pure black.
- **Borders:** Hairline borders (1px) in a slightly darker shade of the Neutral palette are preferred over shadows for defining card boundaries.

## Shapes

The shape language is **Soft** and restrained. While many modern apps favor extreme roundness, this design system uses subtle 4px (0.25rem) corner radii to maintain a sense of precision and professional architectural structure.

- **Standard Elements:** Buttons, input fields, and small cards use 4px corners.
- **Large Containers:** Main content areas or dashboard sections may use 8px (0.5rem) to soften the overall composition.
- **Interactive States:** Use subtle scale transforms (102%) rather than radical shape changes to indicate hover or focus.

## Components

### Buttons

Primary buttons use a solid fill of the Primary color (#642C4A) with white text. Secondary buttons use a 1px border of the Primary color with primary-colored text. All buttons use the `button` typography style with 16px horizontal padding.

### Input Fields

Inputs are defined by a bottom-border-only style or a very light-filled background (#E5CCD9 at 15% opacity). Labels sit above the field in `label-caps` style. Focus states are indicated by a 2px bottom border in the Secondary color (#B14B82).

### Cards

Cards are "flat," defined by a 1px border of the Neutral color. They should not have shadows unless they are "Draggable" elements in a Kanban or list view.

### Chips & Tags

Used for categorization (e.g., "Personal," "Work"). These use a desaturated version of the Secondary color with 50% opacity and no border, using small-caps typography.

### Icons

Icons must be "Minimalist Line" style. Use a consistent 1.5px stroke weight. Icons should always be monochromatic, using the Primary color for active states and the Neutral color (darkened) for inactive states.

### Specialized Components

- **The Timeline:** A vertical thread using a 1px dashed line in the Neutral color to connect daily events.
- **The Focus Modal:** A full-screen overlay with a heavy backdrop blur (Glassmorphism) to isolate a single task for deep work sessions.
