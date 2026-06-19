import { useState } from 'react';

const gothicStyles = `
  @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=MedievalSharp&family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .gothic-root {
    min-height: 100vh;
    background-color: #0a0a0a;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(120,0,0,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(80,0,0,0.1) 0%, transparent 50%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 40px,
        rgba(180,0,0,0.03) 40px,
        rgba(180,0,0,0.03) 41px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 40px,
        rgba(180,0,0,0.03) 40px,
        rgba(180,0,0,0.03) 41px
      );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Cinzel', serif;
    overflow: hidden;
    position: relative;
  }

  .gothic-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%);
    pointer-events: none;
    z-index: 0;
  }

  .candles {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  .candle {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .candle-flame {
    width: 8px;
    height: 14px;
    background: radial-gradient(ellipse at 50% 80%, #fff700, #ff6600 40%, #cc0000 80%, transparent 100%);
    border-radius: 50% 50% 30% 30%;
    animation: flicker 1.5s ease-in-out infinite alternate;
    filter: blur(0.5px);
    box-shadow: 0 0 6px 2px rgba(255,100,0,0.8), 0 0 20px 4px rgba(200,0,0,0.4);
  }

  .candle-body {
    width: 12px;
    height: 50px;
    background: linear-gradient(to right, #1a1a1a, #3a3a3a, #1a1a1a);
    border-radius: 2px;
  }

  @keyframes flicker {
    0% { transform: scaleX(1) scaleY(1) translateX(0); opacity: 1; }
    25% { transform: scaleX(0.9) scaleY(1.05) translateX(-1px); opacity: 0.95; }
    50% { transform: scaleX(1.1) scaleY(0.95) translateX(1px); opacity: 1; }
    75% { transform: scaleX(0.95) scaleY(1.08) translateX(-0.5px); opacity: 0.9; }
    100% { transform: scaleX(1.05) scaleY(1) translateX(0.5px); opacity: 1; }
  }

  .game-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }

  .game-title {
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: 3.2rem;
    color: #cc0000;
    text-shadow:
      0 0 10px rgba(200,0,0,0.9),
      0 0 30px rgba(200,0,0,0.5),
      0 0 60px rgba(150,0,0,0.3),
      2px 2px 4px rgba(0,0,0,0.9);
    letter-spacing: 4px;
    text-align: center;
    animation: titlePulse 3s ease-in-out infinite;
  }

  @keyframes titlePulse {
    0%, 100% { text-shadow: 0 0 10px rgba(200,0,0,0.9), 0 0 30px rgba(200,0,0,0.5), 0 0 60px rgba(150,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.9); }
    50% { text-shadow: 0 0 15px rgba(255,0,0,1), 0 0 40px rgba(200,0,0,0.7), 0 0 80px rgba(150,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.9); }
  }

  .title-ornament {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: -8px;
  }

  .ornament-line {
    height: 1px;
    width: 80px;
    background: linear-gradient(to right, transparent, #8b0000, #cc0000, #8b0000, transparent);
  }

  .ornament-diamond {
    width: 8px;
    height: 8px;
    background: #cc0000;
    transform: rotate(45deg);
    box-shadow: 0 0 6px rgba(200,0,0,0.8);
  }

  .status-banner {
    font-family: 'Cinzel Decorative', serif;
    font-size: 0.85rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #e8c9a0;
    text-shadow: 0 0 10px rgba(232,201,160,0.4), 0 0 20px rgba(200,0,0,0.2);
    padding: 10px 32px;
    border: 1px solid rgba(139,0,0,0.5);
    background: linear-gradient(135deg, rgba(20,0,0,0.9), rgba(40,0,0,0.7), rgba(20,0,0,0.9));
    position: relative;
    clip-path: polygon(12px 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0% 50%);
    min-width: 280px;
    text-align: center;
  }

  .main-layout {
    display: flex;
    align-items: flex-start;
    gap: 40px;
  }

  .board-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .board-frame {
    position: relative;
    padding: 24px;
    background: linear-gradient(135deg, #0d0000, #1a0000, #0d0000);
    border: 2px solid #8b0000;
    box-shadow:
      0 0 0 1px rgba(200,0,0,0.3),
      0 0 20px rgba(139,0,0,0.4),
      0 0 60px rgba(100,0,0,0.2),
      inset 0 0 40px rgba(0,0,0,0.8);
  }

  .board-frame::before,
  .board-frame::after {
    content: '☩';
    position: absolute;
    font-size: 1.4rem;
    color: #8b0000;
    text-shadow: 0 0 8px rgba(200,0,0,0.6);
  }
  .board-frame::before { top: 6px; left: 10px; }
  .board-frame::after { bottom: 6px; right: 10px; }

  .corner-ornament {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #8b0000;
    border-style: solid;
  }
  .corner-ornament.tl { top: 6px; left: 6px; border-width: 2px 0 0 2px; }
  .corner-ornament.tr { top: 6px; right: 6px; border-width: 2px 2px 0 0; }
  .corner-ornament.bl { bottom: 6px; left: 6px; border-width: 0 0 2px 2px; }
  .corner-ornament.br { bottom: 6px; right: 6px; border-width: 0 2px 2px 0; }

  .board-grid {
    display: grid;
    grid-template-columns: repeat(3, 120px);
    grid-template-rows: repeat(3, 120px);
    gap: 0;
    position: relative;
  }

  .board-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right, transparent calc(120px - 1px), #6b0000 calc(120px - 1px), #6b0000 calc(120px + 1px), transparent calc(120px + 1px),
        transparent calc(240px - 1px), #6b0000 calc(240px - 1px), #6b0000 calc(240px + 1px), transparent calc(240px + 1px)),
      linear-gradient(to bottom, transparent calc(120px - 1px), #6b0000 calc(120px - 1px), #6b0000 calc(120px + 1px), transparent calc(120px + 1px),
        transparent calc(240px - 1px), #6b0000 calc(240px - 1px), #6b0000 calc(240px + 1px), transparent calc(240px + 1px));
    pointer-events: none;
    z-index: 1;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
  }

  .square {
    width: 120px;
    height: 120px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    font-family: 'Cinzel Decorative', serif;
    font-weight: 900;
    position: relative;
    transition: background 0.2s ease;
    z-index: 2;
  }

  .square:hover {
    background: rgba(139,0,0,0.08);
  }

  .square.x-mark {
    color: #cc0000;
    text-shadow: 0 0 10px rgba(200,0,0,0.9), 0 0 20px rgba(200,0,0,0.5), 0 0 40px rgba(150,0,0,0.3);
    animation: markAppear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .square.o-mark {
    color: #e8c9a0;
    text-shadow: 0 0 10px rgba(232,201,160,0.8), 0 0 20px rgba(200,150,80,0.4);
    animation: markAppear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .square.winning {
    background: rgba(139,0,0,0.2);
    animation: winGlow 1s ease-in-out infinite alternate;
  }

  @keyframes markAppear {
    0% { transform: scale(0) rotate(-15deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  @keyframes winGlow {
    0% { background: rgba(139,0,0,0.15); }
    100% { background: rgba(200,0,0,0.3); }
  }

  .history-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 160px;
  }

  .history-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 0.65rem;
    letter-spacing: 3px;
    color: #8b0000;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(139,0,0,0.4);
  }

  .history-scroll {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 360px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .history-scroll::-webkit-scrollbar { width: 3px; }
  .history-scroll::-webkit-scrollbar-track { background: rgba(139,0,0,0.1); }
  .history-scroll::-webkit-scrollbar-thumb { background: #8b0000; }

  .move-btn {
    background: linear-gradient(135deg, rgba(20,0,0,0.9), rgba(40,0,0,0.7));
    border: 1px solid rgba(139,0,0,0.3);
    color: #c9a87c;
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    letter-spacing: 1px;
    padding: 8px 12px;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
  }

  .move-btn::before {
    content: '▸';
    margin-right: 6px;
    color: #8b0000;
    font-size: 0.7rem;
  }

  .move-btn:hover {
    border-color: #cc0000;
    color: #e8c9a0;
    box-shadow: 0 0 10px rgba(139,0,0,0.3);
    background: linear-gradient(135deg, rgba(40,0,0,0.9), rgba(80,0,0,0.7));
  }

  .reset-btn {
    margin-top: 16px;
    background: linear-gradient(135deg, #3d0000, #6b0000, #3d0000);
    border: 1px solid #8b0000;
    color: #e8c9a0;
    font-family: 'Cinzel Decorative', serif;
    font-size: 0.6rem;
    letter-spacing: 3px;
    padding: 12px 28px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.3s ease;
    clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%);
    min-width: 200px;
  }

  .reset-btn:hover {
    background: linear-gradient(135deg, #6b0000, #aa0000, #6b0000);
    box-shadow: 0 0 20px rgba(200,0,0,0.5), 0 0 40px rgba(150,0,0,0.3);
    color: #fff;
  }

  .blood-drops {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 40px;
    pointer-events: none;
    z-index: 1;
    display: flex;
    gap: 0;
  }

  .drop {
    width: 3px;
    background: linear-gradient(to bottom, #8b0000, #cc0000);
    border-radius: 0 0 50% 50%;
    position: absolute;
    top: 0;
    animation: drip linear infinite;
    opacity: 0.6;
  }

  @keyframes drip {
    0% { height: 4px; opacity: 0.6; }
    70% { opacity: 0.6; }
    100% { height: 40px; opacity: 0; }
  }

  .winner-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .winner-text {
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: 5rem;
    color: #cc0000;
    text-shadow:
      0 0 20px rgba(255,0,0,1),
      0 0 40px rgba(200,0,0,0.8),
      0 0 80px rgba(150,0,0,0.6);
    animation: winnerAppear 0.5s ease-out, winnerFloat 2s ease-in-out infinite alternate;
    opacity: 0;
    animation-fill-mode: forwards;
  }

  @keyframes winnerAppear {
    0% { opacity: 0; transform: scale(0.5) rotate(-5deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  @keyframes winnerFloat {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-10px) scale(1.03); }
  }

  .draw-text {
    font-family: 'Cinzel Decorative', serif;
    font-size: 2rem;
    color: #e8c9a0;
    text-shadow: 0 0 20px rgba(232,201,160,0.8);
    animation: winnerAppear 0.5s ease-out forwards;
    opacity: 0;
  }
`;

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function calculateWinner(squares) {
  for (const [a,b,c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return null;
}

function Square({ value, onSquareClick, isWinning }) {
  const markClass = value === 'X' ? 'x-mark' : value === 'O' ? 'o-mark' : '';
  return (
    <button
      className={`square ${markClass} ${isWinning ? 'winning' : ''}`}
      onClick={onSquareClick}
    >
      {value === 'X' ? '✕' : value === 'O' ? '◯' : ''}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const result = calculateWinner(squares);
  const winningLine = result?.line || [];

  function handleClick(i) {
    if (result || squares[i]) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    onPlay(next);
  }

  return (
    <div className="board-frame">
      <div className="corner-ornament tl" />
      <div className="corner-ornament tr" />
      <div className="corner-ornament bl" />
      <div className="corner-ornament br" />
      <div className="board-grid">
        {squares.map((val, i) => (
          <Square
            key={i}
            value={val}
            onSquareClick={() => handleClick(i)}
            isWinning={winningLine.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

const DRIP_POSITIONS = [4,11,18,27,35,42,51,60,68,75,82,91];
const DRIP_DURATIONS = [3.2,4.5,2.8,5.1,3.7,4.2,2.5,5.8,3.4,4.9,2.1,6.0];
const DRIP_DELAYS = [0,1.2,0.5,2.1,1.7,0.3,2.8,1.5,0.8,3.2,1.1,2.5];

export default function TicTac() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const result = calculateWinner(currentSquares);
  const isDraw = !result && currentSquares.every(Boolean);

  let statusText;
  if (result) statusText = `${result.winner === 'X' ? '✕' : '◯'} Claimeth Victory`;
  else if (isDraw) statusText = 'The Fates Are Tied';
  else statusText = `${xIsNext ? '✕ · The Crimson Mark' : '◯ · The Pale Rune'}`;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) { setCurrentMove(move); }

  return (
    <>
      <style>{gothicStyles}</style>
      <div className="gothic-root">
        {/* Candles */}
        <div className="candles">
          {[[5,'10%'],[8,'90%'],[12,'5%'],[5,'95%']].map(([dur,left], i) => (
            <div key={i} className="candle" style={{left, bottom:'5%', animationDelay:`${i*0.4}s`}}>
              <div className="candle-flame" style={{animationDelay:`${i*0.3}s`}} />
              <div className="candle-body" />
            </div>
          ))}
        </div>

        {/* Blood drips */}
        <div className="blood-drops">
          {DRIP_POSITIONS.map((pos, i) => (
            <div key={i} className="drop" style={{
              left: `${pos}%`,
              animationDuration: `${DRIP_DURATIONS[i]}s`,
              animationDelay: `${DRIP_DELAYS[i]}s`,
            }} />
          ))}
        </div>

        <div className="game-container">
          <div>
            <div className="game-title">Tic · Tac · Toe</div>
            <div className="title-ornament">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line" />
            </div>
          </div>

          <div className="status-banner">{statusText}</div>

          <div className="main-layout">
            <div className="board-wrapper">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>

            <div className="history-panel">
              <div className="history-title">⚔ Chronicle ⚔</div>
              <div className="history-scroll">
                {history.map((_, move) => (
                  <li key={move} style={{listStyle:'none'}}>
                    <button className="move-btn" onClick={() => jumpTo(move)}>
                      {move === 0 ? 'The Beginning' : `Turn ${move}`}
                    </button>
                  </li>
                ))}
              </div>
            </div>
          </div>

          <button className="reset-btn" onClick={() => {
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0);
          }}>
            ☩ Begin Anew ☩
          </button>
        </div>

        {(result || isDraw) && (
          <div className="winner-overlay">
            {result
              ? <div className="winner-text">{result.winner === 'X' ? '✕' : '◯'} Prevails!</div>
              : <div className="draw-text">∴ A Draw of Fate ∴</div>
            }
          </div>
        )}
      </div>
    </>
  );
}