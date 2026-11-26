import { useEffect, useState } from 'react'
import SearchComponent from "./Components/SearchSongs"
import Playlist from './Components/Playlist'


function App() {
  return (
    <>
      <Header/>
      <div className='main-container'>
        <SearchComponent/>
        <Playlist/>
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

