import './App.css'
import song1 from "./assets/music/minus-boi-185889.mp3"
import song2 from "./assets/music/scary-motel-drill-21311.mp3"
import song3 from "./assets/music/street-noises-demo-142902.mp3"
import arrow from './assets/images/arow_down_arrow_up.jpg'

import PlayAllButton from './components/PlayAllButton/PlayAllButton'
import AddAllButton from './components/AddAllButton/AddAllButton'
import SongList from './components/SongList/SongList'
import MusicUploadForm from './components/MusicUploadForm/MusicUploadForm'

import { createContext, useMemo, useState } from 'react'

function App() {
  // State to manage the list of songs, visibility of the add music form,
  // currently playing songs, and whether playback has ended
  const [ songsData, setSongsData ] = useState([
    { id: 1, songName: 'Song 1', artistName: 'Artist 1', trackNumber: 1, file: song1 },
    { id: 2, songName: 'Song 2', artistName: 'Artist 2', trackNumber: 2, file: song2 },
    { id: 3, songName: 'Song 3', artistName: 'Artist 3', trackNumber: 3, file: song3 }
  ])
  const [ isVisible, setIsVisible ] = useState(false)
  const [ playingSongs, setPlayingSongs ] = useState([])
  const [ ended, setEnded ] = useState(false)

  // Creating a context provider value with useMemo to optimize performance
  const providerValue = useMemo(() => ({ songsData, setSongsData, isVisible, setIsVisible, playingSongs, setPlayingSongs, ended, setEnded }), [ songsData, setSongsData, isVisible, setIsVisible, playingSongs, setPlayingSongs, ended, setEnded ])

  return (
    <UseContext.Provider value={providerValue}>
      <div className="app">
        <div className='menu'>
          <div className='menu_container'>
            <PlayAllButton/>
            <AddAllButton/>
          </div>
          <button onClick={() => setIsVisible(true)} className='add_btn'>Add Music</button>
          <div className='menu_container'>
            <div className='truckNumber'>
              <i className="fa-solid fa-arrow-down-arrow-up"></i>
              <img className='arrow' alt='' src={arrow}/>
              <p className='track_text'>Track Nu...</p>
              <i className="fa-solid fa-sort-down btn"/>
            </div>
            <div className='filter'>
              <input placeholder='Filter' className='input' type='search' />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <SongList/>
        <h1 data-testid='song'>{songsData[0].songName}</h1>
        <MusicUploadForm/>
        <div style={{display: !isVisible && 'none'}} className='overlay'></div>
      </div>
    </UseContext.Provider>
  )
}

export default App
export const UseContext = createContext(null)