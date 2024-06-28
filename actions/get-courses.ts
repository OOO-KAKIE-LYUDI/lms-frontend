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
        'Authorization': `Bearer eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJzLmJvc292MjAxMkB5YW5kZXgucnUiLCJleHAiOjE3MTk1ODIyODQsImlhdCI6MTcxOTU3ODY4NCwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV19.DJejmdLScaftw0kQ_VdJ5WSquzrPoVkh9NDgup8CfV_HRH3fLbz4rmn3PcmAVfw_4qDkmiDljPbS_b__RHC25dHd25A8c55O5MmO70CJjLEJx3GpPB2TtgxaaCL_-EfzUzylFkXz6TUyuz3dbtAn52pFZ2f_lwwIhptse5yQ7r8f2TrpzoSoNaxeLiBqSuM-iFcNxSUdoH4bVd2-3VUQrIA6OGtRRHZ0GT5Qr3QYrr3_fqaWiwsKg8Vm8JjZ22MljeZDMIAIZd-oJS0hoRWFqx6hx85xO6KOQ9Dk4DHihmgNWdaYMYCKRYWDeAR4SqdY0gdzpKcAwMk7IE4S-mfM5Q`
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