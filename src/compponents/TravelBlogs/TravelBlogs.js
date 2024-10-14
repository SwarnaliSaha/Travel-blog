import { blogs } from "./BlogData";
import BlogCard from "../BlogCard/BlogCard";
import BlogListItem from "../BlogList/BlogList";
import "./TravelBlogs.css";
import { useState } from "react";

export default function TravelCard() {
  const [currentIndex, setIndex] = useState(0);

  const handleBlogClick = (blogId) => {
    const newIndex = blogs.findIndex((blog) => blog.id === blogId);
    setIndex(newIndex);
  };

  const travelImages = [
    "https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png",
    "https://cdn.pixabay.com/photo/2021/11/29/17/32/city-6833167_1280.jpg"
  ]
  return (
    <div className="main-container">
    <div className="travel-blogs--container">
      <BlogCard blog={blogs[currentIndex]} key={blogs[currentIndex].id} />
      {
        travelImages.map((image,index)=>(         
            travelImages.map((image,index)=>(
              <img src={image} className={`travel-images travel-image-${index+1}`} />
            )
            )          
        )
        )
      }
      <div className="travel-quote">That was one of a trip !</div>
      <div className="travel-blogs--right-container">
      <div className="right-container--header">
          <img
            src={"https://cdn.pixabay.com/photo/2016/06/20/10/09/flight-1468473_1280.png"}
            alt="Header"
            className="right-container--header-image"
          />
          <div className="right-container--header-label">Destinations</div>
        </div>
        {blogs.map((blog,index) => (
          <BlogListItem
            blog={blog}
            key={blog.id}
            onBlogClick={handleBlogClick}
            isSelected = {currentIndex==index ? true : false}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

