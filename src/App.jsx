import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#11100e",
            color: "#f4efe7",
            border: "1px solid #2d2925",
            borderRadius: "12px",
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;