import { Tooltip } from "@mui/material";
import BlogListCSS from "./BlogList.css";
import { useState } from "react";

export default function BlogListItem({ blog, isSelected, onBlogClick }) {
  const handleClick = () => {
    onBlogClick(blog.id);
  };
  return (
      <div className="blog-list--item" onClick={handleClick}>
        <div className="blog-list-item--image-container">
          <img
            src={blog.image}
            alt={blog.location}
            className={`item--image ${isSelected ? "blog-selected" : ""}`}
          />
          <div class="overlay"></div>
          <div class="quote-marks"></div>
          <Tooltip title={blog.description} placement="left" arrow>
            <div className="item--details-container">
              {blog.flag && (
                <img src={blog.flag} alt="" className="blog--flag" />
              )}
              <div>
                <div className="item--location">{blog.name}</div>
                <div className="item--description">{blog.description}</div>
              </div>
            </div>
          </Tooltip>
        </div>
        <div className="overlay"></div>
      </div>
  );
}
