import { FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import { LightGreyPillContaier } from './PillContainers';

const StyledSearchBar = styled(FormControl)`
  font-weight: bold;
  background-color: transparent;
  border: none;
  padding: 0.4rem 0.8rem;
  width: 100%;
`;

function SearchBar({ title, value, setValue, onSearch }) {
  return (
    <LightGreyPillContaier
      style={{
        justifyContent: 'start',
        padding: '0.4rem 0.8rem',
        minWidth: '90%',
      }}
    >
      <h3
        style={{
          padding: '0.4rem',
        }}
      >
        <button style={{ backgroundColor: 'transparent' }}>
          <BsSearch
            color="var(--color-grey-500)"
            onClick={onSearch}
            style={{ backgroundColor: 'transparent' }}
          />
        </button>
      </h3>
      <StyledSearchBar
        as="input"
        type="search"
        placeholder={title}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="me-2"
        aria-label="Search"
      />
    </LightGreyPillContaier>
  );
}

export default SearchBar;
