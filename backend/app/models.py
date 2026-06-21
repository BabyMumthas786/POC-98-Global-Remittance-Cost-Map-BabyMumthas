from pydantic import BaseModel
from typing import List, Optional

class Provider(BaseModel):
    name: str  # Wise, Western Union, MoneyGram, Bank Transfer, Mobile Wallet, Crypto Transfer
    fee_percent: float
    fixed_fee: float
    fx_spread: float
    settlement_time_hours: float
    accessibility_score: int  # 0 to 100

class Corridor(BaseModel):
    id: str  # e.g., "US-MX"
    origin_country: str
    origin_code: str
    origin_lat: float
    origin_lng: float
    destination_country: str
    destination_code: str
    destination_lat: float
    destination_lng: float
    average_cost_percent: float
    average_speed_hours: float
    risk_score: float
    providers: List[Provider]
    receive_options: List[str]  # Bank Deposit, Mobile Wallet, Cash Pickup, Agent Network, Digital Account
    is_synthetic: bool = True

class DashboardSummary(BaseModel):
    total_corridors: int
    countries_covered: int
    average_cost_percent: float
    average_speed_hours: float
    most_affordable_corridor: Optional[str]
    highest_cost_corridor: Optional[str]
