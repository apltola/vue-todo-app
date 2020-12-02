<template>
  <div class="pt-10 flex flex-col space-y-4">
    <TodoItem v-for="todo in store.state.todos" :key="todo.id" :todo="todo" />
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
