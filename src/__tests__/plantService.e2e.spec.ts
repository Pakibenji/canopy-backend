import request from "supertest";
import app from "../app";

describe("E2E tests plantController", () => {
  it("should get all plants", async () => {
    const response = await request(app).get("/api/plants");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
