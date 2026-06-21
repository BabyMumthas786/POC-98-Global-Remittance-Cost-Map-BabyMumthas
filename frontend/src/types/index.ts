export interface Provider {
  name: string;
  fee_percent: number;
  fixed_fee: number;
  fx_spread: number;
  settlement_time_hours: number;
  accessibility_score: number;
}

export interface Corridor {
  id: string;
  origin_country: string;
  origin_code: string;
  origin_lat: number;
  origin_lng: number;
  destination_country: string;
  destination_code: string;
  destination_lat: number;
  destination_lng: number;
  average_cost_percent: number;
  average_speed_hours: number;
  risk_score: number;
  providers: Provider[];
  receive_options: string[];
  is_synthetic: boolean;
}

export interface DashboardSummary {
  total_corridors: number;
  countries_covered: number;
  average_cost_percent: number;
  average_speed_hours: number;
  most_affordable_corridor: string | null;
  highest_cost_corridor: string | null;
}
