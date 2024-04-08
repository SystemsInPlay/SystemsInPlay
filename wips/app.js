const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();

// Serve static files
app.use(express.static('public'));

let cachedEpisodes;
let lastFetchTime;

app.get('/api/episodes', async (req, res) => {
    // If cached and data is less than 24 hours old, use cached data
    const currentTime = new Date();
    if (cachedEpisodes && (currentTime - lastFetchTime) < (24 * 60 * 60 * 1000)) {
        return res.json(cachedEpisodes);
    }

    try {
        const response = await axios.get('https://feeds.libsyn.com/486780/rss');
        const result = await xml2js.parseStringPromise(response.data);
        const episodes = result.rss.channel[0].item.map(episode => ({
            title: episode.title[0],
            link: episode.enclosure[0].$.url,
            episode: episode,
            showNotes: episode.description ? episode.description[0] : "N/A",
            // Extract other properties as needed
        }));

        cachedEpisodes = episodes;
        lastFetchTime = currentTime;

        res.json(episodes);
    } catch (error) {
        res.status(500).send("Error fetching podcast data.");
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on port ${PORT}`);
});
