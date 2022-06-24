import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { userService } from "../../services";

describe("List user route", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy();
  });

  it("Return: List of users as JSON response and Status code: 200", async () => {

    const userList = await userService.getAll()

    expect(userList).toHaveProperty("map");
  });
});