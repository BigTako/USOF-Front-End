import { useState } from 'react';
import {
  EntityTable,
  EntityView,
  LimitedText,
  FormModal,
  StatusView,
  OpenModalFormButton,
} from './EntityTable';
import { RadioContainer, RadioMenuOption } from '../../ui/RadioMenu';
import FormField from '../../ui/FormField';
import TextEditor from '../../ui/TextEditor';
import {
  FormSection,
  RadioSection,
  SemiLightPillFormField,
} from '../../ui/Form';
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from '../comments/useComments';
import CommentEditForm from '../comments/CommentEditForm';

function CommentCreateForm({ disabled, onSubmit }) {
  const [status, setStatus] = useState('active');
  const [entity, setEntity] = useState('post');
  const [entityId, setEntityId] = useState(0);
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState({});

  function onClear() {
    setStatus('active');
    setEntity('post');
    setContent('');
    setEntityId(0);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    if (content.length < 3 || content.length > 1024) {
      newErrors.content =
        'Content must be at least 3 and at most 1024 characters long';
    }

    if (entityId < 1) {
      newErrors.entityId = 'Entity id must has to reference to real DB entity';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(
        {
          entity,
          entity_id: entityId,
          status,
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
      label="Create comment"
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

      <RadioSection title={'Entity'}>
        <RadioContainer columns={2}>
          <RadioMenuOption
            value={'post'}
            text={'Post'}
            stateValue={entity}
            setStateValue={setEntity}
          />
          <RadioMenuOption
            value={'comment'}
            text={'Comment'}
            stateValue={entity}
            setStateValue={setEntity}
          />
        </RadioContainer>
      </RadioSection>

      <FormField error={errors?.entityId}>
        <SemiLightPillFormField
          placeholder={'Entity id'}
          value={entityId}
          setValue={setEntityId}
          type={'number'}
          disabled={false}
        />
      </FormField>

      <FormField error={errors?.content}>
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
      </FormField>
    </FormSection>
  );
}

const headers = [
  '',
  'Published',
  'Status',
  'Content',
  'Entity',
  'Likes',
  'Dislikes',
  'Comments',
  <OpenModalFormButton
    key={`create-comment-open`}
    formName={'create-comment'}
  />,
];

function CommentsTable({ comments }) {
  const { isCreating, createEntity: createComment } = useCreateComment();
  const { isDeleting, deleteEntity: deleteComment } = useDeleteComment();
  const { isUpdating, updateEntity: updateComment } = useUpdateComment();
  return (
    <>
      <FormModal name={'create-comment'}>
        <CommentCreateForm onSubmit={createComment} disabled={isCreating} />
      </FormModal>
      <EntityTable
        entityName={'comment'}
        entities={comments}
        headers={headers}
        onDelete={deleteComment}
        render={(comment) => {
          const {
            id,
            createdAt,
            status,
            content,
            entity,
            entity_id,
            likesCount,
            dislikesCount,
            commentsCount,
          } = comment;
          return (
            <>
              <div>
                <strong>{id}</strong>
              </div>
              <div>{new Date(createdAt).toLocaleString()}</div>
              <div>
                <StatusView status={status} />
              </div>
              <div>
                <LimitedText>{content}</LimitedText>
              </div>
              <div>
                <EntityView entity={entity} id={entity_id} />
              </div>
              <div>{likesCount}</div>
              <div>{dislikesCount}</div>
              <div>{commentsCount}</div>
              <FormModal name={`edit-comment-${id}`}>
                <CommentEditForm
                  comment={comment}
                  onSubmit={(data) => updateComment({ newData: data, id })}
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

export default CommentsTable;
