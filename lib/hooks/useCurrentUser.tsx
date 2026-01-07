'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Layer3User } from '../types';

function useUserData() {
  const [currentUser, setCurrentUser] = useState<Layer3User>({
    address: '0x',
    rank: 1,
    username: '',
  });

  return {
    currentUser,
    setCurrentUser,
  };
}

export const UserDataContext = createContext<ReturnType<
  typeof useUserData
> | null>(null);

export function CurrentUserDataProvider(props: { children: ReactNode }) {
  const value = useUserData();

  return (
    <UserDataContext.Provider value={value}>
      {props.children}
    </UserDataContext.Provider>
  );
}

export function useSelectedUser() {
  return useContext(UserDataContext) as ReturnType<typeof useUserData>;
}
