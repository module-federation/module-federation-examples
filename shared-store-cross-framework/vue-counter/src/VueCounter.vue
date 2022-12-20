<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.icon {
  height: 20px;
}

.caption {
  display: flex;
  gap: 8px;
  align-items: center;
}

button {
  height: 65px;
  width: 65px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #88da99;
  color: #873e24;
  font-size: 40px;
  text-align: center;
  box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
  cursor: pointer;
}

button + button {
  margin-left: 8px;
}
</style>
<template>
  <div class="container">
    <div>
      <button data-e2e="DECREMENT_BUTTON" @click="decrement">-</button>
      <button data-e2e="INCREMENT_BUTTON" @click="increment">+</button>
    </div>
  </div>
</template>
<script>
import { createApi} from 'effector';
import {useStore} from 'effector-vue/composition';

import $counter from "store/Counter";

const {increment, decrement} = createApi($counter, {
  increment: state => state + 1,
  decrement: state => state - 1,
})

export default {
  name: 'VueCounter',
  components: {},
  setup() {
    const counter = useStore($counter)

    return {
      counter,
      increment,
      decrement,
    }
  },
};
</script>

