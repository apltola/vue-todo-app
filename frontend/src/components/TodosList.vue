<template>
  <div class="pt-10 flex flex-col space-y-4">
    <TodoItem v-for="todo in store.state.todos" :key="todo.id" :todo="todo" />
    <div
      v-if="store.state.todos.length === 0"
      class="opacity-50 font-black text-center pt-5"
    >
      No todos...
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodosList',

  components: { TodoItem },

  setup() {
    const store = useStore();

    return { store };
  },
};
</script>

<style></style>
