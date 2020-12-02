<template>
  <div class="max-w-xl mx-auto">
    <AddTodoForm />
    <TodosList />
  </div>
</template>

<script>
import { useStore } from '../store';
import AddTodoForm from './AddTodoForm';
import TodosList from './TodosList.vue';

export default {
  name: 'Todos',

  components: { AddTodoForm, TodosList },

  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>

<style></style>
