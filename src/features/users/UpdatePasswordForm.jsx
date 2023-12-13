import { useForm } from 'react-hook-form';
import { FormSection, StateFormField } from '../../ui/Form';
import FormField from '../../ui/FormField';

function UpdatePasswordForm({ onSubmit, disabled }) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function handleFormSubmit({ passwordCurrent, password, passwordConfirm }) {
    onSubmit(
      {
        passwordCurrent,
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
      label={'Update password'}
      disabled={disabled}
    >
      <FormField error={errors?.passwordCurrent?.message}>
        <StateFormField
          as="input"
          type={'password'}
          placeholder={'Current password'}
          id={'passwordCurrent'}
          // disabled={isLoading}
          {...register('passwordCurrent', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs to be at least 8 characters',
            },
          })}
        />
      </FormField>
      <FormField error={errors?.password?.message}>
        <StateFormField
          as="input"
          type={'password'}
          placeholder={'Password(8 characters minimum)'}
          id={'password'}
          // disabled={isLoading}
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
          // disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormField>
    </FormSection>
  );
}

export default UpdatePasswordForm;
