import React, { useEffect, useState } from "react";
import { Card, Avatar, Input, Row, Col } from "antd";
import "./style.css";
import { Login } from "./../Login/login";

const { Search } = Input;
const { Meta } = Card;

export const MainApp = ({ client }) => {
  const [chatState, setChatState] = useState({
    username: "",
    isloggedIn: false,
    messages: [],
  });

  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.type === "message") {
        setChatState((c) => ({
          ...c,
          messages: [
            ...c.messages,
            {
              id: Math.random(), // used for unique Id
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
          ],
        }));
      }
    };
  }, [chatState.messages, client.onmessage]);

  const onButtonClicked = (value) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
        user: chatState.username,
      })
    );
    setSearchVal("");
  };

  const handleSearch = (value) => {
    setChatState({
      ...chatState,
      isloggedIn: true,
      username: value,
    });
  };

  return (
    <div className="main">
      {chatState.isloggedIn ? (
        <div>
          <div className="title">
            <h1>Websocket Chat: {chatState.username} </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 50,
            }}
            id="messages"
          >
            {chatState.messages.map((message) => (
              <Card
                className="cardContent"
                key={message.id}
                style={{
                  alignSelf:
                    chatState.username === message.user
                      ? "flex-end"
                      : "flex-start",
                }}
                loading={false}
              >
                <Meta
                  avatar={
                    <Avatar style={{ color: "gray", backgroundColor: "#ccc" }}>
                      {message.user[0].toUpperCase()}
                    </Avatar>
                  }
                  title={message.user + ":"}
                  description={message.msg}
                />
              </Card>
            ))}
          </div>
          <div className="bottom">
            <Search
              placeholder="Enter your message"
              enterButton="Send"
              value={searchVal}
              size="large"
              onChange={(e) => setSearchVal(e.target.value)}
              onSearch={(value) => onButtonClicked(value)}
            />
          </div>
        </div>
      ) : (
        <div style={{ padding: "400px 40px" }}>
          <Row>
            <Col span={12} offset={6}>
              <Login handleSearch={handleSearch} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
