import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { MainApp } from "./Containers/App/MainApp";

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
