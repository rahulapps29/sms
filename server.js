const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

// Replace with your actual API credentials and endpoint
const apiUrl = "http://192.168.29.130:8082/"; // The actual API endpoint
const apiToken = "0bbfd7cd-d935-4970-b453-badb156a27bc"; // Your token for authentication

// Endpoint to send SMS
app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;

  try {
    const response = await axios.post(
      apiUrl,
      { to, message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${apiToken}`, // Token authentication
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
