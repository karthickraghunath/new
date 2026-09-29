# Implementation Plan: HN Enterprises Flower Website

## Overview

This implementation plan extracts 20 flower images from PDFs, builds a responsive single-page website with 8 sections, implements a validated enquiry form, and includes deployment guidance. The site uses vanilla HTML/CSS/JS for the frontend and Python (PyMuPDF) for PDF image extraction. Tasks are ordered by dependency: PDF extraction → image assets → HTML structure → CSS styling → JS functionality → testing → deployment.

## Tasks

- [x] 1. Extract 20 flower images from PDFs using Python + PyMuPDF
  - Install PyMuPDF library (`pip install PyMuPDF`)
  - Create `pdf-extract.py` script that:
    - Processes all 20 PDF files in `d:\hn\flowers_pictures_types\`
    - Extracts images from each PDF's first page
    - Saves extracted images to `assets/flowers/` directory
    - Normalizes filenames (fix "Floer" → "Flower", handle special characters)
  - Run the script to generate 20 flower images
  - Verify all 20 images are created with correct filenames matching flower varieties
  - _Requirements: 4.3 (Flower Catalog images), PDF Extraction approach from design_

- [x] 2. Create image assets directory structure
  - Create `assets/flowers/` directory
  - Create `assets/images/` directory for hero and decorative images
  - Place extracted flower images in `assets/flowers/` (20 files)
  - Add hero section background image to `assets/images/`
  - Add decorative section images as needed
  - _Requirements: 4.3 (Flower Catalog images), Visual Design (Requirement 10)_

- [ ] 3. Create HTML structure with semantic sections
  - [ ] 3.1 Create `index.html` with DOCTYPE, meta tags, and proper structure
    - Include viewport meta tag for responsive design
    - Add title and meta description for SEO
    - Link external CSS and JS files
    - _Requirements: 9.3 (Cross-browser compatibility)_
  
  - [ ] 3.2 Implement Navigation Bar section
    - Fixed header with HN Enterprises branding
    - 6 navigation links (Home, About, Our Flowers, Why Choose Us, Export Info, Contact)
    - Hamburger menu wrapper for mobile view
    - Smooth scrolling anchor links
    - _Requirements: 1.1-1.9 (Navigation structure and behavior)_
  
  - [ ] 3.3 Implement Hero Section
    - Full viewport height (100vh)
    - Background image with object-fit cover
    - Primary heading "HN Enterprises"
    - Tagline: "Delivering India's Finest Flowers — Across India & Around the World"
    - Domain text: "hnEnterprises.com"
    - Two CTA buttons (Explore Our Flowers, Send an Enquiry)
    - _Requirements: 2.1-2.8 (Hero section requirements)_
  
  - [ ] 3.4 Implement About Section
    - "About Us" heading
    - Company description paragraph
    - Service range indication (domestic + international)
    - Contact email: hn.enterpriseexport@gmail.com
    - Visual element (image or decorative graphic)
    - _Requirements: 3.1-3.5 (About section requirements)_
  
  - [ ] 3.5 Implement Flower Catalog with 20 cards
    - Section heading containing "Flower" or "Flowers"
    - Grid container for responsive flower cards
    - Create 20 FlowerCard components with:
      - Flower variety name as text label
      - Image with source from assets/flowers/
      - Alt text with variety name for accessibility
      - "Enquire Now" button with variety name data attribute
    - _Requirements: 4.1-4.8 (Flower catalog requirements)_
  
  - [ ] 3.6 Implement Why Choose Us Section
    - "Why Choose HN Enterprises" heading
    - 4 differentiator tiles with icons
    - Content: Freshness & Quality, Wide Variety (20+ types), Domestic & International Shipping, Reliable Packaging
    - Responsive grid layout
    - _Requirements: 5.1-5.4 (Why choose section requirements)_
  
  - [ ] 3.7 Implement Export Information Section
    - Exact heading: "Export Information"
    - Two separate containers (Domestic / International)
    - 5-step export process as numbered list
    - Phytosanitary certificate and documentation statement
    - _Requirements: 6.1-6.6 (Export info section requirements)_
  
  - [ ] 3.8 Implement Enquiry Form with all fields
    - Form with id="enquiry-form"
    - 8 required fields: Name, Email, Phone, Country, Flower Variety (dropdown), Enquiry Type (Domestic/International), Quantity, Message
    - All fields with proper input types and labels
    - "Send Enquiry" submit button
    - Email fallback: hn.enterpriseexport@gmail.com
    - Success/error message containers
    - _Requirements: 7.1-7.9 (Enquiry form requirements)_
  
  - [ ] 3.9 Implement Footer section
    - Company name "HN Enterprises" and domain "hnEnterprises.com"
    - Clickable email link (mailto:hn.enterpriseexport@gmail.com)
    - Navigation links (Home, About, Our Flowers, Export Info, Contact)
    - Dynamic copyright with current year via JavaScript
    - Tagline: "Exporting India's Finest Flowers — Domestically & Internationally"
    - _Requirements: 8.1-8.5 (Footer requirements)_

- [x] 4. Implement CSS styling with responsive breakpoints
  - [x] 4.1 Create main.css with base styles
    - CSS reset/normalize
    - Brand color palette (green primary #2D6A4F, accent #D4A373)
    - Typography (serif for headings, sans-serif for body)
    - Consistent spacing and margins
    - Flower card dimensions (280 × 320px)
    - Image aspect ratio (4:3 or 1:1)
    - _Requirements: 10.1-10.5 (Visual design requirements)_
  
  - [x] 4.2 Implement responsive breakpoints
    - Desktop (≥ 1024px): 4 columns for flower grid
    - Tablet (768px - 1023px): 2 columns for flower grid
    - Mobile (< 768px): 1-2 columns with hamburger menu
    - _Requirements: 10.1 (Responsive design)_
  
  - [x] 4.3 Create responsive.css for media queries
    - Navigation bar collapse at < 768px
    - Grid column adjustments
    - Font size scaling
    - Touch target sizing for mobile
    - _Requirements: 9.1, 9.5 (Responsive design and touch)_

- [ ] 5. Implement JavaScript functionality
  - [x] 5.1 Create main.js with navigation and scroll functionality
    - Smooth scrolling to sections (400ms target)
    - Navigation link click handlers
    - Active section highlighting on scroll
    - Hamburger menu toggle at < 768px
    - Menu collapse after link selection
    - _Requirements: 1.4-1.9 (Navigation behavior)_
  
  - [x] 5.2 Create form.js with validation logic
    - Email format validation (local-part@domain.tld)
    - Phone number validation (digits only, min 7 digits)
    - Required field checking
    - Inline error messages
    - Form pre-population from flower card clicks
    - Form reset after successful submission
    - _Requirements: 7.4-7.7 (Form validation and pre-population)_
  
  - [x] 5.3 Create mailto submission handler
    - Compose email body from form values
    - Open mailto link to hn.enterpriseexport@gmail.com
    - Success message display
    - Error handling with fallback message
    - _Requirements: 7.3, 7.8 (Email submission and error handling)_
  
  - [x] 5.4 Add image loading error handling
    - Fallback text display when image fails to load
    - Flower card resilience to missing assets
    - _Requirements: 4.8 (Image fallback)_

- [ ] 6. Testing and verification
  - [ ] 6.1 Test PDF extraction script
    - Run pdf-extract.py on all 20 PDFs
    - Verify all 20 images created
    - Check filenames match variety names exactly
    - _Requirements: 4.3 (Flower images from PDFs)_
  
  - [ ] 6.2 Test responsive design at all breakpoints
    - Desktop (≥ 1024px): 4 columns flower grid, horizontal nav
    - Tablet (768px - 1023px): 2 columns flower grid
    - Mobile (< 768px): 1-2 columns, hamburger menu
    - _Requirements: 9.1 (Responsive design)_
  
  - [ ] 6.3 Test form validation
    - Valid email format acceptance
    - Invalid email rejection with error message
    - Phone number validation (digits only, min 7)
    - Required field checking
    - Pre-population from flower cards
    - _Requirements: 7.4-7.7 (Form validation)_
  
  - [ ] 6.4 Test navigation smooth scrolling
    - Click all navigation links
    - Verify 400ms smooth scroll timing
    - Active section highlighting
    - Mobile menu toggle functionality
    - _Requirements: 1.4-1.9 (Navigation behavior)_
  
  - [ ] 6.5 Test form email submission
    - Submit valid form data
    - Verify email client opens with correct pre-composed message
    - Test success message display
    - Test form reset after submission
    - _Requirements: 7.3, 7.7 (Email submission)_
  
  - [ ] 6.6 Accessibility verification
    - All images have descriptive alt text
    - All form fields have associated labels
    - Keyboard navigation works
    - Color contrast meets WCAG AA
    - _Requirements: 9.2 (Accessibility checks)_

- [ ] 7. Deployment preparation
  - [ ] 7.1 Optimize images
    - Compress flower images without quality loss
    - Optimize hero section background image
    - Convert to WebP format where supported
    - _Requirements: 10.5 (Image quality)_
  
  - [ ] 7.2 Minify CSS and JavaScript
    - Create production CSS bundle
    - Create production JavaScript bundle
    - Remove unused styles and comments
    - _Requirements: 9.3 (Performance)_
  
  - [ ] 7.3 Create deployment checklist document
    - Pre-deployment: functionality verification, visual review, accessibility audit, performance test
    - Deployment: file upload or git push, custom domain configuration, SSL setup
    - Post-deployment: live testing, analytics setup (optional), monitoring configuration
    - _Requirements: 9.3, 9.4 (Cross-browser compatibility and performance)_
  
  - [ ] 7.4 Create README.md with setup instructions
    - Prerequisites (Python, PyMuPDF, text editor)
    - PDF extraction instructions
    - Development setup
    - Deployment instructions (GitHub Pages, Netlify, etc.)
    - Troubleshooting guide
    - _Requirements: 9.3 (Deployment documentation)_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- PDF extraction must be completed before HTML image references are created
- CSS and JavaScript can be developed in parallel after HTML structure is created
- Testing should occur after each major component is implemented
- Deployment checklist provides final verification before going live

## Checklist

- [ ] All PDF images extracted successfully (20 files)
- [ ] HTML structure complete with semantic sections
- [ ] Responsive CSS implemented at all breakpoints
- [ ] JavaScript functionality working (navigation, form, validation)
- [ ] All tests passing (responsive, form validation, accessibility)
- [ ] Images optimized for production
- [ ] Deployment checklist reviewed and completed

