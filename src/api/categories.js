import client from "./client";

const getCategories = async () => {
  try {
    const response = await client.get(`/categories?order=name.asc`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories');
  }

}

const getCategory = async (id) => {
  try {
    const response = await client.get(`/categories?id=eq.${id}`);
    return response.data[0];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch category');
  }

}

export {
  getCategories,
  getCategory
}