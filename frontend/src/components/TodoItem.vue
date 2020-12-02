<template>
  <div
    v-if="!(todoState.completed && store.state.hideCompleted)"
    class="`relative rounded bg-queenBlue-2 shadow"
    :style="{ opacity: todo.completed ? '.65' : '1' }"
  >
    <div class="relative flex items-center py-4 px-4">
      <div class="flex flex-col justify-center items-start">
        <input
          type="checkbox"
          :checked="todo.completed ? true : false"
          @change="handleMarkCompleted"
          class="cursor-pointer h-5 w-5 border-gray-300 rounded"
        />
      </div>
      <p
        class="flex-1 text-center font-medium text-lg px-4"
        :style="{ textDecoration: todo.completed ? 'line-through' : 'initial' }"
      >
        {{ todo.title }}
      </p>
      <div class="flex items-center">
        <button
          @click="() => store.deleteTodo(todo.id)"
          class="text-lg hover:bg-queenBlue rounded-md flex justify-center items-center py-1 px-2"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>
    <!-- todostate.completed = {{ todoState.completed }} -->
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from '../store';

export default {
  name: 'TodoItem',

  props: {
    todo: Object,
  },

  setup({ todo }) {
    const store = useStore();
    const todoState = reactive({
      completed: todo.completed,
    });

    function handleMarkCompleted() {
      todoState.completed = !todoState.completed;
      store.markTodoComplete(todo.id, todo.title, todoState.completed);
    }

    return {
      store,
      handleMarkCompleted,
      todoState,
    };
  },
};
</script>

<style></style>
