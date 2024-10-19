import "./App.css";
// import TravelBlogs from "./compponents/TravelBlogs/TravelBlogs"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./compponents/Navbar/Navbar";

import StaticRoutes from "./compponents/Routes";
import { useState } from "react";

const theme = createTheme();

function App() {
  const navbarElements = [
    {
      id: "1",
      label: "Home",
      path: "/",
    },
    {
      id: "2",
      label: "About",
      path: "/about",
    },
    {
      id: 3,
      label: "Blogs",
      path: "/blogs",
    },
    {
      id: "4",
      label: "Contact Us",
      path: "/contact",
    },
  ];
  const handleSearch = function () {
    console.log("searched");
  };
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router>
          <Navbar
            items={navbarElements}
            handleInpuChange={handleSearch}
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
  );
}

export default App;
