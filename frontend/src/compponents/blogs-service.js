import blogsData from "./blogs.json";

function getBlogs(queryParams, metadataOnly = false) {
  try {
    const { limit = 10, offset = 0, searchedBlog = null, ...query } = queryParams;
    
    const numLimit = limit ? parseInt(limit, 10) : undefined;
    const numOffset = offset ? parseInt(offset, 10) : 0;

    const filteredBlogs = blogsData.filter((blog) => {
      return Object.entries(query).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(blog[key]);
        } else {
          return blog[key] === value;
        }
      });
    });

    let result = filteredBlogs;

    if(searchedBlog){
      result = filteredBlogs.filter(blog => blog.label?.toLowerCase().includes(searchedBlog))
    }

    if (metadataOnly) {
      result = result.map((blog) => ({
        id: blog.id,
        label: blog.label,
        author: blog.author,
        location: blog.location,
        intro: blog.intro,
        image: blog.image,
      }));
    }

    const totalCount = result.length;

    if (numOffset || numLimit) {
      result = result.slice(numOffset, numOffset + numLimit);
    }

    
    let hasNext = false;

    if(numLimit+numOffset < totalCount){
      hasNext = true;
    }

    return {
      blogs : result,
      hasNext : hasNext,
      total : totalCount
    }

  } catch (error) {
    console.error("Error in getBlogs:", error);
    throw error;
  }
}

export default {
  getBlogs,
};