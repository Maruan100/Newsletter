import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "local"
    ? "http://localhost:8082/"
    : "http://172.17.0.1:8082/";

const request = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "X-Auth-Token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndjcmVtaW5vX2U5NDU2Nzc1NjVAdml4ZWouY29tIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJnZW5kZXIiOiJtYWxlIiwiZGF0ZU9mQmlydGgiOiIxOTk5LTA1LTExIiwiY2FtcGFpZ25JZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MjA3OTc1OX0.vnhOZGihe9GVT06TszfU9EOA_GukiBGl2KTm01f1EAA",
  },
});

export default {
  request,
};
