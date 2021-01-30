const {
  validationSuccessResponse,
  constructErrorResponse,
  missingDataFieldResponse,
  validationFailureResponse
} = require("../lib/response");

const rules = require("../lib/ruleValidator");

const validate = (req, res) => {
  try {
    const { rule, data } = req.body;
    const condition_value = rule.condition_value;
    const field_value = data[rule.field];
    if (field_value === undefined)
      return res
        .status(400)
        .json(
          constructErrorResponse(missingDataFieldResponse(rule.field), null)
        );

    let validator = rules[rule.condition];
    if (!validator)
      return res
        .status(400)
        .json(
          constructErrorResponse(
            `no validator defined for rule condition: ${rule.condition}.`,
            null
          )
        );

    const isValid = validator(condition_value, field_value);
    const resData = {
      field: rule.field,
      field_value,
      condition: rule.condition,
      condition_value
    };
    if (isValid)
      return res.status(200).json(validationSuccessResponse(resData));
    else return res.status(400).json(validationFailureResponse(resData));
  } catch (error) {
    return res.status(400).json(constructErrorResponse(error.message, null));
  }
};

module.exports = { validate };
