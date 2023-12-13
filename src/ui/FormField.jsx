import { Form } from 'react-bootstrap';
import styled from 'styled-components';

function FormField({ id, error, children }) {
  return (
    <Form.Group controlId={id}>
      <div>{children}</div>
      {error && (
        <Form.Text>
          <h5
            style={{
              color: 'var(--color-error)',
              padding: '1rem',
            }}
          >
            {error}
          </h5>
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default FormField;
