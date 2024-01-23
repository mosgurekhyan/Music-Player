import './MusicUploadForm.css'

import { UseContext } from '../../App'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

function MusicUploadForm() {
  // Extracting visibility state and setter from context
  const { isVisible, setIsVisible } = useContext(UseContext)
  // State for the selected file, upload status, messages, and errors
  const [ selectedFile, setSelectedFile ] = useState(null)
  const [ uploading, setUploading ] = useState(false)
  const [ uploadingMessage, setUploadingMessage ] = useState(false)
  const [ error, setError ] = useState('')

  // Refs for form inputs
  const musicRefs = {
    songName: useRef(null),
    artistName: useRef(null),
    trackNumber: useRef(null),
    file: useRef(null)
  }

  // Focus on the first input field when the form is visible
  useEffect(() => {
    if (isVisible) {
      musicRefs.songName.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isVisible ])

  // Function to handle the music upload
  const addMusic = event => {
    event.preventDefault()
    // Validate inputs
    if (
      !musicRefs.songName.current.value ||
      !musicRefs.artistName.current.value ||
      !musicRefs.trackNumber.current.value ||
      !selectedFile
    ) {
      console.error('All fields are required')
      return
    }

    // Create FormData and append form data
    const formData = new FormData()
    formData.append('songName', musicRefs.songName.current.value)
    formData.append('artistName', musicRefs.artistName.current.value)
    formData.append('trackNumber', musicRefs.trackNumber.current.value)
    formData.append('file', selectedFile)
    setUploading(true)
    // Make a POST request to upload the music file
    axios.post(`http://localhost:3001/musics`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
    .then(() => {
      setUploading(false)
      setUploadingMessage(true)
      setTimeout(() => setUploadingMessage(false), 2000)
    })
    .catch(err => {
      setUploading(false)
      setError(err.message)
      setTimeout(() => setError(''), 2000)
    })

    // Reset form inputs and selected file
    Object.values(musicRefs).forEach(ref => (ref.current.value = ''))
    setSelectedFile(null)
  }

  // Function to handle file change
  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  return (
    <div style={{display: !isVisible && 'none'}} className='musicUploadForm'>
      <h2>Add Music Here</h2>
      <form onSubmit={addMusic}>
        <div className='form_container'>
        <i onClick={() => setIsVisible(false)} className="fa-solid fa-xmark btn"></i>
        <div className='labels'>
          <label htmlFor="songName">songName:</label>
          <label htmlFor="artistName">artistName:</label>
          <label htmlFor="trackNumber">trackNumber:</label>
          <label htmlFor="file">file:</label>
        </div>
        <div className='inputs'>
          <input ref={musicRefs.songName} className='inp' name='songName' id='songName' type='text'/>
          <input ref={musicRefs.artistName} className='inp' name='artistName' id='artistName' type='text'/>
          <input ref={musicRefs.trackNumber} className='inp' name='trackNumber' id='trackNumber' type='number'/>
          <input onChange={handleFileChange} ref={musicRefs.file} accept=".mp3, .wav" className='inp' name='music' id='music' type='file'/>
          {selectedFile && <p>{selectedFile.name}</p>}
        </div>
        </div>
        {uploadingMessage && <p>File upload completed</p>}
        {error && <p className='error'>{error}</p>}
        {uploading && <LoadingSpinner/>}
        <button disabled={!selectedFile || uploading} className='add-music'>Upload</button>
      </form>
    </div>
  )
}

export default MusicUploadForm