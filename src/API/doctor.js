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
