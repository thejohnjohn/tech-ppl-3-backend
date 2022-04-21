const request = require("supertest");
import app from "../../../src/config/server/server";

describe("API", () => {
  it("Get clients.", (done) => {
    request(app)
      .get("/v1/clients")
      .expect("Content-type", "application/json; charset=utf-8")
      .expect((res: any) => {
        expect(res.statusCode).toBe(200);
      })
      .end(done);
  });

  it("Get one client", (done) => {
    request(app)
      .get("/v1/clients/1")
      .expect("Content-type", "application/json; charset=utf-8")
      .expect((res: any) => {
        expect(res.body.client_id).toBe(1);
        expect(res.body.clientName).toBe("John");
      })
      .end(done);
  });
});
