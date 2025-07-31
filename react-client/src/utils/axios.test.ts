import { useAxios } from "./api.axios";

type User = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: User) => {
  const { api, setAuthToken } = useAxios("auth");
  try {
    const response = await api.post("login", { email, password });
    setAuthToken(response.data.user.accessToken);
    return response.data;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as any).response?.status === 401
    ) {
      throw new Error("Invalid email or password");
    }
    throw error; // rethrow other errors
  }
};
