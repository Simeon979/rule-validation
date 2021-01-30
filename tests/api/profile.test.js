const supertest = require("supertest");
const { app } = require("../../app");

describe("Profile", () => {
  const request = supertest(app);
  const url = "/";

  test("Returns profile in valid form", async () => {
    let res = await request.get(url);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.message).toEqual("My Rule-Validation API");
    expect(res.body.data).not.toBe(null);
    expect(res.body.data.name).toEqual("Simeon Adegbola");
    expect(res.body.data.github).toEqual("@simeon979");
    expect(res.body.data.email).toEqual("adegbolasimeon@gmail.com");
    expect(res.body.data.mobile).toEqual("08107923001");
    expect(res.body.data.twitter).toEqual("@simeon979");
  });
});
