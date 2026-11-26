import { useEffect, useState } from 'react'
import SearchComponent from "./Components/SearchSongs"
import Playlist from './Components/Playlist'
import Recommend from './Components/recommend'


function App() {

  const [playlist, setPlaylist] = useState([])
  function addSong(song) {
    const inSong = playlist.some(s => s.track_id === song.track_id)
    if (!inSong) {
      setPlaylist([...playlist, song])
    }
  } 

  return (
    <>
      <Header/>
      <div className='main-container'>
        <div className = "create-playlist-container">
          <SearchComponent addSong = {addSong}/>
          <Playlist songs = {playlist}/>
        </div>
        <Recommend songs = {playlist}/>
      </div>
      
      
    </>
  )


}

export default App

function Header() {
  return (
    <div className='headerContainer'>
      <h1 className='header'> Playlist Recommender</h1> 
    </div>
    
  )
}

