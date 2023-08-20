import API from ".";

export const getBank = async (params, next) => {
  await API.get("/admin/bank", {
    params: params,
  }).then((response) => {
    next(response.data.results.data);
  });
};
