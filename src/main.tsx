import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Loader from "./helpers/Loader";

// import App from "./App.tsx";
// import MusicBox from "./Components/MusicBox.tsx";
// import Layout from "./Layout.tsx";

const Layout = lazy(() => import("./Layout"));

const App = lazy(() => import("./App"));
const MusicBox = lazy(() => import("./components/MusicBox"));
const StopWatch = lazy(() => import("./components/StopWatch"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/components",
    element: <Layout />,
    children: [
      {
        path: "music-box",
        element: <MusicBox />,
      },
      {
        path: "stop-watch",
        element: <StopWatch />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>,
);
