import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography, Divider, TextField } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import Script from 'next/script';
import axios from 'axios';

export function Index() {
  // const [socket, setSocket] = useState<Socket>(null);
  const [gameId, setGameId] = useState('');
  const [insertedGameId, setInsertedGameId] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:3333`);
  //   // newSocket.
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);

  const createGame = async () => {
    const { data } = await axios(`http://localhost:3333/api/games/create`);
    setGameId(data.id);
    // socket.emit('message', {a:1})
    // socket
  };

  const joinToGame = async () => {
    const {data} = await axios.post(`http://localhost:3333/api/games/join`, {
      gameId: insertedGameId,
      userName,
    })
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
          <TextField value={insertedGameId} label="Game ID" onChange={handleChange} />
          <TextField value={userName} label="user name" onChange={handleUserNameChange} />
          <Button variant="contained" onClick={() => joinToGame()}>JOIN</Button>
        </>
      )}
      <Typography>List of users in Game:</Typography>
      {users}
    </div>
  );
}

export default Index;
