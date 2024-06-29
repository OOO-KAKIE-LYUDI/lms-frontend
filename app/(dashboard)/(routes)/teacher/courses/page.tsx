import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import axios from "axios";

const CoursesPage = async () => {

    const userId = auth();

    if (!userId) {
        return redirect("/");
    }

    // Remove the getToken property from the userId object.
    const { getToken, ...userIdWithoutToken } = userId;

    const courses = await db.course.findMany({
        where: {
            // @ts-ignore
            userId: userIdWithoutToken.userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

/*    const response = await axios.get(`http://localhost:8088/api/courses/user/1`, {
        headers: {
            'Authorization': `Bearer ${process.env.GEYSUKA}`
        }
    });

    const courses = response.data;*/

    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursesPage;