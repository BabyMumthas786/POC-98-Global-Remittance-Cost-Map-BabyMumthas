from typing import List
from app.models import Corridor
from app.adapters.base import BaseRemittanceAdapter

class WorldBankAdapter(BaseRemittanceAdapter):
    def fetch_corridors(self) -> List[Corridor]:
        # In a real system, this would call:
        # http_client.get("https://api.worldbank.org/v2/.../remittance-cost")
        # And parse the resulting XML/JSON.
        print("WorldBankAdapter: Fetching reference World Bank data (stub)...")
        return []
