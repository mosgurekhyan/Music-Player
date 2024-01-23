import './SongRow.css'
import dots from '../../assets/images/dots.png'

import { UseContext } from '../../App'

import { memo, useContext, useEffect, useRef } from 'react'

function SongRow({ id, songName, artistName, trackNumber, file, isPlaying, onTogglePlay }) {
  // Ref for the audio element
  const audioRef = useRef(null)
  // Accessing the setEnded function from the context
  const { setEnded } = useContext(UseContext)

  // Effect to play/pause the audio based on isPlaying prop
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [ isPlaying ])

  // Function to toggle play/pause for the song
  function togglePlayPause() {
    onTogglePlay(id)
  }

  return (
    <div className='songRow'>
      <div className='rectangle1'>
        <img className='dots' src={dots} alt=''/>
        <i onClick={togglePlayPause} className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} btn play_pause2 icon-color`}/>
      </div>
      <div className='rectangle2'>
        <h4 className='songRow_data_name'>{songName}</h4>
      </div>
      <div className='rectangle3'>
        <h4 className='songRow_data_name'>{artistName}</h4>
      </div>
      <div className='rectangle4'>
        <h4 className='songRow_data_name'>{trackNumber}</h4>
      </div>
      <div className='rectangle5'>
        <i className="fa-solid fa-heart btn icon-color"></i>
        <i className="fa-solid fa-check btn icon-color"></i>
        <i className="fa-solid fa-share btn icon-color"></i>
        <i className="fa-solid fa-sort-down btn icon-color"/>
      </div>
      <audio onEnded={() => setEnded(true)} ref={audioRef} src={file}></audio>
    </div>
  )
}

// Memoizing the SongRow component for performance optimization
export default memo(SongRow, (prev, next) => JSON.stringify(prev) === JSON.stringify(next))