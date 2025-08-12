import 'dotenv/config'

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
    const apiKey = process.env.API_KEY;

    const allDocs = [];
    
    // First, make one request to see how many total papers exist
    const firstUrl = `https://api.adsabs.harvard.edu/v1/search/query?q=orcid:${orcid}&fl=title,author,pubdate,bibcode,abstract&rows=10&start=0&sort=pubdate%20desc`;
    
    const firstResponse = await axios.get(firstUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    
    const totalPapers = firstResponse.data.response?.numFound || 0;
    console.log(`Total papers found: ${totalPapers}`);
    
    if (totalPapers === 0) {
      return res.json({
        responseHeader: { status: 0, QTime: 0 },
        response: { docs: [], numFound: 0, start: 0, numFoundExact: true }
      });
    }
    
    // Add the first batch of docs
    allDocs.push(...(firstResponse.data.response?.docs || []));
    
    // Now fetch the remaining batches
    for (let start = 10; start < totalPapers; start += 10) {
      const url = `https://api.adsabs.harvard.edu/v1/search/query?q=orcid:${orcid}&fl=title,author,pubdate,bibcode,abstract&rows=10&start=${start}&sort=pubdate%20desc`;
      
      console.log(`Fetching batch starting at ${start} (${start + 1}-${Math.min(start + 10, totalPapers)} of ${totalPapers})`);
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      
      const docs = response.data.response?.docs || [];
      allDocs.push(...docs);
      
      console.log(`Got ${docs.length} docs. Total collected: ${allDocs.length}/${totalPapers}`);
      
      // If we got fewer than expected, we've reached the end
      if (docs.length < 10 && allDocs.length < totalPapers) {
        console.log("Got fewer docs than expected - might have reached the end");
        break;
      }
      
      // Small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`Successfully collected ${allDocs.length} out of ${totalPapers} papers`);
    
    // Return in the same format your frontend expects
    res.json({
      responseHeader: { status: 0, QTime: 0 },
      response: {
        docs: allDocs,
        numFound: allDocs.length,
        start: 0,
        numFoundExact: true
      }
    });
    
  } catch (error) {
    console.error("Proxy Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data from NASA ADS" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
