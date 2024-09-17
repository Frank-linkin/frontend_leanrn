import { useState } from 'react'
import './App.css'

const url = 'https://api.github.com';
async function getUserInfos(userInfo) {
  try {
    const response = await fetch(`${url}/search/users?q=${userInfo}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    throw new Error(`Request Failed: ${error.message}`)
  }
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [usersList, setUsersList] = useState([]);

  async function submitHandler(inputValue) {
    const userInfos = await getUserInfos(inputValue);
    setUsersList(userInfos);
  }

  return <>
    <h1 className='font-serif text-3xl m-4'>Project 5: GitHub User Search</h1>
    <input className="m-4 bg-stone-300" 
      type="text"
      placeholder="Please Enter Info"
      value={inputValue}
      onChange={(e) => { setInputValue(e.target.value) }}
      ></input>
    <button className="bg-slate-600 m-3 rounded-sm p-1" onClick={() => { submitHandler(inputValue) }}>Search</button>
    <h2 className='mt-7'>Result as Follow</h2>
    <UserList key={Math.random() * 100} userInfos={usersList}>
    </UserList>
  </>

  function UserList({ userInfos }) {
    return (
      <div className="bg-white m-5 p-11">
        {userInfos.map((userInfo) => {
          return (<div className='h=[30px] p-3 border-solid border-white rounded-lg text-stone-950 flex m-8 bg-slate-600'>
            <img className='h-12 w-12' src={userInfo.avatar_url} alt="Profile"></img>
            <a className='font-serif	' href={userInfo.html_url} target="_blank" rel="no referer">
              {userInfo.login}
            </a>
          </div>)
        })}
      </div>
    )
  }
}

export default App
