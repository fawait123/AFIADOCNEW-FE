import { isNull, isUndefined } from "lodash";
import API from ".";

export const publicDashboard = async (payload, next) => {
  const res = await API.get("/public/specialist", {
    params: {
      page: 1,
      limit: 6,
      ...payload,
    },
  }).then((response) => {
    next(response.data.results.data.rows);
  });
};
export const publicDashboardDoctor = async (payload, next) => {
  const res = await API.get("/public/doctor", {
    params: {
      page: 1,
      limit: 6,
      ...payload,
    },
  }).then((response) => {
    console.log(response);
    next(response.data.results.data.rows);
  });
};
export const publicDashboardDoctorQuery = async (payload, query, next) => {
  const res = await API.get("/public/doctor", {
    params: {
      page: 1,
      limit: 6,
      association:
        "specialist,company,addresses.province.district.subdistrict.village,academics,works",
      search: query,
      ...payload,
    },
  }).then((response) => {
    next(response.data.results.data.rows);
  });
};

export const authenticationLogin = async ({ username, password }, next) => {
  const res = await API.post("/auth/login", {
    username,
    password,
  }).then((res) => {
    let token = res.data.results.data.token;
    let user = res.data.results.data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    next(user);
  });
};

export const registerUser = async (fields, next) => {
  await API.post("/auth/register", fields).then((response) => {
    next(response);
  });
};

///////////////////////////////////////////////////////////////////////////////////////

export const getUser = async (
  payload = { page: 1, limit: 10, search: "" },
  next
) => {
  // console.log(payload);
  const res = await API.get("/admin/user", {
    params: {
      page: payload.page,
      limit: payload.limit,
      search:
        isUndefined(payload.search) || isNull(payload.search)
          ? ""
          : payload?.search,
    },
  }).then((response) => next(response.data.results.data));
};
export const AddUser = async (input, next) => {
  const res = await API.post("/admin/user", input).then((response) => {
    next(response);
  });
};
export const EditUser = async (input, id, next) => {
  const res = await API({
    url: "/admin/user",
    method: "put",
    params: {
      id,
    },
    data: input,
  }).then((response) => {
    next(response);
  });
};

export const DeleteUser = async (id, next) => {
  const res = await API({
    url: "/admin/user",
    method: "delete",
    params: {
      id,
    },
  }).then((response) => {
    next(response);
  });
};

export const getRole = async (
  payload = { page: 1, limit: 10, search: "" },
  next
) => {
  const res = await API.get("/admin/role", {
    params: {
      page: payload.page,
      limit: payload.limit,
      search:
        isUndefined(payload.search) || isNull(payload.search)
          ? ""
          : payload?.search,
    },
  }).then((response) => next(response.data.results.data));
};

//========================================== API GET SPECIALIST ==============================

export const getSpecialist = async (params, next) => {
  // await API.get("/admin/specialist", {
  //   params,
  // }).then((response) => next(response.data.results.data));
  //////////////////////////////////////////////
  console.log(params, "params");
  const res = await API({
    url: "/admin/specialist",
    params,
  }).then((response) => next(response.data.results.data));
  // console.log(params);
};

export const getPublicSpecialist = async (next) => {
  const res = await API.get("/public/specialist", {
    params: {
      page: 1,
      limit: 10,
    },
  }).then((response) => next(response.data.results.data));
};

export const storeSpecialist = async (data, next) => {
  const res = await API({
    url: "/admin/specialist",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  }).then((response) => next(response.data));
};

export const updateSpecialist = async ({ formData, id }, next) => {
  const res = await API({
    url: "/admin/specialist",
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    params: {
      id: id,
    },
  }).then((response) => next(response.data));
};

export const destroySpecialist = async ({ id }, next) => {
  const res = await API({
    url: "/admin/specialist",
    method: "delete",
    params: {
      id: id,
    },
  }).then((response) => next(response.data));
};
