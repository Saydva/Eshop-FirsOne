import { useNavigate } from "react-router";

export const useNavigateTo = (path: string) => {
  const navigate = useNavigate();

  return () => {
    navigate(path);
  };
};
