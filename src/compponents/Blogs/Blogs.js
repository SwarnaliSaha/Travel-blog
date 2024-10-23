import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import blogsService from "../blogs-service";
import {
  Grid2,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Filters from "../Filters/Filter";

import "./Blogs.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Blogs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const limit = 6;

  const query = useQuery();

  useEffect(() => {
    if (id) {
      navigate(`/blogs/${id}`);
    } else {
      const page = parseInt(query.get("page")) || 1;
      setCurrentPage(page);
      fetchBlogs();
    }
  }, [currentPage, id, filters]);

  async function fetchBlogs() {
    try {
      setLoading(true);
      let offset = (currentPage - 1) * limit;
      const queryParams = {
        limit: limit,
        offset: offset,
        ...filters,
      };
      const { blogs, hasNext } = await blogsService.getBlogs(queryParams, true);
      setBlogs(blogs);
      setHasNext(hasNext);
    } catch (error) {
      setError("Failed to fetch blog data");
      console.log("Error in fetching all blogs: ", error);
    } finally {
      setLoading(false);
    }
  }

  function onBlogExpore(blogId) {
    navigate(`/blogs/${blogId}`);
  }

  function handlePagination(newPage) {
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
    // const filterQuery = new URLSearchParams(filters).toString();
    // navigate(`?page=${newPage}&${filterQuery}`);
  }

  //Build facets array by calling blogs (metadata only) api once
  const [facets, setFacets] = useState([]);
  const facetLabels = [
    {
      label: "location",
      displayName: "Places",
    },
    {
      label: "author",
      displayName: "Contributors/Authors",
    },
  ];
  useEffect(() => {
    async function getFacets() {
      let facets = [];
      let blogMetadata = await blogsService.getBlogs({}, true);
      let facetId = 1;

      for (let facetLabel of facetLabels) {
        let facet = {
          id: facetId,
          key: facetLabel.label,
          label: facetLabel.displayName,
          filters: [],
          multiSelect: true,
        };
        facet.filters = [...new Set(blogMetadata.blogs?.map(element => element[facetLabel.label]))].map((label, index) => ({ id: index + 200, label }));
        facets.push(facet);
        facetId++;
      }
      setFacets(facets);
    }
    getFacets();
  }, []);

  function handleApplyFilters(appliedFilters) {
    let filterQueryObject = {};
    for (let filter of appliedFilters) {
      filterQueryObject[filter.key] = filter.selections.map(
        (item) => item.label
      );
    }

    // const filterQueryString = new URLSearchParams(filterQueryObject).toString();
    setFilters(filterQueryObject);
    setCurrentPage(1);
    navigate(`?page=${1}`);
    // navigate(`?page=${1}&${filterQueryString}`);
  }

  function handleReset(){
    setFilters({});
    navigate(`?page=${1}`);
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!blogs.length) {
    return <Typography>No blog found</Typography>;
  }

  return (
    <Box className="blogs--container">
      <div className="filter--container">
        <Filters facets={facets} handleApplyFilters={handleApplyFilters} handleReset={handleReset}/>
      </div>
      <div className="right-container">
        <Grid2 container spacing={4}>
          {blogs.map((blog, index) => {
            return (
              <Grid2 key={index} size={{s:12, md: 6, lg: 4 }}>
                <Card raised className="blog-card" onClick={() => onBlogExpore(blog.id)}>
                  <CardMedia
                    component="img"
                    image={blog.image.path}
                    className="card-media"
                  />
                  <CardHeader
                    title={blog.label}
                    subheader={`~ ${blog.author}`}
                    className="blog-header-section"
                  />
                  <CardContent className="blogs-card-content">
                    <Typography component="div" className="card-description">
                      {blog.intro}
                    </Typography>
                    <Button
                      className="explore-blog-button"
                      variant="contained"
                      color="warning"
                      onClick={() => onBlogExpore(blog.id)}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
        <Box className="pagination-container">
          <Button
            className="pagination-buttons"
            variant="contained"
            color="warning"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <NavigateBeforeIcon fontSize="small" />
          </Button>
          <Button
            className="pagination-buttons"
            variant="contained"
            color="warning"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={!hasNext}
          >
            <NavigateNextIcon fontSize="small" />
          </Button>
        </Box>
      </div>
    </Box>
  );
}
