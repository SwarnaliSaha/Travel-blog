import "./Navbar.css";
import { useState,useEffect } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useNavigate,useLocation } from 'react-router-dom';

export default function Navbar({ items,handleInpuChange, activeTab, setActiveTab}) {

const navigate = useNavigate()
const location = useLocation()

const handleTabChange = function(event, newValue){
  setActiveTab(newValue);
    navigate(items[newValue].path)

}

useEffect(()=>{
  const path = location.pathname;
  const index = items.findIndex(item => item.path === path || (item.path !="/" && path.startsWith(item.path)))

  setActiveTab(index !== -1 ? index : 0)
},[location,items,setActiveTab])

  return (
    <div className="navbar">
      <div className="navbar--label">TRAVEL BLOGS</div>
      <div className="item-container">
        <Tabs value={activeTab} onChange={handleTabChange}>
          {
            items.map((item,index)=>{
                return (
                    <Tab label={item.label} value={index} key={index}/>
                )
            })
          }
        </Tabs>
      </div>
      <div className="search-container">
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleInpuChange}
        />
      </div>
      <div className="profile">
        <AccountCircle fontSize="large"/>
      </div>
    </div>
  );
}
