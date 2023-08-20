import API from ".";

export const getPayout = async (params, next) => {
  await API({
    url: "/admin/payout",
    method: "get",
    params,
  }).then((response) => {
    next(response.data.results.data);
  });
};

export const updatePayout = async (params, data, next) => {
  await API({
    url: "/admin/payout",
    method: "put",
    params,
    data,
  }).then((response) => {
    next(response.data.results.data);
  });
};
