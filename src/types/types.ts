export interface LoginFormProps {
  token: string | null;
  setToken: (token: string | null) => void;
  userData: { username: string; password: string };
  setUserData: (userData: { username: string; password: string }) => void;
}
