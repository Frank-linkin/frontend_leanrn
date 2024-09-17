import { useState } from 'react'
import './App.css'

function App() {
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(150);

  let bmi = weight*10000 / (height * height);
  bmi = bmi.toFixed(3);
  return (
    <div className='border-solid border-sky-950 border-2 p-3'>
      <div>
        <h1 className='bg-sky-600 rounded-lg p-2'>Project 7: BMI CALCULATOR</h1>
      </div>
      <div className='flex flex-col justify-between'>
        <label className='block self-start mt-2' htmlFor='key-weight'>Weight:{weight}kg</label>
        <input className='block' id='key-weight' type="range" min="20" step="1" max="100" onChange={(e) => setWeight(e.target.value)}></input>
        <label className='block self-start mt-2' htmlFor='key-height'>Height:{height}cm</label>
        <input className='block' id='key-height' type="range" min="50" step="1" max="200" onChange={(e) => setHeight(e.target.value)}></input>
        <div className='mt-4'>Your BMI is
           <span className='mx-2 bg-sky-800 text-white px-2 rounded-md'>{bmi}</span>
        </div>
      </div>
    </div>
  )
}

export default App
