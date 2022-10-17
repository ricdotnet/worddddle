import { Store } from '@idevelopthings/vue-class-stores/vue'

class UserStore extends Store<UserStore, any>() {
  get state() {
    return {
      user: '',
    }
  }
}

export const userStore = new UserStore();
