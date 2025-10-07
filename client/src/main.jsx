import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/firebase"; // initialize Firebase client SDK early
createRoot(document.getElementById("root")).render(<App />);
