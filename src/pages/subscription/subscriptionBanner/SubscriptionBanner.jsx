import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const SubscriptionBanner = () => {
  const [background, setBackground] = useState("");

  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  // console.log("data", data);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);

    // console.log("bg", bg);
  }, [data]);

  // console.log("background", background);

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer-subscription"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Subscribe Now</span>
          <span className="subTitle">
            Watch the latest movies, TV shows, and award-winning Originals.
          </span>
          <div className="content">
            <div className="left">
              <div className="text">
                <div className="subtext">Movix Premium</div>
                <div className="subtext1">₹999/year</div>
              </div>
              <button
                class="Btn"
                onClick={() => {
                  console.log("payment successful");
                }}
              >
                Pay
                <svg class="svgIcon" viewBox="0 0 576 512">
                  <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                </svg>
              </button>
            </div>
            <div className="right">
              <div className="title">Perks of Premium</div>
              <ul>
                <div className="subtitle"></div>
                <li className="subtitle">Watch all you want. Ad-free.</li>
                <li className="subtitle">Highest video & audio quality</li>
                <li className="subtitle">Recommendations just for you.</li>
                <li className="subtitle">Cancel your plan anytime.</li>
                <li className="subtitle">Upto 4 devices simultaneously</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SubscriptionBanner;
