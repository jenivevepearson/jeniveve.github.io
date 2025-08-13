export default function handler(req, res) {
  try {
    const axiosPath = require.resolve("axios");
    res.status(200).json({axiosPath});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}
