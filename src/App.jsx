import React, { useState, useEffect } from "react";
import Card from "./components/card/Card";
import Button from "./components/button/Button";
import "./App.css";

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐨"];

function shuffle(array) {
  return array
    .concat(array)
    .sort(() => Math.random() - 0.5)
    .map((emoji, idx) => ({ id: idx, emoji, matched: false }));
}

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    handleRestart();
  }, []);

  useEffect(() => {
    if (matched.length === EMOJIS.length * 2) setVictory(true);
  }, [matched]);

  const handleCardClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setTimeout(() => setFlipped([]), 1000);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffle(EMOJIS));
    setFlipped([]);
    setMatched([]);
    setVictory(false);
  };

  return (
    <div className="app">
      {/* <h1>Jeu Memory React</h1>
      <Button onClick={handleRestart}>Recommencer</Button> */}
      <div className="grid">
        {cards.map((card, idx) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(idx)}
            isFlipped={flipped.includes(idx)}
            isMatched={matched.includes(idx)}
          />
        ))}
      </div>
      {/* {victory && <div className="victory">Bravo, vous avez gagné !</div>} */}
    </div>
  );
}

export default App;