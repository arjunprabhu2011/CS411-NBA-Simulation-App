from basketball_reference_web_scraper import client
from basketball_reference_web_scraper.data import OutputType
import pandas as pd


for i in  range(1):
    year = 2021 
    client.players_season_totals(
        season_end_year=year, 
        output_type=OutputType.CSV, 
        output_file_path="./" + str(year - 1) + "_" + str(year) + "_player_season_totals.csv"
    )
    
    csv_name = str(year - 1) + "_" + str(year) + "_player_season_totals.csv"
    df = pd.read_csv(csv_name)
    df["YEAR"] = str(year)
    df.to_csv(csv_name, index=False)
