import api from "./api";

export const createItem = async (itemData) => {

  const token = localStorage.getItem("token");

  const response = await api.post(
    "/items",
    itemData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getItems = async () => {
  const response = await api.get("/items");
  return response.data;
};