import { createContext, useCallback, useContext, useReducer } from 'react';

const CommentsSelectContext = createContext();

const initialState = {
  fields: {},
  sort: 'createdAt',
  order: 'asc',
  limit: '20',
  page: '1',
};

function reducer(state, action) {
  switch (action.type) {
    case 'comments/newestFirst':
      return {
        ...state,
        sort: 'createdAt',
        order: 'desc',
      };
    case 'comments/oldestFirst':
      return {
        ...state,
        sort: 'createdAt',
        order: 'asc',
      };
    case 'comments/popularFirst':
      return {
        ...state,
        sort: 'likesCount',
        order: 'desc',
      };
    case 'comments/unpopularFirst':
      return {
        ...state,
        sort: 'likesCount',
        order: 'asc',
      };
    case 'comments/selectStatus':
      if (action.payload === 'all') {
        return;
      }
      return {
        ...state,
        fields: { ...state.fields, status: action.payload },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CommentsSelectProvider({ children }) {
  const [{ fields, sort, order, limit, page }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function newestFirst() {
    dispatch({ type: 'comments/newestFirst' });
  }

  function oldestFirst() {
    dispatch({ type: 'comments/oldestFirst' });
  }

  function popularFirst() {
    dispatch({ type: 'comments/popularFirst' });
  }

  function unpopularFirst() {
    dispatch({ type: 'comments/unpopularFirst' });
  }

  function setStatus(status) {
    dispatch({ type: 'comments/selectStatus', payload: status });
  }

  return (
    <CommentsSelectContext.Provider
      value={{
        fields,
        sort,
        order,
        limit,
        page,
        newestFirst,
        oldestFirst,
        popularFirst,
        unpopularFirst,
        setStatus,
      }}
    >
      {children}
    </CommentsSelectContext.Provider>
  );
}

function useCommentsSelector() {
  const context = useContext(CommentsSelectContext);
  if (context === undefined)
    throw new Error(
      'CommentsSelectContext was used outside CommentsSelectProvider'
    );
  return context;
}

export { CommentsSelectProvider, useCommentsSelector };
