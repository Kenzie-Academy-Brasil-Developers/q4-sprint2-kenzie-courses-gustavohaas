import supertest from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";

describe("Create user route", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  it("Return: User as JSON response and Status code: 201", async () => {

    const user = {
      email: "teste@mail.com",
      firstName: "Teste",
      lastName: "Teste2",
      password: "123456"
    };

    const response = await supertest(app).post("/users").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toStrictEqual(user.email);
  });

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy();
  });
});