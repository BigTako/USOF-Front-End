import { Outlet } from 'react-router-dom';
import MainNavBar from '../ui/MainNavBar';

function AppLayout() {
  return (
    <>
      <MainNavBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
