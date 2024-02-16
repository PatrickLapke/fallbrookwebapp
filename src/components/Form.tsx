import { useRef } from "react";

export default function Form() {
  //Working with useRef first. Not generally recommended to access the DOM directly.
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const user = { name: "", password: "" };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) {
      user.name = nameRef.current.value;
    }
    if (passwordRef.current !== null) {
      user.password = passwordRef.current.value;
    }
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input ref={nameRef} id="email" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
