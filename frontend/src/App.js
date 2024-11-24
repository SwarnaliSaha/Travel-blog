import "./App.css";
// import TravelBlogs from "./compponents/TravelBlogs/TravelBlogs"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./compponents/Navbar/Navbar";

import StaticRoutes from "./compponents/Routes";
import { useState } from "react";

// import { Provider } from 'react-redux';
// import store from './redux/store';

const theme = createTheme();

function App() {
  const navbarElements = [
    {
      id: "1",
      label: "Home",
      path: "/",
    },
    {
      id: 2,
      label: "Blogs",
      path: "/blogs",
    },
    {
      id: "3",
      label: "About & Contact",
      path: "/about",
    },

  ];
  
  const [activeTab, setActiveTab] = useState(0);

  return (
    // <Provider store={store}>
      <ThemeProvider theme={theme}>
      <div>
        <Router>
          <Navbar
            items={navbarElements}
            className="navbar"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="rendered-components">
            <StaticRoutes />
          </div>
        </Router>
      </div>
    </ThemeProvider>
    // </Provider>   
  );
}

export default App;
