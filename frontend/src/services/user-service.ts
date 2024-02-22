import { AxiosError } from "axios";
import apiClient from "./api-client";
import { FieldValues } from "react-hook-form";

export class UserService {
  async registerNewUser(data: FieldValues) {
    try {
      const response = await apiClient.post("/users/register", data);
      console.log("Success: ", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response) {
        console.log("Axios Error: ", axiosError.response.data);
      } else {
        console.log("General error: ", error);
      }
    }
  }

  async userLogin(data: FieldValues) {
    try {
      const response = await apiClient.post("users/login", data);
      console.log("Login Success: ", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response) {
        console.log("Axios Error: ", axiosError.response.data);
      } else {
        console.log("General error: ", error);
      }
    }
  }
}
