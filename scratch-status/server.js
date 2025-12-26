const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.static("public"));

app.get("/api/user/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const r = await fetch(
      `https://api.scratch.mit.edu/users/${username}`
    );

    if (!r.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = await r.json();
    res.json(data);

  } catch (e) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
