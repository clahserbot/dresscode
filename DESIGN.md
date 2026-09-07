# DESIGN.md - DressCode Project UI Guidelines

This document outlines the core UI/UX principles governing the DressCode project, focusing heavily on a **mobile-first, premium aesthetic** ensuring high scannability, clear typography, and tactile feedback.

## 1. Mobile-First Philosophy
* **Touch Real Estate**: Ensure all interactable elements have a minimum target of 44-48px. 
* **Horizontal Discovery**: Utilize horizontal scrolling (with hidden scrollbars `scrollbar-width: none`) for secondary discovery mechanics, such as Category selectors or 'Shop the Look' items. This preserves vertical scroll for primary content.
* **Scannable Grids**: Mobile lists of products should default to a 2-column grid (`grid-cols-2`) so users can compare multiple items without excessive scrolling. Use `gap-3` or `gap-4` to maximize image sizes on narrow viewports.

## 2. Premium Aesthetics
* **Typography**: Maintain clear hierarchy. Use `text-sm sm:text-lg` dynamic scaling for product titles to prevent awkward wrapping on 320px screens. Strike-through text for discounts should be muted (`text-gray-400`).
* **Visual Isolation**: Always properly isolate blending modes. Sticky headers or images using `mix-blend-multiply` MUST be contained within a solid background wrapper (`bg-white isolate z-20`) to prevent scrolling content from bleeding through.
* **Overlays & Gradients**: Use `bg-gradient-to-t from-black/60 to-black/10` to ensure white text overlaying product images is always legible, regardless of the image content.

## 3. Performance & Layout
* **Images**: Always use `object-cover` for product and category thumbnails. Ensure containers have fixed aspect ratios (`aspect-square`, `h-40 w-32`) to prevent layout shift.
* **Animations**: Rely on GPU-accelerated CSS transitions (`transition-transform`, `group-hover:scale-110`) rather than JS-based animations for hover states.

## 4. Specific Component Rules
* **SiteHeader**: Mobile menus must use solid backgrounds (e.g., `bg-white` over translucent blurs) when stacked over complex imagery to ensure readability.
* **Product Detail View**: Avoid transparent backgrounds on sticky media containers. Keep the Z-index hierarchy organized: Base content (`z-0`), Sticky Media (`z-10` or `z-20`), Floating Navigation (`z-50`).
