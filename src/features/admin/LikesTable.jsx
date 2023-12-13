import { useState } from 'react';
import {
  EntityTable,
  EntityView,
  FormModal,
  OpenModalFormButton,
} from './EntityTable';
import { RadioContainer, RadioMenuOption } from '../../ui/RadioMenu';

import FormField from '../../ui/FormField';
import {
  FormSection,
  RadioSection,
  SemiLightPillFormField,
} from '../../ui/Form';
import { useCreateLike, useDeleteLike, useUpdateLike } from '../likes/useLikes';

function LikeEditForm({ like, disabled, onSubmit }) {
  const [type, setType] = useState(like.type);

  function onClear() {
    setType(like.type);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(
      { type },
      {
        onSettled: onClear,
      }
    );
  }

  return (
    <FormSection
      label={'Edit like'}
      onSubmit={handleSubmit}
      onClear={onClear}
      disabled={disabled}
    >
      <RadioSection title={'Type'}>
        <RadioContainer columns={2}>
          <RadioMenuOption
            value={'like'}
            text={'Like'}
            stateValue={type}
            setStateValue={setType}
          />
          <RadioMenuOption
            value={'dislike'}
            text={'Dislike'}
            stateValue={type}
            setStateValue={setType}
          />
        </RadioContainer>
      </RadioSection>
    </FormSection>
  );
}

function LikeCreateForm({ onSubmit, disabled }) {
  const [type, setType] = useState('like');
  const [entity, setEntity] = useState('post');
  const [entityId, setEntityId] = useState(0);
  const [errors, setErrors] = useState({});

  function onClear() {
    setType('like');
    setEntityId('post');
    setEntityId(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newErrors = {};

    if (entityId < 1) {
      newErrors.entityId = 'Entity id must has to reference to real DB entity';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(
        { type, entity, entity_id: entityId },
        {
          onSettled: onClear,
        }
      );
    }
  }

  return (
    <FormSection
      label={'Create like'}
      onSubmit={handleSubmit}
      onClear={onClear}
      disabled={disabled}
    >
      <RadioSection title={'Type'}>
        <RadioContainer columns={2}>
          <RadioMenuOption
            value={'like'}
            text={'Like'}
            stateValue={type}
            setStateValue={setType}
          />
          <RadioMenuOption
            value={'dislike'}
            text={'Dislike'}
            stateValue={type}
            setStateValue={setType}
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
    </FormSection>
  );
}

const headers = [
  '',
  'Author',
  'Type',
  'Entity',
  'Created At',
  <OpenModalFormButton key={`create-like-open`} formName={'create-like'} />,
];

function LikesTable({ entities }) {
  const { isCreating, createEntity: createLike } = useCreateLike();
  const { isDeleting, deleteEntity: deleteLike } = useDeleteLike();
  const { isUpdating, updateEntity: updateLike } = useUpdateLike();

  return (
    <>
      <FormModal name={`create-like`}>
        <LikeCreateForm onSubmit={createLike} disabled={isCreating} />
      </FormModal>
      <EntityTable
        entityName={'like'}
        entities={entities}
        headers={headers}
        onDelete={deleteLike}
        render={(like) => {
          const { id, authorInfo, type, entity, createdAt, entity_id } =
            like || {};
          return (
            <>
              <div>
                <strong>{id}</strong>
              </div>
              <div>{authorInfo.login}</div>
              <div>{type}</div>
              <div>
                <EntityView entity={entity} id={entity_id} />
              </div>
              <div>{new Date(createdAt).toLocaleString()}</div>
              <FormModal name={`edit-like-${id}`}>
                <LikeEditForm
                  like={like}
                  onSubmit={(data) => updateLike({ newData: data, id })}
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

export default LikesTable;
