import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  let location = useLocation();
  // const [user, setUser] = useState(null);

  const existingUserDetails =
    JSON.parse(localStorage.getItem("userDetails")) || [];

  // useEffect(() => {
  //   setUser(existingUserDetails);
  // }, [existingUserDetails]);

  console.log("abc", status, existingUserDetails);
  if (
    status?.status !== "success" &&
    existingUserDetails?.status !== "success"
  ) {
    // console.log(" access to the protected route");
    // console.log(status?.status);

    return <Navigate to="/log-in" state={{ from: location }} replace />;
  } else {
    // console.log("Allowing access to the protected route");

    return children;
  }
};

export default ProtectedRoute;
