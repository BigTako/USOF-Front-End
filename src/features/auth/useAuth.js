import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  handleForgotPassword as handleForgotPasswordApi,
  resetPassword as resetPasswordApi,
} from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useModalContext } from '../../ui/ModalMenu';
import { useTooltipContext } from '../../ui/Tooltip';

export function useLogin() {
  const queryClient = useQueryClient();

  const { close: closeTooltips } = useTooltipContext();
  const { close } = useModalContext();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      console.log('Data after login', data);
      document.cookie = `jwt=${data.token}; SameSite=Lax; Secure`;

      queryClient.setQueryData(['currentUser'], data.doc);
      queryClient.invalidateQueries({ active: true });

      closeTooltips();
      close();
      toast.success('Welcome back!');
    },
    onError: (err) => {
      close();
      toast.error('Provided email or password are incorrect', err);
    },
  });
  return { login, isLoading };
}

export function useLogout() {
  const { close: closeTooltips } = useTooltipContext();

  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // document.cookie = `jwt=${''}; SameSite=Lax; Secure`;
      toast.success('You have been logged out');
      queryClient.setQueryData(['currentUser'], null);
      queryClient.invalidateQueries({ active: true });
      closeTooltips();
    },
  });
  return { logout, isLoading };
}

export function useSignup() {
  const { close: closeModals } = useModalContext();
  const { close: closeTooltips } = useTooltipContext();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
      closeModals();
      closeTooltips();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}

export function useCurrentUser() {
  // get current user and store it in cache
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  // const user = currentUser?.user;
  return { isLoading, error, user };
}

export function useForgotPassword() {
  const { close: closeModals } = useModalContext();
  const queryClient = useQueryClient();
  const { mutate: handleForgotPassword, isLoading } = useMutation({
    mutationFn: handleForgotPasswordApi,
    onSuccess: () => {
      // document.cookie = `jwt=${''}; SameSite=Lax; Secure`;
      closeModals();
      toast.success(
        'Success! Please check your email for further instructions'
      );
    },
  });

  return { isLoading, handleForgotPassword };
}

export function useResetPassword(token) {
  const queryClient = useQueryClient();

  const { close: closeTooltips } = useTooltipContext();
  const { close } = useModalContext();
  const navigate = useNavigate();
  const { mutate: resetPassword, isReseting } = useMutation({
    mutationFn: ({ password, passwordConfirm }) =>
      resetPasswordApi(token, password, passwordConfirm),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user);
      queryClient.invalidateQueries({ active: true });

      closeTooltips();
      close();
      navigate('/posts');
      toast.success('Welcome back!');
      document.cookie = `jwt=${data.token}; SameSite=Lax; Secure; path=/;`;
    },
    onError: (err) => {
      close();
      toast.error('Something went wrong while reseting password', err);
    },
  });
  return { isReseting, resetPassword };
}
