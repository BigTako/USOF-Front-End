import StyledSelect from './StyledSelect';

function ArraySelect({
  options,
  value,
  setValue,
}) {
  return (
    <StyledSelect
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {Object.keys(options).map((key) => (
        <option key={key}>{options[key]}</option>
      ))}
    </StyledSelect>
  );
}

export default ArraySelect;
