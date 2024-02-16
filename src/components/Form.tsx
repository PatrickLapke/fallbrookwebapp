import { useState } from "react";

export default function Form() {
  //Requires onChange to be used in input fields.
  //State is updated after every letter type or deletion.
  //Single source of truth by using the value attribute in HTML Input fields.
  //Need to set onChange and Value attribute of every Input field.
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          value={user.email}
          id="email"
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          value={user.password}
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
