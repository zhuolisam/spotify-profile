import { useRouter } from 'next/router';
import React, { useState, createContext, useEffect } from 'react';

type Props = {
  children?: React.ReactNode;
};

interface AppContextInterface {
  authenticated: boolean | false;
  setauthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean | true;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  access_token: string | '';
  setaccess_token: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AppContextInterface | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setauthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [access_token, setaccess_token] = useState('');

  const router = useRouter();

  useEffect(() => {
    console.log('useEffect from AuthProvider');

    if (window.localStorage.getItem('access_token')) {
      setauthenticated(true);
      return;
    }
    
    if (!window.localStorage.getItem('access_token') && router.pathname !== '/login') {      
      router.push('/login');
    }
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          authenticated,
          setauthenticated,
          loading,
          setLoading,
          access_token,
          setaccess_token,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
