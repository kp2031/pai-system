---
migrated: 2025-09-20T01:46:15.848637
source: apple-notes-exporter
original_path: Backup/iCloud/Work brainstorming /Copilot PowerPoint prompts.md
vault_folder: Areas/Work
tags: [work]
---
# Copilot PowerPoint prompts

The Foundational "Meta-Prompt"
Before the top 10, understand this core structure. Nearly all great prompts for this purpose should include these four elements. Use this as a template to build your own.
 * Persona: "Act as a senior strategy consultant from a top-tier firm (like McKinsey, BCG, Bain)."
 * Context: "We are advising [Client Name], a [Client Description], on the strategic challenge of [Problem Statement]."
 * Task: "Your task is to create the content for a single PowerPoint slide that..."
 * Format: "The output must be in a structured format:
   * Slide Title: A declarative sentence stating the main finding (the 'answer first').
   * Executive Takeaway: A 1-2 sentence summary explaining the 'so what' for the client.
   * Body Content: Use structured bullet points, MECE categories, and quantified insights.
   * Visual Suggestion: Describe the ideal chart or visual (e.g., waterfall chart, 2x2 matrix, Marimekko chart) that would present this data."
Top 10 Detailed Prompts
Here are 10 specific, powerful prompts built from that meta-structure.

1. The "Answer-First" Executive Summary (SCR Framework)
This prompt is for the most important slide in any deck: the one that can stand on its own.
The Prompt:
Act as a senior strategy consultant from a top-tier firm. Our client is [e.g., "GlobalBrew," a leading coffee-pod manufacturer] facing [e.g., "declining market share in the premium segment due to new, agile competitors"].

Your task is to create the content for a single Executive Summary slide using the Situation-Complication-Resolution (SCR) framework. The slide must provide a complete overview of our findings and recommendations.

The output must be in the following structured format:

**Slide Title:** A strong, declarative title summarizing the core recommendation. Example: "Reclaiming Premium Leadership Requires a Three-Pronged Strategy Focused on Product Innovation, Direct-to-Consumer, and Brand Revitalization."

**Executive Takeaway:** A concise (under 30 words) summary of the key message for the CEO.

**Body Content (using SCR Framework):**
* **Situation:** Three bullet points describing the current state of the market and the client's position. Use data. [e.g., "GlobalBrew holds 45% market share, but growth has slowed to 2% YoY."]
* **Complication:** Three bullet points detailing the core challenge or threat. This is the 'burning platform.' Quantify the risk. [e.g., "Aggressive DTC startups have captured 15% of the premium market in 2 years, eroding our margins by 5%."]
* **Resolution:** Three bullet points outlining our proposed strategic initiatives in a MECE structure. Each point should be an action. [e.g., "1. Launch an exclusive 'Artisan Roast' subscription line; 2. Overhaul the e-commerce platform to a best-in-class DTC experience; 3. Initiate a $15M marketing campaign targeting millennial consumers."]

**Visual Suggestion:** Describe a simple, powerful visual for this slide. e.g., "A simple three-column layout with icons for Situation, Complication, and Resolution to visually guide the reader through the narrative."

2. The MECE Problem Structuring (Issue Tree)
This prompt helps break down a complex problem into manageable, non-overlapping parts, which is core to consulting analysis.
The Prompt:
Act as a strategy consultant. We need to structure our analysis for the project: "How can [e.g., "HealthFirst Hospitals"] reduce patient wait times by 20% within 12 months without increasing staff costs?"

Your task is to create the content for a slide that outlines our analytical approach using a MECE "issue tree." Decompose the primary problem into at least two layers of sub-questions.

The output must be in this format:

**Slide Title:** "Framework for Reducing Patient Wait Times"

**Executive Takeaway:** "Our analysis will systematically investigate three core drivers of wait times: Patient In-take Process, Resource Scheduling, and Patient Flow & Discharge."

**Body Content (The Issue Tree):**
* **Level 1 Key Question:** How can HealthFirst reduce patient wait times by 20%?
    * **Level 2 Driver #1:** Can we optimize the Patient In-take Process?
        * **Level 3 Hypothesis:** "Are pre-registration and digital check-in underutilized?"
        * **Level 3 Hypothesis:** "Is information collection at reception redundant?"
    * **Level 2 Driver #2:** Can we improve Resource & Staff Scheduling?
        * **Level 3 Hypothesis:** "Does staff scheduling align with peak patient arrival times?"
        * **Level 3 Hypothesis:** "Can we predict patient load more accurately using historical data?"
    * **Level 2 Driver #3:** Can we accelerate Patient Flow & Discharge?
        * **Level 3 Hypothesis:** "Are lab result turnaround times a primary bottleneck?"
        * **Level 3 Hypothesis:** "Is the discharge paperwork and communication process inefficient?"

**Visual Suggestion:** "A horizontal logic tree diagram, flowing from the main question on the left to the sub-drivers on the right. Each box represents a component of the issue tree."

3. The Data-Driven Deep Dive: Waterfall Chart
This is perfect for showing the components of a change from Point A to Point B, such as explaining a profit variance.
The Prompt:
Act as a financial analyst for a strategy consulting project. Our client, [e.g., "RetailCorp"], saw their net profit decline by $15M last year. We have analyzed the drivers.

Your task is to create the content for a slide that explains this profit decline.

Here is the raw data:
* Profit in 2024: $100M
* Positive Impact from Price Increases: +$10M
* Positive Impact from New Stores: +$5M
* Negative Impact from Increased Cost of Goods Sold (COGS): -$20M
* Negative Impact from Increased SG&A Expenses: -$8M
* Negative Impact from Reduced Foot Traffic in old stores: -$2M
* Profit in 2025: $85M

The output must be structured as follows:

**Slide Title:** "Profit Declined by $15M Primarily Driven by Rising COGS and SG&A Expenses"

**Executive Takeaway:** "While pricing actions and new stores added $15M in profit, these gains were more than offset by a $28M increase in operational costs and declining traffic, highlighting a core profitability issue."

**Body Content:**
* List the components of the change clearly:
    * Beginning Profit (2024): $100M
    * Positive Drivers:
        * Price Increases: +$10M
        * New Store Openings: +$5M
    * Negative Drivers:
        * COGS Inflation: -$20M
        * Increased SG&A: -$8M
        * Legacy Store Traffic Decline: -$2M
    * Ending Profit (2025): $85M

**Visual Suggestion:** "A waterfall chart. Start with the $100M bar on the left. Show green bars rising for positive impacts and red bars falling for negative impacts, ending with the final $85M bar on the right. Each bar should be clearly labeled with the driver and the dollar amount."

4. The Competitive Landscape: 2x2 Matrix
The 2x2 is a classic consulting tool for simplifying complex market structures and showing strategic positioning.
The Prompt:
Act as a senior strategy consultant. We are analyzing the competitive landscape for our client, [e.g., "CyberSafe," a B2B cybersecurity software company].

Your task is to create the content for a slide that positions key competitors on a 2x2 matrix.

The axes should be:
* X-Axis: "Product Suite Completeness" (from Niche Solution to Full Platform)
* Y-Axis: "Market Momentum" (from Slowing Growth to High Growth)

Here is the competitor data:
* CyberSafe (Our Client): High Product Completeness, but Slowing Growth.
* Competitor A (Legacy Titan): Full Platform, Slowing Growth.
* Competitor B (Aggressive Startup): Niche Solution, High Growth.
* Competitor C (Mid-Market Player): Moderate Completeness, Moderate Growth.
* Competitor D (New Entrant): Niche Solution, High Growth but small market share.

The output must be structured as follows:

**Slide Title:** "CyberSafe is a Market Leader, but High-Growth Niche Players Threaten to Erode Position"

**Executive Takeaway:** "We occupy the 'Leaders' quadrant, but our slowing momentum is a concern as nimble, high-growth 'Challengers' innovate rapidly in specialized, high-value niches."

**Body Content (Quadrant Analysis):**
* **Top-Right (Leaders):** High Completeness, High Momentum. [Describe who is here, if anyone]. "Strategic Goal: Defend and Expand."
* **Bottom-Right (Incumbents):** High Completeness, Low Momentum. "Players: CyberSafe, Competitor A. Implication: Must innovate or risk becoming a legacy player."
* **Top-Left (Challengers):** Niche Solution, High Momentum. "Players: Competitor B, Competitor D. Implication: These are the primary acquisition targets or disruptive threats."
* **Bottom-Left (Niche Players):** Niche Solution, Low Momentum. "Players: [if any]. Implication: Low threat, monitor for potential pivots."

**Visual Suggestion:** "A 2x2 matrix with the defined axes. Place each competitor's logo in the appropriate quadrant. The size of the logo bubble could represent market share. Use callout boxes to add brief commentary for each key player."

5. The Strategic Options Analysis: Pro/Con/Implication
This prompt helps structure the critical "what should we do?" discussion, evaluating different paths forward in a balanced way.
The Prompt:
Act as a strategy consultant presenting strategic options to the board of [e.g., "EcoWear," a sustainable apparel company]. We need to decide on our primary growth vector for the next 3 years.

Your task is to create a slide that analyzes three strategic options in a MECE and objective manner.

The options are:
1.  **Organic Growth:** Double down on marketing and product development in existing markets.
2.  **Market Expansion:** Enter the European market.
3.  **M&A:** Acquire a smaller, fast-growing competitor in the footwear space.

Structure the output as follows:

**Slide Title:** "Acquisition Presents the Highest-Impact Growth Vector, Albeit with Higher Risk"

**Executive Takeaway:** "While organic growth is safest, acquiring 'SoleMate Shoes' offers a unique opportunity to accelerate our entry into a new category and capture synergies, despite integration complexities."

**Body Content (in a three-column table format):**
* **Option 1: Organic Growth**
    * **Pros:** Lower risk, leverages existing capabilities, high control.
    * **Cons:** Slower growth potential (est. 5-7% CAGR), highly competitive core market.
    * **Implication:** The "safe bet" that may not meet ambitious growth targets.
