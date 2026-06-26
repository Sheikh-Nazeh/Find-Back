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

export const getPendingReports = async () => {

  const token = localStorage.getItem("token");

  const response = await api.get(
    "/admin/reports/pending",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const approveReport = async (id) => {

  const token = localStorage.getItem("token");

  return api.put(
    `/admin/reports/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectReport = async (id) => {

  const token = localStorage.getItem("token");

  return api.put(
    `/admin/reports/${id}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllItems = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};