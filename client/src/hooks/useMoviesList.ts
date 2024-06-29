import { useReducer } from "react";

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
}

interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  genre: string;
  duration: string;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED
}

type Action = {type: ActionType.LOADING} | {type:ActionType.SUCCESS, payload: Movie[]} | {type: ActionType.FAILED, payload: string}

const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: null
      };
    case ActionType.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };
    default:
      return initialState;
  }
}

const useMoviesList = () => {
  const [{data, loading, error}] = useReducer(reducer, initialState);
  return {data, loading, error};
};

export default useMoviesList;