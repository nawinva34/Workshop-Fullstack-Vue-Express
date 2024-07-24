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
        <div style="display: flex; align-items: center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-3 mt-3"
            contain
            src="../../public/img/dog2.png"
            transition="scale-transition"
            width="70"
          />
        </div>

        <div class="mr-3 mt-3">
          <v-btn text class="no-hover">
            <span>{{ username }}</span>
          </v-btn>
          <v-menu offset-y class="ml-3">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text class="no-hover">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list class="custom-menu">
              <v-list-item @click="dashboard()" class="custom-menu-item">
                <v-icon>mdi-view-dashboard</v-icon>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item>
              <v-list-item @click="orders()" class="custom-menu-item">
                <v-icon>mdi-table</v-icon>
                <v-list-item-title>Orders</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout()" class="custom-menu-item">
                <v-icon>mdi-logout</v-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
        localStorage.clear();
      }
    },
    orders() {
      if (this.$route.path !== "/orders") {
        this.$router.push("/orders");
      }
    },
    dashboard() {
      if (this.$route.path !== "/dashboard") {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>

<style>
.gradient-bar {
  background: linear-gradient(15deg, #B81F20, #391717);
}

.title_name {
  padding-left: 20px;
  padding-top: 30px;
  font-size: 24px;
  font-weight: 300;
}

.custom-menu {
  width: 200px; /* Set the width of the menu */
}

.custom-menu-item {
  width: 100%; /* Ensure the list items take up the full width of the menu */
  display: flex;
  align-items: center;
}

.custom-menu-item v-icon {
  margin-right: 10px;
}
</style>