import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useModalContext } from '../../ui/ModalMenu';
import { useTooltipContext } from '../../ui/Tooltip';
import { useNavigate } from 'react-router-dom';

export function useAll(entityName, loadEntities, options) {
  const { isLoading, data, error } = useQuery({
    queryKey: [entityName, options],
    queryFn: () => loadEntities(options),
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, error, data };
}

export function useOne(id, entityName, loadEntities) {
  const { isLoading, data, error } = useQuery({
    queryKey: [entityName, id],
    queryFn: () => loadEntities(id),
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, error, data };
}

export function useCreateOne(
  entitiesName,
  createEntityApi,
  relocateToOnSuccess,
  invalidateQueries,
  raiseToast = true
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { close: closeModal } = useModalContext();

  const { close: closeTooltips } = useTooltipContext();
  const { mutate: createEntity, isLoading: isCreating } = useMutation({
    mutationFn: createEntityApi,
    onSuccess: () => {
      relocateToOnSuccess && navigate(relocateToOnSuccess);
      raiseToast && toast.success(`Success!`);
      queryClient.invalidateQueries(invalidateQueries);
      closeModal();
      closeTooltips();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, createEntity };
}

export function useUpdateOne(
  entitiesName,
  updateEntityApi,
  relocateToOnSuccess,
  invalidateQueries
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { close: closeModal } = useModalContext();
  const { close: closeTooltips } = useTooltipContext();
  const { mutate: updateEntity, isLoading: isUpdating } = useMutation({
    //createCanins data comes from mutate(data)
    mutationFn: ({ newData, id }) => updateEntityApi(newData, id),
    onSuccess: () => {
      relocateToOnSuccess && navigate(relocateToOnSuccess);
      toast.success(`Success!`);
      queryClient.invalidateQueries(invalidateQueries);
      closeModal();
      closeTooltips();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateEntity };
}

export function useDeleteOne(entityName, deleteEntityApi) {
  const queryClient = useQueryClient();

  const { close: closeModal } = useModalContext();
  const { close: closeTooltips } = useTooltipContext();

  const { mutate: deleteEntity, isLoading: isDeleting } = useMutation({
    mutationFn: deleteEntityApi,
    onSuccess: () => {
      toast.success(`Success!`);
      queryClient.invalidateQueries({ active: true });
      closeModal();
      closeTooltips();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteEntity };
}

export function useEntitySubentities(
  entityId,
  entity,
  subEntities,
  loadSubEntitiesApi,
  options
) {
  const { isLoading, data, error } = useQuery({
    queryKey: [subEntities, entity, entityId, options],
    queryFn: () => loadSubEntitiesApi(entityId, entity, options),
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isLoading, error, data };
}
