import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/uncontrolled-form">Uncontrolled form</NavLink>
        <NavLink to="/rhf">React Hook Form</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
