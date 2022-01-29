import { lazy } from "react";

const Home = lazy(() => import("./components/home/home"));
const FaceDetection = lazy(() =>
  import("./components/face-detection/face-detection")
);
const ImageDetection = lazy(() =>
  import("./components/image-detection/image-detection")
);
const SignDetection = lazy(() =>
  import("./components/sign-detection/sign-detection")
);

const routes = [
  {
    title: "Home",
    path: "/home",
    component: Home,
    exact: true,
  },
  {
    title: "FaceDetection",
    path: "/face-detection",
    component: FaceDetection,
    exact: true,
  },
  {
    title: "ImageDetection",
    path: "/image-detection",
    component: ImageDetection,
    exact: true,
  },
  {
    title: "SignDetection",
    path: "/sign-detection",
    component: SignDetection,
    exact: true,
  },
];

export default routes;
