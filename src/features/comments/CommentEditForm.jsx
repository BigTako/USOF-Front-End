import { useState } from 'react';
import { FormSection, RadioSection } from '../../ui/Form';
import { RadioContainer, RadioMenuOption } from '../../ui/RadioMenu';

function CommentEditForm({
  label = 'Edit comment',
  comment,
  disabled,
  onSubmit,
}) {
  const [status, setStatus] = useState(comment.status || 'active');

  function onClear() {
    setStatus(comment.status);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(
      { status },
      {
        onSettled: onClear,
      }
    );
  }

  return (
    <FormSection
      label={label}
      onSubmit={handleSubmit}
      onClear={onClear}
      disabled={disabled}
    >
      <RadioSection title={'Status'}>
        <RadioContainer columns={3}>
          <RadioMenuOption
            value={'active'}
            text={'Active'}
            stateValue={status}
            setStateValue={setStatus}
          />
          <RadioMenuOption
            value={'unactive'}
            text={'Unactive'}
            stateValue={status}
            setStateValue={setStatus}
          />
          <RadioMenuOption
            value={'locked'}
            text={'Locked'}
            stateValue={status}
            setStateValue={setStatus}
          />
        </RadioContainer>
      </RadioSection>
    </FormSection>
  );
}

export default CommentEditForm;
