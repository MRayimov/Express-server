import express from "express";
import serverless from "serverless-http";
const app = express();

const db = [];

app.post("/todo", (req, res) => {
  const newTodo = {
    id: Date(),
    text: req.body.text,
  };

  db.push(newTodo);
  res.json(newTodo);
});

app.get("/todo", (req, res) => {
  res.json(db);
});

export const handler = serverless(app);
