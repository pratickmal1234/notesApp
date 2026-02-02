import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
// console.log(token);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8006/user/verify/${token}`
        );
        

        if (res.data.success) {
           localStorage.setItem("token", token);
          alert("Email verified successfully!");
          navigate("/login"); // ✅ login page
        }
      } catch (error) {
        alert("Verification failed or token expired");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-xl font-semibold">Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
