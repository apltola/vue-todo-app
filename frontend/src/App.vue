<template>
  <div
    class="flex flex-col font-avenir antialiased grayscale min-h-screen bg-charcoal text-snow"
  >
    <AppHeader />
    <main class="flex-1 p-30 px-4 py-20 pt-10">
      <router-view />
    </main>
    <footer class="border-t border-gray-500 text-center p-4">
      <span class="block">© allu 2020</span>
    </footer>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from './store';
import AppHeader from './components/AppHeader.vue';

export default {
  components: { AppHeader },

  setup() {
    const store = useStore();

    onMounted(() => {
      console.log('APP_MOUNTED');
      store.fetchSession();
    });

    return { store };
  },
};
</script>
