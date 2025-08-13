const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors package
const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.get("/api/nasa-ads", async (req, res) => {
  try {
    const orcid = "0000-0002-0744-0047";
    const apiKey = "EmhD3mwdfaIcTDz9xIEM9Jn0drRn4QsRW7tKsDQv";

    const url = `https://api.adsabs.harvard.edu/v1/search/query?q=orcid:${orcid}&fl=title,author,pubdate,bibcode,abstract&rows=100&sort=pubdate%20desc`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    console.log("Response status:", response.status);
    console.log(
      "Number of docs returned:",
      response.data.response?.docs?.length || 0
    );
    console.log("Total number found:", response.data.response?.numFound || 0);

    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({error: "Failed to fetch data from NASA ADS"});
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
