const constructSuccessResponse = (message, data) => ({
  message,
  status: "success",
  data
});

const validationSuccessResponse = ({
  field,
  field_value,
  condition,
  condition_value
}) =>
  constructSuccessResponse(`field ${field} successfully validated.`, {
    validation: {
      error: false,
      field,
      field_value,
      condition,
      condition_value
    }
  });

const constructErrorResponse = (message, data = null) => ({
  message,
  status: "error",
  data
});

const missingRequestFieldResponse = field => `${field} is required.`;

const vowels = ["a", "e", "i", "o", "u"];

const wrongRequestFieldTypeResponse = (field, type) =>
  `${field} should be ${vowels.includes(type[0]) ? "an" : "a"} ${type}.`;

const wrongDataTypeResponse =
  "data should be either an object, an array or a string.";

const missingDataFieldResponse = field =>
  `field ${field} is missing from data.`;

const invalidJSON = "Invalid JSON payload passed.";

const validationFailureResponse = ({
  field,
  field_value,
  condition,
  condition_value
}) =>
  constructErrorResponse(`field ${field} failed validation.`, {
    validation: {
      error: true,
      field,
      field_value,
      condition,
      condition_value
    }
  });

module.exports = {
  constructSuccessResponse,
  validationSuccessResponse,
  constructErrorResponse,
  missingRequestFieldResponse,
  wrongRequestFieldTypeResponse,
  wrongDataTypeResponse,
  missingDataFieldResponse,
  validationFailureResponse,
  invalidJSON
};
