import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useResetPassword } from '../features/auth/useAuth';
import { FormSection, StateFormField } from '../ui/Form';
import FormField from '../ui/FormField';
import { ModalMenu } from '../ui/ModalMenu';

function ResetPasswordForm(token) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  // const {}
  // const { signup } = useSignup();
  const { isReseting, resetPassword } = useResetPassword(token);

  function handleFormSubmit({ password, passwordConfirm }) {
    resetPassword(
      {
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
      label="Reset password"
      onSubmit={handleSubmit(handleFormSubmit)}
      disabled={isReseting}
    >
      <FormField error={errors?.password?.message}>
        <StateFormField
          as="input"
          type={'password'}
          placeholder={'Password(8 characters minimum)'}
          id={'password'}
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

function PasswordResetPage() {
  const { token } = useParams();

  return (
    <Container
      fluid="md"
      style={{
        textAlign: 'center',
        padding: '4rem 1rem',
        width: '40%',
      }}
    >
      <ModalMenu.Window opened={true} name={'reset-password-modal'}>
        <ResetPasswordForm token={token} />
      </ModalMenu.Window>
    </Container>
  );
}

export default PasswordResetPage;