* **Option 2: Market Expansion (EU)**
    * **Pros:** Large addressable market, diversifies revenue streams.
    * **Cons:** High upfront investment ($10M+), complex regulatory hurdles, lack of brand recognition.
    * **Implication:** High potential but long time-to-profitability (3-5 years).
* **Option 3: M&A (Acquire 'SoleMate')**
    * **Pros:** Immediate market entry into footwear, potential for revenue/cost synergies, removes a competitor.
    * **Cons:** High cost of acquisition (~$50M), significant integration risk (culture, systems), potential for brand dilution.
    * **Implication:** The high-risk, high-reward option that could transform the business.

**Visual Suggestion:** "A three-column table as described above. Use simple icons (e.g., green check for Pro, red X for Con) to enhance readability. Perhaps a small 'risk/reward' scale under each option."

6. The Implementation Roadmap: Gantt-Style Phases
A recommendation is useless without a clear plan to make it happen. This prompt creates a high-level implementation plan.
The Prompt:
Act as a consulting engagement manager. We have just received board approval for our primary recommendation: [e.g., "To launch a new Direct-to-Consumer (DTC) e-commerce channel"].

Your task is to create a high-level implementation roadmap slide. The plan should be broken down into distinct phases with key milestones and a timeline.

Structure the output as follows:

**Slide Title:** "A Phased, 9-Month Roadmap to Launch Our DTC Channel"

**Executive Takeaway:** "Our plan ensures a disciplined launch, moving from foundational setup in Q1 to a pilot in Q2 and a full market launch in Q3, with clear owners for each workstream."

**Body Content (Phases & Workstreams):**
* **Phase 1: Foundation & Planning (Months 1-3)**
    * **Workstream 1 (Tech):** Select platform vendor; Develop site architecture.
    * **Workstream 2 (Ops):** Secure 3PL partner for fulfillment; Define inventory strategy.
    * **Workstream 3 (Marketing):** Define brand voice for DTC; Develop pre-launch campaign.
    * **Key Milestone:** Project Kick-off; Vendor contracts signed.
* **Phase 2: Development & Testing (Months 4-6)**
    * **Workstream 1 (Tech):** Website build & UAT; Payment gateway integration.
    * **Workstream 2 (Ops):** Warehouse system integration; Set up customer service team.
    * **Workstream 3 (Marketing):** Create launch assets; Onboard influencers.
    * **Key Milestone:** Beta site live for internal testing.
* **Phase 3: Launch & Optimization (Months 7-9)**
    * **Workstream 1 (Tech):** Public site launch; Performance monitoring.
    * **Workstream 2 (Ops):** First 1,000 orders fulfilled successfully.
    * **Workstream 3 (Marketing):** Launch marketing campaign; Analyze initial customer data.
    * **Key Milestone:** Go-Live; Post-launch review meeting.

**Visual Suggestion:** "A high-level Gantt chart. The rows are the three main workstreams (Tech, Ops, Marketing). The columns are the months (1-9), grouped by phase. Use colored bars to show the duration of each activity. Use diamond shapes to mark key milestones."

7. The "Voice of the Customer" Insight Slide
This prompt translates qualitative data (like customer interviews) into strategic insights.
The Prompt:
Act as a customer insights expert on a consulting team. We have conducted 20 in-depth interviews with our client's target customers [e.g., "lapsed premium subscribers"].

Your task is to create a slide that synthesizes the key qualitative findings into actionable themes.

Structure the output as follows:

**Slide Title:** "Customers Perceive Our Premium Offering as 'Stale' and 'Overpriced'"

**Executive Takeaway:** "Key themes from customer interviews reveal that churn is driven by a lack of new features and a perceived poor value-for-money compared to modern competitors, not by poor core service quality."

**Body Content (Thematic Analysis):**
* **Theme 1: Feature Stagnation**
    * **Supporting Quote:** "'I haven't seen a meaningful new feature in over a year. It feels like the same service I bought three years ago.' - Customer A"
    * **Insight:** The product roadmap is not delivering tangible, exciting value to justify the premium price.
* **Theme 2: Unfavorable Price-Value Equation**
    * **Supporting Quote:** "'Competitor X offers 80% of the features for 50% of the price. The math just doesn't work for you anymore.' - Customer B"
    * **Insight:** Our pricing is no longer aligned with the perceived value in today's competitive landscape.
* **Theme 3: Lack of Community/Exclusivity**
    * **Supporting Quote:** "'It just feels like a transaction. There's no community, no special events, no reason to feel loyal beyond the basic function.' - Customer C"
    * **Insight:** We are failing to build a brand 'moat' through non-product benefits, making us vulnerable to price competition.

**Visual Suggestion:** "A three-column layout, one for each theme. Each column contains a compelling quote in large, italicized font, followed by the synthesized insight in regular text. Use powerful, evocative icons for each theme (e.g., a dusty box for 'Stagnation')."

8. The Financial Projections & Business Case
This is for the critical slide that justifies an investment by showing the potential financial return.
The Prompt:
Act as a financial analyst. We are proposing a $25M investment in [e.g., "factory automation"]. Create a slide that presents the 5-year business case.

Here are the key assumptions:
* Upfront Investment: $25M (Year 0)
* Annual Savings (Labor & Efficiency): $8M/year starting in Year 1.
* Annual Maintenance Costs: $1M/year starting in Year 1.
* Discount Rate: 10%

Your task is to calculate the key financial metrics and present them clearly.

The output must be structured as follows:

**Slide Title:** "Proposed $25M Automation Investment Projects a 21% IRR and a 3.6-Year Payback"

**Executive Takeaway:** "The investment is financially compelling, generating a Net Present Value (NPV) of $11.5M over 5 years and breaking even well within the project's lifespan, making it a strong strategic move to improve long-term profitability."

**Body Content:**
* **Key Financial Metrics:**
    * **Net Present Value (NPV):** $11.5M
    * **Internal Rate of Return (IRR):** 21%
    * **Payback Period:** 3.6 Years
    * **Total Net Cash Flow (5 Years):** $35M
* **Year-by-Year Cash Flow Projection (Simple Table):**
    * Year 0: -$25M
    * Year 1: +$7M
    * Year 2: +$7M
    * Year 3: +$7M
    * Year 4: +$7M
    * Year 5: +$7M

**Visual Suggestion:** "A combination visual. On the left, use large 'call-out boxes' for the three key metrics (NPV, IRR, Payback). On the right, show a simple bar chart of the annual net cash flows, with the first bar (Year 0) going down to show the investment, and subsequent bars going up."

9. The Value Chain Analysis for Opportunity Identification
This prompt uses a classic framework to map out a business's activities and pinpoint areas for improvement or competitive advantage.
The Prompt:
Act as a strategy consultant analyzing the value chain of our client, [e.g., "FreshFarm Organics," a CPG food company].

Your task is to create a slide that maps their value chain and identifies key areas of weakness and opportunity.

Structure the output as follows:

**Slide Title:** "Significant Value Creation Opportunities Exist in Upstream 'Sourcing' and Downstream 'Marketing & Sales'"

**Executive Takeaway:** "While our 'Operations & Production' are best-in-class, our current sourcing practices limit margin potential, and our outdated marketing approach fails to capture the premium value of our brand."

**Body Content (Value Chain Analysis):**
* **Inbound Logistics (Sourcing):**
    * **Activity:** Sourcing from multiple small-scale organic farms.
    * **Weakness/Opportunity:** Inconsistent supply and high costs. **Opportunity to consolidate sourcing or establish exclusive partnerships for better pricing and quality.**
* **Operations (Production):**
    * **Activity:** Processing and packaging.
    * **Strength:** Highly efficient, low-waste process. This is a core competency.
* **Outbound Logistics (Distribution):**
    * **Activity:** Distributing via traditional grocery channels.
    * **Weakness/Opportunity:** Standard performance. No major issues but no competitive advantage.
* **Marketing & Sales:**
    * **Activity:** Trade promotions and in-store displays.
    * **Weakness/Opportunity:** Over-reliance on retailers. **Massive opportunity to build a direct brand relationship via digital marketing and storytelling about our sourcing.**
* **Service:**
    * **Activity:** Basic customer support line.
    * **Weakness/Opportunity:** Minimal engagement. Opportunity for post-purchase engagement and community building.

**Visual Suggestion:** "A horizontal chevron diagram representing the value chain (e.g., Sourcing -> Operations -> Distribution -> Marketing -> Service). Use color coding (e.g., green for strength, red for weakness, yellow for opportunity) on each chevron. Use callout boxes to highlight the key insights for the 'Sourcing' and 'Marketing' stages."

10. The Full "Ghost Deck" Outline
This is a power-prompt. Instead of one slide, you ask the AI to think like a consultant and structure the entire narrative of the presentation.
The Prompt:
Act as a Partner at a top-tier consulting firm. We are at the beginning of an engagement for our client, [e.g., "AutoCorp," a traditional automaker] struggling with the transition to Electric Vehicles (EVs).

The project's key question is: "How can AutoCorp profitably capture 15% of the EV market by 2030?"

Your task is to generate a 'ghost deck' outline. This means creating a logical, compelling storyline for the final presentation, including a title for each slide. The storyline should follow the Pyramid Principle and be MECE. Generate an outline of 10-12 slide titles.

Structure the output as a numbered list of slide titles, with a brief (1-sentence) description of each slide's purpose.

**Example Output:**

1.  **Title:** Seizing the Future: A Strategy for AutoCorp to Win in the EV Market
    * *(Purpose: The title slide)*
2.  **Title:** AutoCorp's Future is at a Crossroads: Executive Summary
    * *(Purpose: State the answer first using the SCR framework)*
3.  **Title:** The EV Market is Accelerating Faster Than Expected, with New Rules for Success
    * *(Purpose: Set the context and urgency - market trends, key segments)*
