import { useState, useRef } from 'react'
import './App.css'
const urls = [
  'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4',
  'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-slow.mp4',
  'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-cute.mp4',
  'https://s3.amazonaws.com/codecademy-content/courses/React/react_video-eek.mp4',
]

const INDEX_DEER = 0;
const INDEX_SNAIL = 1;
const INDEX_CAT = 2;
const INDEX_SPIDER = 3;


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <h1 className="">Project 6: Video Player</h1>
      <div className="">
        <input id="input-1" name="video-name" type="radio" value={INDEX_DEER} onClick={() => setCurrentIndex(INDEX_DEER)}></input>
        <label className="mr-2" htmlFor="input-1">Deer</label>
        <input id="input-2" name="video-name" type="radio" value={INDEX_SNAIL} onClick={() => setCurrentIndex(INDEX_SNAIL)}></input>
        <label className="mr-2" htmlFor="input-2">Snail</label>
        <input id="input-3" name="video-name" type="radio" value={INDEX_CAT} onClick={() => setCurrentIndex(INDEX_CAT)}></input>
        <label className="mr-2" htmlFor="input-3">Cat</label>
        <input id="input-4" name="video-name" type="radio" value={INDEX_SPIDER} onClick={() => setCurrentIndex(INDEX_SPIDER)}></input>
        <label className="mr-2" htmlFor="input-4">Spider</label>
      </div>
      <VideoPlayer currentUrl={urls[currentIndex]}></VideoPlayer>
    </>
  )
}

function VideoPlayer({ currentUrl }) {
  return <video controls loop muted src={currentUrl}>

  </video>
}
export default App;