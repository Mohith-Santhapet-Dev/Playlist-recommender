# Playlist Recommender

A content-based playlist recommender. Search for songs, add them to a playlist, and get back songs that sound similar, based on their audio features.

Built with Python (FastAPI, pandas, scikit-learn) and React.


## How it works

1. **Data.** About 28,000 songs from a Spotify dataset, deduplicated by `track_id`, and again by song name and artist (keeping the most popular version).
2. **Turning songs into vectors.** Each song becomes a row of 42 numbers:
   - 9 audio features (danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo), scaled with `StandardScaler` so large-range features like tempo don't dominate the distance
   - `key` encoded as sine and cosine, since keys are cyclical (key 11 is next to key 0)
   - `mode` as 0 or 1
   - `playlist_genre` and `playlist_subgenre`, one-hot encoded
3. **Playlist vector.** The vectors of the user's songs are averaged into one vector.
4. **Recommendations.** I compute the Euclidean distance from that vector to every song, sort by distance, remove songs already in the playlist, and return the closest N.

## Tech stack

- **Backend:** Python, FastAPI, pandas, NumPy, scikit-learn
- **Frontend:** React (Vite)

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | number of songs loaded |
| GET | `/search?song=...&author=...` | search by song name, optionally filtered by artist, sorted by popularity |
| POST | `/recommend` | takes `{"track_ids": [...], "n": 10}` and returns recommended songs |


## What I learned

- **Why features need scaling.** Euclidean distance is dominated by large-range columns, so without scaling, tempo (~60 to 200) would swamp danceability (0 to 1).
- **Encoding different kinds of data.** Cyclical features like musical key need sine/cosine encoding, and categorical features like genre need one-hot encoding.
- **Keeping data aligned.** Row `i` of the feature matrix must match row `i` of the DataFrame, so any cleaning has to happen before the matrix is built.
- **FastAPI.** Query parameters, Pydantic request bodies, CORS, and the auto-generated `/docs` page.
- **Reading tracebacks.** Starting from the last line and working up to find my own code.
- **React fundamentals.** State and props, lifting state up, `useEffect` for fetching, rendering lists with keys, and why you never call a state setter during render or mutate state directly.
- **Async code.** Why a POST request has to be made in an event handler and its result stored in state, not awaited during render.

## Known limitations and what I want to improve

- **Mixed playlists give weak results.** Averaging songs from very different genres produces a point in the middle that may not resemble any of them. For example, a hip-hop, R&B and indie playlist returned mostly dance and EDM tracks. I want to try scoring candidates by distance to the *nearest* playlist song, or clustering the playlist and recommending per cluster.
- **Genre weighting.** Genre makes up 30 of the 42 columns, so it may dominate the distance. I want to experiment with weighting those columns down.
- **No evaluation yet.** I plan to hide a few songs from a real playlist and measure how often the recommender finds them again.
- **Missing UI features.** Removing songs from the playlist, adding a recommended song to the playlist, loading and error states, and a control for the number of recommendations.
- **Stale results.** Recommendations stay on screen after the playlist changes.
- **Layout polish.** Balanced panel widths, empty-state messages, and scrolling lists.


## Credits

- Dataset: **30000 Spotify Songs** on Kaggle, https://www.kaggle.com/datasets/joebeachcapital/30000-spotify-songs.