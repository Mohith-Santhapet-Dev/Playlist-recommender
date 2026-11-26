import { useEffect, useState } from 'react'

function SearchComponent() {
    return(
        <div className='SearchContainer'>
            <h1 className='add-songs-title'> Add Songs </h1>
            <SearchSongs></SearchSongs>
        </div>
        
    )
}


function SearchSongs() {
  const [Songtext, setSongText] = useState("")
  const [ArtistText, setArtistText] = useState("")
  const [result, setResult] = useState([])

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

  console.log(Songtext)
  console.log(result)
  return (
      <>
        <div className='inputs-container'>
            <input className= "search-input" placeholder='search a song' value={Songtext} onChange={(e) => setSongText(e.target.value)}/>
            <input className = "search-input" placeholder='(optional) enter an artist' value={ArtistText} onChange={(e) => setArtistText(e.target.value)}/>
        </div>

        <Results songs = {result}/>
      </>


    
  )
}

function Results(props) {
  //const songs = props.songs.map((song) => song.track_name)
  return (
    <ul className='result-list'>
      {props.songs.map((song) => <li className = "result-item" key={song.track_id}> {song.track_name} - {song.track_artist}  <button className='add-song-btn'> Add </button> </li>)}
    </ul>
    
  )
}

export default SearchComponent