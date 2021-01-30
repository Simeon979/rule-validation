const { constructSuccessResponse } = require("../lib/response");

const getProfile = (_req, res) => {
  const data = {
    name: "Simeon Adegbola",
    github: "@simeon979",
    email: "adegbolasimeon@gmail.com",
    mobile: "08107923001",
    twitter: "@simeon979"
  };

  const response = constructSuccessResponse("My Rule-Validation API", data);
  return res.status(200).json(response);
};

module.exports = { getProfile };
