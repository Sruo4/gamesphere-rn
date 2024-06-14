// app/context/AuthContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';

// 定义 AuthState 类型
type AuthState = {
  uuid: string;
  username: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoggedIn: boolean;
  brief: string;
  steamid: string;
  key: string;
};

// 定义 AuthAction 类型
type AuthAction =
  | { type: 'SET_UUID'; payload: string }
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
  | { type: 'TOGGLE_SHOW_PASSWORD' }
  | { type: 'TOGGLE_SHOW_CONFIRM_PASSWORD' }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'SET_BRIEF'; payload: string }
  | { type: 'SET_STEAMID'; payload: string }
  | { type: 'SET_KEY'; payload: string };

// 初始状态
const initialState: AuthState = {
  uuid: '',
  username: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false,
  isLoggedIn: false,
  brief: '',
  steamid: '',
  key: '',
};

// Reducer 函数
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_UUID':
      return { ...state, uuid: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'TOGGLE_SHOW_CONFIRM_PASSWORD':
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    case 'SET_BRIEF':
      return { ...state, brief: action.payload };
    case 'SET_STEAMID':
      return { ...state, steamid: action.payload };
    case 'SET_KEY':
      return { ...state, key: action.payload };
    default:
      return state;
  }
};

// Context 和 Provider
const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
