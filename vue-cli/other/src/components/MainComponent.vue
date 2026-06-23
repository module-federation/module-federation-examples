<template>
  <section class="section">
    <p>This is a component from /other-app.</p>
    <p>I am being imported.</p>
    <p>I also has my own behavior like fetching data</p>
    <p>
      <button @click="fetchData" type="button">Click to fetch from FakeApi</button>
    </p>
    <pre><code>{{result}}</code></pre>
  </section>
</template>

<script>
const FETCH_URL = 'https://jsonplaceholder.typicode.com/todos/1';
const FETCH_TIMEOUT_MS = 1000;
const FALLBACK_DATA = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};

export default {
  name: 'MainComponent',
  data() {
    return {
      result: null,
      fallbackTimerId: null,
      activeAbortController: null,
    };
  },
  methods: {
    fetchData() {
      this.clearPendingRequest(true);

      const finalize = data => {
        const payload = data && typeof data === 'object' ? data : FALLBACK_DATA;

        alert('Data fetched');
        this.result = JSON.stringify(payload, null, 2);
        console.log(payload);
      };

      if (typeof AbortController === 'function') {
        this.activeAbortController = new AbortController();
      } else {
        this.activeAbortController = null;
      }

      const fetchOptions = this.activeAbortController
        ? { signal: this.activeAbortController.signal }
        : {};

      const fetchPromise = fetch(FETCH_URL, fetchOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          return response.json();
        })
        .catch(() => FALLBACK_DATA);

      const fallbackPromise = new Promise(resolve => {
        this.fallbackTimerId = setTimeout(() => {
          if (this.activeAbortController) {
            try {
              this.activeAbortController.abort();
            } catch (error) {
              // Ignore abort errors triggered by completed requests.
            }
          }

          resolve(FALLBACK_DATA);
          this.fallbackTimerId = null;
        }, FETCH_TIMEOUT_MS);
      });

      Promise.race([fetchPromise, fallbackPromise])
        .catch(() => FALLBACK_DATA)
        .then(finalize)
        .finally(() => {
          this.clearPendingRequest();
        });
    },
    clearPendingRequest(abort = false) {
      if (this.fallbackTimerId !== null) {
        clearTimeout(this.fallbackTimerId);
        this.fallbackTimerId = null;
      }

      if (abort && this.activeAbortController) {
        try {
          this.activeAbortController.abort();
        } catch (error) {
          // Ignore abort errors triggered when a controller is already finished.
        }
      }

      this.activeAbortController = null;
    },
  },
  beforeDestroy() {
    this.clearPendingRequest(true);
  },
};
</script>

<style>
.section {
  border: 1px solid black;
  padding: 10px;
}
</style>
