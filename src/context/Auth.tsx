import React, { createContext, useState } from "react";

export type UserType = {
  email: string;
  username?: string;
  source: string;
  plan?: any;
  isAdmin: boolean;
  adminType: string;
  address: string;
  telephone: string;
  name: string;
  ip: string;
  id: string;
};

interface AuthProps {
  user: UserType | undefined;
  handleUserName: (val: UserType) => void;
}

export const AuthContext = createContext<AuthProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  const handleUserName = (val: UserType) => {
    console.log(val);
    if (val) {
      setUser(val);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
