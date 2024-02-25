"use client";
import { use, useEffect, useState } from "react";
import { columns } from "../components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import AddEntry from "@/components/AddEntry";
import { postData, getData, deleteData } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Loader2 } from "lucide-react";
import {
  setUpdateSerial,
  setSaveData,
  setPersonData,
} from "@/store/personSlice";
// import DeleteEntry from "@/components/DeleteEntry"; // Import the DeleteEntry component

function Page() {
  const dispatch = useAppDispatch();
  const personData = useAppSelector((state) => state.person.personData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (!data) {
        return;
      }
      const formattedData = data?.map((item: any) => {
        return {
          _id: item._id,
          name: item.name,
          phone: item.phone,
          email: item.email,
          hobbies: item.hobbies,
          isSaved: true,
        };
      });
      if (formattedData) {
        dispatch(setPersonData(formattedData));
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (personData.length > 0) {
      dispatch(setUpdateSerial());
    }
  }, [dispatch, personData]);
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columns} data={personData} />

      <span className="flex flex-row gap-1">
        {/* Pass addEntry function to AddEntry component */}
        <AddEntry />

        <Button onClick={() => dispatch(setSaveData())}>Save</Button>
      </span>
    </div>
  );
}

export default Page;
