import React, { createContext, useContext, useReducer } from 'react';
import { Film, Person, Planet, Species, Starship, Vehicle } from '../types/api';

type ResourceData = {
  films: Film[];
  people: Person[];
  planets: Planet[];
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
};

type DataState = {
  data: ResourceData;
  loading: Record<string, boolean>;
};

type DataAction = 
  | { type: 'SET_DATA'; resourceType: keyof ResourceData; data: any[] }
  | { type: 'SET_LOADING'; resourceType: string; loading: boolean };

const initialState: DataState = {
  data: {
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  },
  loading: {},
};

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
}>({ state: initialState, dispatch: () => null });

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [action.resourceType]: action.data,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.resourceType]: action.loading,
        },
      };
    default:
      return state;
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}