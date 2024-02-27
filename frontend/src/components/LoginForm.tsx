import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { UserService } from "../services/user-service";
import { useState } from "react";

const schema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function Form() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    const userService = new UserService();
    try {
      await userService.userLogin(data);
      setSuccess(true);
      setError(false);
      setErrorMessage("");
    } catch (error: unknown) {
      setSuccess(false);
      setError(true);
      const err = error as Error;
      setErrorMessage(err.message || "An unexpected error occurred.");
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
      {success && <div>Registration successful!</div>}
      {error && <div>{errorMessage}</div>}
    </form>
  );
}
