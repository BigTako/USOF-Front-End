import { Col, Container, Form, Row, Spinner, Stack } from 'react-bootstrap';
import {
  DarkGreyPillButton,
  TransparentPillButton,
} from '../../ui/PillButtons';
import { RadioContainer, RadioMenuOption } from '../../ui/RadioMenu';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../../ui/FormField';
import { FormSection, StateFormField } from '../../ui/Form';
import { useForgotPassword, useLogin, useSignup } from './useAuth';

function LoginForm() {
  const { login } = useLogin();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password }) {
    login(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  const defaultEmail = '';
  const defaultPassword = '';

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={5}>
        <FormField error={errors?.email?.message}>
          <StateFormField
            id={'email'}
            as="input"
            type={'text'}
            defaultValue={defaultEmail}
            placeholder={'email'}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
          />
        </FormField>
        <FormField error={errors?.password?.message}>
          <StateFormField
            id={'password'}
            as="input"
            type={'password'}
            defaultValue={defaultPassword}
            placeholder={'Password(8 characters minimum)'}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs to be at least 8 characters',
              },
            })}
          />
        </FormField>
        <DarkGreyPillButton as="button" type="submit">
          {"Let's go!"}
        </DarkGreyPillButton>
      </Stack>
    </Form>
  );
}

function ForgotPasswordForm() {
  // const { login } = useLogin();
  const { isLoading, handleForgotPassword } = useForgotPassword();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password }) {
    handleForgotPassword(email, {
      onSettled: () => reset(),
    });
  }
  const defaultEmail = 'maikie@gmail.com';

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={5}>
        <FormField error={errors?.email?.message}>
          <StateFormField
            id={'email'}
            as="input"
            type={'text'}
            defaultValue={defaultEmail}
            placeholder={'email'}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
          />
        </FormField>
        <DarkGreyPillButton as="button" type="submit">
          {isLoading ? <Spinner /> : "Let's go!"}
        </DarkGreyPillButton>
      </Stack>
    </Form>
  );
}

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { isLoading, signup } = useSignup();

  function handleFormSubmit({
    fullName,
    login,
    email,
    password,
    passwordConfirm,
  }) {
    signup(
      {
        fullName,
        login,
        email,
        password,
        passwordConfirm,
      },
      {
        onSettled: () => reset(),
      }
    );
  }

  const defaultFullName = '';
  const defaultLogin = '';
  const defaultEmail = '';
  const defaultPassword = '';
  const defaultPasswordConfirm = '';

  return (
    <FormSection
      onSubmit={handleSubmit(handleFormSubmit)}
      label={''}
      offset="0rem"
      disabled={isLoading}
    >
      <FormField error={errors?.fullName?.message}>
        <StateFormField
          as="input"
          type={'text'}
          placeholder="Full Name"
          id={'fullName'}
          defaultValue={defaultFullName}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormField>

      <FormField error={errors?.login?.message}>
        <StateFormField
          as="input"
          type={'text'}
          placeholder="Login"
          id={'login'}
          defaultValue={defaultLogin}
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
          id={'email'}
          defaultValue={defaultEmail}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormField>
      <FormField error={errors?.password?.message}>
        <StateFormField
          as="input"
          type={'password'}
          defaultValue={defaultPassword}
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
          defaultValue={defaultPasswordConfirm}
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

function AuthenticationForm() {
  const [loginFormType, setLoginFormType] = useState('login');

  const radioButtonStyles = {
    padding: '1.2rem 2.4rem',
  };

  return (
    <Container
      fluid="md"
      style={{
        textAlign: 'center',
        padding: '4rem 1rem',
      }}
    >
      <Row
        style={{
          justifyContent: 'center',
          fontSize: '1.6rem',
        }}
      >
        <Col sm={11} md={9}>
          <Stack gap={5}>
            <h2>
              <strong>{'Welcome, dear user!'}</strong>
            </h2>
            <RadioContainer columns={2}>
              <RadioMenuOption
                optionalStyles={radioButtonStyles}
                stateValue={loginFormType}
                setStateValue={setLoginFormType}
                value={'login'}
                text={'Login'}
              />
              <RadioMenuOption
                optionalStyles={radioButtonStyles}
                stateValue={loginFormType}
                setStateValue={setLoginFormType}
                value={'signup'}
                text={'Sign Up'}
              />
            </RadioContainer>
            <h4>
              {loginFormType === 'login' && 'Great to see you again!'}
              {loginFormType === 'signup' && 'Nice to meet you!'}
              {loginFormType === 'forgotPassword' &&
                'Enter email you have used to register'}
            </h4>
            {loginFormType === 'signup' && <SignupForm />}
            {loginFormType === 'login' && <LoginForm />}
            {loginFormType === 'forgotPassword' && <ForgotPasswordForm />}
            <TransparentPillButton
              as="button"
              style={{ textDecoration: 'underline' }}
              onClick={() =>
                setLoginFormType(
                  loginFormType === 'forgotPassword'
                    ? 'login'
                    : 'forgotPassword'
                )
              }
            >
              {loginFormType === 'forgotPassword'
                ? 'Back to login'
                : 'Forgot password?'}
            </TransparentPillButton>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthenticationForm;
