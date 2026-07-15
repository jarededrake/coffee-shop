import "./App.css";
import { useApp } from "./hooks/useApp";
import ShoppingView from "./components/ShoppingView";
import EntranceScreen from "./components/EntranceScreen";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const {
    queue,
    sessionId,
    currentUser,
    isAtFrontOfLine,
    hasEntered,
    isQueueLoading,
    handleEnterShop,
    handleLeaveShop,
  } = useApp();

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="sidebar__title">☕ Current Queue</h2>

        {!isQueueLoading && queue.length === 0 && (
          <p className="sidebar__empty">No one in line — walk right in!</p>
        )}
        {!isQueueLoading && queue.length > 0 && (
          <ul className="queue-list">
            <AnimatePresence>
              {queue.map((person, index) => (
                <motion.li
                  key={person.sessionId}
                  className={`queue-item ${
                    person.sessionId === sessionId ? "queue-item--active" : ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="queue-item__position">#{index + 1}</span>
                  <span className="queue-item__name">
                    {person.name}
                    {person.sessionId === sessionId && (
                      <span className="queue-item__you"> (You)</span>
                    )}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        {isQueueLoading && <span className="spinner" />}
      </aside>

      <main className="main">
        {!hasEntered && (
          <EntranceScreen
            onEnter={handleEnterShop}
            queueCount={queue.length}
            isAtFrontOfLine={isAtFrontOfLine}
          />
        )}

        {hasEntered && !isAtFrontOfLine && currentUser && (
          <div className="waiting">
            <p>
              You are #{queue.findIndex((p) => p.sessionId === sessionId) + 1}
              in line
            </p>
            <p>Please wait your turn</p>
          </div>
        )}

        {hasEntered && isAtFrontOfLine && (
          <ShoppingView
            currentUser={currentUser}
            isFrontOfLine={isAtFrontOfLine}
            onLeaveShop={handleLeaveShop}
          />
        )}
      </main>
    </div>
  );
}

export default App;
