import { useState } from 'react';
import {
  FormSection,
  RadioSection,
  SemiLightPillFormField,
} from '../../ui/Form';
import FormField from '../../ui/FormField';
import { RadioContainer, RadioMenuOption } from '../../ui/RadioMenu';
import TextEditor from '../../ui/TextEditor';
import CategorySearch from '../../ui/CategorySearch';
import { useCategories } from '../categories/useCategories';
import FullPageSpinner from '../../ui/FullPageSpinner';

function PostForm({ post, label, disabled, onSubmit }) {
  // const { close: closeModal } = useModalContext();
  const {
    title: postTitle,
    status: postStatus,
    categories: postCategories,
    content: postContent,
  } = post || {};

  const [title, setTitle] = useState(postTitle || '');
  const [status, setStatus] = useState(postStatus || 'active');
  const [categories, setCategories] = useState(postCategories || []);
  const [content, setContent] = useState(postContent || '');
  const [errors, setErrors] = useState({});

  const { isLoading: isLoadingCategories, data: dbCategories } =
    useCategories();

  if (isLoadingCategories) {
    return <FullPageSpinner />;
  }
  // const currentUser = tempCurrentUser;

  function onClear() {
    setTitle('');
    setCategories([]);
    setContent('');
  }

  const changeStatus = post ? setStatus : null;

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    if (title.length < 3 || title.length > 200) {
      newErrors.title =
        'Title must be at least 3 and at most 64 characters long';
    }

    if (categories.length === 0) {
      newErrors.categories = 'Select at least one category';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(
        {
          // author: post ? post.author : currentUser.id,
          title,
          status,
          categories,
          content,
        },
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
      <FormField id="title" error={errors?.title}>
        <SemiLightPillFormField
          placeholder={'Title'}
          value={title}
          setValue={setTitle}
          disabled={false}
        />
      </FormField>

      <RadioSection title={'Status'}>
        <RadioContainer columns={3}>
          <RadioMenuOption
            value={'active'}
            text={'Active'}
            stateValue={status}
            setStateValue={changeStatus}
          />
          <RadioMenuOption
            value={'unactive'}
            text={'Unactive'}
            stateValue={status}
            setStateValue={changeStatus}
          />
          <RadioMenuOption
            value={'locked'}
            text={'Locked'}
            stateValue={status}
            setStateValue={changeStatus}
          />
        </RadioContainer>
      </RadioSection>

      <FormField id="categories" error={errors?.categories}>
        <CategorySearch
          values={categories}
          onSelectValue={setCategories}
          categories={dbCategories}
          label="Select categories"
        />
      </FormField>
      <TextEditor
        content={content}
        onChangeContent={setContent}
        onClear={onClear}
        onSubmit={handleSubmit}
        fieldId={'content'}
        label={'Content'}
        placeholder={'Write something...'}
        rows={5}
      />
    </FormSection>
  );
}

export default PostForm;
