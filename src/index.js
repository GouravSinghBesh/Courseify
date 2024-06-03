import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import rootReducer from "./reducer";
import { CookiesProvider } from "react-cookie";

const store = configureStore({
  reducer: rootReducer,
})


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
      <Toaster />
    </BrowserRouter>

  </Provider>


);
