import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <h1
        style={{
          fontSize: "var(--heading-size)",
          color: "#22223B",
          fontFamily: "var(--secondary-font)",
          margin: 0,
          padding: 0,
          fontWeight: 600,
        }}
        className="anix-fade-in-down"
      >
        👋 Welcome to JobBoardX
      </h1>
      <p
        style={{
          fontSize: "20px",
          color: "#22223B",
          fontFamily: "var(--primary-font)",
          marginTop: "70px",
          padding: 0,
          fontWeight: 500,
        }}
        className="anix-fade-in"
      >
        Your one-stop platform for hiring and finding jobs.
      </p>
      <div style={{ paddingTop: "20px", display: "flex", gap: "15px" }}>
        <button
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
