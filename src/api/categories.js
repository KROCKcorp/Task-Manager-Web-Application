import client from "./client";

const getCategories = async () => {
  try {
    const response = await client.get(`/categories?order=name.asc`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories');
  }

}

export {
  getCategories,
}