4.  **Title:** AutoCorp Currently Lags Key Competitors in Critical EV Capabilities (Battery Tech & Software)
    * *(Purpose: The core problem - a data-driven benchmark of our capabilities vs. Tesla, BYD, etc.)*
5.  **Title:** Deconstructing the Profitability Challenge in EVs
    * *(Purpose: An issue tree breaking down the problem - battery costs, scale, software monetization)*
6.  **Title:** A Three-Pillar Strategy is Required to Close the Gap and Capture 15% Market Share
    * *(Purpose: Introduce our MECE strategic framework)*
7.  **Title:** Pillar 1: Achieve Battery Leadership Through Strategic Partnerships and R&D Investment
    * *(Purpose: Deep dive into the first recommendation)*
8.  **Title:** Pillar 2: Transform the Car into a Software Platform to Create Recurring Revenue
    * *(Purpose: Deep dive into the second recommendation)*
9.  **Title:** Pillar 3: Reinvent the Go-to-Market Model with a Digital-First, Direct Sales Approach
    * *(Purpose: Deep dive into the third recommendation)*
10. **Title:** This Strategy is Projected to Capture 16% Share and Deliver a Profitable EV Business by 2029
    * *(Purpose: The business case - financial projections, required investment)*
11. **Title:** A Phased Roadmap for Immediate Action
    * *(Purpose: The implementation plan - what to do Monday morning)*
12. **Title:** Appendix
    * *(Purpose: Supporting data and analysis)*

11. The Industry Attractiveness: Porter's Five Forces
This classic framework is essential for any market entry, investment, or competitive strategy project. It provides a structured way to assess the structural profitability of an industry.
The Prompt:
Act as a senior strategy consultant. We are evaluating the attractiveness of the [e.g., "Global Cloud Gaming"] market for our client, [e.g., "Alpha Entertainment," a traditional video game publisher].

Your task is to create a slide that analyzes the industry using Porter's Five Forces framework. For each force, rate its intensity (High, Medium, or Low) and provide a one-sentence justification.

The output must be structured as follows:

**Slide Title:** "The Cloud Gaming Market Offers High Growth But is Structurally Challenged by Intense Rivalry and High Supplier Power"

**Executive Takeaway:** "While the addressable market is expanding, a profitable entry will require navigating powerful tech platform suppliers (e.g., AWS, Azure) and competing with deeply entrenched, well-capitalized rivals."

**Body Content (The Five Forces):**
* **Threat of New Entrants: Medium**
    * *Justification:* While capital requirements for content are high, underlying cloud infrastructure can be leased, lowering the barrier to entry for tech-savvy players.
* **Bargaining Power of Buyers: High**
    * *Justification:* Gamers have low switching costs between platforms and are highly sensitive to content libraries, performance, and price.
* **Bargaining Power of Suppliers: High**
    * *Justification:* Core infrastructure is dominated by a few cloud providers (Amazon, Google, Microsoft) who can command significant pricing power.
* **Threat of Substitute Products: Medium**
    * *Justification:* Traditional console and PC gaming remain viable, high-fidelity substitutes, though they lack the 'play anywhere' convenience.
* **Rivalry Among Existing Competitors: High**
    * *Justification:* The market is a battleground for tech giants (Nvidia, Microsoft, Sony) competing aggressively on price, technology, and exclusive content.

**Visual Suggestion:** "A central box labeled 'Competitive Rivalry (High)' with five arrows pointing to it, one for each force. Each arrow should be labeled with the force's name and its intensity (High/Med/Low). Use color-coding: red for High intensity, yellow for Medium, green for Low."

12. The Internal Assessment: Capability Gap Analysis
This prompt is crucial for turning strategy into action by identifying what the organization needs to be good at versus its current state.
The Prompt:
Act as a consultant focused on organizational effectiveness. Our client, [e.g., "HealthCorp," a regional pharmacy chain], has a new strategy to compete on "personalized customer wellness."

Your task is to create a slide that performs a capability gap analysis, comparing the required capabilities for the new strategy against HealthCorp's current state.

The output must be structured as follows:

**Slide Title:** "Achieving Our 'Personalized Wellness' Strategy Requires Building Critical Capabilities in Data Analytics and Digital Engagement"

**Executive Takeaway:** "While we have best-in-class operational pharmacy skills, we currently lack the core data science and digital marketing capabilities essential for delivering personalized customer experiences."

**Body Content (in a table format):**
| Strategic Capability Needed        | Current State Assessment | Gap (Significant/Moderate/None) | Priority to Close |
|------------------------------------|--------------------------|---------------------------------|-------------------|
| **Data Analytics & AI** | 1/5 (Nascent)            | Significant                     | High              |
| **Digital Customer Engagement** | 2/5 (Developing)         | Significant                     | High              |
| **Personalized Supply Chain** | 3/5 (Functional)         | Moderate                        | Medium            |
| **Pharmacist Advisory Services** | 4/5 (Advanced)           | None                            | Low               |
| **Regulatory Compliance & Safety** | 5/5 (Best-in-Class)      | None                            | Low               |

**Visual Suggestion:** "A heat map table as described above. The 'Gap' column should be color-coded: Red for Significant, Yellow for Moderate, Green for None. This provides an instant visual summary of where the most urgent problems lie."

13. The Performance Deep Dive: Benchmarking vs. Peers
Grounding your analysis in external reality is critical. This prompt creates a slide that shows how the client stacks up against competitors on key metrics.
The Prompt:
Act as an operations consultant. Our client, [e.g., "ConnectLogistics," a national shipping company], wants to understand its cost structure relative to its peers.

Your task is to create a slide benchmarking ConnectLogistics against the industry average and a best-in-class competitor, [e.g., "SwiftShip"].

Here is the data for key KPIs:
* Cost per Delivery: ConnectLogistics=$12, Industry Avg=$10, SwiftShip=$8
* On-Time Delivery Rate: ConnectLogistics=92%, Industry Avg=95%, SwiftShip=99%
* Customer Acquisition Cost (CAC): ConnectLogistics=$50, Industry Avg=$40, SwiftShip=$25

The output must be structured as follows:

**Slide Title:** "Our Cost Per Delivery and Customer Acquisition Cost are 20-50% Higher Than Industry Benchmarks"

**Executive Takeaway:** "ConnectLogistics is lagging key competitors on both cost efficiency and commercial effectiveness, indicating significant opportunities for operational improvement and a more targeted sales approach."

**Body Content (KPI Breakdown):**
* **Cost Efficiency:** "Our cost per delivery is 20% above the industry average and 50% higher than the market leader, SwiftShip."
* **Service Level:** "Our 92% on-time delivery rate is below the 95% industry standard, creating a poor customer experience."
* **Commercial Effectiveness:** "We spend twice as much as SwiftShip to acquire a new customer, suggesting our sales and marketing efforts are inefficient."

**Visual Suggestion:** "A grouped bar chart. For each KPI (Cost per Delivery, etc.), have three bars side-by-side: one for 'Our Company', one for 'Industry Average', and one for 'Best-in-Class'. Color-code the bars for instant identification (e.g., Our Company = Blue, Best-in-Class = Gold)."

14. The Advanced Market Map: Marimekko (Mekko) Chart
This is a sophisticated, data-dense visual favored by top consultancies to show multiple variables at once (e.g., segment size, segment share, and segment composition).
The Prompt:
Act as a consultant specializing in market analytics. Our client, [e.g., "FlavorCo"], competes in the non-alcoholic beverage market.

Your task is to create the content and visual description for a Marimekko (Mekko) chart that maps this market.

Here is the data:
* Market Segment 1: Carbonated Soft Drinks (CSDs). Total Market Size: $50B. FlavorCo Share: 10%.
* Market Segment 2: Bottled Water. Total Market Size: $30B. FlavorCo Share: 30%.
* Market Segment 3: Juices. Total Market Size: $15B. FlavorCo Share: 5%.
* Market Segment 4: Energy & Sports Drinks. Total Market Size: $5B. FlavorCo Share: 0%.

The output must be structured as follows:

**Slide Title:** "FlavorCo is Over-Exposed to the Slow-Growth Bottled Water Segment and Has No Presence in High-Growth Energy Drinks"

**Executive Takeaway:** "Our portfolio is concentrated in a large but competitive water segment where we are strong. We must now focus on penetrating the smaller, but rapidly growing and profitable, energy drink market to ensure future growth."

**Body Content:**
* **Insight 1 (Positioning):** "We dominate the Bottled Water segment with a 30% share, which accounts for the majority of our revenue in this landscape."
* **Insight 2 (Gap):** "We have a negligible or non-existent share in both Juices and Energy & Sports Drinks. The energy drink segment is a critical strategic gap."
* **Insight 3 (Action):** "The analysis suggests a two-pronged approach: defend our profitable share in water while building or buying our way into the energy drink category."

**Visual Suggestion:** "A Marimekko Chart.
* The X-axis represents the market segments. The width of each column is proportional to its market size (CSDs is the widest at $50B).
* The Y-axis represents market share from 0% to 100%.
* Within each column, a shaded area shows FlavorCo's market share (e.g., the 'Bottled Water' column would be 30% shaded).
* This visual will instantly show that our 'shaded area' is large in a mid-sized segment but non-existent in the valuable high-growth segments."

15. The Growth Path Navigator: Ansoff Matrix
This framework is perfect for structuring a conversation about how to grow, forcing a clear distinction between different types of growth strategies.
The Prompt:
Act as a strategy consultant presenting growth pathways to the board of [e.g., "BookNook," an online book retailer].

Your task is to create a slide that maps potential growth initiatives onto the Ansoff Matrix.

The initiatives are:
1.  Loyalty program for existing customers.
2.  Launch an audiobook subscription service.
3.  Expand e-commerce operations to Latin America.
4.  Acquire a stationery startup.

The output must be structured as follows:

