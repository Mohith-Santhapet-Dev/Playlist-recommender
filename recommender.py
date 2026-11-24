import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

numuric_columns =["danceability", "energy", "loudness", "speechiness",
                "acousticness", "instrumentalness", "liveness",
                "valence", "tempo"]

def load_data(path = "spotify_songs.csv"):
    df = pd.read_csv(path)
    df = df.drop_duplicates(subset="track_id").reset_index(drop=True)
    return df
    

def build_features(df):
    
    scaler = StandardScaler()
    X_numeric = scaler.fit_transform(df[numuric_columns])
    genre_dummies = pd.get_dummies(df[["playlist_genre", "playlist_subgenre"]])
    key_sin = np.sin(2 * np.pi * df["key"] / 12)
    key_cos = np.cos(2 * np.pi * df["key"] / 12)

    X = np.hstack([
        X_numeric,
        key_sin.values.reshape(-1, 1),
        key_cos.values.reshape(-1, 1),
        df[["mode"]].values,
        genre_dummies.values.astype(float),
    ])
    return X

def recommend(df, X, playlist_idx, n= 10):
    # playlist_idx is a list of idices of the songs
    playlist_matrix = X[playlist_idx]
    average_vector = np.mean(playlist_matrix, axis = 0)
    distances = np.linalg.norm(X - average_vector, axis = 1)
    order = np.argsort(distances)
    filtered = [i for i in order if i not in playlist_idx][:n]

    result = df.iloc[filtered][["track_name", "track_artist",
                                "playlist_genre", "playlist_subgenre", "track_id"]].copy()
    result["distance"] = distances[filtered]
    return result


if __name__ == "__main__":
    df = load_data()
    X = build_features(df)
    playlist_idx = [0, 1, 2]
    print(df.iloc[playlist_idx][["track_name", "track_artist"]])
    print(recommend(df, X, playlist_idx, n=10))
    