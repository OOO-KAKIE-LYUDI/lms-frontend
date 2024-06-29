"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({
  initialData,
  courseId
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
/*      await axios.patch(`http://localhost:8088/api/courses/${courseId}`, values, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJzLmJvc292MjAxMkB5YW5kZXgucnUiLCJleHAiOjE3MjMxOTU5MDQsInVzZXJJZCI6MSwiaWF0IjoxNzE5NTk1OTA0LCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU5JU1RSQVRPUiJ9XX0.EQSYvmGnIfQvpoaJtwaJxFSECDDzM5ZJyCQSZHAI2I4EYRiSG5gL6YHW5dtk_s7TpBNdwfE2s_AToklOy32lTiSaB5wzTzo5UdplV2Ae4vzd74i28cPYKjfwmK3wP9DF_TN91mPv-NPnYp1eiFA10J42n7iEchbZh1nLNMtRLLMahCIp3CzIPAUO7_0QQ6z7VJy3WK9qypByKMp30BGyextQkH4j5lRxfzemvEQjhmq8yLhKZSbaQ7BQn8bjLCY1lvgEiJ88Wtl5FsVQCPxvxTkeGdVP0VLb7oVqQSBsMw5T8Np7iZi5IuoWt7XF4dmloFKpikNWzYC32D6xu84ynA`

        }
      });*/
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Обновлено название курса");
      toggleEdit();
      router.refresh();
    } catch (error : any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(`Server responded with ${error.response.status} error`);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from server!");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error(`Error: ${error.message}`);
        }
      }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Название курса
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Отмена</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Редактировать название
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2 dark:text-gray-300">
          {initialData?.title}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 dark:text-gray-300"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Например, 'Продвинутая веб-разработка'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}