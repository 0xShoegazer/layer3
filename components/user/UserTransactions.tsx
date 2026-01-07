import { useGetRecentTransactions } from '@/lib/hooks/useGetRecentTransactions';
import { Layer3User } from '@/lib/types';
import { Table } from '@chakra-ui/react';
import LoadingIndicator from '../ui/LoadingIndicator';

export default function UserTransactions({ user }: { user: Layer3User }) {
  const { transactions, isError, error, isLoading } = useGetRecentTransactions(
    user.address,
  );

  // TODO: handle potential errors from the API to display for the user for UX purposes
  if (isError) console.error(error);

  if (transactions) console.log(transactions);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Table.Root>
          <Table.Caption />
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader>Function</Table.ColumnHeader>
              {/* <Table.ColumnHeader>Product</Table.ColumnHeader> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {transactions?.map((tx) => {
              return (
                <Table.Row key={tx.hash}>
                  <Table.Cell>{tx.timeStamp}</Table.Cell>
                  <Table.Cell>{tx.functionName}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell />
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      )}
    </>
  );
}
