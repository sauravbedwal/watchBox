import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import useFetch from "../../hooks/useFetch";
import logo from "../../assets/watchbox1.png";
import iconlogo from "../../assets/logoicon.png";
import { getError, login } from "../../store/authenticationSlice";

import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import Modal from "react-modal";

const LogIn = () => {
  const [background, setBackground] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  const { status } = useSelector((state) => state.auth);

  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    // console.log("bg", background);
  }, [data]);

  const loginHandler = () => {
    dispatch(login(email, password));

    // setOpen(true);
  };

  useEffect(() => {
    console.log("loginC", status);
    // console.log("token", status?.token);

    status && localStorage.setItem("userDetails", JSON.stringify(status));

    if (status.status === "success") {
      navigate("/");
    }
  }, [status]);

  const openModal = () => {
    // Function to open modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Function to close modal
    setIsModalOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      maxWidth: "400px",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#1E2A38", // You can change this color
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", // Box shadow for the modal
      color: "white", // Text color
      fontSize: "1.5rem",
      fontFamily: "Pacifico, cursive",
      border: "none",
      display: "flex", // Center contents horizontally
      flexDirection: "column",
      alignItems: "center", // Center contents vertically
      justifyContent: "center", // Center contents horizontally
      textAlign: "center", // Center text within the modal
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Text shadow
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Background color for the overlay
    },
  };

  useEffect(() => {
    error && openModal();
    dispatch(getError(null));
  }, [error]);

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer-subs"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <div
            className="logo myBounceDiv"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={iconlogo} alt="" />
            <img src={logo} alt="" />
          </div>
          <div className="form-box">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <span className="logtitle">Log in</span>
              <span className="logsubtitle">Log in to access your space</span>
              <div className="form-container">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={loginHandler}>Log in</button>
            </form>
            <div className="form-section">
              <p>
                New to Movix?{" "}
                <a
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Sign in
                </a>
              </p>
            </div>
            {/* <div>
              <Dialog open={open} onClose={handleClose}>
                <Box component="span" sx={{ p: 2 }} className="box_container">
                  <img
                    src="https://cdn.dribbble.com/users/2185205/screenshots/7886140/02-lottie-tick-01-instant-2.gif"
                    height="250"
                  />
                  <h1>Logged In successfully</h1>
                  <br />
                  <br />
                  <button
                    className="login_signinbutton"
                    onClick={() => {
                      handleClose();
                      navigate("/");
                    }}
                    autoFocus
                  >
                    Continue to Amazon
                  </button>
                </Box>
              </Dialog>
            </div> */}
          </div>
        </div>
      </ContentWrapper>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>Incorrect e-mail/password</h2>
        {/* <button className="hwe" onClick={closeModal}>
          Close Modal
        </button> */}
      </Modal>
    </div>
  );
};

export default LogIn;
