import API from ".";

export const getDashboard = async (next) => {
  await API.get("/admin/dashboard").then((response) => {
    next(response.data.results.data);
  });
};
