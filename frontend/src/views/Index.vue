<template>
  <div>
    <AuthForm v-if="!store.state.session" />
    <Todos v-if="store.state.session" />
  </div>
</template>

<script>
import { useStore } from '../store';
import AuthForm from '../components/AuthForm.vue';
import Todos from '../components/Todos.vue';

export default {
  name: 'Index',
  components: { AuthForm, Todos },

  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>
