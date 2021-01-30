const Joi = require("joi");
const {
  missingRequestFieldResponse,
  wrongRequestFieldTypeResponse,
  wrongDataTypeResponse
} = require("./response");

const schema = Joi.object({
  rule: Joi.object({
    field: Joi.string()
      .required()
      .messages({
        "any.required": missingRequestFieldResponse("field"),
        "string.base": wrongRequestFieldTypeResponse("field", "string")
      }),
    condition: Joi.string()
      .required()
      .messages({
        "any.required": missingRequestFieldResponse("condition"),
        "string.base": wrongRequestFieldTypeResponse("condition", "string")
      }),
    condition_value: Joi.required().messages({
      "any.required": missingRequestFieldResponse("condition_value")
    })
  })
    .required()
    .messages({
      "any.required": missingRequestFieldResponse("rule"),
      "object.base": wrongRequestFieldTypeResponse("rule", "object")
    }),

  data: Joi.alternatives()
    .try(Joi.string(), Joi.object(), Joi.array())
    .required()
    .messages({
      "any.required": missingRequestFieldResponse("data"),
      "alternatives.types": wrongDataTypeResponse
    })
});

module.exports = schema;
