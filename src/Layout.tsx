import { Link, Outlet } from "react-router";
import MyLink from "./helpers/Link";

function Layout() {
  return (
    <main className="p-4">
      <nav className="flex hover:underline">
        <MyLink to="/">Home</MyLink>
      </nav>
      <Outlet />
    </main>
  );
}

export default Layout;
