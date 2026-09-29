# Banner Integration Guide

## Banner Image Files Required

Your new banner has been integrated into the website. You need to save the provided banner image in the following location:

### Desktop Banner
- **File Path:** `d:\hn\logo\HN_Banner_Export.jpg`
- **Purpose:** Main banner displayed on desktop and tablet screens
- **Dimensions:** Recommended 1920x600px minimum (maintain aspect ratio)
- **Image:** The dark blue/gold export banner with:
  - "Trusted Sourcing. Global Delivery." headline
  - "APEDA Registered Exporter | RCMC Verified" badge
  - Global map, airplane, container ship, truck imagery
  - "Explore Products" and "Request a Quote" buttons
  - Quality assurance and logistics icons

### Mobile Banner (Optional)
- **File Path:** `d:\hn\logo\HN_Banner_Mobile.jpg`
- **Purpose:** Mobile-optimized version for screens ≤768px
- **Dimensions:** Recommended 768x500px (or appropriate mobile crop)
- **Note:** If this file doesn't exist, the desktop version will scale down

## Implementation Details

### HTML Structure
The hero section now uses a semantic `<picture>` element:
```html
<section id="home" class="hero" aria-label="Hero banner">
    <picture class="hero-picture">
        <source media="(max-width: 768px)" srcset="logo/HN_Banner_Mobile.jpg">
        <img src="logo/HN_Banner_Export.jpg" alt="..." class="hero-image">
    </picture>
</section>
```

### CSS Styling
- Full viewport width (100vw)
- No margins or padding
- Responsive height (auto-scaled)
- Sits directly below navbar
- No content overlay (banner is complete design)

## Steps to Complete Integration

1. **Save the desktop banner:**
   - Right-click the banner image
   - Save as: `HN_Banner_Export.jpg`
   - Location: `d:\hn\logo\`
   - Format: JPG (recommended for photos)

2. **Optional: Create mobile version**
   - Crop or resize for mobile (vertical focus)
   - Save as: `HN_Banner_Mobile.jpg`
   - Location: `d:\hn\logo\`

3. **Verify in browser:**
   - Navigate to `http://localhost:8000`
   - Full-width banner should appear below navy navbar
   - No grey side margins
   - Should display 1920px edge-to-edge on desktop
   - Should scale proportionally on mobile

## Responsive Behavior

### Desktop (≥769px)
- Shows desktop banner at full width
- Maintains aspect ratio
- No stretching or distortion

### Mobile/Tablet (≤768px)
- Shows mobile banner if available
- Otherwise scales desktop version
- Important content remains visible

## File Checklist

- [ ] `d:\hn\logo\HN_Banner_Export.jpg` saved
- [ ] `d:\hn\logo\HN_Banner_Mobile.jpg` saved (optional)
- [ ] HTML updated (✓ Done)
- [ ] CSS updated (✓ Done)
- [ ] Browser displays full-width hero (verify)
- [ ] No grey margins visible (verify)
- [ ] Navbar and hero align perfectly (verify)

## Troubleshooting

If the banner doesn't appear:
1. Check file exists at `d:\hn\logo\HN_Banner_Export.jpg`
2. Verify filename spelling matches exactly
3. Clear browser cache (Ctrl+Shift+Delete)
4. Reload page (F5)
5. Check browser console for 404 errors

If margins appear on sides:
1. Verify CSS has `width: 100vw` on `.hero`
2. Check that `main, section` max-width doesn't constrain hero
3. Verify `margin-left: calc(-50vw + 50%)` is present
4. Check for browser zooming (should be 100%)

## Notes

- The hero section now displays ONLY the image
- No HTML text overlay is added
- No duplicate CTA buttons are rendered
- All design elements come from the banner image itself
- The banner follows the "complete hero artwork" approach
