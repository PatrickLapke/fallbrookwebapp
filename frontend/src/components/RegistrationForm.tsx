import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { UserService } from "../services/user-service";

const schema = z
  .object({
    fullName: z.string().min(1, "Full name is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(5, "Password must be at least 5 characters long."),
    confirmPassword: z.string().min(5, "Passwords must match."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
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
      await userService.registerNewUser(data);
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
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("fullName")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.fullName && (
          <p className="text-danger">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="text"
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

      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          className="form-control"
        />
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button className="btn btn-primary" type="submit">
        Register
      </button>
      {success && <div>Registration successful!</div>}
      {error && <div>{errorMessage}</div>}
    </form>
  );
}
