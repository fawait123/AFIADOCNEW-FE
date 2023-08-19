import API from ".";

export const getBooking = async (params, next) => {
  await API.get("/admin/booking", {
    params: params,
  }).then((response) => {
    next(response.data.results.data);
  });
};

export const insertBooking = async (payload, next) => {
  await API.post("/admin/booking", payload).then((response) => {
    next(response.data);
  });
};

export const updateBooking = async (id, data, next) => {
  await API({
    url: "/admin/booking",
    method: "put",
    params: {
      id: id,
    },
    data: data,
  }).then((response) => {
    next(response.data);
  });
};
