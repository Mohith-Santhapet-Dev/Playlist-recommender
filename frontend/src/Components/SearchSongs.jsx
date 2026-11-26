import { useEffect, useState } from 'react'

function SearchComponent(props) {
    const addSongFn = props.addSong
    return(
        <div className='SearchContainer'>
            <h1 className='add-songs-title'> Add Songs </h1>
            <SearchSongs addSong = {addSongFn}></SearchSongs>
        </div>
        
    )
}


function SearchSongs(props) {
  const [Songtext, setSongText] = useState("")
  const [ArtistText, setArtistText] = useState("")
  const [result, setResult] = useState([])
  const addSongFn = props.addSong

  useEffect(() => {
    if (Songtext.trim() === "") {
        setResult([])
        return;
    }
    async function fetchSongs() {
        let response;
        if (Songtext !== "" && ArtistText === "") {
            response = await fetch(`http://127.0.0.1:8000/search?song=${Songtext}`)
        }
        else if(Songtext !== "" && ArtistText !== "") {
            response = await fetch(`http://127.0.0.1:8000/search?song=${Songtext}&author=${ArtistText}`)
        }
        const data = await response.json()
        setResult(data)
    }
    fetchSongs()
  }, [Songtext, ArtistText])


  return (
      <>
        <div className='inputs-container'>
            <input className= "search-input" placeholder='search a song' value={Songtext} onChange={(e) => setSongText(e.target.value)}/>
            <input className = "search-input" placeholder='(optional) enter an artist' value={ArtistText} onChange={(e) => setArtistText(e.target.value)}/>
        </div>

        <Results songs = {result} addSong = {addSongFn}/>
      </>


    
  )
}

function Results(props) {
  const addSongFn = props.addSong
  
  return (
    <ul className='result-list'>
      {props.songs.map((song) => 
        {   const songDetails = `${song.track_name} - ${song.track_artist}`
            return<li className = "result-item" key={song.track_id}> {songDetails}  
                    <button className='add-song-btn' onClick={() => addSongFn(song)}> Add </button> 
               </li>})}
    </ul>
    
  )
}

export default SearchComponent