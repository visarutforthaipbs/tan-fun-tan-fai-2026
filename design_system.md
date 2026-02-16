# Tan Fun Tan Fai (ทันฝุ่น ทันไฟ) - Website Design Document

**Project Goal:** A centralized hub for Northern Thailand's haze crisis, focusing on onboarding newcomers, tracking policy history, and providing real-time survival data.
**Target Audience:** New residents, digital nomads, students, and concerned locals.

---

## 1. Design System
**Brand Concept:** "Clear the Air" — Urgent, Data-Driven, Transparent.

### Color Palette

**Principle:** 3 main colors only. All UI elements must derive from these three.

#### 3 Main Brand Colors
| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Burning Orange** | `#F15A24` | **Primary Accent.** CTAs, Urgent Tags, Hotspots, Active states, Icons. |
| **Charcoal Black** | `#1A1A1A` | **Primary Text.** Headings, Body text, Dark sections, Secondary accents. |
| **Pure White** | `#FFFFFF` | **Backgrounds.** Cards, Clean sections, Contrast. |

#### Derived Tints (from the 3 main colors)
| Color Name | Hex Code | Derived From | Usage |
| :--- | :--- | :--- | :--- |
| **Active Orange** | `#D14010` | Burning Orange (darker) | Hover states, Active links. |
| **Pale Alert** | `#FEF0EA` | Burning Orange (10% tint) | Alert backgrounds, soft highlights. |
| **Dust Grey** | `#8C8C8C` | Charcoal Black (50% tint) | Secondary text, Timestamps, Footers. |
| **Smoke White** | `#F5F5F5` | Pure White (slightly warm) | Main Page Background (reduces glare). |

#### Functional (AQI Standard — Do Not Change)
*These are standard US AQI colors used only for air quality data visualization.*
* **Good:** `#00E400`
* **Moderate:** `#FFFF00`
* **Unhealthy for Sensitive:** `#FF7E00`
* **Unhealthy:** `#FF0000`
* **Very Unhealthy:** `#8F3F97`
* **Hazardous:** `#7E0023`

---

### Iconography

**Library:** [Lucide React](https://lucide.dev/) (`lucide-react`)
**Rule:** No emoji anywhere in the UI. Use only Lucide icons for all visual indicators.

| Context | Icon Name | Usage |
| :--- | :--- | :--- |
| Location/Pin | `MapPin` | Station markers, map pins, addresses |
| Phone | `Phone` | Contact numbers |
| Time/Schedule | `Clock` | Opening hours, timestamps, forecast |
| Chart/Data | `BarChart3` | Section headers for data visualizations |
| News/Media | `Newspaper` | Media archive section header |
| Alert/Warning | `AlertTriangle` | Urgent warnings, CTA highlights |
| Info | `Info` | Context bars, newcomer tips |
| Navigation | `ArrowRight`, `ArrowLeft` | CTAs, breadcrumbs |
| External Link | `ExternalLink` | Outbound links |
| Search | `Search` | Search inputs |
| Filter | `Filter` | Filter dropdowns |
| Toggle State | Button styling (filled/outlined) | Use bg color change, not emoji |
| Layers/Geography | `Layers` | Geography/context modules |
| Map | `Map` | Map-related sections |
| Shield/Safety | `Shield`, `ShieldCheck` | Safety tips, protection |
| Wind/Air | `Wind` | Air flow, weather data |
| Fire | `Flame` | Fire-related stats |
| Fan/DIY | `Fan` | DIY air purifier section |
| Volunteer | `Shovel`, `Users` | Community action cards |
| Documents | `FileText` | Article/document links |
| Video | `Video` | Video content badges |
| Menu | `Menu`, `X` | Mobile navigation toggle |
| Loading | `Loader2` | Loading spinners |
| Expand/Collapse | `ChevronDown`, `ChevronUp` | Accordion, collapsibles |
| Status True | `Check` | Verified/true verdicts |
| Status False | `X` | False/debunked verdicts |
| Status Unknown | `AlertCircle` | Uncertain verdicts |
| Code/Contribute | `Github` | Footer contribution link |

---

### Typography
**Font Pair Strategy:** Modern Tech (Headings) + Readable Thai Loop (Body).

* **Headings:** `Prompt` (Google Font) - Geometric, authoritative.
    * **H1 (Hero):** 48px / Bold (700)
    * **H2 (Section):** 32px / SemiBold (600)
    * **H3 (Card Title):** 24px / Medium (500)
* **Body:** `Sarabun` (Google Font) - Looped, high legibility for long reads.
    * **Body Text:** 16px / Regular (400) / Line-height 1.6
    * **Caption/Labels:** 12px / Prompt Medium / Uppercase

---

### UI Components

#### Buttons
* **Primary (Action):**
    * Fill: `#F15A24`
    * Text: `#FFFFFF`
    * Radius: `8px`
    * *Usage:* "Donate", "Check Map", "Sign Petition"
* **Secondary (Ghost):**
    * Border: 2px solid `#F15A24`
    * Text: `#F15A24`
    * Fill: Transparent
    * *Usage:* "Read History", "Learn More"

#### Cards (The "Floating" Container)
* **Background:** `#FFFFFF`
* **Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.08)` (Soft lift)
* **Border Radius:** `12px`
* **Padding:** `24px`

#### Status Pills (Tags)
* **Pending/Discussing:** Bg `#FEF0EA` + Text `#F15A24`
* **Implemented/Active:** Bg `#F5F5F5` + Text `#1A1A1A`
* **Failed/Stalled:** Bg `#F5F5F5` + Text `#8C8C8C`

