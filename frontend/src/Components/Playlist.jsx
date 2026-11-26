
function Playlist(props) {
    const songs = props.songs
    return (
        <div className="playlist-container">
            <h1 className="playlist-title"> Your Playlist </h1>
            <ul className = "songs-list">
                {songs.map(song => <li className="song"> {song.track_name} - {song.track_artist} </li>)}
            </ul>
        </div>
    )
}

export default Playlist