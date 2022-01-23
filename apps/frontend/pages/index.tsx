import React, {useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import io from "socket.io-client";
import Script from 'next/script';

export function Index() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
 
  const connectToTheSocket = async  () => {
    socket.emit('message', {a:1})
  }


  return (
    <div>
      <Button onClick={connectToTheSocket}>Subscribe</Button>
    </div>
  )
}

export default Index;
