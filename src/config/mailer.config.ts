import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "23b5764e45b8b6",
      pass: "b2a03a1a02be89"
    }
});

export default transport