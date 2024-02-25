import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postData, getData, deleteData, updateData } from "@/lib/api";
import { toast } from "react-toastify";
export interface PersonArray {
  _id?: string;
  serial?: string;
  name: string;
  phone: string;
  email: string;
  hobbies?: string;
  isSaved?: boolean;
  updateSaved?: boolean;
}
interface InitialState {
  personData: PersonArray[];
}

const initialState: InitialState = {
  personData: [] as PersonArray[],
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPersonData: (state, action: PayloadAction<PersonArray[]>) => {
      state.personData = action.payload;
    },
    setAddEntry: (state, action: PayloadAction<PersonArray>) => {
      state.personData.push(action.payload);
      toast.success("Entry added successfully");
    },
    setDeleteEntry: (state, action: PayloadAction<string>) => {
      state.personData = state.personData.filter(
        (item) => item._id !== action.payload
      );
      deleteData(action.payload).then((response) => {
        if (response) {
          toast.success("Entry deleted successfully");
        }
      });
    },
    setSaveData: (state) => {
      state.personData.forEach((item) => {
        if (!item.isSaved) {
          const data = {
            name: item.name,
            phone: item.phone,
            email: item.email,
            hobbies: item.hobbies,
          };
          //@ts-ignore
          postData(data).then((response) => {
            if (response) {
              toast.success("Data saved successfully");
            }
          });
          item.isSaved = true; // Update isSaved for the current item
        }
      });
    },
    setUpdateSerial: (state) => {
      state.personData.forEach((person: PersonArray, index: number) => {
        if (!person.serial) {
          person.serial = (index + 1).toString();
        }
      });
    },
    setUpdateData: (state, action) => {
      const fieldName = action.payload.fieldname;
      const _id = action.payload._id;
      const value = action.payload.value;

      state.personData = state.personData.map((person) => {
        //  Check if the person has the provided _id
        //   Create a new object to avoid mutating the original state
        //   Update the specified field with the provided value
        //   If the person doesn't match the _id, return it unchanged

        if (person._id === _id) {
          return {
            ...person,
            [fieldName]: value,
          };
        }
        return person;
      });
      state.personData.forEach((item) => {
        if (item._id === _id) {
          if (!item.updateSaved) {
            const data = {
              name: item.name,
              phone: item.phone,
              email: item.email,
              hobbies: item.hobbies,
            };
            updateData(_id, data).then((response) => {
              if (response) {
                toast.success("Data updated successfully");
              }
            });
            item.updateSaved = true;
          }
        }
      });
    },
  },
});

export const {
  setAddEntry,
  setDeleteEntry,
  setSaveData,
  setPersonData,
  setUpdateSerial,
  setUpdateData,
} = personSlice.actions;

export default personSlice.reducer;
