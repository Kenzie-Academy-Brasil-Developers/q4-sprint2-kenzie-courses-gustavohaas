import transport from "../config/mailer.config";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { Request } from "express";
import { Course, User } from "../entities";
import dotenv from "dotenv";

dotenv.config()

class mailService {
    sendEmail = (firstName: String, email, courseName: String) => {

        const handlebarOptions = {
            viewEngine: {
            partialsDir: path.resolve("./src/views/"),
            defaultLayout: undefined,
            },
            viewPath: path.resolve("./src/views/"),
        };

        transport.use("compile", hbs(handlebarOptions));

        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: "Confirmação de inscrição",
            template: "email",
            context: {
            name: firstName,
            company: courseName,
            },
        };
        transport.sendMail(mailOptions, (err) => {
			if (err) {
				return { status: 424, message: { error: "Email could not be sent." } };
			}
		});
    };
}
export default new mailService();