import { useApolloClient } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const useHelper = () => {
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.concat(addedBook)
        }
      });
    }
  };

  return { updateCacheWith };
}

export default useHelper;