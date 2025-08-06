import { useNavigateTo } from "../../../utils/navigate";
import { useInputStore } from "../user.store/useInput.Store";
import { Registercontroller } from "../userModules/user.controller";

const Register = () => {
  const { name, email, password, setName, setEmail, setPassword, resetValues } =
    useInputStore();
  const navigateToLogin = useNavigateTo("/Login");
  return (
    <form
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          await Registercontroller(name, email, password);
          navigateToLogin;
          resetValues();
          alert("Registration successful! Please log in.");
        } catch (error: any) {
          alert(
            "Registration failed: try to use other name or email, or leave as message: "
          );
        }
      }}
    >
      <div className="flex flex-col items-center justify-center  bg-base-100">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Register page</legend>
          <label htmlFor="name" className="label">
            User name
          </label>
          <label className="input validator">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              required
              placeholder="name"
              title="enter a valid name"
            />
          </label>

          <label htmlFor="email" className="label">
            Your email
          </label>
          <label className="input validator">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              required
              placeholder="email"
              title="enter a valid email"
            />
          </label>

          <label htmlFor="password" className="label">
            Password
          </label>
          <label className="input validator">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              type="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
        </fieldset>
        <div className="flex justify-center mt-4">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
