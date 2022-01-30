import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography, Divider, TextField } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import Script from 'next/script';
import axios, { AxiosResponse } from 'axios';
import { User } from '@familiada/interfaces';

export function Index() {
  const [socket, setSocket] = useState<Socket>(null);
  const [gameId, setGameId] = useState('');
  const [insertedGameId, setInsertedGameId] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    // newSocket.
    setSocket(newSocket);
    console.log('NEW SOCKET');

    newSocket.on('userJoinedToGame', (sth) => {
      console.log('on User join', sth);
      setUsers((prevUsers) => [...prevUsers, sth]);
    });
    return () => newSocket.close();
  }, [setSocket, users]);

  const createGame = async () => {
    const { data } = await axios(`http://localhost:3333/api/games/create`);
    setGameId(data.id);
    // socket.emit('message', {a:1})
    // socket
  };

  const joinToGame = async () => {
    // const use
    const { data } = await axios.post<User, AxiosResponse<User>, User>(
      `http://localhost:3333/api/games/join`,
      {
        name: userName,
      }
    );
    console.log(data);
    // setGameId(data.id)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInsertedGameId(event.target.value);
  };
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // !! NEXT: See example with rooms https://www.youtube.com/watch?v=ZKEqqIO7n-k

  return (
    <div>
      <Typography variant="h4">Familiada</Typography>
      <Button onClick={createGame} variant="contained">
        Stwórz lobby
      </Button>
      <div>GameId: {gameId}</div>
      {gameId && (
        <>
          <TextField
            value={insertedGameId}
            label="Game ID"
            onChange={handleChange}
          />
          <TextField
            value={userName}
            label="user name"
            onChange={handleUserNameChange}
          />
          <Button variant="contained" onClick={() => joinToGame()}>
            JOIN
          </Button>
        </>
      )}
      <Typography>List of users in Game:</Typography>
      <ul>
        {users.map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Index;
