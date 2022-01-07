<script>
  import { Circle } from 'svelte-loading-spinners';
  import { fetchBooks } from '$lib/api';
  import { fetchGraphQL } from '$lib/api';
  import { insertBook } from '$lib/api';
  import Book from '$lib/Book.svelte';
  import { books } from './stores';

  let bookInput;
  fetchBooks().then(output => {
    $books = output.data.books;
  });

  let showingSpinner = false;
  let buttonDisabled = false;

  const addBook = async () => {
    const input = {};
    Array.from(bookInput.elements).forEach(e => (input[e.name] = e.value));
    await fetchGraphQL(insertBook, 'MyMutation', {
      author: input.author,
      description: input.description,
      title: input.title,
    });
    fetchBooks().then(output => ($books = output.data.books));
  };
</script>

<svelte:head>
  <title>Book list</title>
</svelte:head>

<section>
  <h1 class="main-title">Add books you want to read in the future</h1>
  <form
    class="add-book-form"
    bind:this={bookInput}
    on:submit|preventDefault={addBook}
  >
    <input
      class="add-title"
      name="title"
      type="text"
      placeholder="Enter book title"
      required
    />
    <input
      class="add-author"
      name="author"
      type="text"
      placeholder="Enter book author"
      required
    />
    <textarea
      class="add-description"
      name="description"
      placeholder="Enter book description"
    />
    <button
      class="mail-form-content mail-form-button"
      name="submitButton"
      disabled={buttonDisabled}>Add</button
    >
    {#if showingSpinner}
      <Circle color="var(--spinner-color)" />
    {/if}
  </form>

  <ul>
    {#each $books as book (book.id)}
      <Book {book} />
    {/each}
  </ul>
</section>

<style>
  .main-title {
    font-size: var(--title-fontsize);
    color: var(--text-color);
  }

  .add-book-form {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    border: var(--border-width) solid var(--border-color);
  }
</style>