**Slide Title:** "Growth Plan Balances Strengthening the Core with Calculated Bets in New Products and Markets"

**Executive Takeaway:** "We will primarily focus on penetrating our core market and developing new products like audiobook services, while treating geographic expansion and diversification as longer-term, opportunistic plays."

**Body Content (The Ansoff Matrix):**
* **Market Penetration (Existing Product, Existing Market):**
    * *Initiative:* Launch "BookNook Rewards" loyalty program.
    * *Rationale:* Increase purchase frequency and customer lifetime value from our current user base.
* **Product Development (New Product, Existing Market):**
    * *Initiative:* Launch "BookNook Audio" subscription service.
    * *Rationale:* Sell a new, high-demand product format to our existing, book-loving audience.
* **Market Development (Existing Product, New Market):**
    * *Initiative:* Expand e-commerce operations to Latin America.
    * *Rationale:* Offer our current product catalog to a new geographic customer base.
* **Diversification (New Product, New Market):**
    * *Initiative:* Acquire "Paperly" stationery startup.
    * *Rationale:* A high-risk/high-reward move into a completely new business area.

**Visual Suggestion:** "A classic 2x2 Ansoff Matrix. The axes are 'Markets' (Existing/New) and 'Products' (Existing/New). Place each initiative name in the corresponding quadrant. Use icons for each initiative (e.g., a medal for loyalty, headphones for audiobooks)."

16. The "Plan B" Slide: Risk Assessment & Mitigation
A C-suite audience will always ask "What could go wrong?". This prompt prepares a clear, structured answer that builds confidence.
The Prompt:
Act as an engagement manager finalizing the recommendation to [e.g., "build a new Gigafactory in Nevada"]. We need to present the key risks and our mitigation plans.

Your task is to create a slide for the risk assessment.

The output must be structured as follows:

**Slide Title:** "Proactive Mitigation Plans Are in Place for Key Project Risks"

**Executive Takeaway:** "While supply chain disruptions and regulatory delays pose the most significant threats to the project timeline and budget, we have developed specific contingency plans to manage them."

**Body Content (Risk Matrix Table):**
| Risk Description                         | Likelihood (H/M/L) | Impact (H/M/L) | Mitigation Plan                                                                |
|------------------------------------------|--------------------|----------------|--------------------------------------------------------------------------------|
| **Global Supply Chain Disruption** | M                  | H              | Qualify secondary and tertiary suppliers; Pre-order critical long-lead time equipment. |
| **Regulatory & Permitting Delays** | M                  | H              | Engage state & local authorities early; Hire specialized legal counsel.          |
| **Construction Cost Overruns** | H                  | M              | Secure fixed-price contracts for major scopes; Include a 15% cost contingency.     |
| **Skilled Labor Shortage** | L                  | M              | Partner with local technical colleges; Offer competitive relocation packages.    |

**Visual Suggestion:** "A risk matrix table as described above. The 'Likelihood' and 'Impact' columns can be visualized on a 3x3 grid, where each risk is plotted. This creates a classic 'heat map' of risks, with items in the top-right corner (High/High) being the most critical."

17. The Change Management Vision: The "From-To" Slide
This is a powerful narrative tool for communicating the vision of a transformation project. It contrasts the undesirable present with the desirable future.
The Prompt:
Act as a change management consultant for [e.g., "Legacy Bank"], which is undergoing a digital transformation.

Your task is to create a "From-To" slide that paints a clear picture of the cultural and operational shift we are aiming for.

The output must be structured as follows:

**Slide Title:** "Our Transformation Journey: Moving from a Siloed, Analog Bank to an Agile, Digital-First Partner"

**Executive Takeaway:** "This is not just a technology upgrade; it is a fundamental shift in our mindset, processes, and how we deliver value to our customers."

**Body Content (in a two-column format):**
| We Are Moving FROM...                          | We Are Moving TO...                            |
|------------------------------------------------|------------------------------------------------|
| **Mindset:** "We protect the bank."             | **Mindset:** "We help our customers succeed."   |
| **Structure:** Siloed business units           | **Structure:** Cross-functional "mission teams"  |
| **Process:** Manual, paper-based, slow         | **Process:** Automated, data-driven, fast       |
| **Technology:** Legacy core systems            | **Technology:** Modular, API-first, cloud-based  |
| **Decision Making:** Hierarchical, slow        | **Decision Making:** Empowered teams, fast       |

**Visual Suggestion:** "A clean, two-column layout. The 'FROM' column on the left, the 'TO' column on the right. A large, bold arrow in the middle spanning the height of the slide points from left to right, labeled 'Our Transformation Journey'. Use simple icons for each row (e.g., a brain for Mindset, a gear for Process)."

18. The Execution Engine: Team & Governance Structure
This slide answers "Who will do this?". It shows the client that there's a clear structure for accountability and decision-making, which is crucial for project approval.
The Prompt:
Act as a Program Management Office (PMO) lead. We are launching a strategic initiative called [e.g., "Project Phoenix," a corporate turnaround plan].

Your task is to create a slide outlining the governance and team structure for this initiative.

The output must be structured as follows:

**Slide Title:** "A Dedicated Governance Structure Will Ensure Accountability and Fast Decision-Making for Project Phoenix"

**Executive Takeaway:** "The project will be led by a cross-functional team, overseen by a senior executive steering committee that will meet bi-weekly to remove roadblocks and ensure alignment with strategic goals."

**Body Content (Governance Structure):**
* **Steering Committee (Bi-Weekly Meeting)**
    * **Chair:** COO
    * **Members:** CFO, CTO, Head of HR
    * **Mandate:** Approve major budget allocations, resolve cross-functional conflicts, champion the project across the organization.
* **Project Management Office (PMO) (Full-Time)**
    * **Lead:** [Your Name/Consultant Lead]
    * **Mandate:** Track progress against milestones, manage risks, coordinate workstreams, report to SteerCo.
* **Core Workstreams & Owners (Weekly Cadence)**
    * **Workstream 1: Cost Optimization:** Led by VP of Operations
    * **Workstream 2: Commercial Growth:** Led by VP of Sales
    * **Workstream 3: Organizational Redesign:** Led by Head of HR

**Visual Suggestion:** "A simple organizational chart. A box at the top for the 'Steering Committee'. A box below it for the 'PMO', connected by a line. Three boxes below the PMO for each of the 'Workstreams', showing the parallel nature of the work."

19. The Innovation Framework: Blue Ocean Strategy Canvas
This is for when the goal isn't to compete, but to make the competition irrelevant. It's an advanced strategic tool for creating new market space.
The Prompt:
Act as an innovation strategist. Our client, [e.g., "CityVino"], wants to launch a new wine brand that breaks from industry norms.

Your task is to create a slide describing a Blue Ocean Strategy Canvas, contrasting the traditional wine industry with a potential new offering.

The output must be structured as follows:

**Slide Title:** "Creating a 'Blue Ocean' by Eliminating Industry Dogma and Raising a New Standard of Simplicity"

**Executive Takeaway:** "Instead of competing on terroir and expert ratings, our new brand will create a new market space by focusing on simplicity, accessibility, and a subscription-based experience for urban millennials."

**Body Content (Strategy Canvas Actions):**
* **Eliminate:**
    * Confusing terminology (e.g., terroir, tannins).
    * Elitist expert scores.
* **Reduce:**
    * Price per bottle (via direct sourcing).
    * Overwhelming choice (offer 4-6 curated wines only).
* **Raise:**
    * Convenience (Direct-to-door subscription model).
    * Brand relatability (Modern, minimalist branding).
* **Create:**
    * A 'palate quiz' for personalization.
    * A sense of community through members-only virtual tastings.

**Visual Suggestion:** "A line graph (the 'value curve'). The X-axis lists the key factors of competition (Price, Terminology, Choice, Convenience, etc.). There are two lines: a red line for the 'Typical Wine Industry' (high on terminology, low on convenience) and a blue line for our 'New Brand' (low on terminology, high on convenience, creating a new value curve)."

20. The Memorable Close: The Single Overarching Metaphor
The final slide before the Q&A shouldn't be a boring summary. It should be a powerful, sticky idea that encapsulates the entire message and inspires action.
The Prompt:
Act as the lead Partner closing a major presentation. Our recommendation for the client, [e.g., a 100-year-old industrial manufacturer], is to heavily invest in IoT, data analytics, and servitization.

Your task is to create the content for the final, closing slide. It should not introduce new data, but synthesize the entire strategic recommendation into a single, powerful, and memorable metaphor.

The output must be structured as follows:

**Slide Title:** Leave this blank. The visual is the focus.

**Executive Takeaway (The Spoken Part):** A powerful, concise closing statement that delivers the metaphor.

**Body Content:** Describe the metaphor in more detail.

**Visual Suggestion:** A single, high-impact, full-bleed image that represents the metaphor.

**Example Generated Content:**

**Executive Takeaway (The Spoken Part):**
"For the last century, we have been experts at building the most reliable engines in the world. But our recommendation today is not about building a better engine. It's about building a nervous system. A nervous system that connects our products to our customers and to us, transforming them from static objects into living assets that learn, predict, and perform. We are no longer just in the business of hardware; we are in the business of intelligence."

**Body Content (Metaphor Description):**
The core strategic shift is from selling a static "engine" to providing a dynamic "nervous system."
* **The Engine (Old World):** A standalone product, sold once. Its value is fixed.
* **The Nervous System (New World):** A connected network. The sensors are the nerves, the data is the signal, and our analytics platform is the brain. Its value grows over time as it learns.

**Visual Suggestion:** "A dramatic, full-bleed photograph. On the left side, a pristine, beautiful, but inert mechanical gear. On the right side, an abstract, glowing visualization of a neural network or data plexus. The two images should blend in the middle, showing the transformation."

