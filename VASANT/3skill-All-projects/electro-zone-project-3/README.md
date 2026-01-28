# Electro-Zone

Electro-Zone is a modern e-commerce platform for electronics, built with a React frontend and Node.js backend. This project demonstrates a modular architecture, reusable UI components, and a clean developer experience.

## Features
- Product catalog and showcase
- Shopping cart and checkout flow
- Responsive design
- Modular, reusable UI components
- API integration

## Project Structure
```
- client/         # Frontend React app
- server/         # Backend Node.js server
- shared/         # Shared code (API, product data)
- netlify/        # Netlify serverless functions
- public/         # Static assets
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd electro-zone
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App
#### Frontend
```
cd client
npm run dev
```

#### Backend
```
cd server
npm run dev
```

#### Netlify Functions
Netlify functions are in `netlify/functions/` and can be deployed automatically with Netlify.

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server

## License
MIT 