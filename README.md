# ProReferral

This project is a Vite React application for ProReferral.

- Live URL: <https://task-proreferral.web.app>

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/shahadathhs/proreferral.git
cd proreferral
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```env
VITE_APIKEY = AIzaSyD7GpJ_Ip5WtMiSu7KYS_FA1Hme7-Mdz8w
VITE_AUTHDOMAIN = task-proreferral.firebaseapp.com
VITE_PID = task-proreferral
VITE_STORAGE = task-proreferral.appspot.com
VITE_MESSAGE = 247766866905
VITE_APPTD = 1:247766866905:web:648341d3b69c1c8a0d97c8
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will start and you can access it at `http://localhost:5173`.

### 5. Build for Production

```bash
npm run build
```

## Technologies Used

- React
- Vite
- Firebase