21. The Foundational Hypothesis-Driven Slide
This is the atomic unit of a McKinsey presentation. The title is a testable statement (a hypothesis), and the slide's content is the evidence to prove it.
The Prompt:
Act as a strategy consultant from a top-tier firm. Our project is for [e.g., "a B2B software company, SaaSCo"].

Your task is to create the content for a single slide that proves a specific hypothesis. The entire slide must be structured as a logical argument.

**Hypothesis:** "Our high customer churn is not driven by product dissatisfaction, but by a disorganized and reactive post-sales onboarding process."

The output must be structured as follows:

**Slide Title:** [Use the hypothesis itself]: "Our High Customer Churn is Not Driven by Product Dissatisfaction, But by a Disorganized and Reactive Post-Sales Onboarding Process"

**Executive Takeaway:** "Data shows customers who experience our poor onboarding are 4x more likely to churn, regardless of how they rate the product itself. Fixing the first 90 days is our biggest retention opportunity."

**Body Content (The Supporting Evidence):**
* **Point 1 (Product Satisfaction is High):** "Customers who churned in the last 12 months gave our product an average Net Promoter Score (NPS) of +45, nearly identical to the +48 NPS from our active customers."
* **Point 2 (Onboarding is a Key Failure Point):** "Of the customers who churned, 75% did not complete the full onboarding program, compared to only 15% of active customers."
* **Point 3 (Correlation to Churn):** "A cohort analysis shows a direct correlation: churn rate for customers with a 'poor' onboarding score (as rated by our support team) is 28%, versus just 7% for those with a 'good' score."
* **Point 4 (Qualitative Evidence):** "Exit interviews consistently cite 'confusion about setup' and 'lack of proactive support' as primary reasons for leaving, rarely mentioning product features."

**Visual Suggestion:** "A simple 2x2 grid with each of the four supporting points in a quadrant. Use large numbers and bolded text (e.g., **+45 NPS**, **75% did not complete**) to draw the eye to the key data points that prove the hypothesis."

22. The "80/20" Insight: The Pareto Chart
A classic tool for focusing resources where they matter most by identifying the "vital few" causes of a problem.
The Prompt:
Act as an operations consultant for [e.g., "a national fast-food chain, QuickBurger"]. We have analyzed the sources of 5,000 customer complaints over the last quarter.

Your task is to create a slide that presents a Pareto analysis of these complaints.

Here is the raw data:
* Incorrect Order: 2,500 complaints
* Slow Service: 1,500 complaints
* Food Temperature: 500 complaints
* Staff Unfriendliness: 300 complaints
* Store Cleanliness: 150 complaints
* Other: 50 complaints

The output must be structured as follows:

**Slide Title:** "80% of Customer Complaints are Driven by Two Issues: Incorrect Orders and Slow Service"

**Executive Takeaway:** "Instead of launching multiple small initiatives, a focused effort to improve order accuracy and speed at the counter will have the most significant impact on customer satisfaction and is our top operational priority."

**Body Content:**
* **The "Vital Few" (80% of complaints):**
    * Incorrect Orders account for 50% of all complaints.
    * Slow Service accounts for an additional 30% of complaints.
* **The "Trivial Many" (20% of complaints):**
    * Issues like food temperature, staff attitude, and cleanliness are less frequent drivers of dissatisfaction.
* **Strategic Implication:** "We will form dedicated task forces for 'Order Accuracy' and 'Service Speed,' allocating 90% of our Q4 operational improvement budget to these two areas."

**Visual Suggestion:** "A classic Pareto chart.
* The X-axis lists the complaint categories, ordered from highest to lowest frequency.
* The primary Y-axis (left) shows the number of complaints. This is represented by a bar chart.
* The secondary Y-axis (right) shows the cumulative percentage. This is represented by a line graph that should cross the 80% mark above the 'Slow Service' category, visually proving the point."

23. The Customer Journey Map
This is the definitive slide for understanding the end-to-end customer experience, identifying pain points, and pinpointing "moments of truth."
The Prompt:
Act as a customer experience (CX) consultant for [e.g., "FlyRight Airlines"]. Your task is to create a Customer Journey Map for an economy-class passenger.

The output must be a slide that maps the key stages, customer actions, pain points, and opportunities.

The output must be structured as follows:

**Slide Title:** "The Passenger Journey is Defined by an Efficient Booking Process But a Stressful and Impersonal Airport Experience"

**Executive Takeaway:** "Our digital front-end is strong, but our core service delivery at the airport is fraught with friction. Improving the check-in and boarding process offers the greatest opportunity to reduce stress and build loyalty."

**Body Content (Table Format):**
| Stage           | Customer Actions & Thoughts                | Pain Points 😠                      | Opportunities 😍                               |
|-----------------|--------------------------------------------|--------------------------------------|------------------------------------------------|
| **1. Booking** | "Easy to use website, found a good flight." | Minor confusion about baggage fees.  | Proactively offer 'bundle and save' packages.  |
| **2. Pre-Flight** | "App check-in is convenient."              | Anxiety about long security lines. | Send real-time security wait times via the app. |
| **3. Airport** | "Where do I drop my bag? This line is huge." | Confusing signage, long bag-drop queue. | Create dedicated small bag-drop kiosks.        |
| **4. Boarding** | "Disorganized queue, no one knows their zone." | Chaotic gate crowding, unclear process. | Enforce zone boarding strictly; use digital displays.|
| **5. In-Flight** | "Seat is cramped, Wi-Fi is expensive."   | Lack of comfort, poor value on ancillaries.| Offer tiered Wi-Fi packages; surprise & delight with snacks.|

**Visual Suggestion:** "A horizontal, multi-lane diagram. Each lane represents a stage of the journey. Within each stage, use icons and short text for actions, pain points (e.g., a red frowny face), and opportunities (e.g., a green lightbulb). A line graph tracking 'Customer Emotion' can run along the bottom, dipping low during the 'Airport' and 'Boarding' stages."

24. The Recommendation Prioritization Matrix (Impact vs. Effort)
A cornerstone of any recommendation slide. It helps clients decide what to do now, what to plan for, and what to ignore.
The Prompt:
Act as a consultant presenting a list of 5 digital initiatives to [e.g., "a regional retailer, HomeGoods Inc."]. Your task is to create a slide that prioritizes these initiatives on an Impact vs. Effort matrix.

The initiatives are:
1.  Revamp product pages with better photos (Low Effort, Medium Impact).
2.  Launch a new loyalty program (High Effort, High Impact).
3.  Implement a new ERP system (High Effort, High Impact).
4.  Optimize email marketing campaigns (Low Effort, Low Impact).
5.  Install in-store analytics sensors (Medium Effort, High Impact).

The output must be structured as follows:

**Slide Title:** "We Will Prioritize 'Quick Wins' and Major Projects While De-Prioritizing Low-Impact Initiatives"

**Executive Takeaway:** "Our immediate focus will be on revamping product pages for a quick boost, while simultaneously initiating the major ERP and loyalty programs that will drive long-term value."

**Body Content (Quadrant Analysis):**
* **Top-Left (Quick Wins - Low Effort, High Impact):**
    * *There are no initiatives here, indicating a need to find some.*
* **Top-Right (Major Projects - High Effort, High Impact):**
    * Launch new loyalty program.
    * Implement new ERP system.
* **Bottom-Left (Fill-ins - Low Effort, Low Impact):**
    * Optimize email marketing campaigns.
    * Revamp product pages with better photos. *(Note: Per the prompt data, this is Low Effort, Medium Impact, so it straddles the line, but we can place it here for simplicity or adjust the axes).*
* **Bottom-Right (Reconsider - High Effort, Low Impact):**
    * *No initiatives here, which is good.*

*(Correction for better placement based on prompt data):*

**Body Content (Quadrant Analysis 2.0):**
* **Quick Wins (Low Effort, High Impact):**
    * Install in-store analytics sensors. *(Assuming 'Medium' effort is closer to Low than High)*
    * Revamp product pages with better photos. *(Assuming 'Medium' impact is closer to High than Low)*
* **Major Projects (High Effort, High Impact):**
    * Launch new loyalty program; Implement new ERP system.
* **Fill-ins (Low Effort, Low Impact):**
    * Optimize email marketing campaigns.

**Visual Suggestion:** "A 2x2 matrix. The Y-axis is 'Strategic Impact' (Low to High). The X-axis is 'Implementation Effort' (Low to High). Each initiative is a bubble placed in the appropriate quadrant. Label the quadrants 'Quick Wins', 'Major Projects', 'Fill-ins', and 'Reconsider/Thankless Tasks'."

25. The Mid-Narrative Synthesis Slide
After several data-heavy slides, you need one to bring it all together and state the combined "so what" before moving to the next part of your story.
The Prompt:
Act as the lead consultant presenting to [e.g., "AutoCorp's board"]. You have just presented the three preceding slides:
1.  Slide 10: "The EV Market is Growing 30% Faster Than We Forecasted."
2.  Slide 11: "Our Current Battery Technology is Two Generations Behind Our Main Competitor."
3.  Slide 12: "Our Dealership-Based Sales Model is Ill-Suited for EV Customers."

Your task is to create the content for Slide 13, which is a synthesis slide. It should not introduce new data, but connect the dots from the previous three slides to form a single, powerful conclusion.

The output must be structured as follows:

**Slide Title:** "Our Current Model is Fundamentally Mismatched with the Speed and Nature of the EV Market"

**Executive Takeaway:** "The combination of a faster-than-expected market shift, a significant technology gap, and an outdated sales channel creates an existential threat. Incremental change is no longer a viable option; a fundamental transformation is required."

**Body Content (Synthesized Logic):**
* **The Market is Moving:** "As we've seen, the EV market is not a future problem; its pace of growth is a present-day reality that has outstripped our plans."
* **Our Product Can't Compete:** "Furthermore, our technology gap means that even if we had the right sales model, our core product would still be at a significant disadvantage."
* **Our Channel Can't Sell:** "Finally, our dealership model is a barrier, not a channel, to reaching the modern EV buyer, creating a critical disconnect from the customer."
* **The Combined Implication:** "Taken together, these three findings prove that our entire value chain—from R&D to the final sale—is not equipped to win in this new landscape. We are facing a systemic, not a functional, challenge."

