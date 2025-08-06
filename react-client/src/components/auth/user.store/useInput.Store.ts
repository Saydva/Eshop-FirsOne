import { create } from "zustand";

type InputProps = {
  name: string;
  email: string;
  password: string;
};

type InputActions = {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  prefillValues: () => void;
  prefillValuesAdmin: () => void;
  resetValues: () => void;
};

export const useInputStore = create<InputProps & InputActions>((set) => ({
  name: "",
  email: "",
  password: "",
  setName: (name) => set(() => ({ name })),
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
  prefillValues: () =>
    set(() => ({
      name: "Test User",
      email: "test@gmail.com",
      password: "Test123",
    })),
  prefillValuesAdmin: () =>
    set(() => ({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "Admin123",
    })),
  resetValues: () => set(() => ({ name: "", email: "", password: "" })),
}));
