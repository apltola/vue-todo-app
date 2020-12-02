<template>
  <header class="flex justify-between items-center p-4 md:p-8">
    <span class="font-black text-2xl">
      Todo.app
    </span>
    <button v-if="store.state.session" @click="store.logout" class="font-black">
      Logout {{ store.state.session.username }}
    </button>
  </header>
</template>

<script>
import { useStore } from '../store';

export default {
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>

<style></style>
