import { Navigate, useNavigate } from "react-router-dom";
function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </button>
  );
}

export default BackButton;
