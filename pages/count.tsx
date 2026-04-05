import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Users,
  Layers,
  RotateCcw,
  History,
  Info,
  Trash2,
  ChevronRight,
  UserPlus,
  ArrowLeft,
} from 'lucide-react';
import styles from '../styles/count.module.css';

type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
type Suit = '♠' | '♥' | '♦' | '♣';

interface Card {
  value: CardValue;
  suit: Suit;
}

interface PlayRecord {
  id: string;
  timestamp: number;
  playerId: string;
  card: Card;
}

interface Player {
  id: string;
  name: string;
  outOfSuits: Record<Suit, boolean>;
}

interface GameState {
  decks: number;
  players: Player[];
  gameStarted: boolean;
  history: PlayRecord[];
  activePlayerId: string;
}

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const VALUES: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const STORAGE_KEY = 'card-tracker-state';

function defaultPlayers(): Player[] {
  return [
    { id: '1', name: 'Player 1', outOfSuits: { '♠': false, '♥': false, '♦': false, '♣': false } },
    { id: '2', name: 'Player 2', outOfSuits: { '♠': false, '♥': false, '♦': false, '♣': false } },
  ];
}

function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function App() {
  const saved = useMemo(() => loadState(), []);

  const [decks, setDecks] = useState(saved?.decks ?? 1);
  const [players, setPlayers] = useState<Player[]>(saved?.players ?? defaultPlayers());
  const [gameStarted, setGameStarted] = useState(saved?.gameStarted ?? false);
  const [history, setHistory] = useState<PlayRecord[]>(saved?.history ?? []);
  const [activePlayerId, setActivePlayerId] = useState<string>(
    saved?.activePlayerId ?? (saved?.players?.[0]?.id ?? '1')
  );

  // Persist state on every change
  useEffect(() => {
    saveState({ decks, players, gameStarted, history, activePlayerId });
  }, [decks, players, gameStarted, history, activePlayerId]);

  // Stats
  const playedCards = useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach(play => {
      const key = `${play.card.value}${play.card.suit}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [history]);

  const remainingByValue = useMemo(() => {
    const remaining: Record<CardValue, number> = {} as Record<CardValue, number>;
    VALUES.forEach(v => {
      let total = decks * 4;
      history.forEach(h => {
        if (h.card.value === v) total--;
      });
      remaining[v] = total;
    });
    return remaining;
  }, [history, decks]);

  const addPlayer = useCallback(() => {
    const newId = Date.now().toString();
    setPlayers(prev => [
      ...prev,
      {
        id: newId,
        name: `Player ${prev.length + 1}`,
        outOfSuits: { '♠': false, '♥': false, '♦': false, '♣': false },
      },
    ]);
  }, []);

  const removePlayer = useCallback(
    (id: string) => {
      setPlayers(prev => {
        if (prev.length <= 1) return prev;
        const next = prev.filter(p => p.id !== id);
        if (activePlayerId === id) {
          setActivePlayerId(next[0]?.id ?? next[0].id);
        }
        return next;
      });
    },
    [activePlayerId]
  );

  const updatePlayerName = useCallback((id: string, name: string) => {
    setPlayers(prev => prev.map(p => (p.id === id ? { ...p, name } : p)));
  }, []);

  const toggleSuitOut = useCallback((playerId: string, suit: Suit) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId
          ? { ...p, outOfSuits: { ...p.outOfSuits, [suit]: !p.outOfSuits[suit] } }
          : p
      )
    );
  }, []);

  const playCard = useCallback(
    (value: CardValue, suit: Suit) => {
      const key = `${value}${suit}`;
      const totalPossible = decks;
      const currentlyPlayed = playedCards[key] || 0;

      if (currentlyPlayed < totalPossible) {
        const record: PlayRecord = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          playerId: activePlayerId,
          card: { value, suit },
        };
        setHistory(prev => [record, ...prev]);
      }
    },
    [decks, playedCards, activePlayerId]
  );

  const undoLast = useCallback(() => {
    setHistory(prev => prev.slice(1));
  }, []);

  const resetGame = useCallback(() => {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      setHistory([]);
      setPlayers(prev =>
        prev.map(p => ({
          ...p,
          outOfSuits: { '♠': false, '♥': false, '♦': false, '♣': false },
        }))
      );
      setGameStarted(false);
    }
  }, []);

  // ---- SETUP SCREEN ----
  if (!gameStarted) {
    return (
      <div className={styles.setupScreen}>
        <div className={styles.setupCard}>
          <div className={styles.setupHeader}>
            <h1>Card Tracker</h1>
            <p>Minimalistic game management</p>
          </div>

          <div className={styles.setupSection}>
            <label>
              <Layers size={18} />
              Number of Decks
            </label>
            <input
              type="number"
              min="1"
              max="99"
              value={decks}
              onChange={e => setDecks(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.decksInput}
            />
            <p className={styles.decksHint}>{decks * 52} total cards ({decks} × 52)</p>
          </div>

          <div className={styles.setupSection}>
            <div className={styles.playersHeader}>
              <label style={{ marginBottom: 0 }}>
                <Users size={18} />
                Players
              </label>
              <button onClick={addPlayer} className={styles.addPlayerBtn}>
                <UserPlus size={14} /> Add Player
              </button>
            </div>
            <div className={styles.playersList}>
              {players.map((p, idx) => (
                <div key={p.id} className={styles.playerInputRow}>
                  <input
                    type="text"
                    value={p.name}
                    onChange={e => updatePlayerName(p.id, e.target.value)}
                    className={styles.playerNameInput}
                    placeholder={`Player ${idx + 1}`}
                  />
                  {players.length > 1 && (
                    <button
                      onClick={() => removePlayer(p.id)}
                      className={styles.removePlayerBtn}
                      title="Remove player"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setActivePlayerId(players[0].id);
              setGameStarted(true);
            }}
            className={styles.startBtn}
          >
            Start Game <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ---- GAME SCREEN ----
  const currentPlayer = players.find(p => p.id === activePlayerId) || players[0];

  return (
    <div className={styles.gameScreen}>
      <div className={styles.gameContainer}>
        {/* Left Column */}
        <div className={styles.gameLeft}>
          {/* Header */}
          <div className={styles.card}>
            <div className={styles.gameHeader}>
              <div className={styles.headerLeft}>
                <button onClick={resetGame} className={styles.backBtn} title="Back to setup">
                  <ArrowLeft size={20} />
                </button>
                <div className={styles.headerTitle}>
                  <h2>Active Game</h2>
                  <p>
                    {decks} Deck{decks > 1 ? 's' : ''} • {players.length} Player
                    {players.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button
                  onClick={undoLast}
                  disabled={history.length === 0}
                  className={styles.undoBtn}
                >
                  <RotateCcw size={16} /> Undo
                </button>
              </div>
            </div>
          </div>

          {/* Players with Suit Checkboxes */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Players & Suit Status</h3>
            <div className={styles.playersSection}>
              {players.map(p => (
                <div
                  key={p.id}
                  className={`${styles.playerRow} ${activePlayerId === p.id ? styles.active : ''}`}
                  onClick={() => setActivePlayerId(p.id)}
                >
                  <div className={styles.playerRowLeft}>
                    <div className={styles.playerIndicator} />
                    <span className={styles.playerName}>{p.name}</span>
                  </div>
                  <div className={styles.playerSuits}>
                    {SUITS.map(suit => {
                      const isRed = suit === '♥' || suit === '♦';
                      const isOut = p.outOfSuits[suit];
                      return (
                        <label
                          key={suit}
                          className={styles.suitToggle}
                          onClick={e => e.stopPropagation()}
                          title={
                            isOut
                              ? `${p.name} is out of ${suit}`
                              : `Mark ${p.name} out of ${suit}`
                          }
                        >
                          <input
                            type="checkbox"
                            checked={isOut}
                            onChange={() => toggleSuitOut(p.id, suit)}
                          />
                          <span
                            className={`${styles.suitBadge} ${
                              isOut
                                ? styles.outOfSuit
                                : isRed
                                ? styles.redSuit
                                : styles.blackSuit
                            }`}
                          >
                            {suit}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Tracking */}
          <div className={styles.card}>
            <h3 className={`${styles.sectionTitle} ${styles.trackHeader}`}>
              Track Play for <span>{currentPlayer.name}</span>
            </h3>
            <div className={styles.suitsGrid}>
              {SUITS.map(suit => (
                <div key={suit} className={styles.suitColumn}>
                  <div className={`${styles.suitLabel} ${suit === '♥' || suit === '♦' ? styles.red : styles.black}`}>
                    {suit}
                  </div>
                  <div className={styles.cardsGrid}>
                    {VALUES.map(val => {
                      const key = `${val}${suit}`;
                      const count = playedCards[key] || 0;
                      const isDepleted = count >= decks;
                      const isRed = suit === '♥' || suit === '♦';
                      return (
                        <button
                          key={val}
                          disabled={isDepleted}
                          onClick={() => playCard(val, suit)}
                          className={`${styles.cardBtn} ${isRed ? styles.redCard : ''}`}
                        >
                          {val}
                          {count > 0 && !isDepleted && (
                            <span className={styles.cardCountBadge}>{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.gameRight}>
          {/* Card Availability */}
          <div className={styles.card}>
            <div className={styles.statsHeader}>
              <Info size={18} style={{ color: '#a8a29e' }} />
              <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
                Card Availability
              </h3>
            </div>
            <div className={styles.statsGrid}>
              {VALUES.map(val => {
                const total = decks * 4;
                const rem = remainingByValue[val];
                const percentage = (rem / total) * 100;
                const colorClass =
                  percentage > 50 ? styles.green : percentage > 20 ? styles.orange : styles.red;

                return (
                  <div key={val} className={styles.statRow}>
                    <span className={styles.statLabel}>{val}</span>
                    <div className={styles.statBarBg}>
                      <div
                        className={`${styles.statBarFill} ${colorClass}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className={styles.statCount}>
                      {rem}/{total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History */}
          <div className={`${styles.card} ${styles.historySection}`}>
            <div className={styles.historyHeader}>
              <History size={18} style={{ color: '#a8a29e' }} />
              <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
                Recent Plays
              </h3>
            </div>
            <div className={styles.historyList}>
              {history.length === 0 ? (
                <div className={styles.historyEmpty}>No cards played yet</div>
              ) : (
                history.map(play => {
                  const isRed = play.card.suit === '♥' || play.card.suit === '♦';
                  return (
                    <div key={play.id} className={styles.historyItem}>
                      <div className={styles.historyItemLeft}>
                        <div
                          className={`${styles.historyCardIcon} ${isRed ? styles.red : styles.black}`}
                        >
                          {play.card.value}
                          {play.card.suit}
                        </div>
                        <span className={styles.historyPlayerName}>
                          {players.find(p => p.id === play.playerId)?.name || 'Unknown'}
                        </span>
                      </div>
                      <span className={styles.historyTime}>
                        {new Date(play.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
