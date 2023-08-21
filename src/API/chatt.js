import API from ".";

export const getChatt = async (params, next) => {
  await API.get("/admin/chatt", {
    params: params,
  }).then((response) => {
    next(response.data.results.data);
  });
};

export const getUserList = async (next) => {
  await API.get("/admin/chatt/user").then((response) => {
    next(response.data.results.data);
  });
};

export const storeChatt = async (data, next) => {
  await API({
    url: "/admin/chatt",
    method: "post",
    data,
  }).then((response) => {
    next(response.data);
  });
};
