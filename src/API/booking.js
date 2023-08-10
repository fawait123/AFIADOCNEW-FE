import API from ".";

export const getBooking = async (params, next) => {
  await API.get("/admin/booking", {
    params: params,
  }).then((response) => {
    next(response.data.results.data);
  });
};
