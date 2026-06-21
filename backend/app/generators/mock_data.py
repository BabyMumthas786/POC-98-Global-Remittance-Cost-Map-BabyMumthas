import random
from typing import List, Dict, Any
from app.models import Corridor, Provider
from app.adapters.base import BaseRemittanceAdapter

# Static coordinate database for consistent mapping
COUNTRY_GEOLOCATIONS = {
    "IN": {"name": "India", "lat": 20.5937, "lng": 78.9629},
    "AE": {"name": "UAE", "lat": 23.4241, "lng": 53.8478},
    "US": {"name": "USA", "lat": 37.0902, "lng": -95.7129},
    "MX": {"name": "Mexico", "lat": 23.6345, "lng": -102.5528},
    "GB": {"name": "UK", "lat": 55.3781, "lng": -3.4360},
    "PK": {"name": "Pakistan", "lat": 30.3753, "lng": 69.3451},
    "DE": {"name": "Germany", "lat": 51.1657, "lng": 10.4515},
    "TR": {"name": "Turkey", "lat": 38.9637, "lng": 35.2433},
    "BD": {"name": "Bangladesh", "lat": 23.6850, "lng": 90.3563},
    "CA": {"name": "Canada", "lat": 56.1304, "lng": -106.3468},
    "PH": {"name": "Philippines", "lat": 12.8797, "lng": 121.7740},
    "AU": {"name": "Australia", "lat": -25.2744, "lng": 133.7751},
    "FR": {"name": "France", "lat": 46.2276, "lng": 2.2137},
    "MA": {"name": "Morocco", "lat": 31.7917, "lng": -7.0926},
    "NG": {"name": "Nigeria", "lat": 9.0820, "lng": 8.6753},
    "PL": {"name": "Poland", "lat": 51.9194, "lng": 19.1451},
    "ES": {"name": "Spain", "lat": 40.4637, "lng": -3.7492},
    "CO": {"name": "Colombia", "lat": 4.5709, "lng": -74.2973},
    "SG": {"name": "Singapore", "lat": 1.3521, "lng": 103.8198},
    "MY": {"name": "Malaysia", "lat": 4.2105, "lng": 101.9758},
    "VN": {"name": "Vietnam", "lat": 14.0583, "lng": 108.2772},
    "SA": {"name": "Saudi Arabia", "lat": 23.8859, "lng": 45.0792},
    "EG": {"name": "Egypt", "lat": 26.8206, "lng": 30.8025},
    "ZA": {"name": "South Africa", "lat": -30.5595, "lng": 22.9375},
    "ZW": {"name": "Zimbabwe", "lat": -19.0154, "lng": 29.1549},
    "IT": {"name": "Italy", "lat": 41.8719, "lng": 12.5674},
    "RO": {"name": "Romania", "lat": 45.9432, "lng": 24.9668},
    "CN": {"name": "China", "lat": 35.8617, "lng": 104.1954},
    "ID": {"name": "Indonesia", "lat": -0.7893, "lng": 113.9213},
    "SN": {"name": "Senegal", "lat": 14.4974, "lng": -14.4524},
    "SV": {"name": "El Salvador", "lat": 13.7942, "lng": -88.8965},
    "UA": {"name": "Ukraine", "lat": 48.3794, "lng": 31.1656},
    "DO": {"name": "Dominican Republic", "lat": 18.7357, "lng": -70.1627},
    "JP": {"name": "Japan", "lat": 36.2048, "lng": 138.2529},
    "BR": {"name": "Brazil", "lat": -14.2350, "lng": -51.9253}
}

# Explicit corridor list (at least 30 corridors)
CORRIDOR_DEFS = [
    ("IN", "AE"), ("IN", "US"), ("US", "MX"), ("GB", "IN"), ("SA", "PK"),
    ("DE", "TR"), ("AE", "BD"), ("CA", "PH"), ("AU", "IN"), ("FR", "MA"),
    ("US", "IN"), ("AE", "IN"), ("GB", "NG"), ("US", "PH"), ("DE", "PL"),
    ("ES", "CO"), ("GB", "PK"), ("SG", "MY"), ("US", "VN"), ("SA", "EG"),
    ("AE", "PK"), ("ZA", "ZW"), ("IT", "RO"), ("US", "CN"), ("CA", "IN"),
    ("MY", "ID"), ("AU", "VN"), ("SA", "IN"), ("FR", "SN"), ("AE", "EG"),
    ("GB", "BD"), ("US", "SV"), ("DE", "UA"), ("US", "DO"), ("JP", "BR")
]

