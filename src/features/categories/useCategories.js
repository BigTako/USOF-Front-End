import {
  getCategories,
  getCategory,
  createCategory as createCategoryApi,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
} from '../../services/apiCategories';
import {
  useAll,
  useCreateOne,
  useDeleteOne,
  useOne,
  useUpdateOne,
} from '../factory/useFactory';

export const useCategories = (options) =>
  useAll('categories', getCategories, options);

export const useCategory = (id) => useOne(id, 'category', getCategory);

export const useCreateCategory = () =>
  useCreateOne('categories', createCategoryApi, '', {
    queryKey: ['categories'],
  });

export const useUpdateCategory = () =>
  useUpdateOne('categories', updateCategoryApi, '', { active: true });

export const useDeleteCategory = () =>
  useDeleteOne('Category', deleteCategoryApi);
