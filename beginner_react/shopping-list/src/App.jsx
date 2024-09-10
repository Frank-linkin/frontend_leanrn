import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="my-auto w-[1000px] h-[500px] bg-[#00a6ac] p-10">
      <h1 className="text-xl font-mono">Project 4: Shopping List</h1>
      <Container>

      </Container>
    </div>
  )
}

function Container() {
  let [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleDeleteItem(e, indexToDelete) {
    e.preventDefault();
    let newItems = items.filter((_, index) => {
      if (index == indexToDelete) {
        return false;
      }
      return true;
    })
    setItems(newItems);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newItems = [...items, inputValue]
    setItems(newItems);
    setInputValue('');
  }

  return (
    <div className='bg-white border-dashed border-2 border-[#145b7d] '>
      <h2 className="font-serif	text-lg">Items To Buy</h2>
      <form>
        {/*如果没有对标签框的朱姐，是不是也可以不适用label */}
        <input id="input-value"
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value) }}
          placeholder="Please enter value"
          className="border-solid border-2 border-[#145b7d] bg-[#c37e00] text-black placeholder-black"
        ></input>
        <button 
          type="submit" 
          onClick={(e) => { handleSubmit(e) }}
          className="m-10 w-13 h-8 border-solid border-2 hover:bg-[#f47a55] rounded-lg"
          >Submit</button>
        <ItemList items={items} onDelete={handleDeleteItem}></ItemList>
      </form>
    </div>
  )
}

// 定义的函数应该叫handleSomeThing，而接受的参数应该叫onSomeThing。
// 比如： <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask}/>
// the handler should be named 'handleSomeThing',the input param to receive the value usually call 'OnSomeThing'.
function ItemList({ items, onDelete }) {
  let itemList = items.map((item, index) => {
    return (
    <li key={index}
      className='flex font-serif	text-base text-yellow-600 h-10 align-middle items-center w-7/12  justify-around mx-auto border-solid border-[1px] border-[#65c294]'>
      <span className='inline-block mx-7 my-auto self-center'>{item}</span>
      <button 
        onClick={(e) => onDelete(e,index)}
        className='border-2 border-solid border-black rounded-md mx-7 w-8 h-7 text-sm align-middle inline-block'
      >X</button>
    </li>);
  })
  return (
    <ul className='align-middle justify-center m-4'>
      {itemList}
    </ul>
  );
}

export default App
