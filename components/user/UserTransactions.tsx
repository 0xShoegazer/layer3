import { useGetRecentTransactions } from '@/lib/hooks/useGetRecentTransactions';
import { Layer3User } from '@/lib/types';

export default function UserTransactions({ user }: { user: Layer3User }) {
  const { transactions, isError, error } = useGetRecentTransactions(
    user.address,
  );

  // TODO: handle potential errors from the API to display for the user for UX purposes
  if (isError) console.error(error);

  if (transactions) console.log(transactions);

  return <></>;
}
