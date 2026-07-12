import { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./common/Button";
import { useWebSocket } from "./hooks/useWebSocket";
import ShoppingView from "./components/ShoppingView";
// TODO: Import your components here as you build them
// import { MenuScreen } from "./components/MenuScreen";
// import { WaitingScreen } from "./components/WaitingScreen";
// import { EntranceScreen } from "./components/EntranceScreen";

function App() {
  const isAtFrontOfLine = false; // queue[0]?.sessionId === currentUser?.sessionId
  const hasFeteched = useRef(false);
  const { queue } = useWebSocket("ws://localhost:5001");
  const sessionId = localStorage.getItem("user");
  const currentUser = queue.find((person) => person.sessionId === sessionId);
  const view = "shopping";

  return (
    <div className="app">
      {/* ── Left panel: queue sidebar ── */}
      <aside className="sidebar">
        <h2 className="sidebar__title">☕ Current Queue</h2>

        {queue.length === 0 ? (
          <p className="sidebar__empty">No one in line — walk right in!</p>
        ) : (
          <ul className="queue-list">
            {queue.map((person, index) => (
              <li
                key={person.sessionId}
                className={`queue-item ${
                  index === 0 ? "queue-item--active" : ""
                }`}
              >
                <span className="queue-item__position">#{index + 1}</span>
                <span className="queue-item__name">{person.name}</span>
                
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* ── Main content area ── */}
      <main className="main">
        {/* {view === "entrance" && (
          <div className="placeholder">
            <Button label="Enter Coffee Shop" onClick={handleEnterShop} />
          </div>
        )} */}

        {view === "shopping" && <ShoppingView currentUser={currentUser}/>}
      </main>
    </div>
  );
}

export default App;
