import { Stack } from 'react-bootstrap';
import { SemiLightGreyPillButton } from './PillButtons';
import SearchBar from './SearchBar';
import TagsContainer from './TagsContainer';
import { useState } from 'react';

function CategorySearch({
  categories,
  values,
  onSelectValue,
  maxHeight = '16rem',
  label = 'What are you interested in?',
}) {
  const [searchedCategory, setSearchedCategory] = useState('');

  const filteredCategoiries =
    searchedCategory === ''
      ? categories
      : categories.filter((category) => category.title === searchedCategory);

  return (
    <Stack direction="vertical" gap={4}>
      <h4>
        <strong>{label}</strong>
      </h4>
      <SearchBar
        title="Search"
        value={searchedCategory}
        setValue={setSearchedCategory}
      />
      <TagsContainer maxHeight={maxHeight}>
        {filteredCategoiries?.map((category, i) => {
          const includes = values?.includes(category.id);

          return (
            <SemiLightGreyPillButton
              className={`${values?.includes(category.id) ? 'active' : ''}`}
              as="a"
              key={i}
              style={{
                padding: '0.8rem 1.2rem',
              }}
              onClick={() =>
                includes
                  ? onSelectValue(
                      values.filter((value) => value !== category.id)
                    )
                  : onSelectValue([...values, category.id])
              }
            >
              <option value={category.title}>{category.title}</option>
            </SemiLightGreyPillButton>
          );
        })}
      </TagsContainer>
    </Stack>
  );
}

export default CategorySearch;
