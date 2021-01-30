// Equals
const eq = (condition_value, field_value) => field_value === condition_value;

// Not Equals
const neq = (condition_value, field_value) => field_value !== condition_value;

// Greater than
const gt = (condition_value, field_value) => field_value > condition_value;

// Greater than or equals
const gte = (condition_value, field_value) => field_value >= condition_value;

// Only string or arrays can contain another value
const contains = (condition_value, field_value) => {
  if (typeof field_value.includes !== "function")
    throw new Error("field value type cannot contain another value");
  else return field_value.includes(condition_value);
};

module.exports = {
  eq,
  neq,
  gt,
  gte,
  contains
};
