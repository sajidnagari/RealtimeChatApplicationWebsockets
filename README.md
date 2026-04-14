# WebSockets Real-Time Chat

Simple real-time chat application using a React client and a Node.js websocket server.

## Project Structure

- `ClientSide`: React frontend
- `ServerSide`: websocket backend (port `8000`)

## Prerequisites

- Node.js 16+ recommended
- npm or yarn

## Install Dependencies

### Client

```bash
cd ClientSide
npm install
```

### Server

```bash
cd ServerSide
npm install
```

## Run the App

Open two terminals.

### Start server

```bash
cd ServerSide
npm start
```

### Start client

```bash
cd ClientSide
npm start
```

Client runs on `http://localhost:3000` and connects to websocket server on `ws://127.0.0.1:8000`.
