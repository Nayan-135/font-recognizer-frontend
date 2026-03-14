# FontSense - Font Recognition App

FontSense is a **React-based web application** that helps designers, developers, and typography enthusiasts **identify fonts from images, camera captures, or text samples using AI technology**.

---

## 🚀 Features

* **Image Upload** – Upload images containing text to analyze fonts
* **Camera Capture** – Use your device camera to capture real-world text
* **Text Analysis** – Enter text to get font suggestions
* **Dark / Light Mode** – Toggle between color themes
* **Responsive Design** – Works on desktop and mobile devices

---

## 🛠 Technologies Used

* React 18
* React DOM
* Lucide React (icons)
* Custom CSS (no Tailwind)
* Modern React Hooks (`useState`, `useRef`)
* Vite (for fast development and HMR)

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/font-recognition-app.git
cd font-recognition-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

## 📜 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Runs the app in development mode |
| `npm run build`   | Builds the app for production    |
| `npm run preview` | Preview the production build     |
| `npm test`        | Runs test suite                  |

---

## 📁 Project Structure

```
font-recognition-app/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── About/
│   │   ├── InputComponents/
│   │   └── Results/
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── themes.css
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

---

## ⚡ Vite + React Setup

This project uses **Vite** for faster development and hot module replacement (HMR).

Two official plugins are available:

* `@vitejs/plugin-react` – Uses **Babel** for Fast Refresh
* `@vitejs/plugin-react-swc` – Uses **SWC** for Fast Refresh

---

## 🔧 ESLint Configuration

If you are developing a **production-level application**, it is recommended to use:

* **TypeScript**
* **Type-aware lint rules**

You can check the official **React + TypeScript template**:

```
https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts
```

---

## 🤝 Contributing

Contributions are welcome!

Steps to contribute:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-branch
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-branch
```

5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

* **React Team** for the powerful framework
* **Lucide** for the beautiful icons
* All contributors who helped improve this project

---

⭐ If you like this project, consider giving it a **star on GitHub**!
