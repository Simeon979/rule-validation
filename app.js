const express = require("express");
const { getProfile } = require("./controllers/profile");
const { validate } = require("./controllers/validation");
const validateRequest = require("./middlewares/validateFields");
const { constructErrorResponse, invalidJSON } = require("./lib/response");

const app = express();

app.use(express.json());

app.get("/", getProfile);
app.post("/validate-rule", validateRequest, validate);

app.use((_req, res) =>
  res
    .status(404)
    .json(constructErrorResponse("the requested route was not found", null))
);

app.use((err, _req, res, _next) => {
  console.log(Object.entries(err));
  if (err.type === "entity.parse.failed") {
    return res.status(400).json(constructErrorResponse(invalidJSON, null));
  }

  return res
    .status(500)
    .json(
      constructErrorResponse("An error occured processing your request", null)
    );
});

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "test")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

module.exports = {
  app
};
