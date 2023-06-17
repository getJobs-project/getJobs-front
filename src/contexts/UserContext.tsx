import React, { createContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const UserContext: React.Context<UserContextType> = createContext();
export default UserContext;

type Children = {
  children: React.JSX.Element;
};

type UserContextType = {
  userData: { user: { id: number; email: string }; token: string };
  setUserData: React.FunctionComponent;
};

export function UserProvider({ children }: Children) {
  const [userData, setUserData] = useLocalStorage("userData", {});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
