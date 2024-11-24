import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import blogsService from "../blogs-service";
import "./Blog.css";

export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBlog() {
      try {
        setLoading(true);
        const data = await blogsService.getBlogs({ id : id });
        const blogs = data.blogs;
        setBlog(blogs[0]);
      } catch (err) {
        setError('Failed to fetch blog data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getBlog();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!blog) {
    return <Typography>No blog found</Typography>;
  }

  return (
    <div className="blog-container">
      <Card className="blog" variant="unstyled" sx={{ borderRadius: "16px" }}>
        <CardHeader
          title={blog.label}
          subheader={`~ ${blog.author}`}
          className="blog-header-section"
        />
        {blog.image && blog.image.path && (
          <div className="card-media--container">
            <CardMedia
              component="img"
              image={blog.image.path}
              className="blog--main-image location-images"
            />
            <Typography component="div" className="image--label">
              {blog.image.label}
            </Typography>
          </div>
        )}
        <CardContent className="card-content">
          <Typography component="div" className="place-description">
            {blog.intro}
          </Typography>
          <Typography component="div" className="label--places-to-visit">
            {blog.labelForPlacesToVisit}
          </Typography>
          {blog.placesToVisit && blog.placesToVisit.map((place, index) => (
            <Card raised className="card" key={index}>
              <CardHeader
                title={`${index + 1}. ${place.label || place.location}`}
                className="place--header"
              />
              <Box className="group-box">
                {place.images && place.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    style={{
                      width:
                        place.images.length % 2 !== 0 &&
                        imgIndex === place.images.length - 1
                          ? "100%"
                          : "calc(48.5% - 1px)",
                    }}
                    className="card-media--container"
                  >
                    {image.path && (
                      <CardMedia
                        component="img"
                        image={image.path}
                        className="location-images"
                      />
                    )}
                    <Typography component="div" className="image--label">
                      {image.label}
                    </Typography>
                  </div>
                ))}
              </Box>
              <CardContent className="card-content">
                <Typography component="div" className="place-description">
                  {place.description}
                </Typography>
                {place.hotspots && place.hotspots.map((spot, spotIndex) => (
                  <Card className="card card--single-spot" key={spotIndex}>
                    <CardHeader
                      title={spot.location}
                      className="spot--header"
                    />
                    <Box className="group-box">
                      {spot.images && spot.images.map((image, spotImgIndex) => (
                        <div
                          key={spotImgIndex}
                          style={{
                            width:
                              spot.images.length % 2 !== 0 &&
                              spotImgIndex === spot.images.length - 1
                                ? "100%"
                                : "calc(50% - 8px)",
                          }}
                          className="card-media--container"
                        >
                          {image.path && (
                            <CardMedia
                              component="img"
                              image={image.path}
                              className="location-images"
                            />
                          )}
                          <Typography component="div" className="image--label">
                            {image.label}
                          </Typography>
                        </div>
                      ))}
                    </Box>
                    <CardContent className="card-content">
                      <Typography component="div" className="place-description">
                        {spot.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}