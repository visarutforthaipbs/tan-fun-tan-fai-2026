# Project: Tan Fun Tan Fai (ทันฝุ่น ทันไฟ) 🌫️🔥

**Tagline:** Stopping the "Loop of Ignorance" in Northern Thailand's Haze Crisis.
**Status:** In Design / Prototyping Phase
**Primary Contact:** [Your Name/Organization]
** language ** everything must be in Thai all content text in the website
---

## 1. The Core Mission 🎯

**"Tan Fun Tan Fai"** (meaning *Up-to-Speed on Dust, Up-to-Speed on Fire*) is a digital platform designed to be the definitive "Center Point" for the Northern Thailand Haze Crisis.

Our goal is **not** just to show AQI numbers (other apps do that).
Our goal is to **fix the information gap.**

Every year, new residents and concerned citizens "start from zero," asking the same questions and proposing the same failed solutions. This platform serves as:
1.  **The Onboarding Guide:** Quickly educating newcomers on the complex reality (Geography + Economics + Meteorology).
2.  **The Civic Memory:** Tracking what solutions have been tried, what failed, and what is currently in progress, so we stop going in circles.

---

## 2. The Problem We Are Solving 📉

### The "Loop of Ignorance"
Every February, the cycle repeats:
1.  **The Shock:** Sky turns white. PM2.5 hits hazardous levels.
2.  **The Outrage:** Newcomers and locals get angry. "Why isn't the government spraying water?" "Why don't they just arrest the farmers?"
3.  **The Repetition:** Activists waste energy explaining *why* spraying water doesn't work or *why* farmers have no economic choice.
4.  **The Burnout:** By April, everyone gives up. Nothing changes.

**Tan Fun Tan Fai interrupts this cycle** by providing immediate context and historical data, turning "Outrage" into "Informed Action."

---

## 3. Target Audience 👥

1.  **The "Newcomer" (Primary):**
    * *Who:* Digital nomads, university students, new expats, or Thais moving from Bangkok.
    * *Need:* Immediate safety ("Is it safe?") and rapid education ("Why is this happening?").
2.  **The "Concerned Citizen":**
    * *Who:* Long-term residents who want to push for policy change.
    * *Need:* A tracker of government promises and a history of past policies to hold officials accountable.
3.  **The "Activist/Researcher":**
    * *Who:* NGOs and journalists.
    * *Need:* A central repository of data, myths vs. facts, and a calendar of events.

---

## 4. Key Features & Architecture 🏗️

The website is structured into 5 core pillars:

### A. The Dashboard (Home)
* **Real-time Triage:** Big, bold AQI status tailored for health (e.g., "Hazardous: Wear N95").
* **Breathing Forecast:** A predictive graph (Next 6-12 hours) to help users plan their day.
* **"Newcomer Mode":** A toggle that simplifies technical jargon into plain language.

### B. The Context (Haze 101)
* **"The Wok" Visualization:** Interactive diagram of Chiang Mai’s valley geography (Temperature Inversion).
* **The Source Pie Chart:** Breakdown of Corn vs. Forest Fire vs. Traffic.
* **Myth Buster:** "Spraying Water" vs. "Physics" – debunking common rumors.

### C. The Solution Tracker (Archive)
* **Kanban Board Interface:**
    * **To Do:** Proposed policies (e.g., Clean Air Act).
    * **In Progress:** Active pilots (e.g., Fire-D App).
    * **Done / Failed:** Historical record of what didn't work and *why* (e.g., "2020 Total Burn Ban").

### D. Survival Guide
* **Clean Air Map:** Crowdsourced map of "Safe Spaces" (Cafes/Libraries with HEPA filters).
* **DIY Protection:** Tutorials on building Corsi-Rosenthal boxes (Fan + Filter).

### E. Action Hub
* **Event Calendar:** Town halls, volunteer firebreak digging.
* **Direct Support:** Links to donate to frontline firefighters (No middleman).

---

## 5. Design System Overview 🎨

**Design Philosophy:** "Clear the Air." High contrast, urgent but hopeful.

* **Primary Color:** `Burning Orange (#F15A24)` – Used for alerts, heat, and calls to action.
* **Secondary Color:** `Clean Air Teal (#008C99)` – Used for solutions, safe zones, and verified facts.
* **Typography:** `Prompt` (Headings) + `Sarabun` (Body) for maximum Thai/English legibility.

*(See `design_system.md` for full specs)*

---

## 6. Technical Recommendations (Suggested Stack) 💻

* **Frontend:** React.js or Next.js (for SEO and speed).
* **Styling:** Tailwind CSS (for rapid UI development using our Design System).
* **Data Sources:**
    * **AQI:** OpenAQ API or DustBoy API (Local Thai sensors).
    * **Maps:** Mapbox or Google Maps Platform.
    * **Content:** Headless CMS (like Strapi or Contentful) to allow non-tech volunteers to update the "News" and "Tracker."

---

## 7. Roadmap 🗺️

* **Phase 1 (MVP):** Launch Home Dashboard + Haze 101 (Static Content).
* **Phase 2 (Data):** Integrate Real-time AQI API + "Breathing Forecast."
* **Phase 3 (Community):** Launch the "Solution Tracker" (Database of policies) + Clean Air Map.
* **Phase 4 (Localization):** Full English/Thai/Chinese language support.

---

## 8. How to Contribute 🤝

* **Designers:** Check the Figma file [Link Pending] and `design_system.md`.
* **Developers:** Repo at [GitHub Link Pending]. Branch off `main`.
* **Researchers:** Help us populate the "Myth vs. Fact" and "Policy History" database.