import { useRouter } from 'next/router';
import React, { useState, createContext, useEffect } from 'react';

type Props = {
  children?: React.ReactNode;
};

interface AppContextInterface {
  authenticated: boolean | false;
  setauthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  count: number | 0;
  setcount: React.Dispatch<React.SetStateAction<number>>;
}

export const AuthContext = createContext<AppContextInterface>({
  authenticated: false,
  setauthenticated: () => {},
  count: 0,
  setcount: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setauthenticated] = useState(false);
  const [count, setcount] = useState(0);


  return (
    <>
      <AuthContext.Provider
        value={{
          authenticated,
          setauthenticated,
          count,
          setcount,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
