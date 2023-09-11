import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

import { store } from "./store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.scss";

// import { store } from "./store/store.js";
// import { Provider } from "react-redux";

// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     {/* <React.StrictMode> */}
//     <PersistGate persistor={persistStore}>
//       <App />
//     </PersistGate>
//     {/* </React.StrictMode> */}
//   </Provider>
// );
