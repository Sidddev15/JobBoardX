import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import './LandingPage.css';

const RedirectLanding = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  return null;
};

export default RedirectLanding;