**Visual Suggestion:** "A 'funnel' or 'pyramid' visual. At the top, three boxes summarizing the titles of slides 10, 11, and 12. Arrows from these three boxes point down to a single, large box at the bottom containing the core synthesis statement: 'A Systemic Mismatch Between Our Model and the Market Reality'."

26. The Competitive "Bridge" Chart
This is a specific and powerful type of waterfall chart used to explain exactly why a competitor is outperforming the client on a key metric.
The Prompt:
Act as a consultant for [e.g., "our client, BuildCo"], a construction company. We need to explain why our main competitor, [e.g., "ConstructFast"], has a 25% profit margin while ours is only 15%.

Your task is to create the content for a "Profit Margin Bridge" slide.

Here is the data:
* BuildCo Margin: 15%
* Competitor Price Premium: +5% margin advantage to ConstructFast.
* Labor Cost Efficiency: +3% margin advantage to ConstructFast.
* Materials Sourcing: +2% margin advantage to ConstructFast.
* Higher SG&A at BuildCo: -2% margin disadvantage for ConstructFast (i.e., we are better here).
* Better Project Mix at ConstructFast: +2% margin advantage.
* ConstructFast Margin: 25%

The output must be structured as follows:

**Slide Title:** "Competitor's 10-Point Margin Advantage is Driven by Superior Pricing, Labor Efficiency, and Sourcing"

**Executive Takeaway:** "Closing the profitability gap with our top competitor requires a multi-pronged effort focused on optimizing our pricing strategy and overhauling our operational cost structure, where the biggest opportunities lie."

**Body Content (The Bridge Components):**
* Our Starting Margin: 15%
* (+) Pricing Power: ConstructFast commands a 5% price premium.
* (+) Labor Efficiency: Their better scheduling and staffing model gives them a 3% edge.
* (+) Materials Sourcing: Their scale and procurement strategy save them 2%.
* (+) Favorable Project Mix: They focus on higher-margin jobs for a 2% advantage.
* (-) Our SG&A Advantage: We are leaner on overhead, giving us a 2% relative advantage.
* Competitor's Ending Margin: 25%

**Visual Suggestion:** "A 'bridge' or waterfall chart.
* Start with a bar on the left for 'Our Margin (15%)'.
* End with a bar on the right for 'Competitor Margin (25%)'.
* In between, show 'stepping stone' bars. Green bars rising for competitor advantages (Pricing, Labor, etc.) and a red bar falling for our advantage (SG&A). The visual should literally 'bridge' the gap between the two companies."

27. A Day in the Life Of (DILO)
A powerful narrative tool from operational consulting to build empathy and expose non-value-added time and process friction from an employee's perspective.
The Prompt:
Act as an operations consultant for [e.g., "City Hospital"]. We are trying to improve nurse productivity and satisfaction.

Your task is to create a "Day in the Life Of" (DILO) slide for a Med-Surg Nurse.

The output must be structured as follows:

**Slide Title:** "Our Nurses Spend Less Than 40% of Their Time on Direct Patient Care Due to Administrative Burden and System Inefficiencies"

**Executive Takeaway:** "The majority of a nurse's day is consumed by hunting for equipment, redundant charting in multiple systems, and coordinating with other departments. Simplifying these tasks is key to unlocking more time for patient care."

**Body Content (A Timeline with Annotations):**
* **7:00 AM - 8:00 AM (Handover & Prep):** Spends 30 mins finding a working vitals machine. *(Pain Point: Equipment Search)*
* **8:00 AM - 11:00 AM (Morning Rounds):** Documents vitals once on paper, then again in the EMR. *(Pain Point: Double Documentation)*
* **11:00 AM - 12:00 PM (Medication Pass):** Waits 15 mins for pharmacy to clarify an order via phone. *(Pain Point: Inter-departmental Friction)*
* **12:00 PM - 1:00 PM (Lunch & Charting):** Catches up on charting from the morning.
* **1:00 PM - 4:00 PM (Afternoon Care):** Spends 45 mins coordinating a patient discharge with social work and transport. *(Pain Point: Complex Coordination)*
* **4:00 PM - 7:00 PM (Final Rounds & Handover):** Rushes to complete final documentation before shift change.

**Visual Suggestion:** "A circular 'clock' diagram representing a 12-hour shift. The circle is divided into segments representing activities. Color-code the segments: Green for 'Value-Added (Direct Patient Care)', Yellow for 'Essential Admin', and Red for 'Non-Value-Added Waste (Searching, Waiting, Rework)'. The size of the red segments will be a powerful visual argument."

28. The Operating Model Blueprint
This slide provides a high-level architectural view of how a future organization will function. It's the blueprint that connects strategy to execution.
The Prompt:
Act as a consultant designing a new operating model for the [e.g., "newly formed 'Digital Commerce' unit"] of a large corporation.

Your task is to create a slide that outlines the key components of the future-state operating model.

The output must be structured as follows:

**Slide Title:** "The 'Digital Commerce' Unit Will Operate with an Agile, Data-Driven, and Customer-Centric Model"

**Executive Takeaway:** "This new operating model is a departure from our traditional structures, designed specifically for speed and responsiveness by integrating our governance, processes, and technology around the customer journey."

**Body Content (Layered Components):**
* **Layer 1: Governance & Leadership:** "A flat structure led by a 'Head of Digital,' with empowered product owners and bi-weekly steering committee reviews."
* **Layer 2: People & Skills:** "Cross-functional 'squads' blending marketing, tech, and UX skills. Emphasis on hiring for data science and product management capabilities."
* **Layer 3: Key Processes:** "An agile development cycle with two-week sprints. Continuous A/B testing and customer feedback loops integrated into the product roadmap."
* **Layer 4: Technology & Data:** "A modern, API-first tech stack. A centralized customer data platform (CDP) will be the 'single source of truth' for all decisions."
* **Layer 5: Performance & KPIs:** "Success will be measured by Customer Lifetime Value (CLV), conversion rate, and squad-level OKRs (Objectives and Key Results), not just revenue."

**Visual Suggestion:** "A stacked diagram, resembling a Greek temple. The 'Governance' layer is the roof. The 'People', 'Process', and 'Technology' layers are the three central pillars. The 'Performance & KPIs' layer is the foundation at the bottom. This visually implies that everything is built on a foundation of how performance is measured."

29. The "Framing the Discussion" Key Questions Slide
Used at the start of a new section, this slide acts as a table of contents for the audience's brain, telling them what questions will be answered over the next few slides.
The Prompt:
Act as a consultant about to begin the 'Recommendations' section of a major presentation.

Your task is to create a 'Key Questions' slide to frame the upcoming discussion. The overall project is about [e.g., "improving profitability for a struggling manufacturing plant"].

The output must be structured as follows:

**Slide Title:** "Our Recommendations Will Address Three Key Levers for Restoring Profitability"

**Executive Takeaway:** "In this section, we will outline a comprehensive plan by answering three fundamental questions regarding our cost structure, pricing strategy, and product portfolio."

**Body Content (The Key Questions):**

1.  **Where are the biggest opportunities to optimize our operational cost base?**
    *(Preview: We will present findings from our factory floor diagnostics and procurement analysis.)*

2.  **How can we adjust our pricing to better capture the value of our premium products?**
    *(Preview: We will introduce a new tiered pricing model based on customer segmentation.)*

3.  **Which low-margin products should we rationalize to simplify operations and improve focus?**
    *(Preview: We will identify the bottom 20% of products that contribute less than 2% of our profit.)*

**Visual Suggestion:** "A very clean, minimalist slide. Use a large number (1, 2, 3) for each question. Each question should be in a bold, clear font. The preview text can be in a smaller, italicized font below each question. The goal is clarity and readability, not complex visuals."

30. The Decision Tree Analysis
For complex decisions with uncertain outcomes, this slide provides a quantitative and logical way to compare choices.
The Prompt:
Act as a strategy consultant advising a biotech firm on its new drug development. They must choose between two paths for their new drug candidate:

1.  **"License Out":** License the drug to a major pharmaceutical company for an upfront payment of $50M.
2.  **"Develop In-House":** Spend $20M to fund Phase III trials themselves.

The uncertainties are:
* If they develop in-house, there's a 60% chance of trial success and a 40% chance of failure.
* If the trial succeeds, the drug will be worth $200M.
* If the trial fails, the drug is worth $0.

Your task is to create a slide that uses a decision tree to recommend the best financial path.

The output must be structured as follows:

**Slide Title:** "Developing In-House Has a Higher Expected Financial Value of $100M, Despite Associated Risks"

**Executive Takeaway:** "While licensing provides a guaranteed $50M payoff, the probability-weighted outcome of in-house development is double that amount. The potential reward justifies the clinical trial risk."

**Body Content (Decision Tree Logic):**
* **Path 1: License Out**
    * **Expected Value = $50M** (100% probability of receiving the payment).
* **Path 2: Develop In-House**
    * **Outcome A: Trial Success (60% Probability)**
        * Payoff: $200M (Revenue) - $20M (Cost) = $180M
    * **Outcome B: Trial Failure (40% Probability)**
        * Payoff: $0 (Revenue) - $20M (Cost) = -$20M
    * **Expected Value = (0.60 * $180M) + (0.40 * -$20M) = $108M - $8M = $100M**
* **Conclusion:** The path with the highest Expected Value ($100M) is to develop the drug in-house.

**Visual Suggestion:** "A decision tree diagram.
* Start with a 'decision node' (a square) on the left.
* Two branches emerge: 'License Out' and 'Develop In-House'.
* The 'License Out' branch ends at a terminal node showing '$50M'.
* The 'Develop In-House' branch goes to a 'chance node' (a circle).
* Two branches emerge from the chance node: 'Success (60%)' and 'Failure (40%)', each leading to a terminal node with its final payoff ($180M and -$20M). The calculated expected value should be displayed prominently."

