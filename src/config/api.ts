import { Film, Person, Planet, Species, Starship, Vehicle } from "../types/api";

export const API_BASE_URL = 'https://swapi.dev/api';

export const ENDPOINTS = {
  films: `${API_BASE_URL}/films/`,
  people: `${API_BASE_URL}/people/`,
  planets: `${API_BASE_URL}/planets/`,
  species: `${API_BASE_URL}/species/`,
  starships: `${API_BASE_URL}/starships/`,
  vehicles: `${API_BASE_URL}/vehicles/`,
} as const;

export type ResourceType = keyof typeof ENDPOINTS;

// types/api.ts or context/types.ts

export type ResourceData = {
  people: Person[];
  planets: Planet[];
  starships: Starship[];
  vehicles: Vehicle[];
  films: Film[];
  species: Species[];
};

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
