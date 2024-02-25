"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/store/hooks";
import { setDeleteEntry } from "@/store/personSlice";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateEntry from "@/components/UpdateEntry";
export type Person = {
  _id?: string;
  serial?: string;
  name: string;
  phone: string;
  email: string;
  hobbies?: string;
  isSaved?: boolean;
};
export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line
      const dispatch = useAppDispatch();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "serial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "hobbies",
    header: "Hobbies",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line
      const dispatch = useAppDispatch();
      // eslint-disable-next-line
      const [showUpdateDialog, setShowUpdateDialog] = useState(false);
      // eslint-disable-next-line
      const [fieldToUpdate, setFieldToUpdate] = useState("");

      const handleUpdateClick = (fieldName: string) => {
        setFieldToUpdate(fieldName);
        setShowUpdateDialog(true);
      };

      const renderUpdateEntryDialog = () => {
        if (showUpdateDialog && fieldToUpdate) {
          return (
            <UpdateEntry
              row={row.original}
              name={fieldToUpdate}
              onClose={() => setShowUpdateDialog(false)}
            />
          );
        }
        return null;
      };

      return (
        <span className="flex flex-row gap-1">
          <UpdateEntry row={row.original} />
          <Button
            onClick={() =>
              row.original._id && dispatch(setDeleteEntry(row.original._id))
            }
          >
            <Trash />
          </Button>
        </span>
      );
    },
  },
];
