from abc import ABC, abstractmethod
from typing import List
from app.models import Corridor, DashboardSummary

class BaseRemittanceAdapter(ABC):
    @abstractmethod
    def fetch_corridors(self) -> List[Corridor]:
        """Fetch remittance corridors from the source."""
        pass

    def calculate_summary(self, corridors: List[Corridor]) -> DashboardSummary:
        """Calculate aggregate KPIs from list of corridors."""
        if not corridors:
            return DashboardSummary(
                total_corridors=0,
                countries_covered=0,
                average_cost_percent=0.0,
                average_speed_hours=0.0,
                most_affordable_corridor=None,
                highest_cost_corridor=None
            )

        unique_countries = set()
        total_cost = 0.0
        total_speed = 0.0

        min_cost = float('inf')
        max_cost = float('-inf')
        affordable_corridor = ""
        expensive_corridor = ""

        for c in corridors:
            unique_countries.add(c.origin_country)
            unique_countries.add(c.destination_country)
            total_cost += c.average_cost_percent
            total_speed += c.average_speed_hours

            if c.average_cost_percent < min_cost:
                min_cost = c.average_cost_percent
                affordable_corridor = f"{c.origin_country} → {c.destination_country}"

            if c.average_cost_percent > max_cost:
                max_cost = c.average_cost_percent
                expensive_corridor = f"{c.origin_country} → {c.destination_country}"

        return DashboardSummary(
            total_corridors=len(corridors),
            countries_covered=len(unique_countries),
            average_cost_percent=round(total_cost / len(corridors), 2),
            average_speed_hours=round(total_speed / len(corridors), 1),
            most_affordable_corridor=affordable_corridor,
            highest_cost_corridor=expensive_corridor
        )
