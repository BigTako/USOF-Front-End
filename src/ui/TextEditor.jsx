import { Form, Stack } from 'react-bootstrap';

import styled from 'styled-components';

const StyledTextEditorForm = styled.div`
  padding-top: 1rem;

  form {
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
  }

  footer {
    padding: 0.4rem 0.8rem;
  }
`;

const StyledTextEditorTextArea = styled(Form.Control)`
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  width: 100%;
  border: 1px solid var(--color-grey-200);
`;

function TextEditor({
  fieldId,
  label,
  placeholder,
  content,
  onChangeContent,
  rows = 3,
}) {
  return (
    <StyledTextEditorForm>
      <Stack gap={2}>
        <header>
          <h4>
            <strong>{label}</strong>
          </h4>
        </header>
        <main>
          <StyledTextEditorTextArea
            as="textarea"
            rows={rows}
            placeholder={placeholder}
            id={fieldId}
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
          />
        </main>
      </Stack>
    </StyledTextEditorForm>
  );
}

export default TextEditor;
