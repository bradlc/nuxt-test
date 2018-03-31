<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nuxt-test {{stars}}
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
    <page name="hello">
      <editable />
    </page>
    <!-- <editable :data="{ title: 'text', textColor: 'color' }">
      <div slot-scope="{ title, textColor }">
        {{ value }}
      </div>
    </editable> -->
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import fetch from 'isomorphic-unfetch'
import Page from '~/components/Page.vue'
import Editable from '~/components/Editable.vue'

export default {
  components: {
    AppLogo,
    Page,
    Editable
  },
  async asyncData({ params }) {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
