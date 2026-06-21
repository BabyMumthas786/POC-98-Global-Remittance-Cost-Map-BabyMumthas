from app.generators.mock_data import SyntheticRemittanceAdapter

# Initialize and cache database records in memory
adapter = SyntheticRemittanceAdapter()
CORRIDORS = adapter.fetch_corridors()
SUMMARY = adapter.calculate_summary(CORRIDORS)