Of course. At this stage, we move into the highly specialized, yet frequently used, slides that handle project mechanics, advanced analytics, and the specific communication patterns that define a top-tier consulting engagement. These are the slides that give a presentation its structural integrity and operational credibility.
Thinking hard about the most popular and classic slides used by firms like McKinsey that we haven't yet covered, here are 10 more prompts, numbered 31 through 40.
31. The "Project Mandate & Scope" Slide
This is one of the first three slides in any kickoff deck. It aligns everyone on the "why" of the project and, crucially, defines what is out of scope to prevent scope creep.
The Prompt:
Act as a consulting Engagement Manager on Monday, August 4, 2025, in Toronto. We are kicking off a project for our client, [e.g., "a Canadian national bank, 'CanBank'"].

Your task is to create the "Project Mandate" slide, which will serve as our "terms of reference" with the client's steering committee.

The output must be structured as follows:

**Slide Title:** "Our Mandate is to Develop a Strategy to Double 'CanBank's' Millennial Customer Base by 2028"

**Executive Takeaway:** "This project will deliver a concrete strategic plan focused on organic growth in the millennial segment. This presentation will align us on the project's core objectives, scope, and key questions to be answered."

**Body Content (Structured Sections):**
* **Project Objectives:**
    * 1. Analyze the needs and banking behaviors of Canadian millennials.
    * 2. Identify key product and channel gaps in our current offering.
    * 3. Develop a 3-year strategic roadmap of actionable initiatives.
* **Key Questions to be Answered:**
    * 1. Why are we currently underperforming in the millennial segment?
    * 2. What value proposition is required to win with this demographic?
    * 3. What financial investment is needed and what is the expected return?
* **In Scope:**
    * Canadian market only.
    * Retail banking division (checking, savings, credit cards).
    * Focus on organic growth levers (marketing, product, digital channels).
* **Out of Scope:**
    * International markets.
    * Wealth management and brokerage divisions.
    * Growth through M&A.

**Visual Suggestion:** "A highly structured, four-quadrant layout. Each quadrant clearly labeled: Objectives, Key Questions, In Scope, Out of Scope. Use simple checkmark icons for 'In Scope' items and 'X' icons for 'Out of Scope' items for at-a-glance clarity."

32. The "Our Approach & Timeline" Slide
This slide follows the Mandate slide. It breaks down the analytical approach of the consulting team itself, showing the client how we will get from the starting question to the final answer.
The Prompt:
Act as a consulting Partner. Following the 'Project Mandate' slide, you now need to present our project plan and methodology.

Your task is to create the "Our Approach & Timeline" slide. It should break the project into logical phases and specify key activities and deliverables for each.

The project is a [e.g., "12-week supply chain diagnostic for an automotive parts manufacturer"].

The output must be structured as follows:

**Slide Title:** "A Phased, 12-Week Approach Will Guide Our Journey from Diagnostics to Actionable Recommendations"

**Executive Takeaway:** "Our work is structured in three distinct phases: first we diagnose the current state, then we analyze opportunities, and finally we build a concrete implementation plan. We will have formal check-ins at the end of each phase."

**Body Content (Phased Breakdown):**
* **Phase 1: Diagnostic & Baseline (Weeks 1-4)**
    * *Activities:* Stakeholder interviews, factory floor walks (DILO), data collection on inventory & logistics costs, process mapping.
    * *Deliverable:* A data-backed baseline of current performance and a map of key problem areas.
* **Phase 2: Opportunity Analysis & Benchmarking (Weeks 5-8)**
    * *Activities:* Root cause analysis on key issues, benchmarking costs against industry peers, financial modeling of potential initiatives (e.g., network optimization, warehouse automation).
    * *Deliverable:* A quantified list of improvement opportunities, prioritized by potential impact.
* **Phase 3: Recommendation & Roadmap (Weeks 9-12)**
    * *Activities:* Develop detailed business cases for top 3 initiatives, create a sequenced implementation roadmap, build the final Steering Committee presentation.
    * *Deliverable:* Final recommendations with a clear action plan and financial case.

**Visual Suggestion:** "A horizontal timeline or Gantt-style chart organized by phase. The top row shows the weeks (1-12). Below, three colored bars represent the three phases. Use key milestones (diamond shapes) to mark the end-of-phase Steering Committee check-ins."

33. The "Key Findings Summary" (aka The Bulldog)
This is a dense, powerful slide that often appears after the Executive Summary. It provides a structured list of all the major conclusions in the deck, acting as a logical summary and a roadmap for the findings section to come.
The Prompt:
Act as a senior consultant preparing for a final presentation. You need to create a "Key Findings Summary" slide that logically lays out the main conclusions of your analysis for [e.g., "a fashion retailer struggling with e-commerce"].

The output must be structured as follows:

**Slide Title:** "Key Findings: Five Core Conclusions Point to a Need for a Digital-First Transformation"

**Executive Takeaway:** "Our analysis concluded that while our brand remains strong, our profitability is being eroded by an inefficient supply chain, a poor online user experience, and a fundamental misalignment between our marketing spend and the modern customer journey."

**Body Content (Numbered List of Assertions):**

1.  **Market:** The shift to online fashion is accelerating post-pandemic, with mobile commerce now accounting for 70% of traffic.
2.  **Competitors:** Digital-native competitors are 30% more efficient in their marketing spend (CAC) and offer 2-day standard shipping, which we cannot match.
3.  **Customers:** Our customer base is aging; we are failing to attract the under-30 demographic, who cite our poor website usability and lack of a compelling social media presence.
4.  **Economics:** Our return rates from online sales are 40%, twice the industry average, driven by poor product descriptions and sizing guides. This erodes our gross margin by 8 percentage points.
5.  **Capabilities:** Our internal teams lack the critical skills in data analytics, performance marketing, and UX design required to compete effectively online.

**Visual Suggestion:** "A very clean, text-based slide. Use large, bolded numbers (1-5) for each finding. Each finding should be a single, crisp sentence. Potentially use a simple icon next to each number to represent the theme (e.g., a shopping cart for Market, a magnifying glass for Competitors)."

34. The Stakeholder Analysis & Engagement Plan
Crucial for any project involving significant change. It shows the client you've thought about the human element and have a plan to manage it.
The Prompt:
Act as a change management expert on a consulting team. We are implementing [e.g., "a new enterprise CRM system"] that will affect multiple departments.

Your task is to create a stakeholder analysis slide to identify key groups and plan our communication and engagement strategy.

The output must be structured as follows:

**Slide Title:** "A Targeted Engagement Plan Will Proactively Manage Stakeholders Across the Organization"

**Executive Takeaway:** "Our plan prioritizes winning over the regional sales directors, who are highly influential but currently skeptical. We will actively engage them as design partners to ensure their buy-in and champion their needs."

**Body Content (Quadrant Analysis and Action Plan):**
* **Quadrant Placement (based on Influence vs. Support):**
    * **High Influence / High Support (Promoters):** IT Leadership, Head of Sales Ops.
    * **High Influence / Low Support (Blockers):** Regional Sales Directors, Veteran Account Managers.
    * **Low Influence / High Support (Supporters):** Junior Sales Reps, Marketing Analysts.
    * **Low Influence / Low Support (Bystanders):** Finance Department.
* **Engagement Plan:**
    * **Promoters (Leverage):** "Engage as project champions and public advocates. Involve in Steering Committee."
    * **Blockers (Engage & Mitigate):** "Conduct 1-on-1 workshops to understand concerns. Make them 'co-creators' of the new sales dashboards. Address their specific pain points."
    * **Supporters (Inform & Involve):** "Keep informed via regular email updates. Involve in User Acceptance Testing (UAT) to build grassroots support."
    * **Bystanders (Monitor):** "Provide high-level project updates in the company newsletter. No intensive engagement needed."

**Visual Suggestion:** "A 2x2 matrix with 'Influence' on the Y-axis and 'Support for Change' on the X-axis. Place the stakeholder groups into the four resulting quadrants. Use callout boxes to briefly describe the engagement strategy for each quadrant."

35. The Scenario Analysis & Strategic Posture
When the future is highly uncertain, this slide helps clients think through different potential outcomes and the strategic posture they should adopt for each, rather than betting on a single forecast.
The Prompt:
Act as a long-range strategist for [e.g., "an electric utility company"]. The future of energy regulation is highly uncertain.

Your task is to create a slide that outlines three potential future scenarios for the next decade and the strategic implications for the company.

The output must be structured as follows:

**Slide Title:** "Our Strategy Must Be Robust Across Three Plausible Regulatory Scenarios for 2035"

**Executive Takeaway:** "While we hope for a scenario favorable to renewables, we must build a strategy that preserves our financial health even in a 'business-as-usual' world. Our capital investments should prioritize flexible assets that are valuable in all three scenarios."

**Body Content (Three-Column Layout):**
| Scenario 1: "Green Acceleration"         | Scenario 2: "The Messy Middle"                  | Scenario 3: "Fossil Fuel Resurgence"            |
|------------------------------------------|-------------------------------------------------|------------------------------------------------|
| **Description:** Aggressive carbon tax & renewable mandates enacted. | **Description:** Inconsistent policy, regional patchwork of regulations. | **Description:** Geopolitical events lead to a focus on energy security; regulations on fossil fuels are relaxed.|
| **Implication:** Heavy investment in solar/wind is highly profitable. Legacy gas plants become liabilities. | **Implication:** Flexible gas peaker plants and energy storage are highly valuable. Large, long-term bets are risky.| **Implication:** Life-extension investments in existing gas plants yield the best returns. Renewable projects face headwinds. |
| **Our Strategic Posture:** "Go all-in on renewables. Divest from legacy assets. Become a green energy leader." | **Our Strategic Posture:** "Prioritize flexible grid assets and battery storage. Hedge our bets and delay massive, single-pathway investments." | **Our Strategic Posture:** "Maximize efficiency and lifespan of existing fleet. Opportunistically invest in renewables only with strong subsidies."|

