import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Loader from "./helpers/Loader";

const Layout = lazy(() => import("./Layout"));

const App = lazy(() => import("./App"));
const MusicBox = lazy(() => import("./components/MusicBox"));
const StopWatch = lazy(() => import("./components/StopWatch"));
const DebouncedSearch = lazy(() => import("./components/DebouncedSearch"));
const CustomDropdown = lazy(() => import("./components/CustomDropdown"));
const AutoCarousel = lazy(() => import("./components/AutoCarousel"));

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
      {
        path: "debounced-search",
        element: <DebouncedSearch />,
      },
      {
        path: "custom-dropdown",
        element: <CustomDropdown />,
      },
      {
        path: "auto-carousel",
        element: <AutoCarousel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>,
);
