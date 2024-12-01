import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let initialData = ['', '', '', '', '', '', '', '', ''];

function TicTacToe() {
  const [count, setCount] = useState(0); 
  const [lock, setLock] = useState(false); // Lock game when someone wins
  const [board, setBoard] = useState(initialData); // Holds the state of the game board

  // Function to handle player's move
  const toggle = (index) => {
    if (lock || board[index] !== '') {
      return; // Ignore click if game is locked or the cell is already occupied
    }

    const newBoard = [...board];
    if (count % 2 === 0) {
      newBoard[index] = 'X'; 
    } else {
      newBoard[index] = 'O'; // 'O' for odd turns
    }
    setBoard(newBoard);
    setCount(count + 1); 
    checkWin(newBoard); 
  };

  // Function to check for a winning condition
  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
        won(newBoard[a]); // If any pattern matches, a winner is found
        return;
      }
    }

    // Check for draw
    if (newBoard.every(cell => cell !== '')) {
      setLock(true); // Lock the game if all cells are filled and no one has won
      alert('It\'s a draw!');
    }
  };

  // Function to handle a win
  const won = (winner) => {
    setLock(true);
    alert(`${winner} wins!`);
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(initialData);
    setCount(0);
    setLock(false);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic <span>Tac</span> Toe
      </h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => toggle(index)} 
          >
            {cell === 'X' && <img src={cross_icon} alt="cross" />}
            {cell === 'O' && <img src={circle_icon} alt="circle" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}

export default TicTacToe;
