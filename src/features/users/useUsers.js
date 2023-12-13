import {
  getUser,
  getUsers,
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
  updateCurrentUserInfo as updateCurrentUserInfoApi,
  updateCurrentUserPassword as updateCurrentUserPasswordApi,
  getUserRating as getUserRatingApi,
  deactivateCurrentUser,
} from '../../services/apiUsers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useModalContext } from '../../ui/ModalMenu';
import {
  useAll,
  useOne,
  useDeleteOne,
  useCreateOne,
  useUpdateOne,
} from '../factory/useFactory';

export const useUsers = (options) => useAll('users', getUsers, options);

export const useUser = (id) => useOne(id, 'user', getUser);

export const useCreateUser = () =>
  useCreateOne('users', createUserApi, '', { active: true });

export const useUpdateUser = () =>
  useUpdateOne('users', updateUserApi, '', { queryKey: ['currentUser'] });

export const useUpdateCurrentUserInfo = () =>
  useUpdateOne('currentUser', updateCurrentUserInfoApi);

export const useUpdateCurrentUserPassword = () =>
  useUpdateOne('currentUser', updateCurrentUserPasswordApi);

export const useDeleteUser = () => useDeleteOne('User', deleteUserApi);

export function useDeleteCurrentUser() {
  const queryClient = useQueryClient();
  const { close: closeModal } = useModalContext();
  const { mutate: deleteCurrentUser, isLoading: isDeleting } = useMutation({
    mutationFn: deactivateCurrentUser,
    onSuccess: () => {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success('Account successfully deactivated');
      queryClient.invalidateQueries({ active: true });
      closeModal();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteCurrentUser };
}

export const useUserRating = (id) => useOne(id, 'userRating', getUserRatingApi);
