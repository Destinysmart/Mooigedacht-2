# Mooigedacht Collective Website Refresh & Brand Lookbook Alignment

Revitalize the Mooigedacht Collective farm stay website to match the XXH Studio Lookbook and client feedback, integrating nature-inspired editorial aesthetics, a soft sage eucalyptus booking showcase, and comprehensive valley guides while preserving existing amenities and cottage details.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1 clarification:
> - **Booking Banner Color**: Soft sage eucalyptus green (`#8F9E8D` / `#94A392`) as highlighted in the client swatch note.
> - **Booking Channel Presentation**: Three visual editorial cards highlighting Airbnb, Lekkeslaap (South Africa's beloved accommodation platform), and Direct Booking.
> - **Direct Key Features**: Three visual anchor cards directly beneath the booking section for **Hike & The Camino**, **Local Visits & Views**, and **Farm Shop & Produce**.
> - **Preservation of Beloved Core Features**: In line with the client's voice note, the rich original amenities grid with cute icons, winter-ready features, Heritage Cottage photo gallery, and Superhost Carine's verified reviews will remain seamlessly integrated beneath the new editorial intro flow.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Mooigedacht Collective as a serene, off-the-grid Karoo/Tsitsikamma mountain farm stay where "the time is slow, the air is clean, and the water is cool." It provides clear booking paths across Airbnb, Lekkeslaap, and Direct Inquiries, alongside an immersive guide into hikes, local artisan produce, valley stories, and flora/fauna.
- **Target Audience / Persona**: Travelers, eco-tourists, slow-travel seekers, trail runners, and digital nomads looking for tranquil South African farm retreats with authentic hospitality and natural mountain immersion.
- **Key Value**: Bridges the high-end editorial lookbook vision (greens, soft earth tones, mountain mist, linen textures) with practical booking utility and rich on-site amenities.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & Impression**: Visitor arrives at a full-bleed panoramic image of the green valley and misty foothills, framed by classic typography (`MOOIGEDACHT` wordmark and quiet tagline).
2. **Top Navigation**: Navigation bar following the Lookbook direction: left-hand exploration trigger & social touchpoints, central brand feel, and a right-aligned "Book Your Stay" call to action.
3. **Introductory Welcome**: Warm family welcome copy articulating the multi-generational farm heritage, respect for the mountains, fresh water, and bird life.
4. **Editorial Booking Section ("Book Your Stay")**:
   - Distinctive soft sage eucalyptus background section (`#8F9E8D` / `#94A392`).
   - "Kick your boots off and stay awhile" sub-heading.
   - Three editorial cards:
     - **Book on Airbnb**: Highlighting Superhost status, fiat payments, and 51+ five-star reviews.
     - **Book on Lekkeslaap**: Dedicated South African local booking portal integration with instant availability checks.
     - **Book Directly**: Direct inquiry form modal or WhatsApp direct reservation with personalized farm assistance and best rate guarantee.
5. **Key Experience Anchors (Triad Feature Section)**:
   - **01. Hike & The Camino**: Trails directly from the deck, waterfall hikes, and GPS/Strava/AllTrails info.
   - **02. Local Visits & Views**: Hidden gems in and around Kareedouw valley, scenic coastal lookouts, and neighboring artisanal spots.
   - **03. Farm Shop & Provisions**: Hand-crafted farm pantry, frozen home-cooked meals, artisanal honey, and fresh mountain borehole water.
6. **Preserved Rich Amenities & Cottage Tour**:
   - The original amenity badges (Private Pool, Hot Tub, Free Wi-Fi, Full Kitchen, Carport, Pet-Friendly, Fireplace & Braai).
   - Winter-ready comforts (Electric Blankets, Gas Heater, Firewood supply).
   - Heritage Cottage photo gallery carousel and lightbox.
   - Verified guest testimonials and host profile for Carine.
7. **Valley Guide & Extended Tabs**:
   - Interactive Valley Explorer drawer / navigation covering the 10 client lookbook topics (Cottages, Camping, The Camino, Farm Shop, Local Visits, Valley Stories, Valley Map, Trails & Hiking, Fauna & Flora, About the Family & Team).

### Visual Identity & Theme
- **Color Palette (Derived from XXH Studio Lookbook)**:
  - Dominant Greens: Hero Deep Olive (`#3A4028`), Muted Sage Eucalyptus (`#8F9E8D` / `#94A392`), Olive Light (`#6B7554`).
  - Warm Earth Tones: Sunflower (`#B5A248`), Toast (`#C2B27F`), Macadamia Cream (`#DFD8C0` / `#F7F5F0`).
  - Secondary Accents: Fresh Linen soft blue (`#B1BDDF`), Sunburn terracotta (`#AE7E5D`), Amber Glass (`#602C14`).
- **Typography**:
  - Headings & Subheadings: Cormorant Garamond serif, tracking-wide, balanced line wraps.
  - Body & Micro-copy: Jost / clean modern sans-serif with high readability and generous line height.
- **Anti-Slop Discipline**:
  - No generic purple pills or artificial status tickers.
  - Clean unboxed metadata with dot (`·`) dividers.
  - Subtle hairline borders and generous spatial margins.

---

## 3. Key Product Decisions & Trade-Offs

- **Preserving Original Amenities While Introducing Editorial Flow**:
  - *Chosen Approach*: Place the new editorial Lookbook sections (Hero, Welcome, Sage Booking Banner, 3 Anchor Feature Cards) at the top of the narrative, followed smoothly by the Heritage Cottage amenities and photo gallery as requested by the client's voice note.
  - *Why*: Delivers the new warmth and visual elegance without throwing away the concrete booking details, verified host credentials, and amenity specifics that build guest trust.
- **Three-Channel Booking UX**:
  - *Chosen Approach*: Card 1 (Airbnb), Card 2 (Lekkeslaap), Card 3 (Direct Booking Inquiry Modal).
  - *Why*: Accommodates both international tourists (Airbnb) and South African domestic travelers (Lekkeslaap), while offering direct inquiries to maximize host margin.
- **Interactive Valley Guide**:
  - *Chosen Approach*: Accessible exploration modal and dedicated section tabs covering all 10 lookbook items with curated content, trail details, and flora/fauna information.
  - *Why*: Fulfills the client's roadmap for upcoming illustrations and maps while providing an immediate, rich browsing experience.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                          App.tsx                            │
│           (Router, Smooth Scroll Spring, Theme CSS)         │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼─────────────┐ ┌──────────────▼──────────────┐
│         Navbar.tsx         │ │         Footer.tsx          │
│ • Menu drawer / Top links  │ │ • Lookbook navigation       │
│ • Book Your Stay CTA       │ │ • Valley contact & socials  │
└────────────────────────────┘ └─────────────────────────────┘
               │
┌──────────────▼─────────────────────────────────────────────┐
│                       Home.tsx                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ 1. Panoramic Editorial Hero (Valley & Mountains)       │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 2. Welcome to Mooigedacht Collective (Story & Ethos)   │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 3. Sage Eucalyptus "Book Your Stay" Section            │ │
│ │    • Airbnb Card (Superhost, Reviews)                  │ │
│ │    • Lekkeslaap Card (Local SA Booking)                │ │
│ │    • Direct Booking Card (Inquiry Modal & Best Rates)  │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 4. Feature Triad: Hike & Camino | Visits | Farm Shop   │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 5. Preserved Heritage Cottage Suite                    │ │
│ │    • Key Stats (6 Guests · 2 Beds · 1 Bath)            │ │
│ │    • Photo Gallery Carousel & Lightbox                 │ │
│ │    • Full Amenities & Winter-Ready Comforts            │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 6. Verified Reviews & Superhost Carine Spotlight       │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ 7. Valley Guide Modal / Tabbed Topic Explorer          │ │
│ │    • 10 Lookbook Topics with guides, maps & info       │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### Component State Mapping
- `isBookingModalOpen`: Controls direct reservation and inquiry modal (dates, guest count, special requests, direct WhatsApp link).
- `activeValleyTab`: Manages topic switching across the 10 Lookbook categories (Camino trails, Farm Shop goods, Valley history, Fauna & Flora).
- `lightboxIndex` / `isLightboxOpen`: Preserves smooth photo inspection across cottage and farm scenery.

---

## 5. Planned Verification Steps

1. Verify Tailwind CSS theme tokens (`--color-sage`, Lookbook colors) and typography consistency in `src/index.css`.
2. Ensure responsive layout integrity on mobile (375px), tablet (768px), and desktop (1440px).
3. Validate all interactive controls (booking modal triggers, carousel navigation, tab switching, copy-to-clipboard actions).
4. Run `compile_applet` and `lint_applet` to guarantee error-free compilation.
