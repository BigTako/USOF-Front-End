import { Form, Spinner, Stack } from 'react-bootstrap';
import FormField from './FormField';
import { SemiLightGreyPillContaier } from './PillContainers';
import { DarkGreyPillButton, LightGreyPillButton } from './PillButtons';
import styled from 'styled-components';

export function FormInput({
  fieldId,
  type = 'text',
  optinalStyles,
  error,
  placeholder,
}) {
  return (
    <FormField id={fieldId} error={error}>
      <SemiLightGreyPillContaier
        as="input"
        type={type}
        placeholder={placeholder}
        id={fieldId}
        style={{
          minWidth: '100%',
          fontSize: 'inherit',
          ...optinalStyles,
        }}
      />
    </FormField>
  );
}

export const StateFormField = styled(SemiLightGreyPillContaier)`
  min-width: 100%;
  font-size: inherit;
`;

export function SemiLightPillFormField({
  id,
  error,
  value,
  placeholder,
  setValue,
  disabled,
}) {
  return (
    <FormField id={id} error={error}>
      <SemiLightGreyPillContaier
        as="input"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        style={{
          minWidth: '100%',
          fontSize: 'inherit',
        }}
      />
    </FormField>
  );
}
export const StyledFileInput = styled.input.attrs({
  type: 'file',
})`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 1rem 0;
  color: var(--color-grey-950);
  border-bottom: 1px solid var(--color-grey-950);
  cursor: pointer;
`;

export function RadioSection({ title, children }) {
  return (
    <Stack
      direction="horizontal"
      style={{
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <h4>
        <strong>{title}</strong>
      </h4>
      <Form.Group>{children}</Form.Group>
    </Stack>
  );
}

export function FormSection({
  label,
  onSubmit,
  onClear,
  offset = '2rem',
  disabled,
  children,
}) {
  return (
    <Form onSubmit={onSubmit} style={{ minWidth: '100%' }}>
      <Stack gap={4} style={{ padding: offset }}>
        <h3>
          <strong>{label}</strong>
        </h3>
        {children}
        <Stack
          direction="horizontal"
          gap={4}
          style={{ justifyContent: 'flex-end' }}
        >
          <LightGreyPillButton
            as="button"
            onClick={onClear}
            disabled={disabled}
          >
            reset
          </LightGreyPillButton>
          <DarkGreyPillButton as="button" type="submit" onClick={onSubmit}>
            {disabled ? <Spinner /> : 'submit'}
          </DarkGreyPillButton>
        </Stack>
      </Stack>
    </Form>
  );
}
