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

/*    const courses = await db.course.findMany({
        where: {
            // @ts-ignore
            userId: userIdWithoutToken.userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });*/

    const response = await axios.get(`http://localhost:8088/api/courses/user/${userIdWithoutToken.userId}`, {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJzLmJvc292MjAxMkB5YW5kZXgucnUiLCJleHAiOjE3MTk1ODUzNDIsImlhdCI6MTcxOTU4MTc0MiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlVTRVIifV19.5rlBbACyODAGAzxO0MprlnHyT_VDvwrG51JtzuQ9rSORODHh128hv5mloYaR1TXH39OEDxJg4CjWPkguZ8um8mncSkyeq0l0Z3ZMZPnN8V34mwK-qUnefO-9-m8mwSPMfwG04TP_J0tKi3XycQAmMIsrDnSW2-mR5inrTlRxJ-X5ON8h4ProD85qh-zG8m5Ik73ml3HMoYKjVhZC4SdW8IXPntjJgqFCrfxXRwyljBPU7tKT7ZO2MZ3OVLs_oz6fR5VQE_Faqrb91Jf59w3TXAEiw_-RIk-udDuAXqbTwuv3Mw-qzv5YTiPIkAQgISsCULNSzkGkG2qOkcmCwswCZw`
        }
    });

    const courses = response.data;

    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursesPage;