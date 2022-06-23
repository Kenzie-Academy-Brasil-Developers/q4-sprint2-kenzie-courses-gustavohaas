import supertest from "supertest";
import { Connection } from "..";
import app from "../../app";
import { User } from "../../entities";

describe("Create user route", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    await dbConnection.create();
  });

  afterAll(async () => {
    await dbConnection.clear();
    await dbConnection.close();
  });

  afterEach(async () => {
    await dbConnection.clear();
  });

  it("Return: User as JSON response and Status code: 201", async () => {
    const date = new Date()
    
    const user = {
        email: "teste@mail.com",
        firstName: "Teste",
        lastName: "Teste2",
        password: "123456",
        isAdm: false,
        createdAt: date,
        updatedAt: date
    };

    const response = await supertest(app)
      .post("/users")
      .send(user);

    console.log(response)

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toStrictEqual(user.email);
  });
});