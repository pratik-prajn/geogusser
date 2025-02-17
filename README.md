# GeoGuessr Clone

## 🌍 About the Project
This is a GeoGuessr-inspired game where players are placed in a random location on a map and must guess their location based on surroundings. The game is built using Next.js for the frontend, Convex for the backend and database management, and Clerk for authentication.

## 🚀 Features
- 🌎 Randomized locations for each round
- 📌 Interactive map for guessing locations
- 🔐 User authentication with Clerk
- 📊 Leaderboard and user progress tracking with Convex
- 🎮 Multiplayer support (planned)

## 🛠️ Tech Stack
- **Frontend:** Next.js (React)
- **Backend & Database:** Convex
- **Authentication:** Clerk
- **Map Rendering:** Leaflet / Google Maps API (choose one based on implementation)

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/geoguesser-clone.git
   cd geoguesser-clone
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_CONVEX_URL=your-convex-url
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key  # If using Google Maps
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

## 🎮 How to Play
1. Sign in using Clerk authentication.
2. Start a new game to be placed in a random location.
3. Explore the surroundings and place a marker on the map where you think the location is.
4. Submit your guess and receive a score based on accuracy.
5. Compete with friends and track scores on the leaderboard!

## 📜 License
This project is open-source and available under the MIT License.

## 🙌 Contributing
Contributions are welcome! If you have ideas for improvements, feel free to fork the repo and submit a PR.

## 📩 Contact
For any queries, reach out to **[your email]** or open an issue in the repository.

---
Happy Guessing! 🎯

