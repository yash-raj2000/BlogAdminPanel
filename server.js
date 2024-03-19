const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const pool = require("./database");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server up and running..!");
  console.log("server is running");
});

app.post("/postBlog", async (req, res) => {
  try {
    const { date, title, category, content } = req.body;
      const result = await pool.query("INSERT INTO blogdata (date, title, category, content) VALUES ($1, $2, $3, $4) RETURNING *",
          [date, title, category, content]
      );
      res.json(result.rows[0]);
  } catch (error) {
      console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
