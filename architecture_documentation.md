# Technical Architecture Documentation - Global Remittance Cost Map (POC-98)

This document provides a detailed breakdown of the technical design, data flows, and architectural choices for the Global Remittance Cost Map platform.

---

## 1. System Overview

The platform uses a decoupled client-server architecture to provide high-performance geospatial visualizations and data tables:

```mermaid
graph TD
    subgraph Frontend (Next.js 15+)
        UI[Intelligence Dashboard UI]
        Map[React Leaflet Map]
        Charts[Recharts Analytics]
        Table[TanStack Explorer Table]
        APIClient[Client API Adapter]
    end

    subgraph Backend (FastAPI / Python)
        API[FastAPI Endpoints]
        DB[(In-Memory Database / JSON)]
        Gen[Mock Data Generator]
        Adapters[ETL Data Adapters]
    end

    subgraph External Sources (Future)
        WB[World Bank API]
        ECB[ECB Data Portal]
    end

    UI --> Map & Charts & Table
    APIClient --> UI
    APIClient -- HTTP / JSON --> API
    API --> DB
    Adapters --> DB
    Gen --> DB
    WB & ECB -.-> Adapters
```

---

## 2. Backend Design

The backend is built with FastAPI. It handles data ingestion, synthetic reference data generation, summary stat calculations, and export endpoints.

### ETL & Data Adapters
A standard interface is defined to ingest remittance corridor data:
- `BaseRemittanceAdapter`: Declares the required contract.
- `SyntheticRemittanceAdapter`: Generates 30+ corridors with high-fidelity, labeled mock data.
- `WorldBankAdapter` & `ECBAdapter`: Prepared stubs to demonstrate how live XML/JSON feeds map to our standard data models.

### Data Schemas (Pydantic Models)
1. **Provider**: Represents a single remittance provider (e.g., Wise, Western Union, Bank Transfer, Mobile Wallet, Crypto).
   - `name`: string
   - `fee_percent`: float
   - `fixed_fee`: float
   - `fx_spread`: float
   - `settlement_time_hours`: float
   - `accessibility_score`: int (0-100)
2. **Corridor**: Represents a flow from Origin to Destination country.
   - `id`: string (e.g., "US-MX")
   - `origin_country`: string
   - `origin_code`: string (ISO 2-letter)
   - `origin_lat`: float
   - `origin_lng`: float
   - `destination_country`: string
   - `destination_code`: string (ISO 2-letter)
   - `destination_lat`: float
   - `destination_lng`: float
   - `average_cost_percent`: float
   - `average_speed_hours`: float
   - `risk_score`: float (1.0 to 10.0)
   - `providers`: List[Provider]
   - `receive_options`: List[string]
   - `is_synthetic`: boolean

---

## 3. Frontend Design

The frontend is built using Next.js 15+ App Router, utilizing React components styled with Tailwind CSS.

### Interactive Map (React Leaflet)
- Loaded with `next/dynamic` and `ssr: false` to circumvent server-side environment checks.
- Overrides Leaflet marker icon defaults to display custom SVG pulse markers for origin and destination nodes.
- Renders smooth vector paths between origins and destinations to represent corridors visually.
- Integrates a side-drawer displaying corridor profiles, provider choices, and receive speeds.

### Fee Compare Visualization
- Utilizes Recharts for stacked horizontal bar charts.
- Compares provider costs broken down into:
  - Percent Fee
  - Fixed Fee
  - Exchange Rate (FX) Spread Markup
- Calculates the true "Effective Cost" on a sample transfer size of $500.

### Speed Ladder & Access Points
- **Speed Ladder**: Groups providers into settlement tiers (Instant, Same Day, 1 Day, 2 Days, 3+ Days).
- **Access Points**: Uses radial charts or horizontal progress bars to highlight cash networks, bank accounts, and digital wallets accessibility indexes.
