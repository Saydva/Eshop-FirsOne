import { Sun } from "react-feather";

type HandleChange = {
  handler(): void;
};

const ChangeThemebutton = ({ handler }: HandleChange) => {
  return (
    <button className="btn btn-circle" onClick={handler}>
      <Sun />
    </button>
  );
};

export default ChangeThemebutton;
