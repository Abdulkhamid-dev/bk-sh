const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ENDPOINT = {
  TEST: `${API_BASE_URL}/test`,
} as const;

export const AUTH_ROUTES = {
  SIGNUP: '/signup',
  LOGIN: '/',
} as const;
export const MAIN_ROUTES = {
  ROOT: '/',
} as const;

export default ENDPOINT;
