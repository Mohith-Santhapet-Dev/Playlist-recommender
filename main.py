from fastapi import FastAPI
import pandas as pd
from recommender import load_data, build_features, recommend

df = load_data()
X = build_features(df)

app = FastAPI()



@app.get("/health")
def total_songs():
    return {"songs": len(df)}

@app.get("/search")
def search_song(song: str = "", author:str = "", limit: int = 10):
    filtered_data = df[(df["track_name"].str.contains(song, na = False, case=False, regex=False))
                       & 
                       (df["track_artist"].str.contains(author, na = False, case = False, regex = False))].sort_values(by="track_popularity", ascending=False).head(limit)
    
    result = filtered_data[["track_name", "track_artist", "track_id"]].to_dict(orient='records')
    return result