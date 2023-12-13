import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../features/auth/useAuth';
import FullPageSpinner from './FullPageSpinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ restrictedTo, children }) {
  const navigate = useNavigate();
  //1. Load authenticated user
  const { isLoading, user } = useCurrentUser();
  //3 If there is No authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !user) {
        toast.error('You need to be logged in to access this page');
        navigate('/');
      } else if (user && !restrictedTo.includes(user.role)) {
        toast.error('You are not allowed to access this page');
        navigate('/');
      }
    },
    [user, isLoading, navigate]
  );
  //2. While loading , show a spinner
  if (isLoading) return <FullPageSpinner />;
  // 4 if there is a user, render the app
  if (user) return children;
}

export default ProtectedRoute;
