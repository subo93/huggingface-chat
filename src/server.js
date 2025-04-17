const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const { exec } = require("child_process"); // Import child_process to run Ollama

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5000;

// Serve static files from the React app
app.use(
    express.static(
        path.join("/home/subodhi/Desktop/Apps 2025/reactjsnew/chat-app", "build")
    )
);

// Function to fetch response from the local Ollama model
function getOllamaResponse(userInput) {
  return new Promise((resolve, reject) => {
    // Sanitize user input to prevent command injection
    const safeInput = userInput.replace(/'/g, "'\\''");

    // Add prompt to restrict answers to health and fitness topics
    const prompt = `You are a helpful assistant that only answers questions related to health and fitness topics.
If the user's question is not related to health or fitness, respond with:
"I'm sorry, I can only help with health and fitness topics."

User: ${safeInput}`;

    // Use double quotes for the echo command and escape double quotes in the prompt
    const command = `echo "${prompt.replace(/"/g, '\\"')}" | ollama run phi`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Ollama: ${error.message}`);
        console.error(`Error code: ${error.code}`);
        console.error(`Error signal: ${error.signal}`);
        reject(`Error executing Ollama: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        // Optional: reject(`stderr: ${stderr}`);
      }
      resolve(stdout.trim());
    });
  });
}

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("A user connected!");

  // Handle incoming chat messages
  socket.on("chat message", async (msg) => {
    console.log("Message received:", msg);

    // Get response from the local Ollama model
    try {
      const response = await getOllamaResponse(msg);

      // Emit the response to all clients
      io.emit("chat message", response);
    } catch (error) {
      console.error(error);
      io.emit("chat message", "Error processing your request.");
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Catch-all handler to serve the React app
app.get("*", (req, res) => {
  res.sendFile(
      path.join(
          "/home/subodhi/Desktop/Apps 2025/reactjsnew/chat-app",
          "build",
          "index.html"
      )
  );
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
