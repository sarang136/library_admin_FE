import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginAdminMutation,
  useSendOtpMutation,
} from "../../Redux/Api/AuthApi";

const LoginPage = () => {
  const navigate = useNavigate();

  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const otpInputRef = useRef(null); // optional autofocus

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [loginAdmin, { isLoading: loggingIn }] = useLoginAdminMutation();

  // Timer countdown for resend OTP
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Optional: autofocus OTP when sent
  useEffect(() => {
    if (isOtpSent && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [isOtpSent]);

  // Send OTP
  const handleSendOtp = async () => {
    setErrorMsg("");
    if (!contact) return setErrorMsg("Enter your mobile number");

    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      return setErrorMsg("Contact number must be exactly 10 digits");
    }

    try {
      await sendOtp({ contact }).unwrap();
      setIsOtpSent(true);
      setErrorMsg("");
      setResendTimer(30); // 30 seconds timer
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("Send OTP Failed:", err);
      if (err?.data?.message === "User not found") {
        setErrorMsg("Contact number is not registered");
      } else {
        setErrorMsg(err?.data?.message || "Failed to send OTP");
      }
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      await sendOtp({ contact }).unwrap();
      setErrorMsg("");
      setResendTimer(30);
      alert("OTP resent successfully!");
    } catch (err) {
      console.error("Resend OTP Failed:", err);
      setErrorMsg(err?.data?.message || "Failed to resend OTP");
    }
  };

  // Login with OTP
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!otp) return setErrorMsg("Enter OTP");
    if (otp.length !== 6) return setErrorMsg("OTP must be 6 digits");

    try {
      const res = await loginAdmin({ contact, otp }).unwrap();

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("admin", JSON.stringify(res.admin));
      }

      navigate("/");
    } catch (err) {
      console.error("Login Failed:", err);
      if (err?.data?.message === "Invalid OTP") {
        setErrorMsg("Invalid OTP. Please try again.");
      } else if (err?.data?.message === "User not found") {
        setErrorMsg("Contact number is not registered");
      } else {
        setErrorMsg(err?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen px-4 sm:px-8 flex items-center justify-center bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[90%] bg-[#0a57db] rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Illustration */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="/log.png"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-6 sm:p-10">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 sm:w-36 mx-auto mb-6 sm:mb-10 object-contain"
            />

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red-600 text-center mb-3 font-medium">
                {errorMsg}
              </p>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Contact input */}
              <input
                type="text"
                value={contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) setContact(value);
                }}
                placeholder="Enter Mobile Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />

              {/* OTP input */}
              {isOtpSent && (
                <>
                  <input
                    ref={otpInputRef}
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,6}$/.test(value)) setOtp(value);
                    }}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />

                  {/* Resend OTP */}
                  <div className="text-right text-sm mt-1">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0}
                      className={`text-blue-600 hover:underline ${
                        resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {resendTimer > 0
                        ? `Resend OTP in ${resendTimer}s`
                        : "Resend OTP"}
                    </button>
                  </div>
                </>
              )}

              {/* Buttons */}
              {!isOtpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition disabled:opacity-50"
                >
                  {sendingOtp ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loggingIn ? "Logging in..." : "Login"}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
