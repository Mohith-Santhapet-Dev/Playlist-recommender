import { useState } from "react"


function Recommend(props) {
    const [clicked, setClicked] = useState(false)
    const [recommended, setRecommended] = useState([])
    const songs = props.songs

    const track_ids = songs.map(song => song.track_id)

    async function fetchResults(track_ids, n) {
        const request = {"track_ids": track_ids, "n": n}
        const response = await fetch("http://127.0.0.1:8000/recommend", {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(request)})
        return await response.json()
    }


    async function recommendButton() {
        setClicked(true)
        const recommendedSongs = await fetchResults(track_ids, 10)
        setRecommended(recommendedSongs)
    }
    return (
        <div className="recommend-container">
            <button className="recommend-button" onClick={recommendButton}> Recommend Playlist </button>
            {clicked && <RecommendedResults results= {recommended}/>}
            
        </div>
        
    )
}

function RecommendedResults(props) {
    const recommendedSongs = props.results
    return (
        <div className="results-container">
            <ul className="recommended-songs-list">
                {recommendedSongs.map(s => <li key={s.track_id}> {s.track_name} </li>)}
            </ul>
        </div>
    )
}

export default Recommend