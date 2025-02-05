import { getProgress } from "@/actions/get-progress";
import { CourseWithProgressWithCategory } from "@/types";
import axios from "axios";
import { db } from "@/lib/db";

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
    const courses = await db.course.findMany({
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
    });

    return await Promise.all(
        courses.map(async (course) => {
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
