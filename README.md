# CareerPilot

CareerPilot is a modern web application to help students and professionals track job applications, manage interview prep, and stay on top of their career goals.

---

## 🚀 Technologies Used

<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="40" /><br/>React</td>
    <td align="center"><img src="https://vitejs.dev/logo.svg" width="40" /><br/>Vite</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" width="40" /><br/>Tailwind CSS</td>
    <td align="center"><img src="https://avatars.githubusercontent.com/u/9216092?s=200&v=4" width="40" /><br/>Clerk Auth</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="40" /><br/>Node.js</td>
    <td align="center"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="40" /><br/>Express</td>
  </tr>
</table>

---

## 📁 Folder Structure

```
CareerPilot/
│
├── client/                # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── router.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── server/                # Backend (Node.js + Express)
│   ├── public/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   ├── package.json
│   ├── index.js
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 📝 Features

- User authentication with Clerk
- Responsive UI with Tailwind CSS
- Animated components with Framer Motion
- Protected routes for dashboard and profile
- Modern React architecture with Vite

---
## 🛠️ Getting Started

1. **Clone the repository to your local system**

   ```bash
   git clone https://github.com/anshucodes404/CareerPilot.git
   cd CareerPilot
   ```

2. **Install dependencies** in both `client` and `server` folders

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables** (see `.env.example` if available)

4. **Run the development servers**

   ```bash
   # In one terminal
   cd client
   npm run dev

   # In another terminal
   cd server
   npm start
   ```

---

## 📄 License

MIT

---

Made with ❤️ by Anshu Kumar
