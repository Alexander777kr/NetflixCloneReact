import { useEffect, useReducer } from "react";
import axios from 'axios';

interface Plan {
  id: string;
  name: string;
  price: {
    amount: number;
    id: string;
  };
}

interface State {
  data: Plan[] | null;
  error: string | null;
  loading: boolean;
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

type Action = {type: ActionType.LOADING} | {type:ActionType.SUCCESS, payload: Plan[]} | {type: ActionType.FAILED, payload: string}

const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
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

const usePlans = () => {
  const [{data, loading, error}, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    fetchPlansList();
  }, []);

  const fetchPlansList = async () => {
    dispatch({type: ActionType.LOADING});
    try {
      const response = await axios.get(`http://localhost:8081/sub/products`);
      dispatch({type: ActionType.SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: ActionType.FAILED, payload: "Something went wrong"});
    }
  }

  return {data, loading, error};
};

export default usePlans;