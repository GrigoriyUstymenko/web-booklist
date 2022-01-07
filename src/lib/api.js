export async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch('https://web-booklist.herokuapp.com/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

export const showBooks = `
  query MyQuery {
    books {
      author
      description
      id
      title
    }
  }
`;

export const insertBook = `
  mutation MyMutation($author: String = "", $description: String = "", $title: String = "", $user_id: uuid = "") {
    insert_books_one(object: {author: $author, description: $description, title: $title}) {
      id
    }
  }
`;

export const deleteBook = `
  mutation MyMutation($id: uuid = "") {
    delete_books(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export function fetchBooks() {
  return fetchGraphQL(showBooks, 'MyQuery', {});
}

/*
async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

 */
