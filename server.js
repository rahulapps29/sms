const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Serve the HTML form
app.get('/sms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use(cors());

// Replace with your actual API credentials and endpoint
const apiUrl = "http://192.168.1.102:8082/"; // The actual API endpoint
const apiToken = "0bbfd7cd-d935-4970-b453-badb156a27bc"; // Your token for authentication

// Endpoint to send SMS
app.post("/sms/send-sms", async (req, res) => {
  const { to, message } = req.body;

  try {
    console.log("Sending SMS...");
    
    // Start timer
    const startTime = Date.now();

    // Make the SMS API call
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

    // End timer
    const endTime = Date.now();
    console.log(`SMS API response time: ${endTime - startTime}ms`);
    console.log(`SMS Sent: "${message}" to number: ${to}`);
    // Respond back to the client
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error sending SMS:", error.message);

    // End timer in case of error
    const endTime = Date.now();
    console.log(`SMS API response time (error): ${endTime - startTime}ms`);

    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4016;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
