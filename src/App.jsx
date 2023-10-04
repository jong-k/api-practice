import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Singleton from "../design-patterns/1-singleton/Singleton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/singleton",
    element: <Singleton />,
  },
]);

export default function App() {
  return (
    <>
      <div>
        <Link to="/singleton">
          <h2>1. 싱글턴 패턴</h2>
        </Link>
      </div>
    </>
  );
}
