import { useState } from 'react'
import './App.css'

//FROM:https://www.freeimages.com/cn
const pictureUrls = [
  "https://images.freeimages.com/images/large-previews/355/poppies-2-1334190.jpg?fmt=webp&w=500", 
  "https://images.freeimages.com/images/large-previews/400/bird-at-zoo-1579028.jpg?fmt=webp&w=500", 
  "https://cdn.pixabay.com/photo/2023/03/24/14/23/lion-7874143_640.jpg", 
  "https://images.freeimages.com/images/large-previews/f6b/flowers-1182653.jpg?fmt=webp&w=500", 
  "https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500"
];

function App() {
  return (
    <>
      <div>
        <h1>Project 1： Carousel Picture Gallery </h1>
        <PicGallery ></PicGallery>
      </div>

    </>
  )
}

function PicGallery() {
  const [picNo,setPicNo] = useState(0);

  function HandleNextOne() {
    setPicNo(picNo + 1);
    console.log(picNo);
  }

  function HandleLastOne() {
    setPicNo(picNo - 1);
    console.log(picNo);
  }


  return (
    <div className="flex flex-row m-32">
      <LeftButton onClickStart={HandleLastOne}></LeftButton>
      <DisplayBox pictureIndex={picNo}></DisplayBox>
      <RightButton onClickStart={HandleNextOne}></RightButton>
    </div>
  )
}

function LeftButton({onClickStart}) {
  return <button className="mr-16 bg-sky-500 hover:bg-sky-600 rounded-sm hover:text-white" onClick={onClickStart}>late one</button>
}

function RightButton({onClickStart}) {
  return <button className="ml-16 bg-sky-500 hover:bg-sky-600 rounded-sm hover:text-white" onClick={onClickStart}>next one</button>
}

function DisplayBox({pictureIndex}) {
  return (
    <div className='w-1/2 h-96'>
      <img
        className='inline-block w-96 h-96'
        src={pictureUrls[Math.abs((pictureIndex)%pictureUrls.length)]}>
      </img>
    </div>
  )
}

export default App
// 先搭建好静态框架
// 然后分析State
// 分析好State之后做交互
// 做完交互之后进行美化