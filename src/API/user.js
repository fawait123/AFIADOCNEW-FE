import API from ".";
export const getUserByID = async (params, next) => {
  await API({
    url: "/admin/user/detail",
    method: "get",
    params,
  }).then((response) => {
    next(response.data);
  });
};
