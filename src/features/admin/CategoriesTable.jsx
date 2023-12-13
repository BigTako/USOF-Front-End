import { useState } from 'react';
import {
  EntityTable,
  LimitedText,
  FormModal,
  OpenModalFormButton,
} from './EntityTable';
import { FormSection, SemiLightPillFormField } from '../../ui/Form';
import TextEditor from '../../ui/TextEditor';

import FormField from '../../ui/FormField';
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '../categories/useCategories';

function CategoryForm({ category, label, disabled, onSubmit }) {
  const { title: categoryTitle, description: categoryDescription } =
    category || {};

  const [title, setTitle] = useState(categoryTitle || '');
  const [description, setDescription] = useState(categoryDescription || '');
  const [errors, setErrors] = useState({});

  function onClear() {
    setTitle('');
    setDescription('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newErrors = {};

    if (title.length < 3 || title.length > 128) {
      newErrors.title =
        'Title must be at least 3 and at most 128 characters long';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(
        { title, description },
        {
          onSettled: onClear,
        }
      );
    }
  }
  return (
    <FormSection
      label={label}
      onSubmit={handleSubmit}
      onClear={onClear}
      disabled={disabled}
    >
      <FormField error={errors?.title}>
        <SemiLightPillFormField
          id="title"
          placeholder={'Title'}
          value={title}
          setValue={setTitle}
          disabled={disabled}
        />
      </FormField>
      <TextEditor
        content={description}
        onChangeContent={setDescription}
        onClear={onClear}
        onSubmit={handleSubmit}
        fieldId={'description'}
        label={'Description'}
        placeholder={'Write something...'}
        rows={5}
      />
    </FormSection>
  );
}

const headers = [
  '',
  'Title',
  'Description',
  'Created At',
  <OpenModalFormButton
    key={`create-category-open`}
    formName={'create-category'}
  />,
];

function CategoriesTable({ entities }) {
  const { isCreating, createEntity: createCategory } = useCreateCategory();
  const { isDeleting, deleteEntity: deleteCategory } = useDeleteCategory();
  const { isUpdating, updateEntity: updateCategory } = useUpdateCategory();
  return (
    <>
      <FormModal name={'create-category'}>
        <CategoryForm
          label="Create category"
          onSubmit={createCategory}
          disabled={isCreating}
        />
      </FormModal>
      <EntityTable
        entityName={'category'}
        entities={entities}
        headers={headers}
        onDelete={deleteCategory}
        render={(category) => {
          const { id, title, description, createdAt } = category || {};
          return (
            <>
              <div>
                <strong>{id || '-'}</strong>
              </div>
              <div>{title || '-'}</div>
              <div>
                <LimitedText>{description}</LimitedText>
              </div>
              <div>{new Date(createdAt).toLocaleString()}</div>
              <FormModal name={`edit-category-${id}`}>
                <CategoryForm
                  category={category}
                  label="Edit category"
                  onSubmit={(data) => updateCategory({ newData: data, id })}
                  disabled={isUpdating}
                />
              </FormModal>
            </>
          );
        }}
      />
    </>
  );
}

export default CategoriesTable;
