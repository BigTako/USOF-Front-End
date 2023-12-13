import { useState } from 'react';
import { FormSection } from '../../ui/Form';
import FormField from '../../ui/FormField';
import TextEditor from '../../ui/TextEditor';

function CommentEntityForm({
  label,
  entity,
  entityId,
  offset = '2rem',
  onSubmit,
  handleSuccess,
  disabled,
}) {
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState({});

  function onClear() {
    setContent('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    if (content.length < 3 || content.length > 1024) {
      newErrors.content =
        'Content must be at least 3 and at most 1024 characters long';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(
        {
          entity,
          entity_id: entityId,
          status: 'active',
          content,
        },
        {
          onSettled: onClear,
        }
      );
    }
    handleSuccess?.();
  }

  return (
    <FormSection
      label={label}
      onSubmit={handleSubmit}
      onClear={onClear}
      offset={offset}
      disabled={disabled}
    >
      <FormField error={errors?.content}>
        <TextEditor
          content={content}
          onChangeContent={setContent}
          onClear={onClear}
          onSubmit={handleSubmit}
          fieldId={'content'}
          label={''}
          placeholder={'Write something...'}
          rows={5}
        />
      </FormField>
    </FormSection>
  );
}

export default CommentEntityForm;
