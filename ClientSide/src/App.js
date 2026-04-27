import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { MainApp } from "./Containers/App/mainApp";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function App() {
  const [client, setClient] = useState(null);
  const queryCache = useMemo(() => new QueryCache(), []);

  useEffect(() => {
    const wsClient = new W3CWebSocket("ws://127.0.0.1:8000");
    setClient(wsClient);

    wsClient.onopen = () => {
      console.log("websocket Client Connected!");
    };

    wsClient.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    wsClient.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (wsClient.readyState === wsClient.OPEN) {
        wsClient.close();
      }
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
