import API from ".";

export const getDoctor = async (next) => {
  await API.get("/admin/doctor", {
    params: {
      page: 0,
      limit: 10,
      association:
        "specialist,company,addresses.province.district.subdistrict.village",
    },
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
export const editDoctor = async (id, data, next) => {
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
