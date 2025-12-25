Personality-Based AI Chatbot

A minimal, open-source AI chatbot built with Node.js and the Gemini API.
It uses a strictly defined personality profile to ensure consistent tone, reasoning, and behavior.

Created by cid kageno.


---

Purpose

Most chatbots behave inconsistently because personality is vague or implicit. This project makes personality explicit and controllable at the prompt level, enabling predictable behavior without retraining models.


---

Features

Personality-driven responses

Gemini API integration

Lightweight Express backend

Simple and extensible design

Fully open source



---

Tech Stack

Node.js

Express

Gemini API

JavaScript (ES Modules)



---

Run Locally

Requirements

Node.js v18 or newer

Gemini API key


Setup

npm install

Create a .env.local file:

GEMINI_API_KEY=your_gemini_api_key

Start the server:

npm run dev


---

Personality System

All behavior is controlled through a single personality definition file.
Updating personality requires only prompt changes—no model retraining.


---

License

MIT License