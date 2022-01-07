<script>
  import { books } from '../routes/stores';
  import { deleteBook, fetchBooks } from '$lib/api';
  import { fetchGraphQL } from '$lib/api';

  export let book;

  const removeBook = async id => {
    console.log(id);
    await fetchGraphQL(deleteBook, 'MyMutation', { id: id });
    fetchBooks().then(output => ($books = output.data.books));
  };
</script>

<section>
  <p>Title: {book.title}</p>
  <p>Author: {book.author}</p>
  <p>Description: {book.description}</p>
  <button on:click={removeBook(book.id)}>X</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
</style>
