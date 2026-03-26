# Design System: High-End Editorial Strategy for Minoru Isisola

## 1. Overview & Creative North Star: "The Digital Monolith"
The creative North Star for this design system is **"The Digital Monolith."** This aesthetic prioritizes weight, presence, and intentionality. Unlike generic templates that rely on busy grids and loud colors, this system uses a "subtractive" approach. By utilizing a deep, monochromatic palette and extreme negative space, we frame Minoru Isisola’s work as a curated exhibition. 

The layout breaks the standard "website" feel through **intentional asymmetry**—large headings offset to the left, balanced by floating imagery or glass-morphic cards on the right. We move away from structural lines, using "voids" (large spacing) to define the beginning and end of ideas.

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is a sophisticated range of charcoal, obsidian, and metallic greys, designed to create a sense of premium quietude.

*   **Surface Hierarchy:** 
    *   **Main Canvas:** `background` (#0c0e10).
    *   **Structural Sections:** Shift to `surface_container_low` (#111416) for large content blocks.
    *   **Floating Elements:** Use `surface_container_highest` (#20262c) for interactive cards.
*   **The "No-Line" Rule:** 1px solid borders for sectioning are strictly prohibited. You must define boundaries through background color shifts or the spacing scale (e.g., a `24` scale gap between sections). 
*   **Glass & Gradient Strategy:** To prevent the dark theme from feeling "flat," main CTAs or featured project backgrounds should utilize a subtle linear gradient from `primary` (#c6c6c7) to `primary_container` (#454747). For floating navigation or modals, apply a `backdrop-blur` of 12px with a semi-transparent `surface_variant` at 60% opacity.

## 3. Typography: Editorial Authority
The choice of **Inter** provides a Swiss-inspired, modern neutrality that allows Minoru’s content to lead.

*   **Scale Limits:** As per the creative direction, titles are capped at **40px** (`headline-lg`). This creates a sleek, understated authority rather than a loud, "shouting" interface.
*   **The Signature Header:** Use `headline-lg` (Inter, 40px) with a `tight` letter-spacing (-0.02em) for main section titles.
*   **Hierarchical Pairing:**
    *   **Display/Headlines:** `headline-lg` (40px) for impact.
    *   **Sub-titles:** `title-md` (18px) using `secondary` (#999fa4) to create a clear visual step-down.
    *   **Body:** `body-lg` (16px) using `on_surface` (#e0e6ed) for maximum legibility against the dark canvas.
    *   **Meta-Labels:** `label-md` (12px) in `all-caps` with 0.1rem tracking to denote categories or dates.

## 4. Elevation & Depth: Tonal Layering
In this design system, depth is a feeling, not a shadow. 

*   **The Layering Principle:** Avoid the "flat card" look. Place a `surface_container_lowest` (#000000) card inside a `surface_container_low` (#111416) section. This "inward" depth mimics a high-end physical portfolio.
*   **Ambient Shadows:** If an element must float (like a "Contact" button), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never be high-contrast; it should feel like an ambient glow.
*   **The "Ghost Border" Fallback:** If a container requires a boundary (e.g., an input field), use `outline_variant` (#42494f) at **20% opacity**. This creates a "suggestion" of a line rather than a hard edge.
*   **Glassmorphism:** For the hero navigation inspired by the reference image, use a semi-transparent container with `rounded-xl` (0.75rem) corners, a subtle `outline_variant` at 10% opacity, and a heavy backdrop blur.

## 5. Components: Sleek & Tactile

### Buttons
*   **Primary:** A solid `primary` (#c6c6c7) fill with `on_primary` (#3f4041) text. Shape: `rounded-md` (0.375rem). Transition: 0.2s ease-in-out on hover to `primary_dim`.
*   **Secondary/Ghost:** No fill. `Ghost Border` (20% opacity `outline`). This is the "Saeza-style" contact button seen in the reference image.

### Cards & Lists
*   **Prohibition of Dividers:** Vertical lines and horizontal dividers are banned. Separate list items using the spacing scale (e.g., `spacing-4` between items) and a subtle hover state shift to `surface_container`.
*   **Portfolio Cards:** Use `surface_container_low` with a `rounded-lg` corner. Ensure the internal padding is generous (`spacing-8`).

### Input Fields
*   **Style:** Minimalist. No background fill, only a bottom `Ghost Border`. Focus state transitions the border to 100% opacity `primary`.

### Navigation
*   **Floating Dock:** Inspired by the reference, the navigation should be a floating bar at the top, utilizing `surface_container_highest` at 70% opacity with a blur, keeping the `rounded-xl` corner radius.

## 6. Do’s and Don’ts

### Do:
*   **Exaggerate White Space:** Use `spacing-20` (7rem) or `spacing-24` (8.5rem) between major sections to let the content breathe.
*   **Use Intentional Asymmetry:** Align text to the left and images to the far right of the grid to create a professional, editorial rhythm.
*   **Respect the 40px Cap:** Keep your largest titles at 40px to maintain the "sleek" and "modern" aesthetic requested.

### Don’t:
*   **Don't use pure black text:** Always use `on_surface` or `on_background` for text. Pure black on dark backgrounds is vibrating and unreadable; pure white is too harsh.
*   **Don't use standard drop shadows:** Avoid the "material design" look of heavy, dark shadows. Use tonal shifts and blurs instead.
*   **Don't clutter the UI:** If a decorative element doesn't serve a purpose, remove it. The "Minoru Isisola" brand is defined by what *isn't* there.