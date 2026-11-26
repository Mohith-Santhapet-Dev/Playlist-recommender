import { useEffect, useState } from 'react'
import SearchComponent from "./Components/SearchSongs"
import Playlist from './Components/Playlist'


function App() {

  const [playlist, setPlaylist] = useState([])
  return (
    <>
      <Header/>
      <div className='main-container'>
        <SearchComponent addSong = {setPlaylist} currSongs = {playlist}/>
        <Playlist songs = {playlist}/>
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

