import { useAuthStore } from "../../pages/store/useAuthStore";
import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from "./user.service";

export const Logincontroller = async (email: string, password: string) => {
  const { setIsLoggedIn, setUser, setAccessToken, setRefreshToken } =
    useAuthStore.getState();
  try {
    const response = await loginService(email, password);

    setIsLoggedIn(true);
    setUser({
      id: response.user.id,
      name: response.user.name,
      role: response.user.role,
    });
    setAccessToken(response.user.accessToken);
    setRefreshToken(response.user.refreshToken);

    console.log("Login successful:", response);
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

    console.log("Registration successful:", response);
    return response;
  } catch (error: any) {
    console.log("Registration failed:", error);
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
  const { resetValues } = useAuthStore.getState();

  try {
    const response = await logoutService(userId);

    await useAuthStore.persist.clearStorage();

    resetValues();

    return response;
  } catch (error: any) {
    throw new Error("Logout failed: " + error.message);
  }
};
