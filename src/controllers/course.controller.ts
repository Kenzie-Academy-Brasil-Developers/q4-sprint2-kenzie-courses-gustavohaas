import { Request, Response } from "express";
import { courseService } from "../services";
import AppDataSource from "../data-source"
import { Course, User } from "../entities";
import mailserService from "../services/mailser.service";

class CourseController {
  createCourse = async (req: Request, res: Response) => {
    const course = await courseService.createCourse(req);
    return res.status(201).json(course);
  };

  readAll = async (req: Request, res: Response) => {
    const courses = await courseService.readAllCourses(req);
    return res.status(200).json(courses);
  };

  updateCourse = async (req: Request, res: Response) => {
    const course = await courseService.updateCourse(req);
    return res.status(200).json(course);
  };

  addUserToCourse = async (req: Request, res: Response) => {
    const course = await courseService.addUserToCourse(req);

    const userRepository = AppDataSource.getRepository(User)
    const courseRepository = AppDataSource.getRepository(Course)

    const user = await userRepository.findOneBy({id: req.decoded.id})
    const selectedCourse = await courseRepository.findOneBy({id: req.params.id})

    if (course.status === 200) {
      mailserService.sendEmail(user.firstName, user.email, selectedCourse.courseName)
    }

    return res.status(200).json(course.message);
  };
}

export default new CourseController();
