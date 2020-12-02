<template>
  <form @submit="handleSubmit" class="flex flex-col md:flex-row">
    <div id="form-left" class="flex-1">
      <!-- <label for="todo" class="font-bold ml-1">Add Todo</label> -->
      <div class="flex items-stretch pt-1">
        <input
          placeholder="Add Todo"
          v-model="todo.title"
          type="text"
          name="todo"
          class="flex-1 px-2 text-md appearance-none rounded-md border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-aquamarine focus:border-aquamarine focus:z-10"
        />
        <button type="submit" class="primary ml-4">Add</button>
      </div>
    </div>
    <div
      id="form-right"
      class="flex-1 flex justify-start md:justify-end items-end pt-4 md:pt-0"
    >
      <div class="flex items-center">
        <input
          name="hidecompleted"
          type="checkbox"
          class="cursor-pointer h-5 w-5 border-gray-300 rounded"
          :checked="store.state.hideCompleted"
          @change="store.toggleHideCompleted"
        />
        <span class="ml-2">Hide completed</span>
      </div>
    </div>
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

    function handleHideCompleted() {
      store.state.hideCompleted = !store.state.hideCompleted;
    }

    return {
      todo,
      handleSubmit,
      store,
      handleHideCompleted,
    };
  },
};
</script>

<style></style>
