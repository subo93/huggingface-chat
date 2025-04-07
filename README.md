# Chat App

This is a simple chat application built with Express, Socket.io, and a local Ollama model.

## Features

- Real-time chat functionality using Socket.io
- Integration with a local Ollama model to generate responses
- Serves a React frontend

## Prerequisites

- **Hardware Requirements**:
  - Minimum 4 GB RAM
  - Minimum 2 GHz dual-core processor
  - 500 MB of free disk space

- **Software Requirements**:
  - Node.js
  - npm
  - Ollama model installed and accessible via the command line
  - Built on Linux OS (Ubuntu)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Build the React frontend:

    ```bash
    cd /home/subodhi/Desktop/Apps\ 2025/reactjsnew/chat-app
    npm install
    npm run build
    cd -
    ```

4. Install Ollama:

    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

5. Verify Ollama installation:

    ```bash
    which ollama
    /usr/local/bin/ollama
    ```

6. Check installed models:

    ```bash
    ls ~/.ollama/models
    # Expected output:
    # phi -> ~2.2 GB
    # mistral -> ~4–5 GB
    ```

## Running the App

1. Start the server:

    ```bash
    node src/server.js
    ```

2. Open your browser and navigate to `http://localhost:5000`.

## Usage

- Open the chat application in your browser.
- Enter a message in the chat input and press enter.
- The message will be sent to the server, processed by the local Ollama model, and the response will be displayed in the chat.

## Managing Ollama

1. Run the Ollama model:

    ```bash
    ollama run phi
    ```

2. Check if Ollama is already running:

    ```bash
    ps aux | grep ollama
    ```

3. Restart Ollama:

    ```bash
    kill <pid>
    ollama serve
    ```

## Troubleshooting

- Ensure the Ollama model is installed and accessible via the command line.
- Check the server logs for any errors related to the `exec` function.

## License

This project is licensed under the MIT License.
