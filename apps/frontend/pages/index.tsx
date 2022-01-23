import React, {useState, useEffect, useRef } from 'react'
import {Button, Grid, Typography, Divider} from '@mui/material';
import io, {Socket} from "socket.io-client";
import Script from 'next/script';
import axios from 'axios';

export function Index() {
  // const [socket, setSocket] = useState<Socket>(null);
  const [gameId, setGameId] = useState('');
  const [users, setUsers] = useState([])

  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:3333`);
  //   // newSocket.
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);

  const createLobby = async  () => {
    const {data} = await axios(`http://${window.location.hostname}:3333/api/games/create`)
    setGameId(data.id)
    // socket.emit('message', {a:1})
    // socket
  }

  // !! NEXT: See example with rooms https://www.youtube.com/watch?v=ZKEqqIO7n-k

  return (
    <div>
      <Typography variant="h4">Familiada</Typography>
      <Button onClick={createLobby}>Stwórz lobby</Button>
      <div>GameId: {gameId}</div>
      <Divider />
      <Typography>List of users in Game:</Typography>
      {users}
    </div>
  )
}

export default Index;
