# Requirements Document

## Introduction

HN Enterprises (domain: hnEnterprises.com) is an Indian floriculture export company that supplies fresh cut flowers and foliage both domestically within India and internationally. The company needs a professional export-focused website that showcases its full flower catalog of 20 varieties, communicates its export capabilities, and channels all buyer and trade enquiries to hn.enterpriseexport@gmail.com. The site must inspire confidence in both domestic Indian buyers and overseas importers, reflecting the quality and reliability expected of a professional exporter.

---

## Glossary

- **Website**: The HN Enterprises public-facing website hosted at hnEnterprises.com
- **Visitor**: Any person browsing the Website, including potential buyers, trade partners, and importers
- **Domestic_Buyer**: A Visitor located within India seeking to purchase or enquire about flowers for delivery within India
- **International_Buyer**: A Visitor located outside India seeking to import flowers from HN Enterprises
- **Flower_Catalog**: The section of the Website presenting all 20 flower and foliage varieties offered by HN Enterprises
- **Flower_Card**: A single visual tile in the Flower_Catalog representing one flower or foliage variety, displaying its name and image
- **Enquiry_Form**: The web form through which Visitors submit export or purchase enquiries to HN Enterprises
- **Enquiry_Email**: The designated recipient email address: hn.enterpriseexport@gmail.com
- **Hero_Section**: The full-width banner area at the top of the homepage that establishes brand identity
- **Navigation_Bar**: The persistent header element enabling Visitors to jump to key sections of the Website
- **About_Section**: The section describing HN Enterprises' background, expertise, and export reach
- **Why_Choose_Section**: The section highlighting HN Enterprises' key differentiators and trust signals
- **Export_Info_Section**: The section explaining domestic and international shipping, packaging, and compliance information
- **Footer**: The bottom section of every page containing contact details, quick links, and legal information
- **PDF_Asset**: A PDF file in `d:\hn\flowers_pictures_types\` containing images for each flower variety
- **Mailto_Handler**: The browser's native email client triggered by a `mailto:` link or form action

---

## Requirements

### Requirement 1: Website Structure and Navigation

**User Story:** As a Visitor, I want to navigate the Website easily, so that I can quickly reach the section I need without confusion.

#### Acceptance Criteria

1. THE Website SHALL consist of a single-page layout with the following sections in order: Hero_Section, About_Section, Flower_Catalog, Why_Choose_Section, Export_Info_Section, Enquiry_Form, and Footer.
2. THE Navigation_Bar SHALL be fixed at the top of the viewport and remain visible as the Visitor scrolls.
3. THE Navigation_Bar SHALL contain anchor links to each major section: Home, About, Our Flowers, Why Choose Us, Export Info, and Contact — each link SHALL resolve to the corresponding section on the same page.
4. WHEN a Visitor clicks a Navigation_Bar anchor link, THE Website SHALL smoothly scroll to the corresponding section within 400 milliseconds of the click event.
5. WHEN the viewport width is less than 768 pixels, THE Navigation_Bar SHALL collapse into a hamburger-style toggle menu.
6. WHEN a Visitor activates the hamburger toggle, THE Navigation_Bar SHALL expand to display the full navigation menu as a vertical list.
7. WHEN a Visitor selects a navigation link from the expanded hamburger menu, THE Navigation_Bar SHALL collapse the menu automatically after the selection.
8. THE Navigation_Bar SHALL display the HN Enterprises company name or logo on the left side at all viewport widths.
9. THE Navigation_Bar SHALL highlight the anchor link corresponding to the section currently visible in the viewport.

---

### Requirement 2: Hero Section — Brand Identity

**User Story:** As a Visitor, I want to immediately understand what HN Enterprises does when I land on the site, so that I can decide whether to explore further.

#### Acceptance Criteria

1. WHEN the page finishes loading, THE Hero_Section SHALL occupy the full viewport height (100% of the visible browser window height).
2. THE Hero_Section SHALL display a floral photographic image as its background, covering the full width and height of the Hero_Section without visible gaps or uncovered areas.
3. THE Hero_Section SHALL display the text "HN Enterprises" as the primary heading, rendered at a larger font size than any other text element within the Hero_Section.
4. THE Hero_Section SHALL display the tagline "Delivering India's Finest Flowers — Across India & Around the World" as a fixed subtitle text directly beneath the primary heading.
5. WHEN a Visitor clicks the "Explore Our Flowers" button, THE Hero_Section SHALL scroll the viewport smoothly to the Flower_Catalog section such that the top of the Flower_Catalog section is visible within the viewport.
6. WHEN a Visitor clicks the "Send an Enquiry" button, THE Hero_Section SHALL scroll the viewport smoothly to the Enquiry_Form section such that the top of the Enquiry_Form section is visible within the viewport.
7. THE Hero_Section SHALL display the text "hnEnterprises.com" as a visible, readable text element within the Hero_Section boundaries.
8. THE Hero_Section SHALL render all text elements — including the heading, tagline, button labels, and domain text — with sufficient contrast against the background image such that each text element is legible without requiring the user to interact with the page.

---

### Requirement 3: About Section

**User Story:** As a potential trade partner, I want to learn about HN Enterprises' background and credibility, so that I can trust them as a reliable supplier.

#### Acceptance Criteria

1. THE About_Section SHALL include a heading identifying the section as "About Us" or "About HN Enterprises".
2. THE About_Section SHALL include a paragraph describing HN Enterprises as a professional floriculture export company based in India.
3. THE About_Section SHALL state that HN Enterprises supplies both domestic buyers within India and international importers overseas.
4. THE About_Section SHALL mention the company's email contact (hn.enterpriseexport@gmail.com) as a direct point of contact.
5. THE About_Section SHALL include at least one visual element (image or decorative graphic) complementing the text content.

---

### Requirement 4: Flower Catalog

**User Story:** As a buyer, I want to browse all available flower varieties with images, so that I can identify which flowers I want to enquire about.

#### Acceptance Criteria

1. THE Flower_Catalog SHALL display a Flower_Card for each of the following 20 varieties: 5 Star Roses, Cocks Comb Flower, Dahlia Flower, Daisies, Dracaena Leaf, Gerbera Flower, Jasmine, Kanchan Flower, Lilly Flower, MARIKOLUNTHU, Mirabel Rose, Mukkutti Flower, Mullai, Orchid Flower, Panneer Rose, Roses, Ruby, Samanthi, Sampangi Flower, Santini.
2. EACH Flower_Card SHALL display the flower variety name as a visible text label.
3. EACH Flower_Card SHALL display a representative image for the flower variety, sourced from the corresponding PDF_Asset or equivalent extracted image.
4. WHEN a Visitor hovers over a Flower_Card on a non-touch device, THE Flower_Catalog SHALL apply at least one of the following visual effects: a CSS scale transform, a drop shadow, or a darkening overlay — to indicate interactivity.
5. THE Flower_Catalog SHALL arrange Flower_Cards in a responsive grid: a minimum of 4 columns on desktop (viewport ≥ 1024 px), a minimum of 2 columns on tablet (viewport 768–1023 px), and 1 or 2 columns on mobile (viewport < 768 px).
6. EACH Flower_Card SHALL contain an "Enquire Now" button that, when clicked, scrolls to the Enquiry_Form and pre-populates the message field with the corresponding flower variety name.
7. THE Flower_Catalog SHALL include a section heading whose visible text contains the word "Flower" or "Flowers".
8. IF the image for a Flower_Card fails to load, THE Flower_Card SHALL display a text fallback showing the flower variety name in place of the missing image.

---

### Requirement 5: Why Choose Us Section

**User Story:** As an International_Buyer, I want to understand HN Enterprises' unique value proposition, so that I can be confident choosing them over competitors.

#### Acceptance Criteria

1. THE Why_Choose_Section SHALL include a heading such as "Why Choose HN Enterprises".
2. THE Why_Choose_Section SHALL highlight at least four trust signals or differentiators, presented as individual feature tiles or icon-text pairs, including: freshness and quality assurance, wide variety of flowers (20+ types), domestic and international shipping capability, and reliable packaging.
3. EACH feature tile in the Why_Choose_Section SHALL include an icon or visual element alongside the descriptive text.
4. THE Why_Choose_Section SHALL be laid out responsively: at least 2 tiles per row on tablet and desktop, stacking to 1 column on mobile.

---

### Requirement 6: Export Information Section

**User Story:** As an International_Buyer, I want to understand how HN Enterprises handles shipping and compliance, so that I know what to expect when placing an order.

#### Acceptance Criteria

1. THE Export_Info_Section SHALL include a heading whose visible text is either "Export Information" or "Shipping & Delivery" — no other heading text is permitted for this section.
2. THE Export_Info_Section SHALL describe domestic shipping services covering delivery within India.
3. THE Export_Info_Section SHALL describe international export services covering overseas shipment from India.
4. THE Export_Info_Section SHALL list the export process as an ordered sequence of exactly five named steps rendered as distinct visual elements: (1) Enquiry, (2) Order Confirmation, (3) Packaging, (4) Dispatch, (5) Delivery.
5. THE Export_Info_Section SHALL include a dedicated statement explicitly confirming that both phytosanitary certificates and export documentation are prepared and handled by HN Enterprises on behalf of the buyer.
6. THE Export_Info_Section SHALL present domestic and international information in two separate containers, each with its own visible sub-heading, so that a Visitor can distinguish between the two service types without reading the full text of both containers.

---

### Requirement 7: Enquiry / Contact Form

**User Story:** As a Visitor, I want to submit an export enquiry directly from the website, so that I can reach HN Enterprises without needing to manually compose an email.

#### Acceptance Criteria

1. THE Enquiry_Form SHALL include the following mandatory fields: Full Name, Email Address, Phone Number (digits only, minimum 7 digits), Country, Flower Variety (dropdown or multi-select listing all 20 varieties), Enquiry Type (Domestic / International), Quantity / Volume (numeric value with a unit label, e.g., stems or kg), and Message.
2. THE Enquiry_Form SHALL include a "Send Enquiry" submit button.
3. WHEN a Visitor submits the Enquiry_Form with all mandatory fields completed, THE Enquiry_Form SHALL compose and send an email to the Enquiry_Email (hn.enterpriseexport@gmail.com) containing all submitted field values.
4. WHEN a Visitor submits the Enquiry_Form with one or more mandatory fields empty or invalid (including Phone Number containing fewer than 7 digits or non-digit characters), THE Enquiry_Form SHALL display an inline validation error next to each offending field before any submission is attempted.
5. WHEN the Email Address field contains a value that does not match the format `local-part@domain.tld`, THE Enquiry_Form SHALL display a field-level error message adjacent to the Email Address field.
6. WHEN a Visitor arrives at the Enquiry_Form via an "Enquire Now" button on a Flower_Card, THE Enquiry_Form SHALL pre-populate the Flower Variety field with the corresponding flower name.
7. WHEN a Visitor successfully submits the Enquiry_Form, THE Enquiry_Form SHALL display a confirmation message reading "Thank you! Your enquiry has been sent. We will respond shortly." and SHALL clear all form fields.
8. IF the email send operation fails after a Visitor submits a valid Enquiry_Form, THE Enquiry_Form SHALL display an error message instructing the Visitor to contact HN Enterprises directly at hn.enterpriseexport@gmail.com.
9. THE Enquiry_Form SHALL include the company email address (hn.enterpriseexport@gmail.com) as a visible "or email us directly" fallback contact.

---

### Requirement 8: Footer

**User Story:** As a Visitor, I want to find company contact details and quick links at the bottom of every page, so that I can access key information without scrolling back to the top.

#### Acceptance Criteria

1. THE Footer SHALL display the company name "HN Enterprises" and the domain "hnEnterprises.com".
2. THE Footer SHALL display the Enquiry_Email address (hn.enterpriseexport@gmail.com) as a clickable `mailto:` link.
3. THE Footer SHALL include quick navigation links to the major page sections: Home, About, Our Flowers, Export Info, Contact — each link SHALL resolve to its corresponding section on the same page.
4. THE Footer SHALL display a copyright notice in the format "© [Year] HN Enterprises. All rights reserved." where [Year] is dynamically rendered as the current calendar year via JavaScript at runtime, automatically updating each year without requiring a manual code change.
5. THE Footer SHALL include the tagline "Exporting India's Finest Flowers — Domestically & Internationally" as a fixed normative string, displayed as a visible text element within the Footer boundaries.

---

### Requirement 9: Responsive Design and Cross-Browser Compatibility

**User Story:** As a Visitor using any device or browser, I want the Website to display correctly and be fully usable, so that I am not blocked by layout or rendering issues.

#### Acceptance Criteria

1. THE Website SHALL render without horizontal overflow and SHALL allow all interactive elements (buttons, links, form fields) to be activated at viewport widths from 320 px to 2560 px.
2. THE Website SHALL pass basic accessibility checks: all images SHALL include descriptive `alt` text, and all form fields SHALL have associated `<label>` elements.
3. THE Website SHALL load and render without layout breakage or JavaScript errors in the latest stable versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.
4. WHEN measured using Google Lighthouse in desktop mode on the deployed site, THE Website SHALL achieve a Performance score of 70 or above, with all measurements taken on a standard broadband connection with browser caching cleared.
5. WHEN a touch-screen Visitor uses the Website on a mobile device, THE Website SHALL allow vertical scrolling by swiping and SHALL activate interactive elements (buttons, links, form fields) on a single tap without requiring a double-tap or long-press.

---

### Requirement 10: Visual Design and Branding

**User Story:** As a Visitor, I want the Website to look professional and consistent with a premium flower export company, so that I feel confident engaging with HN Enterprises.

#### Acceptance Criteria

1. THE Website SHALL use a cohesive color palette aligned with floriculture branding — employing greens, whites, and accent floral colors (e.g., pinks, reds, or purples).
2. THE Website SHALL use consistent typography throughout: a single serif or elegant sans-serif font for headings and a readable sans-serif font for body text.
3. ALL Flower_Cards in the Flower_Catalog SHALL maintain a fixed, identical pixel width and height (e.g., 280 × 320 px per card) and a consistent image aspect ratio (e.g., 4:3 or 1:1) across all devices and breakpoints, scaling uniformly within the responsive grid rather than varying in proportions between cards.
4. THE Website SHALL not include any placeholder "Lorem Ipsum" text in the final delivered version.
5. THE Website SHALL use high-quality imagery for the Hero_Section and decorative sections, avoiding pixelated or stretched assets.
