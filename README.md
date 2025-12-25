Personality-Based AI Chatbot

An open-source, personality-driven AI chatbot built with Node.js and the Gemini API.
The chatbot follows a strictly defined personality profile to ensure consistent tone, reasoning style, and response behavior across all conversations.

Created and maintained by cid kageno.


---

Why This Project Exists

Most chatbots respond inconsistently because personality is implicit or loosely defined. This project enforces personality at the system prompt level, making behavior predictable, testable, and easy to modify without retraining models.

This repository is intentionally simple and transparent, designed for learning, experimentation, and extension.


---

Features

Personality-based response control

Gemini API integration

Lightweight Express backend

Clear separation of logic and personality

Easy local setup

Fully open source



---

Tech Stack

Node.js

Express

Gemini API

JavaScript (ES Modules)

dotenv


Run Locally

Prerequisites

Node.js (v18 or newer)

Gemini API key


Steps

1. Install dependencies

npm install


2. Create a .env.local file in the project root

GEMINI_API_KEY=your_gemini_api_key


3. Start the development server

npm run dev




---

Personality System

All behavioral control is defined in:

src/chatbot/personality.js

The personality file defines:

Tone

Reasoning style

Verbosity

Behavioral constraints


Changing personality requires no model retraining — only prompt updates.


---

Open Source

This project is open source and intended for:

Learning prompt engineering

Building character-based chatbots

Experimenting with controlled AI behavior

Educational and non-commercial use


Contributions, forks, and modifications are welcome.


---

Security Notes

Never commit .env.local

Protect API keys

Add rate limiting before public deployment



---

License