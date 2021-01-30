const supertest = require("supertest");
const { app } = require("../../app");

describe("Rule Validator", () => {
  const request = supertest(app);
  const url = "/validate-rule";
  describe("Successful Validation", () => {
    test("gte", async () => {
      let res = await request.post(url).send({
        rule: { field: "missions", condition: "gte", condition_value: 30 },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: 45
        }
      });
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual(
        "field missions successfully validated."
      );
      expect(res.body.status).toEqual("success");
      expect(res.body.data.validation).toBeDefined();
      expect(res.body.data.validation.error).toBe(false);
      expect(res.body.data.validation.field).toEqual("missions");
      expect(res.body.data.validation.field_value).toEqual(45);
      expect(res.body.data.validation.condition).toEqual("gte");
      expect(res.body.data.validation.condition_value).toEqual(30);
    });
    test("contains", async () => {
      let res = await request.post(url).send({
        rule: {
          field: "5",
          condition: "contains",
          condition_value: "rocinante"
        },
        data: [
          "The Nauvoo",
          "The Razorback",
          "The Roci",
          "Tycho",
          "The expanse related",
          "The rocinante"
        ]
      });
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual("field 5 successfully validated.");
      expect(res.body.status).toEqual("success");
      expect(res.body.data.validation).toBeDefined();
      expect(res.body.data.validation.error).toBe(false);
      expect(res.body.data.validation.field).toEqual("5");
      expect(res.body.data.validation.field_value).toEqual("The rocinante");
      expect(res.body.data.validation.condition).toEqual("contains");
      expect(res.body.data.validation.condition_value).toEqual("rocinante");
    });
  });

  describe("Failed Validation", () => {
    test("eq", async () => {
      let res = await request.post(url).send({
        rule: { field: "0", condition: "eq", condition_value: "a" },
        data: "damien-marley"
      });
      expect(res.status).toEqual(400);
      expect(res.body.message).toEqual("field 0 failed validation.");
      expect(res.body.status).toEqual("error");
      expect(res.body.data.validation).toBeDefined();
      expect(res.body.data.validation.error).toBe(true);
      expect(res.body.data.validation.field).toEqual("0");
      expect(res.body.data.validation.field_value).toEqual("d");
      expect(res.body.data.validation.condition).toEqual("eq");
      expect(res.body.data.validation.condition_value).toEqual("a");
    });
  });
  test("Invalid contains", async () => {
    let res = await request.post(url).send({
      rule: { field: "missions", condition: "contains", condition_value: 30 },
      data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        missions: 45
      }
    });
    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual(
      "field value type cannot contain another value."
    );
    expect(res.body.status).toEqual("error");
    expect(res.body.data).toBe(null);
  });
});
