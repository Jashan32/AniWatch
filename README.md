# AniWatch

AniWatch is a **modern anime streaming platform** built using the **MERN stack**.  
It streams **`.m3u8` video packets** securely from **Cloudflare R2 buckets**, supports **dual audio**, **subtitles**, and features a fully dynamic admin-managed content system.  

> 🎬 Watch anime, chat with the community, and manage your own anime database — all in one place.

---

## 🚀 Demo

🌐 **Live Website:** [https://aniwatch.jashan.tech](https://aniwatch.jashan.tech)

📸 **Screenshots:**

Home Page:
<img width="1704" height="902" alt="image" src="https://github.com/user-attachments/assets/7f055653-c774-45b5-a3ce-41e0f4fac4ba" />

---

## ✨ Features

- 🎥 **Anime Streaming** – Streams `.m3u8` video packets from Cloudflare R2 .  
- 🔊 **Dual Audio Support** – Seamlessly switch between **Japanese** and **English** audio tracks.  
- 💬 **Community Chats** – Real-time discussions powered by **WebSockets**.  
- 🧑‍💻 **User Posts** – Users can share posts, discussions, and anime reviews.  
- 🧩 **Dynamic Content** –  
  - Add new anime and episodes anytime  
  - Modify banners and categories dynamically  
  - Fully controlled from an **Admin Dashboard**
- 🔐 **Secure Authentication** – JWT-based login system for users and admins.  
- 🎨 **Responsive UI** – Built with **React + Tailwind CSS** for a modern, minimal, and smooth experience.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- WebSockets  

**Storage:**  
- Cloudflare R2 (for video storage & streaming)  

---

## ⚙️ Local Setup

To run AniWatch locally:

```bash
# Clone the repository
git clone https://github.com/Jashan32/AniWatch.git
cd AniWatch

# Install dependencies for both client and server
cd client && npm install
cd ../server && npm install

# Setup environment variables
# Create a .env file in both server & client using .env.example present

# Start the backend
node index.js

# In another terminal, start the frontend
npm run dev
