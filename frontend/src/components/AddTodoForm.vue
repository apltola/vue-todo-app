<template>
  <form @submit="handleSubmit" class="flex">
    <div id="form-left" class="flex-1">
      <label for="todo" class="font-bold ml-1">Add Todo</label>
      <div class="flex items-stretch pt-1">
        <input
          v-model="todo.title"
          type="text"
          name="todo"
          class="flex-1 px-2 text-md appearance-none rounded-md border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-aquamarine focus:border-aquamarine focus:z-10"
        />
        <button type="submit" class="primary ml-4">Add</button>
      </div>
    </div>
    <div id="form-right" class="flex-1"></div>
  </form>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from '../store';

export default {
  setup() {
    const store = useStore();
    const todo = reactive({
      title: '',
    });

    function handleSubmit(e) {
      e.preventDefault();

      store.addNewTodo(todo.title);
      todo.title = '';
    }

    return {
      todo,
      handleSubmit,
      store,
    };
  },
};
</script>

<style></style>
