import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import "./Chessboard.css";

export default function Chessboard({ mode }) {
  const [game, setGame] = useState(() => new Chess());
  const [turn, setTurn] = useState("w");
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [lastMove, setLastMove] = useState(null); // For highlighting

  const board = game.board();

  // Drag start
  const handleDragStart = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row);
    const piece = game.get(square);
    if (piece && piece.color === turn) setDraggedPiece(square);
  };

  // Drop
  const handleDrop = (row, col) => {
    if (!draggedPiece || game.isGameOver()) return;

    const toSquare = String.fromCharCode(97 + col) + (8 - row);
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: draggedPiece, to: toSquare, promotion: "q" });
    if (move) {
      setGame(newGame);
      setTurn(newGame.turn());
      setMoveHistory(prev => [...prev, move]);
      setLastMove({ from: move.from, to: move.to });
    }
    setDraggedPiece(null);
  };

  // Computer move
      useEffect(() => {
      if (game.isGameOver()) return; // <--- THIS IS CRITICAL

      if (mode === "computer" && turn === "b") {
        const moves = game.moves({ verbose: true });
        if (moves.length > 0) {
          const timer = setTimeout(() => {
            const move = moves[Math.floor(Math.random() * moves.length)];
            const newGame = new Chess(game.fen());
            newGame.move(move.san);
            setGame(newGame);
            setTurn(newGame.turn());
            setMoveHistory(prev => [...prev, move]);
            setLastMove({ from: move.from, to: move.to });
          }, 200);

          return () => clearTimeout(timer);
        }
      }
    }, [turn, mode, game]);


  // Handle rematch
  const handleRematch = () => {
    setGame(new Chess());
    setTurn("w");
    setMoveHistory([]);
    setDraggedPiece(null);
    setLastMove(null);
  };

  // Compute winner message safely
  const getWinnerMessage = () => {
    if (!game.isGameOver()) return null;

    if (game.isCheckmate()) {
      if (mode === "computer") {
        return turn === "w" ? "Computer Wins!" : "Player Wins!";
      } else {
        return turn === "w" ? "Player 2 Wins!" : "Player 1 Wins!";
      }
    }
    return "Draw!";
  };

  // Prepare move history table
  const tableRows = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    tableRows.push({
      moveNumber: i / 2 + 1,
      white: moveHistory[i]?.san || "",
      black: moveHistory[i + 1]?.san || "",
    });
  }

  return (
    <div className="chess-wrapper">
      {/* Chessboard */}
      <div className="chessboard-container">
        {board?.map((row, i) => (
          <div key={i} className="row">
            {row?.map((square, j) => {
              const isLight = (i + j) % 2 === 0;
              const piece = square;
              const squareName = String.fromCharCode(97 + j) + (8 - i);

              const isLastMove =
                lastMove &&
                (lastMove.from === squareName || lastMove.to === squareName);

              return (
                <div
                  key={j}
                  className={`square ${isLight ? "light" : "dark"} ${isLastMove ? "highlight" : ""}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(i, j)}
                >
                  {piece && (
                    <span
                      className={`piece ${piece.color}`}
                      draggable={piece.color === turn && !game.isGameOver()}
                      onDragStart={() => handleDragStart(i, j)}
                    >
                      {getUnicodePiece(piece.type, piece.color)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Move History */}
      <div className="move-history">
        <h3>Move History</h3>
        <div className="move-history-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>White</th>
                <th>Black</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.moveNumber}>
                  <td>{row.moveNumber}</td>
                  <td>{row.white}</td>
                  <td>{row.black}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Game Over */}
      {game.isGameOver() && (
        <div className="game-over-section">
          <div className="game-over">{getWinnerMessage()}</div>
          <button className="rematch-button" onClick={handleRematch}>
            Rematch
          </button>
        </div>
      )}
    </div>
  );
}

function getUnicodePiece(type, color) {
  const whitePieces = { p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔" };
  const blackPieces = { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" };
  return color === "w" ? whitePieces[type] : blackPieces[type];
}
