import client from "./client";

export async function getTasks({ limit = 20, offset = 0, categoryId, completed, priority } = {}) {
  let query = `/tasks?order=created_at.desc&limit=${limit}&offset=${offset}`;

  if (categoryId) query += `&category_id=eq.${categoryId}`;
  if (completed !== undefined) query += `&completed=eq.${completed}`;
  if (priority) query += `&priority=eq.${priority}`;

  try {
    const response = await client.get(query);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
  }
}

export async function getTask(id) {

  try {
    const response = await client.get(`/tasks?id=eq.${id}`);
    return response.data[0];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch task');
  }

}

export async function createTask(task) {
  try {
    const response = await client.post("/tasks", task);
    return response.data[0];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create task');
  }

}

export async function updateTask(id, updates) {
  try {
    const { data } = await client.patch(`/tasks?id=eq.${id}`, updates);
    return data[0];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update task');
  }
}

export async function deleteTask(id) {
  try {
    await client.delete(`/tasks?id=eq.${id}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete task');
  }
}
