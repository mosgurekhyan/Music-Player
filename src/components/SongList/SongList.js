import './SongList.css'

import { UseContext } from '../../App'
import SongRow from '../SongRow/SongRow'

import { useContext } from 'react'

function SongList() {
  // Extracting relevant data from the context
  const { songsData, setPlayingSongs, playingSongs } = useContext(UseContext)

  // Function to toggle play/pause for a song
  const handleTogglePlay = songId => {
    setPlayingSongs(prevPlayingSongs => {
      if (prevPlayingSongs.includes(songId)) {
        return prevPlayingSongs.filter(id => id !== songId)
      } else {
        return [ ...prevPlayingSongs, songId ]
      }
    })
  }

  return (
    <div className='songList'>
      <div className='song_data_names'>
        <div className='rectangle1'></div>
        <div className='rectangle2'>
          <h4 className='song_data_name'>Song Name</h4>
        </div>
        <div className='rectangle3'>
          <h4 className='song_data_name'>Artist Name</h4>
        </div>
        <div className='rectangle4'>
          <h4 className='song_data_name'>Track</h4>
        </div>
        <div className='rectangle5'></div>
      </div>
      <div className='songs'>
        {
          songsData.map(e => 
            <SongRow key={e.id} { ...e } onTogglePlay={handleTogglePlay} isPlaying={playingSongs.includes(e.id)} />  
          )
        }
      </div>
    </div>
  )
}

export default SongList