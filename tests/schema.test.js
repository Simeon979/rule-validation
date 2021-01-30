const schema = require("../lib/requestSchema");

describe("Request Schema Validator", () => {
  test("successfully validate valid request", () => {
    const validRequest = {
      rule: { field: "missions", condition: "gte", condition_value: 30 },
      data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        missions: 45
      }
    };
    const { value, error } = schema.validate(validRequest);
    expect(value).toEqual(validRequest);
    expect(error).not.toBeDefined();
  });
  describe("returns correct error for invalid request", () => {
    test("missing rule", () => {
      const request = {
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: 45
        }
      };
      const { error } = schema.validate(request);
      expect(error.details[0].message).toEqual("rule is required.");
    });
    test("wrong rule type", () => {
      const request = {
        rule: null
      };

      const { error } = schema.validate(request);
      expect(error.details[0].message).toEqual("rule should be an object.");
    });

    test("wrong rule field type", () => {
      const request = {
        rule: { field: null }
      };
      const { error } = schema.validate(request);
      expect(error.details[0].message).toEqual(
        "rule.field should be a string."
      );
    });
    test("missing rule condition", () => {
      const request = {
        rule: {
          condition: "eq",
          condition_value: "a"
        },
        data: "damien-marley"
      };
      const { error } = schema.validate(request);
      expect(error.details[0].message).toEqual("condition is required.");
    });
    test("wrong data type", () => {
      const request = {
        rule: { field: "missions", condition: "gte", condition_value: 30 },
        data: null
      };
      const { error } = schema.validate(request);
      expect(error.details[0].message).toEqual(
        "data should be either an object, an array or a string."
      );
    });
  });
});
