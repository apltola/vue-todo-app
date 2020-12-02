<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-center mb-10 text-xl md:text-2xl font-extrabold">
      Sign in or register new account
    </h1>
    <div class="flex justify-evenly pb-6">
      <button
        @click="() => handleToggle('signin')"
        class="focus:outline-none border-b-2 border-transparent pb-1"
        :class="{ toggleSelected: form.authMethod === 'signin' }"
      >
        Sign in
      </button>
      <button
        @click="() => handleToggle('signup')"
        class="focus:outline-none border-b-2 border-transparent pb-1"
        :class="{ toggleSelected: form.authMethod === 'signup' }"
      >
        Register
      </button>
    </div>
    <form @submit="handleSubmit">
      <label class="sr-only" for="username">Username</label>
      <input
        class="text-md appearance-none rounded-t-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-aquamarine focus:border-aquamarine focus:z-10"
        placeholder="Username"
        type="text"
        name="username"
        v-model="form.username"
      />
      <label class="sr-only" for="password">Password</label>
      <input
        class="text-md mb-8 appearance-none rounded-b-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-aquamarine focus:border-aquamarine focus:z-10"
        placeholder="Password"
        type="password"
        name="password"
        v-model="form.password"
      />
      <button
        type="submit"
        :disabled="submitIsDisabled()"
        :class="{ disabled: submitIsDisabled() }"
        class="h-9 flex justify-center items-center font-bold w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-aquamarine-2 hover:bg-aquamarine-3 focus:bg-aquamarine-3 active:bg-aquamarine-4 focus:outline-none"
      >
        <span v-if="form.loading">
          <hollow-dots-spinner
            :animation-duration="500"
            :dot-size="10"
            :dots-num="3"
            :color="'white'"
          />
        </span>
        <span v-else>
          {{ form.authMethod === 'signup' ? 'Register' : 'Sign in' }}
        </span>
      </button>

      <div
        v-if="form.error"
        class="text-salsa pt-6 flex justify-center items-center"
      >
        <font-awesome-icon icon="exclamation-circle" class="mr-2" />
        {{ form.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '../store';
import { reactive, ref } from 'vue';
import { AtomSpinner, HollowDotsSpinner } from 'epic-spinners';

export default {
  name: 'AuthForm',

  components: { HollowDotsSpinner },

  setup() {
    const store = useStore();
    const form = reactive({
      authMethod: 'signin',
      username: '',
      password: '',
      error: null,
      loading: false,
    });

    function handleToggle(type) {
      form.authMethod = type;
      form.username = '';
      form.password = '';
    }

    function submitIsDisabled() {
      return !form.username && !form.password;
    }

    async function handleSubmit(e) {
      e.preventDefault();
      form.loading = true;
      form.error = null;

      const res = await store.authenticate(form.authMethod, {
        username: form.username,
        password: form.password,
      });

      if (res.error) {
        form.loading = false;
        form.error = res.error;
      }
    }

    return {
      store,
      form,
      handleSubmit,
      handleToggle,
      submitIsDisabled,
    };
  },
};
</script>

<style></style>
