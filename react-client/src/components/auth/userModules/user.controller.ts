import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from "./user.service";
import { useUserStore } from "../user.store/useUser.store";

export const Logincontroller = async (email: string, password: string) => {
  const { setUser, setIsLoggedIn } = useUserStore.getState();

  try {
    const response = await loginService(email, password);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("token", response.user.accessToken);
    localStorage.setItem("refreshToken", response.user.refreshToken);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role,
      })
    );
    setIsLoggedIn(true);
    setUser({
      id: response.user.id,
      name: response.user.name,
      role: response.user.role,
    });
    return response;
  } catch (error: any) {
    throw new Error("Login failed: " + error.message);
  }
};

export const Registercontroller = async (
  name: string,
  email: string,
  password: string,
  role: string = "user"
) => {
  try {
    const response = await registerService(name, email, password, role);
    return response;
  } catch (error: any) {
    throw new Error("Registration failed: " + error.message);
  }
};

export const Refreshcontroller = async (refreshToken: string) => {
  try {
    const response = await refreshService(refreshToken);
    return response;
  } catch (error: any) {
    throw new Error("Refresh token failed: " + error.message);
  }
};

export const Logoutcontroller = async (userId: string) => {
  const { resetValues } = useUserStore.getState();

  try {
    const response = await logoutService(userId);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    resetValues();
    return response;
  } catch (error: any) {
    throw new Error("Logout failed: " + error.message);
  }
};
