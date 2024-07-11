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

**Create a `.env.local` file in the root of the project and add the required environment variables from firebase(web)**

   ```sh
   VITE_APIKEY=your-api-key
   VITE_AUTHDOMAIN=your-auth-domain
   VITE_PID=your-project-id
   VITE_STORAGE=your-storage-bucket
   VITE_MESSAGE=your-messaging-sender-id
   VITE_APPTD=your-app-id
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
