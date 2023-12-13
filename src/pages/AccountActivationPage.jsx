import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import API_URL from '../services/api.config';
import FullPageSpinner from '../ui/FullPageSpinner';

function AccountActivationPage() {
  const { token } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function activateAccount() {
      if (!token) {
        throw new Error('No token provided');
      }
      let res = await fetch(`${API_URL}auth/activation/${token}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      console.log(data);
      console.log('Data', data);
      if (data.status === 'success') {
        queryClient.setQueryData(['currentUser'], data.user); // manually set some data to query cache
        document.cookie =
          'jwt=' + data.token + '; path=/; secure; samesite=strict';
        queryClient.invalidateQueries({ active: true });
        toast.success('Successfully activated account!');
      } else {
        toast.error(data.message);
      }
      navigate('/posts', { replace: true });
    }
    activateAccount();
  }, [token, queryClient, navigate]);
  return <FullPageSpinner />;
}

export default AccountActivationPage;
