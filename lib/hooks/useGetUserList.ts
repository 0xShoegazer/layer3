import { useQuery } from '@tanstack/react-query';
import { Layer3User } from '../types';

export function useGetUserList() {
  // List of users could be stored off somewhere if needed outside of the UI list
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://layer3.xyz/api/assignment/users');
      const users: { users: Layer3User[] } = await res.json();
      return users.users;
    },
  });

  return {
    users: data ?? [],
    isError,
    error,
    isLoading,
  };
}
