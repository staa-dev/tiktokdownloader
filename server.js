const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/tiktok", async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        // Contoh pakai API publik (ganti sesuai provider)
        const response = await axios.get(
            `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`
        );

        if (!response.data || !response.data.video) {
            return res.status(404).json({ error: "Video not found" });
        }

        res.json({
            status: true,
            video: response.data.video.noWatermark,
            title: response.data.title
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch video" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});