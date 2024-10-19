import "./Landing.css";
import BlogCardCover from "../BlogCardCover/BlogCardCover";
import { useNavigate } from "react-router-dom";
import blogsService from "../blogs-service";

// import { blogs } from "./BlogData";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate()

  const handleBlogExplore = function (blogId) {
    console.log(blogId)
    navigate(`/blogs/${blogId}`)
  };

  const [blogsMetadata,setBlogsMetadata] = useState([])
  useEffect(()=>{
    async function getBlogMetadata(){
      try {
        const metadata = await blogsService.getBlogs({limit : 5},true)
        setBlogsMetadata(metadata)
      } 
      catch (error) {
        console.log("Error in fetching blog metadata details",error)
      }
    }

    getBlogMetadata()
  },[])

  return (
    <div className="landing-page--main-container">
      <div className="content">
        <div className="cover-image-container">
          <img
            src="https://cdn.pixabay.com/photo/2023/06/14/23/12/sunset-8064078_1280.jpg"
            alt=""
            className="cover-image"
          />
        </div>
        {/* <div className="blog-cards-container"> */}
          <BlogCardCover items={blogsMetadata} handleBlogExplore={handleBlogExplore} />
        {/* </div> */}
        <div>nlsrchg</div>
      </div>
    </div>
  );
}
