import {getProgress} from "@/actions/get-progress";

import {CourseWithProgressWithCategory} from "@/types";
import axios from "axios";

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
/*    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
                    contains: title,
                    mode: "insensitive",
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        purchases: {
          where: {
            userId,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });*/

    const response = await axios.get('http://localhost:8088/api/courses', {
      params: {
        isPublished: true,
        title,
        categoryId,
        userId,
      },
      headers: {
        'Authorization': `Bearer ${process.env.GEYSUKA}`
      }
    });

    const courses = response.data;

    return await Promise.all(
        courses.map(async (course: { purchases: string | any[]; id: string; }) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
    );
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}