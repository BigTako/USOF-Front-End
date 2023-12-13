import { Stack } from 'react-bootstrap';
import {
  FileInputLabel,
  FormSection,
  RadioSection,
  StateFormField,
  StyledFileInput,
} from '../../ui/Form';
import CircleBackground from '../../ui/CircleBackground';
import Avatar from '../../ui/Avatar';
import { RadioContainer, RadioMenuOption } from '../../ui/RadioMenu';
import FormField from '../../ui/FormField';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function UserForm({
  user,
  selectPicture,
  selectRole,
  label,
  offset,
  disabled,
  onSubmit,
}) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture ?? ''
  );

  const [role, setRole] = useState(user?.role ?? 'user');

  function handleFormSubmit({
    fullName,
    login,
    email,
    password,
    passwordConfirm,
  }) {
    console.log(profilePicture);
    onSubmit(
      {
        profilePicture,
        fullName,
        login,
        email,
        role,
        password,
        passwordConfirm,
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <FormSection
      onSubmit={handleSubmit(handleFormSubmit)}
      label={label}
      onClear={() => {}}
      offset={offset}
      disabled={disabled}
    >
      {selectPicture && (
        <Stack direction="horizontal" gap={4}>
          <CircleBackground width="10rem" height="10rem">
            <Avatar
              src={user?.profilePicture ?? ''}
              height="100%"
              width="100%"
            />
          </CircleBackground>
          <StyledFileInput
            id={'profilePicture'}
            onChange={(e) => setProfilePicture(e.target.files[0])}
            as="input"
            accept="image/*"
            type="file"
          />
          <FileInputLabel htmlFor={'profilePicture'}>
            <strong>{'Choose file'}</strong>
          </FileInputLabel>
        </Stack>
      )}
      {selectRole && (
        <RadioSection title={'Role'}>
          <RadioContainer columns={2}>
            <RadioMenuOption
              value={'admin'}
              text={'admin'}
              stateValue={role}
              setStateValue={setRole}
            />
            <RadioMenuOption
              value={'user'}
              text={'user'}
              stateValue={role}
              setStateValue={setRole}
            />
          </RadioContainer>
        </RadioSection>
      )}
      <FormField error={errors?.fullName?.message}>
        <StateFormField
          as="input"
          type={'text'}
          placeholder="Full Name"
          defaultValue={user?.fullName ?? ''}
          disabled={disabled}
          id={'fullName'}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormField>

      <FormField error={errors?.login?.message}>
        <StateFormField
          as="input"
          type={'text'}
          placeholder="Login"
          defaultValue={user?.login ?? ''}
          disabled={disabled}
          id={'login'}
          {...register('login', {
            required: 'This field is required',
            minLength: { value: 3, message: 'Minimum lenght is 3' },
            maxLength: { value: 64, message: 'Maximum lenght is 64' },
          })}
        />
      </FormField>
      <FormField error={errors?.email?.message}>
        <StateFormField
          as="input"
          type={'text'}
          placeholder="Email"
          defaultValue={user?.email ?? ''}
          disabled={disabled}
          id={'email'}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormField>
      {!user && (
        <>
          <FormField error={errors?.password?.message}>
            <StateFormField
              as="input"
              type={'password'}
              placeholder={'Password(8 characters minimum)'}
              id={'password'}
              disabled={disabled}
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password needs to be at least 8 characters',
                },
              })}
            />
          </FormField>
          <FormField error={errors?.passwordConfirm?.message}>
            <StateFormField
              as="input"
              type={'password'}
              placeholder={'And password here once again'}
              id={'passwordConfirm'}
              disabled={disabled}
              {...register('passwordConfirm', {
                required: 'This field is required',
                validate: (value) =>
                  value === getValues().password || 'Passwords need to match',
              })}
            />
          </FormField>
        </>
      )}
    </FormSection>
  );
}

export default UserForm;
