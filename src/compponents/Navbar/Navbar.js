import "./Navbar.css";
import { useState,useEffect } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useNavigate,useLocation,useSearchParams} from 'react-router-dom';

export default function Navbar({ items,activeTab, setActiveTab}) {

const navigate = useNavigate()
const location = useLocation();

const handleTabChange = function(event, newValue){
  setActiveTab(newValue);
    navigate(items[newValue].path)

}
const [searchParams,setSearchParams] = useSearchParams();

const handleSearch = function(e){
  const searchedTerm = e.target.value;
  const updatedSearchParams = new URLSearchParams(searchParams);

  if(searchedTerm.trim()){
    updatedSearchParams.set("search",searchedTerm)
  }
  else{
    updatedSearchParams.delete("search")
  }

  setSearchParams(updatedSearchParams);
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
                  <SearchIcon className={activeTab !==1 ? 'search-icon--disabled' : ''}/>
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearch}
          disabled={activeTab !=1}
        />
      </div>
      <div className="profile">
        <AccountCircle fontSize="large"/>
      </div>
    </div>
  );
}
