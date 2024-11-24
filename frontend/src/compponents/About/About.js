import "./About.css";
import {
  Box,
  Card,
  Typography,
  CardMedia,
  Button,
  CardContent,
} from "@mui/material";
import { aboutData } from "./aboutData";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  function handleExploreBlogs() {
    navigate("/blogs");
  }

  const itemsPerSlide = 3;
  const groupItems = aboutData.chooseUsArray.reduce(
    (resultArray, item, index) => {
      const groupIndex = Math.floor(index / itemsPerSlide);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    },
    []
  );

  return (
    <div className="about-container">
      <Card className="card" variant="unstyled">
        <div className="image-section sub-sections">
          <CardMedia
            component="img"
            image={aboutData.displayImageOne}
            className="display--card-media"
          ></CardMedia>
          <CardMedia
            component="img"
            image={aboutData.displayImageTwo}
            className="display--card-media"
          ></CardMedia>
        </div>

        <div className="abous-us--container sub-sections">
          <div className="about-us--header-description">
            <Typography className="about-us--header">
              {aboutData.aboutUs.header}
            </Typography>
            <Typography className="about-us--description">
              {aboutData.aboutUs.description}
            </Typography>
            <Button
              className="explore-blogs-button"
              variant="contained"
              color="warning"
              onClick={handleExploreBlogs}
            >
              Explore Now
            </Button>
          </div>
          <CardMedia
            component="img"
            image={aboutData.aboutUs.image}
            className="about-us--image"
          ></CardMedia>
        </div>
        <div className="choose-us--container sub-sections">
          <Typography className="choose-us--header">Why Choose Us ?</Typography>
          <div>
            {groupItems.map((group, index) => (
              <Box className="carousels-box" key={index}>
                {group.map((item, itemIndex) => {
                  return (
                    <Card
                      key={itemIndex}
                      sx={{
                        width: `calc((100% - ${
                          (itemsPerSlide - 1) * 16
                        }px) / ${itemsPerSlide})`,
                      }}
                      className="carousel--card"
                      variant="outlined"
                    >
                      <CardMedia
                        component="img"
                        image={item.image}
                        className="carousel--image"
                      />
                      <CardContent className="carousel--card-content">
                        <Typography className="carousel-item--label">
                          {item.label}
                        </Typography>
                        <Typography className="carousel-item--description">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            ))}
          </div>
        </div>
        <div className="contact-details--container sub-sections">
          <Typography className="contact-us--header choose-us--header">
            Contact Us
          </Typography>
          <div className="contact-details">
            {aboutData.contactDetails.map((contact, index) => (
              <Card key={index} className="contact-card" variant="outlined">
                {contact.icon}
                <Typography className="carousel-item--description">
                  {contact.value}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
