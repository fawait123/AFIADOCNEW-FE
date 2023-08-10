import API from ".";

export const getDoctor = async (params, next) => {
  await API.get("/admin/doctor", {
    params: params,
  }).then((response) => {
    next(response.data.results.data);
  });
};

export const getRegional = async (type, next) => {
  await API.get("/admin/regionals", {
    params: { ...type },
  }).then((res) => next(res));
};

export const storeDoctor = async (data, next) => {
  console.log(data, "data");
  await API({
    url: "/admin/doctor",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  }).then((response) => next(response.data));
};

export const registerDoctor = async (data, next) => {
  await API({
    url: "/auth/register/doctor",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  }).then((response) => next(response.data));
};

export const updateDoctor = async (id, data, next) => {
  await API({
    url: "/admin/doctor",
    method: "put",
    params: {
      doctorID: id,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  }).then((response) => next(response.data));

  // console.log(data, "data from");
};
export const deleteDoctor = async (id) => {
  await API({
    url: "/admin/doctor",
    method: "delete",
    params: {
      doctorID: id,
    },
  });
};
