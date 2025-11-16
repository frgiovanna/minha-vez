import { useEffect, useState } from 'react';

import { Login } from './pages/Login';
import { Lobby } from './pages/Lobby';
import { QueuePreview } from './pages/QueuePreview';
import { YourTurn } from './pages/YourTurn';

import { Athlete, Lobby as LobbyType } from '@shared/types';
import { Pages } from './types';

import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';

const socket = io(URL, { autoConnect: false });

socket.connect();

function App() {
  const [currentPage, setCurrentPage] = useState<Pages>('login');
  const [{ athletes, court, nextGameDate }, setLobby] = useState<LobbyType>({});
  const [nextGame, setNextGame] = useState<Athlete[] | undefined>(undefined);

  // TODO - use login data to join lobby
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, setLogin] = useState<Athlete | undefined>(undefined);

  function handleNextGame(game: Athlete[]) {
    setNextGame(game);
    if (game.length) {
      setCurrentPage('your-turn');
    }
  }

  function navigateToQueuePreview(login: Athlete) {
    setLogin(login);
    setCurrentPage('queue-preview');
  }

  useEffect(() => {
    socket.on('lobby:list', setLobby);
    socket.on('court:next-game', handleNextGame);

    return () => {
      socket.off('lobby:list', setLobby);
      socket.off('court:next-game', handleNextGame);
    };
  }, []);

  switch (currentPage) {
    case 'login':
      return <Login onSubmit={navigateToQueuePreview} />;
    case 'lobby':
      return (
        <Lobby athletes={athletes} court={court} nextGameDate={nextGameDate} />
      );
    case 'queue-preview':
      return <QueuePreview />;
    case 'your-turn':
      return <YourTurn game={nextGame} />;
    default:
      return null;
  }
}

export default App;
