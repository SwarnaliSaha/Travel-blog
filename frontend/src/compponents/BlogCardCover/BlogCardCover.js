import "./BlogCardCover.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button
} from "@mui/material";

export default function BlogCardCover({items,handleBlogExplore}) {
  const itemsPerSlide = 3;
  const groupedItems = items?.reduce((resultArray, item, index) => {
    const groupIndex = Math.floor(index / itemsPerSlide);
    if (!resultArray[groupIndex]) {
      resultArray[groupIndex] = [];
    }
    resultArray[groupIndex].push(item);
    return resultArray;
  }, []);

  const onBlogExpore = function(blogId){
    handleBlogExplore(blogId)
  }

  if(!items.length){
    return (
      <Typography>No blogs found</Typography>
    )
  }

  return (
    <div>
      {groupedItems.map((group, index) => (
        <Box key={index} className="groupbox-container">
          {group.map((item, itemIndex) => (
            <Card
              key={itemIndex}
              sx={{
                width: `calc((100% - ${
                  (itemsPerSlide - 1) * 16
                }px) / ${itemsPerSlide})`,
              }}
              className="individual-item--card"
              onClick={() => onBlogExpore(item.id)}
            >
              <div className="image-container">
              <CardMedia component="img" image={item.image.path} />
              <Button className="explore-button" variant="contained" color="warning" onClick={() => onBlogExpore(item.id)}>Explore</Button>
              </div>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {item.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: "800",
                    color: "#666666",
                    lineHeight: "1.6",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                  }}
                >
                  {item.intro}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </div>
  );
}
