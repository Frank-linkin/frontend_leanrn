import { useState } from "react";

//square component
function Square({ value, onSquaresClick }) {
  return (
    <button className="square" onClick={onSquaresClick}>
      {value}
    </button>
  );
}

//board component
function Board({ squares, xTurn, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();

    if (!xTurn) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  //calculateWinner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "winner:" + winner;
  } else {
    status = "Next player:" + (xTurn ? "X" : "O");
  }

  //build board
  const board = [0, 1, 2].map((item) => {
    return (
      <div key={item} className="board-row">
        {
          //这个花括号是必须要加的
          [0, 1, 2].map((itemInner) => {
            const index = item * 3 + itemInner;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquaresClick={() => handleClick(index)}
              />
            );
          })
        }
      </div>
    );
  });

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(false);
  const currentSquares = history[history.length - 1];
  let [step, setStep] = useState(0);
  let [list, setList] = useState([]);
  // let list = [];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
    step++;
    setStep(step);
  }

  let currentMove = caculateMove(history);
  console.log("history.length=" + history.length);
  console.log("list.length=" + list.length);
  if (step < 1 && step >= list.length) {
    list.push(
      //这是的step是设置的值还是step当时的值
      <li>
        <button
          key={step}
          onClick={() => {
            jumpTo(step);
          }}
        >
          Please make a move
        </button>
      </li>
    );
    setList(list);
  } else if (step >= list.length) {
    list.push(
      //这是的step是设置的值还是step当时的值
      <li>
        <button
          key={step}
          onClick={() => {
            jumpTo(step);
          }}
        >
          PUT {currentMove[2]} TO ({currentMove[0]},{currentMove[1]})
        </button>
      </li>
    );
    setList(list);
  }

  function jumpTo(step) {
    console.log(step);
    console.log(History);
    let newHistory = history.slice(0, step + 1);
    let newList = list.slice(0, step + 1);

    console.log(newHistory);
    console.log(newList);
    setHistory(newHistory);
    setList(newList);
    setStep(step);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xTurn={xIsNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{list}</ol>
      </div>
      <div>
        <MyButton/>
      </div>
    </div>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//TODO:为什么这里不能加{}
function caculateMove(history) {
  if (history.length < 2) {
    return;
  }
  let currentSquare = history[history.length - 1];
  let lastSquare = history[history.length - 2];

  for (let i = 0; i < currentSquare.length; i++) {
    if (currentSquare[i] && lastSquare[i] === null) {
      return [parseInt(i / 3), i % 3, currentSquare[i]];
    }
  }
  return;
}

function MyButton() {
    function handleClick() {
      alert('You clicked me!');
    }
  
    return (
      <button onClick={handleClick}>
         {/* 正是因为这个例子，官方例子才做了一层arrow function包裹 */}
        Click me
      </button>
    );
  }