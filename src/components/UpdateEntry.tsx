"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { updatePersonSchema } from "@/lib/validations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAddEntry, setUpdateData } from "@/store/personSlice";
type Person = z.infer<typeof updatePersonSchema>;

export default function UpdateEntry({ row }: any) {
  const dispatch = useAppDispatch();
  const form = useForm<Person>({
    resolver: zodResolver(updatePersonSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      hobbies: "",
      isSaved: false,
      updateSaved: false,
    },
  });
  const [open, setOpen] = useState(false);
  function onSubmit(values: any) {
    const { name, email, phone, hobbies } = values;
    const fieldsToUpdate: { fieldname: string; value: any }[] = [];

    if (name !== null && name !== "") {
      fieldsToUpdate.push({ fieldname: "name", value: name });
    }
    if (email !== null && email !== "") {
      fieldsToUpdate.push({ fieldname: "email", value: email });
    }
    if (phone !== null && phone !== "") {
      fieldsToUpdate.push({ fieldname: "phone", value: phone });
    }
    if (hobbies !== null && hobbies !== "") {
      fieldsToUpdate.push({ fieldname: "hobbies", value: hobbies });
    }

    fieldsToUpdate.forEach(({ fieldname, value }) => {
      dispatch(setUpdateData({ fieldname, value, _id: row._id }));
    });

    setOpen(false);
  }
  console.log;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          Update Entry
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-[400px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Update Details</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hobbies"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Hobbies" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              {"Add Entry"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
