import { Link } from "react-router-dom";
import CardComponent from "../../../components/card";

const LinkWithDisabledOption = ({ option, disabled = false }) => {
  return (
    <CardComponent
      className="card mt-1 bg-secondary text-light offset-2 col-8"
      key={option.mode}
    >
      {(!disabled && (
        <Link
          to={`/duels/${option.mode}`}
          title="Editar"
          className="text-light text-center"
        >
          <div className="vinyl">{option.name}</div>
        </Link>
      )) || (
        <div className="text-light text-center vinyl strike">{option.name}</div>
      )}
    </CardComponent>
  );
};

export default LinkWithDisabledOption;