**Visual Suggestion:** "A three-column layout as described. Use a distinct and powerful icon at the top of each column to represent the scenario (e.g., a wind turbine, a question mark, an oil derrick). This helps to visually anchor each possible future world."

36. The Financial Valuation Summary Slide
A staple in any M&A, investment, or corporate finance engagement. It clearly and defensibly shows how the team arrived at a valuation range for a business or asset.
The Prompt:
Act as an M&A advisory consultant. We are presenting our valuation of a target company, [e.g., "a private SaaS company called 'DataLeap'"].

Your task is to create a slide summarizing our valuation analysis using multiple methodologies.

The output must be structured as follows:

**Slide Title:** "Valuation Analysis Suggests an Enterprise Value for 'DataLeap' Between $200M and $250M"

**Executive Takeaway:** "Our valuation, triangulated across three different methodologies, points to a defensible midpoint valuation of $225M. The DCF analysis is most sensitive to long-term growth assumptions, while market comparables provide a strong real-world anchor."

**Body Content:**
* **Methodology 1: Discounted Cash Flow (DCF) Analysis**
    * *Key Assumptions:* 15% WACC, 4% terminal growth rate.
    * *Resulting Value Range:* $210M - $250M
* **Methodology 2: Public Company Comparables ("Comps")**
    * *Key Metric:* Enterprise Value / Annual Recurring Revenue (ARR).
    * *Peer Group Median Multiple:* 8.0x
    * *Resulting Value:* $200M (based on DataLeap's $25M ARR)
* **Methodology 3: Precedent Transaction Analysis**
    * *Key Metric:* Multiples paid for similar companies acquired in the last 24 months.
    * *Median Multiple:* 9.0x
    * *Resulting Value:* $225M

**Visual Suggestion:** "A 'Football Field' chart. The Y-axis lists the valuation methodologies. The X-axis is the valuation range in millions of dollars. For each methodology, a horizontal bar shows the resulting valuation range. A vertical dashed line or shaded area can indicate the final, concluded valuation range ($200-250M), showing how it incorporates the outputs of all methods."

37. The RACI Chart for Clear Accountability
More granular than a simple org chart, the RACI is the definitive tool for clarifying roles and eliminating confusion during a complex implementation.
The Prompt:
Act as a project manager for the implementation of [e.g., "a new company-wide budget approval process"]. There has been confusion about who needs to do what.

Your task is to create a RACI chart slide to clarify roles and responsibilities.

The output must be structured as follows:

**Slide Title:** "A Clear RACI Framework Will Ensure Smooth Execution of the New Budgeting Process"

**Executive Takeaway:** "This framework clarifies that while Department Heads are 'Responsible' for submitting budgets, the VP of Finance is ultimately 'Accountable' for approval. This eliminates ambiguity and empowers clear decision-making."

**Body Content (A RACI Matrix):**
| Task / Deliverable                      | Department Head | VP of Finance | CEO           | Project Manager |
|-----------------------------------------|-----------------|---------------|---------------|-----------------|
| 1. Draft Departmental Budget            | **R** (Responsible) | **C** (Consulted) | **I** (Informed) | **I** (Informed)  |
| 2. Submit Budget into System            | **R** (Responsible) | **I** (Informed)  |               | **I** (Informed)  |
| 3. Review & Approve/Reject Budget       | **C** (Consulted) | **A** (Accountable) | **C** (Consulted) | **I** (Informed)  |
| 4. Communicate Final Approved Budget    | **I** (Informed)  | **R** (Responsible) | **A** (Accountable) | **I** (Informed)  |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

**Visual Suggestion:** "A clean, color-coded matrix table as shown above. The 'R', 'A', 'C', 'I' letters should be in colored boxes for easy scanning (e.g., A=Dark Blue, R=Light Blue, C=Green, I=Grey). Include a legend at the bottom defining the terms."

38. The Technology Architecture (Current vs. Future State)
For any digital transformation, this slide is essential for both technical and business audiences to understand the complexity of the current system and the elegant vision for the future.
The Prompt:
Act as a technology consultant for a client with [e.g., "an aging, monolithic e-commerce system"].

Your task is to create a slide that contrasts the current state technology architecture with the proposed future state.

The output must be structured as follows:

**Slide Title:** "We Will Migrate From a Monolithic, Brittle Architecture to a Modern, Headless Microservices Platform"

**Executive Takeaway:** "Our current architecture is slow to change and expensive to maintain, hindering business agility. The future-state modular platform will allow us to launch new features faster, improve reliability, and personalize the customer experience."

**Body Content (Two-Column Layout):**
| Current State: "The Monolith"                     | Future State: "The Modular Platform"              |
|----------------------------------------------------|---------------------------------------------------|
| **Description:** A single, tightly-coupled application where the front-end (website) and back-end (inventory, pricing) are intertwined. | **Description:** A "headless" architecture where the back-end consists of independent microservices (e.g., search, cart, payments) connected by APIs. |
| **Pain Points:** <ul><li>Changes require re-deploying the entire system.</li><li>A failure in one part can crash the whole site.</li><li>Difficult to integrate new technologies (e.g., mobile app, voice commerce).</li></ul> | **Benefits:** <ul><li>Services can be updated independently for faster feature releases.</li><li>Improved resilience and scalability.</li><li>Any 'head' (website, app, smart mirror) can connect to the back-end via APIs.</li></ul> |

**Visual Suggestion:** "A powerful 'before and after' diagram.
* **On the left (Current State):** Show a large, messy box labeled 'Monolith' with tangled lines inside connecting 'UI', 'Business Logic', and 'Database' in a chaotic way. Label it 'Slow & Risky'.
* **On the right (Future State):** Show clean, separate boxes for each 'Microservice' (Search, Payments, etc.) connected by clean lines to a central 'API Gateway'. Above them, show separate boxes for 'Website', 'Mobile App', etc. Label it 'Agile & Resilient'."

39. The Organizational Health / Culture Diagnostic Slide
Top firms know that culture eats strategy for breakfast. This slide takes the "soft" topic of organizational health and presents it as hard, quantitative data, making it undeniable for leadership.
The Prompt:
Act as a consultant specializing in organizational health. We have just run our firm's "Organizational Health Index (OHI)" survey at our client, [e.g., "InnoCorp"].

Your task is to create a slide that presents the diagnostic results, benchmarking them against the top quartile of companies.

The output must be structured as follows:

**Slide Title:** "While Strong in Innovation and Talent, We Score in the Bottom Quartile on Accountability and Leadership"

**Executive Takeaway:** "Our employees feel empowered to create, but a lack of clear direction and personal ownership is preventing good ideas from scaling effectively. Addressing leadership clarity and accountability is the highest-priority cultural issue."

**Body Content (Bar Chart Data):**
*(Scores are out of 100)*
* **Leadership:** Our Score=45, Top Quartile=85
* **Accountability:** Our Score=35, Top Quartile=80
* **Coordination & Control:** Our Score=50, Top Quartile=75
* **External Orientation:** Our Score=70, Top Quartile=80
* **Innovation & Learning:** Our Score=85, Top Quartile=85
* **Motivation:** Our Score=60, Top Quartile=80
* **Talent Management:** Our Score=80, Top Quartile=85

**Visual Suggestion:** "A horizontal bar chart. Each row is an OHI dimension (Leadership, Accountability, etc.). For each dimension, there are two bars: a light grey bar showing the 'Top Quartile Benchmark' score and a dark blue bar overlaid showing 'Our Score'. The visual gap between the bars for 'Leadership' and 'Accountability' will be stark and immediately draw the eye to the problem."

40. The "Decisions, Next Steps, & Adjourn" Slide
The most important slide at the end of a decision-making meeting. It's a pragmatic tool to ensure alignment, assign actions, and formally close the discussion.
The Prompt:
Act as an Engagement Manager at 11:20 PM on Monday, August 4, 2025. You are concluding a late-night steering committee meeting where you presented your final recommendations.

Your task is to create the final slide to ensure everyone is clear on the decisions made and the immediate next steps.

The output must be structured as follows:

**Slide Title:** "Decisions & Next Steps"

**Executive Takeaway:** "We have alignment on the three core pillars of the strategy. The immediate next step is for the working team to build the detailed financial model and for the steering committee to provide feedback by Friday. We will reconvene in two weeks."

**Body Content (Structured Lists):**
* **Decisions Made Today:**
    * ✅ Endorsed "Pillar 1: Cost Optimization" as a go-forward initiative.
    * ✅ Endorsed "Pillar 2: Digital Marketing Overhaul" as a go-forward initiative.
    * ❌ Decision on "Pillar 3: International Expansion" is PENDING until financial model is complete.
* **Actions & Owners (Next 48 Hours):**
    * **Action:** Circulate detailed minutes and this presentation. (**Owner:** Consulting Team, **Due:** Tomorrow AM)
    * **Action:** Provide detailed data for financial model. (**Owner:** Client Finance Lead (John S.), **Due:** Tuesday EOD)
* **Next Steps (Next 2 Weeks):**
    * **Action:** Build detailed financial model for all 3 pillars. (**Owner:** Consulting Team, **Due:** Aug 15)
    * **Action:** Review financial model and provide feedback. (**Owner:** Steering Committee, **Due:** Aug 18)
    * **Next Meeting:** Scheduled for Monday, August 18, 2025, to review financials and make a final decision on Pillar 3.

**Visual Suggestion:** "A clean, three-section layout. Use clear headings for 'Decisions', 'Actions', and 'Next Steps'. Use green checkmark and red X icons for the decisions to make them visually unambiguous. Use bolded names for owners and bolded dates for deadlines to ensure accountability is clear."

