import { useInputStore } from "./useAuthInput.Store";
import { useNavigateTo } from "../../utils/navigate";
import { Logincontroller } from "./user.controller";

const Login = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    resetValues,
    prefillValues,
    prefillValuesAdmin,
  } = useInputStore();
  const navigateToHome = useNavigateTo("/");
  return (
    <form
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          await Logincontroller(email, password);
          resetValues();
          alert("Login successful!");
          navigateToHome();
        } catch (error: any) {
          alert(
            "Login failed: please control your credentials, or leave as a message "
          );
        }
      }}
    >
      <div className="flex flex-col items-center justify-center  bg-base-100">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login page</legend>

          <label htmlFor="email" className="label">
            Your email
          </label>
          <label className="input validator">
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              id="password"
              type="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
        </fieldset>
        <div className="flex justify-between mt-4">
          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <button
            className="btn ml-2"
            type="button"
            onClick={() => prefillValues()}
          >
            preffil
          </button>
          <button
            className="btn ml-2"
            type="button"
            onClick={() => prefillValuesAdmin()}
          >
            Admin
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
