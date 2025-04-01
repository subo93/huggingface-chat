const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5000;

// Serve static files from the React app
app.use(express.static(path.join('/home/subodhi/Desktop/Apps 2025/reactjsnew/chat-app', 'build')));

// Function to fetch response from Hugging Face's model
async function getHuggingFaceResponse(userInput) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
          //  https://api-inference.huggingface.co/models/gpt2
           // https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B
            method: 'POST',
            headers: {
                'Authorization': `Bearer <your API-KEY>`, // Replace with your Hugging Face API key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: userInput })
        });

        const data = await response.json();
        return data[0].generated_text || 'I couldn’t generate a response.';
    } catch (error) {
        console.error('Error fetching response from Hugging Face:', error);
        return 'Error fetching response from Hugging Face.';
    }
}

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A user connected!');

    // Handle incoming chat messages
    socket.on('chat message', async (msg) => {
        console.log('Message received:', msg);

        // Example integration with Hugging Face API
        const response = await getHuggingFaceResponse(msg);

        // Emit the response to all clients
        io.emit('chat message', response);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Catch-all handler to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join('/home/subodhi/Desktop/Apps 2025/reactjsnew/chat-app', 'build', 'index.html'));
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});