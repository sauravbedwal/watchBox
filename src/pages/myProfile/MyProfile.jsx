import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Avatar from "react-avatar";
import { FiEdit } from "react-icons/fi";
import MovieCard from "../../components/movieCard/MovieCard";
import useFetch from "../../hooks/useFetch";
import Similar from "../details/carousels/Similar";
import Recommendation from "../details/carousels/Recommendation";

const MyProfile = () => {
  const [background, setBackground] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { status } = useSelector((state) => state.auth);
  const array = JSON.parse(localStorage.getItem("watchListId"));
  const [storage, setStorage] = useState(null);

  // console.log("check", array);

  const existingUserDetails =
    JSON.parse(localStorage.getItem("userDetails")) || [];

  useEffect(() => {
    setStorage(existingUserDetails);
  }, []);

  useEffect(() => {
    const fetchBackground = async () => {
      const { data } = await useFetch("/movie/upcoming");
      const bg =
        url.backdrop +
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_pah;
      setBackground(bg);
    };

    fetchBackground();
  }, [url]);

  const random1 = Math.floor(Math.random() * array?.length);
  const random2 = Math.floor(Math.random() * array?.length);

  // const user = existingUserDetails;
  // console.log("user", user);
  // console.log("username", user?.data?.name);

  // console.log("storage", storage);

  const logoutHandler = () => {
    localStorage.setItem("userDetails", null);
    navigate("/");
  };

  return (
    <div className="detailsBanner">
      <div className="opacity-layer-subs"></div>
      <ContentWrapper>
        <div className="content">
          <div className="left">
            <Avatar
              name={storage?.data?.name || storage?.data?.user?.name}
              size="200"
              round={true}
              className="profileImg"
            />
          </div>
          <div className="right1">
            <div className="login-box">
              <form>
                <div className="user-box">
                  <input
                    type="text"
                    value={storage?.data?.name || storage?.data?.user?.name}
                    readOnly
                  />
                  <label>Name</label>
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    value={storage?.data?.email || storage?.data?.user?.email}
                    readOnly
                  />
                  <label>E-mail</label>
                </div>

                <div
                  className="user-box"
                  onClick={() => navigate(`/update-password`)}
                >
                  <input type="text" value="click here to update password" />
                  <label>
                    Update Password
                    <FiEdit className="labelIcon" />
                  </label>
                </div>
              </form>
            </div>
          </div>
          <button className="Btn" onClick={logoutHandler}>
            <div className="sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0-32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="text2">Logout</div>
          </button>
        </div>
        <div className="carouselTitle">Your Watchlist</div>
        <div className="content1">
          {array ? (
            array?.map((item) => (
              <MovieCard
                key={`${item?.mediaType}-${item?.id}`}
                data={useFetch(`/${item?.mediaType}/${item?.id}`)?.data}
                fromSearch={false}
                mediaType={item?.mediaType}
              />
            ))
          ) : (
            <h2>Watchlist is Empty!!!</h2>
          )}
        </div>
        {/* {array.map((card) => (
          <Similar
            key={`${card?.mediaType}-${card?.id}`}
            mediaType={card?.mediaType}
            id={card?.id}
          />
        ))}
        {array.map((card) => (
          <Recommendation
            key={`${card?.mediaType}-${card?.id}`}
            mediaType={card?.mediaType}
            id={card?.id}
          />
        ))} */}
        {/* 
        <Similar mediaType={array[0]?.mediaType} id={array[0]?.id} />
        <Recommendation mediaType={array[0]?.mediaType} id={array[0]?.id} /> */}
        {array && (
          <Similar
            mediaType={array[random1]?.mediaType}
            id={array[random1]?.id}
          />
        )}
        {array && (
          <Recommendation
            mediaType={array[random2]?.mediaType}
            id={array[random2]?.id}
          />
        )}
      </ContentWrapper>
    </div>
  );
};

export default MyProfile;