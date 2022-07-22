import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ReviewProvider } from "./contexts/ReviewContext";
import { PathProvider } from "./contexts/PathContext";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <AuthProvider>
      <PathProvider>
        <ReviewProvider>
          <Router>
            <App />
          </Router>
        </ReviewProvider>
      </PathProvider>
    </AuthProvider>
  </ChakraProvider>
);
