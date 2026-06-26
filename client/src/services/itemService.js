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

export const getClaims = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/claims", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const approveClaim = async (id) => {
  const token = localStorage.getItem("token");

  return api.put(
    `/admin/claims/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectClaim = async (id) => {
  const token = localStorage.getItem("token");

  return api.put(
    `/admin/claims/${id}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getItemById = async (id) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const submitClaim = async (claimData) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/claims",
    claimData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getHomeStats = async () => {
    const response = await api.get("/home/stats");
    return response.data;
};

export const getDashboardStats = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/admin/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
