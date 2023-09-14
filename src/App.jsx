import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useDispatch, useSelector } from "react-redux";

import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";
import Layout from "./Layout";
import LogIn from "./pages/authentication/LogIn";
import SignIn from "./pages/authentication/SignIn";
import MyProfile from "./pages/myProfile/MyProfile";
import PrivacyTerms from "./pages/footerItems/PrivacyTerms";
import UpdatePassword from "./pages/authentication/UpdatePassword";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/profile/Profile";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  // console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((response) => {
      // console.log("app", response); //api call data

      const url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // console.log(allGenres);

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/:mediaType/:id"
          element={
            <Layout>
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/search/:query"
          element={
            <Layout>
              <SearchResult />
            </Layout>
          }
        />
        <Route
          path="/explore/:mediaType"
          element={
            <Layout>
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/subscription"
          element={
            <Layout>
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/my-profile"
          element={
            <Layout>
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/privacy-terms"
          element={
            <Layout>
              <PrivacyTerms />
            </Layout>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Layout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
