import axios from "axios";

const request = axios.create({
  // Change to http://localhost:8083/ if you don't run the serves with docker-compose
  baseURL: "http://172.17.0.1:8083/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "X-Auth-Token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndjcmVtaW5vX2U5NDU2Nzc1NjVAdml4ZWouY29tIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJnZW5kZXIiOiJtYWxlIiwiZGF0ZU9mQmlydGgiOiIxOTk5LTA1LTExIiwiY2FtcGFpZ25JZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MjA3OTc1OX0.vnhOZGihe9GVT06TszfU9EOA_GukiBGl2KTm01f1EAA",
  },
});


export default {
  request
};