---

## 2. Information Architecture (Sitemap)

1.  **Home / Dashboard:** The Pulse (Status + Triage).
2.  **Context (Haze 101):** The Education (Geography, Economics, Myths).
3.  **Tracker (The Archive):** The History (Policy Kanban Board).
4.  **Survival Guide:** The Utility (Masks, Purifiers, Safe Spots).
5.  **Get Involved:** The Action (Volunteering, Events).

---

## 3. Wireframe Specifications

### Page 1: Home (The Dashboard)
**Goal:** Answer "Is it safe?" and "Where do I start?"
* **Header:** Logo | Nav Links | **[Toggle: Newcomer Mode]**
* **Hero Section:**
    * Background: Live AQI Color Gradient (Mesh of `#F15A24` to White).
    * Content: Big AQI Number + Health Status (e.g., "Hazardous").
    * Feature: **Breathing Forecast Graph** (Next 6 hours).
* **Triage Bar (Sticky):** 3 Quick Actions:
    1.  [Is it safe to exercise?]
    2.  [Where is the smoke from?]
    3.  [I'm new here - Start Here]
* **Updates Feed:** Horizontal scroll of recent "Fire Alerts" or "Official Announcements".

### Page 2: The Context (Haze 101)
**Goal:** Stop the "Starting from Zero" loop.
* **Section A: The "Wok" Diagram:**
    * Interactive visual of Northern Thailand's topography.
    * Toggle layers: [Geography] [Wind Direction] [Inversion Layer].
* **Section B: The Pie Chart of Blame:**
    * Interactive chart showing sources: Agriculture (Corn), Forest Fires, Traffic, Transboundary.
    * *Click Action:* Clicking "Corn" reveals the economic reality of contract farming.
* **Section C: Myth vs. Fact:**
    * Grid layout of cards.
    * *Example:* "Myth: Spraying water helps." [X icon] vs "Fact: Particles are too small." [Check icon]

### Page 3: Solution Tracker (Civic Archive)
**Goal:** Show what has been tried to prevent repetitive discussions.
* **Layout:** **Kanban Board** (Columns).
* **Column 1: Proposed (Wishlist)**
    * Card: "Clean Air Act" (User Votes: 5k).
* **Column 2: In Progress (Testing)**
    * Card: "Fire-D App Registration" (Status: Active Pilot).
* **Column 3: Failed / Learned (The Archive)**
    * Card: "Total Burning Ban (Jan-April)"
    * *Tag:* [Unenforceable]
    * *Detail:* "Failed due to lack of patrol budget and farmer economic necessity."

### Page 4: Survival Guide
**Goal:** Immediate health protection.
* **Feature: Clean Air Map:**
    * Google Maps Embed.
    * Pins: [MapPin black] Safe Room (Free), [MapPin orange] Co-working (Paid/HEPA).
* **Feature: Gear Guide:**
    * Comparison Table: N95 vs Surgical Masks (Visual "Do/Don't").
    * DIY Tutorial: "How to build a Corsi-Rosenthal Box" (Fan + Filter).

### Page 5: Action & Community
**Goal:** Convert frustration into action.
* **Calendar:** Upcoming Town Halls, Protest Gatherings, Volunteer Days.
* **Donation Widget:**
    * Direct links to: "Mae Hong Son Firefighters", "Flight of the Gibbon Fire Unit".
    * *Note:* No direct money handling; link to sources.