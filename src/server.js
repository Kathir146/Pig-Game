const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/rps-game", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const gameSchema = new mongoose.Schema({
  player1Name: String,
  player2Name: String,
  player1Points: Number,
  player2Points: Number,
  roundWinner: String,
  winner: String,
  rounds: Array,
  date: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);

app.post("/games", async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.send(game);
});

app.get("/games", async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
