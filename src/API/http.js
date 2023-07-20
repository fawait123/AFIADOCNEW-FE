import API from ".";

export const publicDashboard = async (next) => {
  const res = await API.get("/public/specialist", {
    params: {
      page: 0,
      limit: 10,
    },
  }).then((response) => {
    next(response.data.results.data.rows);
  });
};
export const publicDashboardDoctor = async (next) => {
  const res = await API.get("/public/doctor", {
    params: {
      page: 0,
      limit: 10,
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
    localStorage.setItem("token", token);
    next();
  });
};

///////////////////////////////////////////////////////////////////////////////////////

export const getUser = async (next) => {
  const res = await API.get("/admin/user", {
    params: {
      page: 0,
      limit: 10,
    },
  }).then((response) => next(response.data.results.data));
};
export const AddUser = async (input, next) => {
  const res = await API.post("/admin/user", input).then((response) => {
    next(response);
  });
};

export const getRole = async (next) => {
  const res = await API.get("/admin/role", {
    params: {
      page: 0,
      limit: 10,
    },
  }).then((response) => next(response.data.results.data));
};
