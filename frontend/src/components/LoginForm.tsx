import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

const schema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await apiClient.post("/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Success: ", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response) {
        console.log("Axios Error: ", axiosError.response.data);
      } else {
        console.log("General error: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          //Simplifies boilerplate so I do not need to write
          //onChange, onBlur, name, ref, etc.
          {...register("email")}
          id="email"
          type="email"
          className="form-control"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="form-control"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
