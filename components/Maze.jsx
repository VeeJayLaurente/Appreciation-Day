import React, { useState, useEffect } from "react";
import "../src/Maze.css";
import EndMessage from "../components/EndMessage.jsx";

const mazeLayout = [
  ['S', ' ', 'X', ' ', ' ', ' ', 'X'],
  ['X', ' ', 'X', ' ', 'X', ' ', 'X'],
  ['X', ' ', ' ', ' ', 'X', ' ', ' '],
  ['X', 'X', 'X', ' ', 'X', 'X', ' '],
  [' ', ' ', ' ', ' ', ' ', 'X', 'E'],
];

const Maze = () => {
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleDirection = (key) => {
  if (gameOver) return;

  const { row, col } = position;
  let newRow = row;
  let newCol = col;

  switch (key) {
    case "ArrowUp": newRow--; break;
    case "ArrowDown": newRow++; break;
    case "ArrowLeft": newCol--; break;
    case "ArrowRight": newCol++; break;
    default: return;
  }

  if (
    newRow >= 0 && newRow < mazeLayout.length &&
    newCol >= 0 && newCol < mazeLayout[0].length &&
    mazeLayout[newRow][newCol] !== 'X'
  ) {
    setPosition({ row: newRow, col: newCol });

    if (mazeLayout[newRow][newCol] === 'E') {
      setGameOver(true);
    }
  }
};

const handleKeyDown = (e) => {
  handleDirection(e.key);
};


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [position]);

  return (
    <div className="maze-container">
      {mazeLayout.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          const isPlayer = position.row === rIndex && position.col === cIndex;
          const isExit = cell === 'E';
          return (
            <div
              key={`${rIndex}-${cIndex}`}
              className={`cell ${cell === 'X' ? "wall" : ""} ${isExit ? "exit" : ""}`}
            >
              {isPlayer && <img src="/Menace.png" alt="Player" className="player" />}
            </div>
          );
        })
      )}
      {gameOver && <EndMessage />}

                <div className="mobile-controls">
        <div className="control-row">
            <button onClick={() => handleDirection("ArrowUp")}>⬆️</button>
        </div>
        <div className="control-row">
            <button onClick={() => handleDirection("ArrowLeft")}>⬅️</button>
            <button onClick={() => handleDirection("ArrowDown")}>⬇️</button>
            <button onClick={() => handleDirection("ArrowRight")}>➡️</button>
        </div>
        </div>


    </div>

    
  );
};

export default Maze;
