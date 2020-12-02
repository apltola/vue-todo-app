import { reactive, readonly, provide, inject } from 'vue';
import axios from 'axios';
//import todoActions from './actions/todos';

export const storeSymbol = Symbol('store');

export function createStore() {
  const state = reactive({
    session: null,
    todos: [],
  });

  // login or signup
  async function authenticate(authMethod, payload) {
    let retObj = { error: null };

    try {
      const res = await axios.post(`/api/auth/${authMethod}`, payload);
      state.session = res.data;
      await fetchTodos();

      return retObj;
    } catch (err) {
      console.log(err);
      if (err.response) {
        retObj.error = err.response.data.error;
        return retObj;
      }
    }
  }

  async function logout() {
    try {
      await axios.post('/api/auth/signout', {});
      state.session = null;
      state.todos = [];
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSession() {
    try {
      const res = await axios.get('/api/auth/currentuser');
      state.session = res.data.currentUser;

      // fetch todos for session user
      if (res.data.currentUser) {
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTodos() {
    const res = await axios.get('/api/todos');
    state.todos = res.data;
  }

  async function addNewTodo(title) {
    const res = await axios.post('/api/todos', { title: title });
    state.todos = res.data;
  }

  async function deleteTodo(id) {
    const res = await axios.delete(`/api/todos/${id}`);
    state.todos = res.data;
  }

  async function markTodoComplete(id, title, completed) {
    console.log(completed);
    const res = await axios.put(`/api/todos/${id}`, {
      title,
      completed,
    });
    state.todos = res.data;
  }

  return {
    authenticate,
    logout,
    fetchSession,
    fetchTodos,
    addNewTodo,
    deleteTodo,
    markTodoComplete,
    state: readonly(state),
  };
}

export const useStore = () => inject(storeSymbol);
//export const provideStore = () => provide(storeSymbol, createStore());
