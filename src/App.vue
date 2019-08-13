<template>
  <div id="app">
    <Header />
    <main>
      <Loading v-if="loading" />
      <template v-else>
        <NavBar v-if="data" />
        <router-view class="content" />
      </template>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Loading from "@/components/Loading";
import Api from "@/services/Api";
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    NavBar,
    Loading
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters(["data"])
  },
  async created() {
    this.loading = true;
    if (!localStorage.getItem("data")) {
      const resApis = await Api().get("/apis");
      if (resApis) {
        const apis = resApis.data.map(el => el.name);
        let obj = {};
        for (let api of apis) {
          const d = await Api()
            .get("/apis/api-info/" + api)
            .catch(err => console.log(`Failed to fetch data for ${api}`));
          obj = { ...obj, [api]: d.data };
        }
        store.dispatch("updateData", obj); // only happens if apis is not null
      }
    } else {
      const obj = JSON.parse(localStorage.getItem("data"));
      store.dispatch("updateData", obj);
    }
    this.loading = false;
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  --header-size: 6em;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100vh - 9em);
}
main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: calc(100vh - var(--header-size));
  margin-top: var(--header-size);
}
.content {
  border-left: #2c3e50 solid 1px;
  min-height: calc(100vh - 6em);
}
@media (min-width: 1281px) {
  .content {
    overflow-y: auto;
  }
}
@media (max-width: 1280px) {
  main {
    grid-template-columns: 1fr;
  }
  .content {
    border-left: none;
  }
}
@media (max-width: 680px) {
  .content {
    margin-top: 30px;
  }
}
</style>
