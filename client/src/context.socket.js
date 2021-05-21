import socketIOClient from "socket.io-client";
 import React from 'react'; 

export let socket =   socketIOClient("http://localhost:5000");
export const SocketContext = React.createContext();