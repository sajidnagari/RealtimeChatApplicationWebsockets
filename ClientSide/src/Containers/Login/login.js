import React from "react";
import { Input } from "antd";

const { Search } = Input;

export const Login = ({ handleSearch }) => {
  return (
    <>
      <Search
        placeholder="Enter Username"
        enterButton="Login"
        size="large"
        onSearch={(value) => handleSearch(value)}
      />
    </>
  );
};
