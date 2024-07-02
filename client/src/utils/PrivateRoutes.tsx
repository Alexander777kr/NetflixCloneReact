import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const PrivateRoutes = () => {
  const { user, isLoading } = useAppSelector((state) => state.user.value);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
