import axios from "axios";
import { Person } from "./validations";
import { PersonArray } from "@/store/personSlice";
import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: "https://plankton-app-9curw.ondigitalocean.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/tables");
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching data:");
    console.error("Error fetching data:", error);
    return null;
  }
};

export const postData = async (data: Person[]) => {
  try {
    const response = await axiosInstance.post("/api/v1/tables", data);
    return response.data;
  } catch (error) {
    toast.error("Error posting data:");
    console.error("Error posting data:", error);
    return null;
  }
};

export const deleteData = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/tables/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error deleting data:");
    console.error(error);
    return null;
  }
};

export const sendMail = async (data: any) => {
  try {
    const response = await axiosInstance.post("/api/v1/tables/mail", data);
    return response.data;
  } catch (error) {
    toast.error("Error sending mail:");
    console.error("Error sending mail:", error);
    return null;
  }
};
export const updateData = async (_id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/api/v1/tables/${_id}`, data);
    return response.data;
  } catch (error) {
    toast.error("Error updating data:");
    console.error("Error updating data:", error);
    return null;
  }
};
