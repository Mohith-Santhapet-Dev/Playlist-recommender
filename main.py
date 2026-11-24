from fastapi import FastAPI
import pandas as pd
from recommender import load_data, build_features, recommend
from pydantic import BaseModel

df = load_data()
X = build_features(df)

class RecommendRequest(BaseModel):
    track_ids: list[str]
    n: int = 10

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

@app.post("/recommend")
def recommend_songs(req: RecommendRequest):
    playlist_idx = get_indices(req.track_ids)
    recommendations = recommend(df, X, playlist_idx, req.n)
    result = recommendations[["track_id","track_name", "track_artist"]].to_dict(orient="records")
    return result


def get_indices(ids: list[str]):
    result = []
    for track_id in ids:
        row_num = df.index[df['track_id'] == track_id]
        if (len(row_num) > 0):
            result.append(int(row_num[0]))
    return result