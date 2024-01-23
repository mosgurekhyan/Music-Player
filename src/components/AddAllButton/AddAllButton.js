import './AddAllButton.css'

import { UseContext } from '../../App'

import { useContext, useEffect, useRef, useState } from 'react'

function AddAllButton() {
  // Extracting state and functions from context
  const { setPlayingSongs, songsData, ended, setEnded } = useContext(UseContext)
  // State for managing the current index
  const [ index, setIndex ] = useState(0)
  // Ref for the previous index to track changes
  const prevIndexRef = useRef(0)

  // Effect to handle the playback end and update the index
  useEffect(() => {
    if (ended) {
      // Resetting the ended state and updating the index
      setEnded(false)
      setIndex((prevIndex) => (prevIndex + 1) % songsData.length)
    }
  }, [ ended, setEnded, songsData ])

  // Effect to handle changes in the index and update the playing songs
  useEffect(() => {
    if (index !== prevIndexRef.current) {
      // Setting the currently playing song based on the index
      setPlayingSongs([songsData[index].id])
      // Updating the previous index ref
      prevIndexRef.current = index
    }
  }, [ index, setPlayingSongs, songsData ])

  // Function to handle the Add All button click
  const handleAddAll = () => {
    console.log('Add All clicked')
    // Adding the first song to the playing songs
    setPlayingSongs([songsData[0].id])
  }

  return (
    <div onClick={handleAddAll} className='addAllButton'>
      <i className='fa-solid fa-plus btn'/>
      <p className='btn_text'>Add All</p>
      <span className='line'></span>
      <i className="fa-solid fa-sort-down btn"/>
    </div>
  )
}

export default AddAllButton