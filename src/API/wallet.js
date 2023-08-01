import API from ".";

export const getWallet = async (next) => {
  await API.get("/admin/cashless").then((response) => {
    next(response.data.results.data);
  });
};

export const getHistory = async (next) => {
  await API.get("/admin/cashless/history").then((response) => {
    next(response.data.results.data);
  });
};

export const topUp = async ({ amount, bank }, next) => {
  await API.post("/admin/cashless/topup", {
    amount: amount,
    bank: bank,
  }).then((response) => {
    next(response.data);
  });
};