class SyntheticRemittanceAdapter(BaseRemittanceAdapter):
    def fetch_corridors(self) -> List[Corridor]:
        corridors = []
        random.seed(42)  # For deterministic data generation

        for i, (orig, dest) in enumerate(CORRIDOR_DEFS):
            orig_geo = COUNTRY_GEOLOCATIONS[orig]
            dest_geo = COUNTRY_GEOLOCATIONS[dest]

            # Generate structured providers
            providers = [
                Provider(
                    name="Wise",
                    fee_percent=round(random.uniform(0.3, 0.6), 2),
                    fixed_fee=round(random.uniform(0.5, 1.5), 2),
                    fx_spread=round(random.uniform(0.1, 0.25), 2),
                    settlement_time_hours=round(random.uniform(0.5, 4.0), 2),
                    accessibility_score=random.randint(85, 95)
                ),
                Provider(
                    name="Western Union",
                    fee_percent=round(random.uniform(1.2, 2.5), 2),
                    fixed_fee=round(random.uniform(2.0, 4.0), 2),
                    fx_spread=round(random.uniform(1.5, 3.0), 2),
                    settlement_time_hours=round(random.uniform(0.5, 24.0), 2),
                    accessibility_score=random.randint(90, 98)
                ),
                Provider(
                    name="MoneyGram",
                    fee_percent=round(random.uniform(1.0, 2.2), 2),
                    fixed_fee=round(random.uniform(1.5, 3.5), 2),
                    fx_spread=round(random.uniform(1.2, 2.8), 2),
                    settlement_time_hours=round(random.uniform(0.5, 12.0), 2),
                    accessibility_score=random.randint(88, 96)
                ),
                Provider(
                    name="Bank Transfer (SWIFT)",
                    fee_percent=round(random.uniform(0.0, 0.3), 2),
                    fixed_fee=round(random.uniform(15.0, 30.0), 2),
                    fx_spread=round(random.uniform(1.0, 2.2), 2),
                    settlement_time_hours=round(random.uniform(48.0, 72.0), 2),
                    accessibility_score=random.randint(55, 75)
                ),
                Provider(
                    name="Mobile Wallet Transfer",
                    fee_percent=round(random.uniform(0.5, 1.5), 2),
                    fixed_fee=round(random.uniform(0.5, 1.0), 2),
                    fx_spread=round(random.uniform(0.5, 1.2), 2),
                    settlement_time_hours=round(random.uniform(0.05, 0.5), 2),
                    accessibility_score=random.randint(82, 94)
                ),
                Provider(
                    name="Crypto (Stablecoins)",
                    fee_percent=round(random.uniform(0.0, 0.1), 2),
                    fixed_fee=round(random.uniform(1.0, 2.0), 2),
                    fx_spread=round(random.uniform(0.05, 0.15), 2),
                    settlement_time_hours=round(random.uniform(0.05, 0.2), 2),
                    accessibility_score=random.randint(40, 60)
                )
            ]

            # Calculate average cost and speed across providers
            # True Cost % of sending $500: ((fee_percent * 500 / 100) + fixed_fee + (fx_spread * 500 / 100)) / 500 * 100
            # which simplifies to: fee_percent + fx_spread + (fixed_fee / 5)
            costs = []
            speeds = []
            for p in providers:
                effective_cost = p.fee_percent + p.fx_spread + (p.fixed_fee / 5.0)
                costs.append(effective_cost)
                speeds.append(p.settlement_time_hours)

            avg_cost = round(sum(costs) / len(costs), 2)
            avg_speed = round(sum(speeds) / len(speeds), 1)
            risk_score = round(random.uniform(2.0, 8.0) if orig != "UA" else 8.5, 1)

            corridors.append(Corridor(
                id=f"{orig}-{dest}",
                origin_country=orig_geo["name"],
                origin_code=orig,
                origin_lat=orig_geo["lat"],
                origin_lng=orig_geo["lng"],
                destination_country=dest_geo["name"],
                destination_code=dest,
                destination_lat=dest_geo["lat"],
                destination_lng=dest_geo["lng"],
                average_cost_percent=avg_cost,
                average_speed_hours=avg_speed,
                risk_score=risk_score,
                providers=providers,
                receive_options=["Bank Deposit", "Mobile Wallet", "Cash Pickup", "Agent Network", "Digital Account"],
                is_synthetic=True
            ))

        return corridors
