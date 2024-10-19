import blogsData from "./blogs.json";

function getBlogs(queryParams, metadataOnly = false) {
  try {
    const { limit, offset, ...query } = queryParams;
    
    const numLimit = limit ? parseInt(limit, 10) : undefined;
    const numOffset = offset ? parseInt(offset, 10) : 0;

    const filteredBlogs = blogsData.filter((blog) => {
      return Object.entries(query).every(
        ([key, value]) => blog[key] === value
      );
    });

    let result = filteredBlogs;

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

    if (numOffset || numLimit) {
      result = result.slice(numOffset, numLimit ? numOffset + numLimit : undefined);
    }

    return result;
  } catch (error) {
    console.error("Error in getBlogs:", error);
    throw error;
  }
}

export default {
  getBlogs,
};