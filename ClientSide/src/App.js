import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { MainApp } from "./Containers/App/mainApp";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const queryCache = new QueryCache();

function App() {
  useEffect(() => {
    client.onopen = () => {
      console.log("websocket Client Connected!");
    };
  }, []);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <MainApp client={client} />
      </BrowserRouter>
    </ReactQueryCacheProvider>
  );
}

export default App;
