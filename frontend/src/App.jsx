import { useEffect, useState } from 'react'



function App() {
  return (
    <>
      <Header/>
      <SearchSongs/>
      
    </>
  )


}

export default App

function Header() {
  return (
    <h1> Playlist Recommender</h1> 
  )
}

function SearchSongs() {
  const [text, setText] = useState("")
  const [result, setResult] = useState([])

  useEffect(() => {
    async function fetchSongs() {
      const response = await fetch(`http://127.0.0.1:8000/search?song=${text}`)
      const data = await response.json()
      setResult(data)
    }
    fetchSongs()
  }, [text])

  console.log(text)
  console.log(result)
  return (
    <form>
      <input placeholder='search a song' value={text} onChange={(e) => setText(e.target.value)}/>
      <button type='submit'> Search </button>
      <Results songs = {result}/>
    </form>
    
  )
}

function Results(props) {
  const songs = props.songs.map((song) => song.track_name)
  return (
    <ul>
      {songs.map((song) => <div><li> {song} </li> <button> Add </button></div>)}
    </ul>
    
  )
}