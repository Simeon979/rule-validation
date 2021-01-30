const schema = require("../lib/requestSchema");
const {
  constructErrorResponse,
  missingDataFieldResponse
} = require("../lib/response");

module.exports = (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json(constructErrorResponse(error.details[0].message, null));

  // validate that data field contain the rule field
  const { rule, data } = value;
  if (data[rule.field] === undefined)
    return res
      .status(400)
      .json(constructErrorResponse(missingDataFieldResponse(rule.field), null));

  req.body = value;
  return next();
};
