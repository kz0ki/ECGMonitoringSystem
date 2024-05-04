import "./App.css";
import React, { lazy, startTransition, Suspense } from "react";
import { Routes, Route } from "react-router";
import * as routes from "constants/routes";
import { BrowserRouter } from "react-router-dom";
import Loader from "components/Loader";
import Frame from "components/Frame";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/LogIn"));
const Patients = lazy(() => import("./pages/Patients"));
const Profile = lazy(() => import("./pages/Profile"));
const SignUp = lazy(() => import("./pages/SignUp"));
const App = () => {
  const APP_ROUTES = [
    {
      id: "1",
      path: routes.HOME,
      render: (props, user) => <Home {...props} {...user} />,
    },
    {
      id: "2",
      path: routes.LOGIN,
      render: (props, user) => <Login {...props} {...user} />,
    },
    {
      id: "3",
      path: routes.PATIENTS,
      render: (props, user) => <Patients {...props} {...user} />,
    },
    {
      id: "4",
      path: routes.PROFILE,
      render: (props, user) => <Profile {...props} {...user} />,
    },
    {
      id: "5",
      path: routes.SIGN_UP,
      render: (props, user) => <SignUp {...props} {...user} />,
    },
  ];

  return (
    <BrowserRouter>
      <Frame>
        {(user) => (
          <Suspense fallback={<Loader />}>
            <Routes>
              {APP_ROUTES.map((route) => (
                <Route
                  key={route.id}
                  exact
                  path={route.path}
                  element={route.render(user)}
                />
              ))}
            </Routes>
          </Suspense>
        )}
      </Frame>
    </BrowserRouter>
  );
};

export default App;
