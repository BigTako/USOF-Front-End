import { createContext, useCallback, useContext, useReducer } from 'react';

const PostsSelectContext = createContext();

const initialState = {
  fields: {},
  sort: 'createdAt',
  order: 'asc',
  limit: '5',
  page: '1',
};

function reducer(state, action) {
  switch (action.type) {
    case 'posts/newestFirst':
      return {
        ...state,
        sort: 'createdAt',
        order: 'desc',
      };
    case 'posts/oldestFirst':
      return {
        ...state,
        sort: 'createdAt',
        order: 'asc',
      };
    case 'posts/popularFirst':
      return {
        ...state,
        sort: 'likesCount',
        order: 'desc',
      };
    case 'posts/unpopularFirst':
      return {
        ...state,
        sort: 'likesCount',
        order: 'asc',
      };

    case 'posts/setCategories':
      return {
        ...state,
        fields: { ...state.fields, 'categories[cont]': action.payload },
      };
    case 'posts/setDateInterval':
      return {
        ...state,
        fields: { ...state.fields, dateInterval: action.payload },
      };
    case 'posts/clearDateInterval':
      return {
        ...state,
        fields: { ...state.fields, dateInterval: [] },
      };
    case 'posts/selectStatus':
      if (action.payload === 'all') {
        return;
      }
      return {
        ...state,
        fields: { ...state.fields, status: action.payload },
      };
    case 'posts/selecTitle':
      return {
        ...state,
        fields: { ...state.fields, title: action.payload },
      };
    case 'posts/increaseLimit':
      return {
        ...state,
        limit: Number(state.limit) + 5,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function PostsSelectProvider({ children }) {
  const [{ fields, sort, order, limit, page, dateInterval }, dispatch] =
    useReducer(reducer, initialState);

  function newestFirst() {
    dispatch({ type: 'posts/newestFirst' });
  }

  function oldestFirst() {
    dispatch({ type: 'posts/oldestFirst' });
  }

  function popularFirst() {
    dispatch({ type: 'posts/popularFirst' });
  }

  function unpopularFirst() {
    dispatch({ type: 'posts/unpopularFirst' });
  }

  function setCategories(categories) {
    dispatch({ type: 'posts/setCategories', payload: categories });
  }

  function setStatus(status) {
    dispatch({ type: 'posts/selectStatus', payload: status });
  }

  function setTitle(title) {
    dispatch({ type: 'posts/selecTitle', payload: title });
  }

  function setDateInterval(interval) {
    dispatch({ type: 'posts/setDateInterval', payload: interval });
  }

  function removeDateInterval(interval) {
    dispatch({ type: 'posts/removeDateInterval', payload: interval });
  }

  function increaseLimit() {
    dispatch({ type: 'posts/increaseLimit' });
  }

  return (
    <PostsSelectContext.Provider
      value={{
        setStatus,
        setTitle,
        setCategories,
        setDateInterval,
        dateInterval,
        removeDateInterval,
        newestFirst,
        oldestFirst,
        popularFirst,
        unpopularFirst,
        increaseLimit,
        fields,
        sort,
        order,
        limit,
        page,
      }}
    >
      {children}
    </PostsSelectContext.Provider>
  );
}

function usePostsSelector() {
  const context = useContext(PostsSelectContext);
  if (context === undefined)
    throw new Error('PostsSelectContext was used outside PostsSelectProvier');
  return context;
}

export { PostsSelectProvider, usePostsSelector };
