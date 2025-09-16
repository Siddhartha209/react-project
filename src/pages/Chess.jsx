import React, { useState } from "react";
import Chessboard from "../components/Chessboard";
import "./Chess.css";

export default function Chess() {
  const [mode, setMode] = useState(""); // "human" or "computer"

  return (
    <div style={{ textAlign: "center", paddingTop: "40px", minHeight: "100vh" }}>
      {/* Page title */}
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        React Chess Game
      </h1>

      {/* Mode selection */}
      {mode === "" && (
        <div>
          <button onClick={() => setMode("human")} className="buttonStyleBlue">
            1v1 Human
          </button>
          <button onClick={() => setMode("computer")} className="buttonStyleGreen">
            1v1 Computer
          </button>
        </div>
      )}

      {/* Chessboard */}
      {mode !== "" && (
        <div style={{ marginTop: "30px" }}>
          <Chessboard mode={mode} />
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setMode("")} className="buttonStyleGray">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
