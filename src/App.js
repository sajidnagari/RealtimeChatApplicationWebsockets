import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

function MainApp() {
  return <div>WelCome to WebSocket</div>;
}

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ReactQueryCacheProvider>
  );
}

export default App;
