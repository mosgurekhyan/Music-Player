import './PlayAllButton.css'

import { UseContext } from '../../App'

import { useContext, useState } from 'react'

function PlayAllButton() {
  // State for play/pause toggle
  const [ play, setPlay ] = useState(false)
  // Accessing the setPlayingSongs and songsData from the context
  const { setPlayingSongs, songsData } = useContext(UseContext)

  // Function to handle the Play All button click
  const handlePlayAll = () => {
    console.log('Play All clicked')
    // Extracting all song ids
    const allSongIds = songsData.map(song => song.id)
    // Toggling play/pause for all songs
    setPlayingSongs(prevPlayingSongs => {
      return prevPlayingSongs.length === allSongIds.length ? [] : allSongIds
    })
  }

  return (
    <div onClick={() => {setPlay(!play); handlePlayAll()}} className='playAllButton'>
      <i className={`fa-solid ${play ? 'fa-pause' : 'fa-play'} btn play_pause`}/>
      <p className='btn_text'>Play All</p>
      <span className='line'></span>
      <i className="fa-solid fa-sort-down btn"/>
    </div>
  )
}

export default PlayAllButton