//TATETI EN REACT JS
import { useState } from "react";
//COMPONENTE-FUNCION PRINCIPAL del tablero
export default function Board() {
  //useState para determinar los turnos de los jugadores
  const [xIsNext, setXIsNext] = useState(true);
  //array que guarda las posiciones de las casillas marcadas X/O
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);

  //funcion que se ejecuta al clickear las casillas
  function handleClick(i) {
    //si ya esta marcada (no es null) entonces no ocurre nada
    if (squares[i]) {
      return;
    }
    //se crea una copia del array de las posiciones
    const nextSquares = squares.slice();
    //se marca segun el jugador
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //se actualiza las posiciones y siguiente turno del jugador
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  //funcion que vuelve a incializar el juego
  function handleReset() {
    setSquares(initialSquares); // Restablece las casillas
    setXIsNext(true); // Restablece el turno al jugador X
  }

  //funcion que determina el ganador y el siguiente turno
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //funcion return del componente principal (es enviado a index.js)
  //se retornan 3 filas de 3 casillas
  return (
    //funcion flecha no se ejecuta hasta que la orden es dada
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <br />
      <ClearButton />
      <br />
      <ResetButton onReset={handleReset} />
    </>
  );
}

//componente de casilla
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//componente limpiar log de la consola
function ClearButton() {
  function clearConsole() {
    console.clear();
  }
  return (
    <button onClick={clearConsole} className="clear-console">
      Clear Console
    </button>
  );
}

function ResetButton({ onReset }) {
  return (
    <button onClick={onReset} className="reset-button">
      Restart Game
    </button>
  );
}

//funcion que calcula el ganador
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
