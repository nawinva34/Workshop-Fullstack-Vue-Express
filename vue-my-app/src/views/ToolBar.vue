<template>
  <div>
    <v-app-bar app class="gradient-bar" dark style="height: 80px">
      <div
        style="
          width: 100vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div style="display: flex; align-items: center;">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-3 mt-3"
            contain
            src="../../public/img/dog2.png"
            transition="scale-transition"
            width="70"
          />
          <v-btn text @click="dashboard()">
            <p class="title_name">Products</p>
          </v-btn>
          <v-btn @click="orders()" text>
            <p class="title_name">Orders</p>
          </v-btn>
        </div>

        <div class="mr-3 mt-3">
          <v-btn @click="logout()" text>
            <span>{{ username }}</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = localStorage.getItem("username");
  },
  methods: {
    logout() {
      this.$router.push("/login");
      localStorage.clear();
    },
    orders() {
      this.$router.push("/orders");
    },
    dashboard() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style>
.gradient-bar {
  background: linear-gradient(45deg, #8e0e00, #1f1c18);
}

.title_name {
  padding-left: 20px;
  padding-top: 30px;
  font-size: 24px;
  font-weight: 300;
}
</style>
