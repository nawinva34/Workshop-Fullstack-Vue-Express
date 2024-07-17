<template>
  <div>
    <h1 v-if="show">{{ name }} </h1>
    <v-btn color="success" @click="show = !show">switch</v-btn>
    <v-row>
      <v-col cols="3" v-for="(item, index) in datadog" :key="index">
        <v-card width="350">
          <v-img width="350" :src="item.imgLink" />
          <v-card-title primary-title>{{ item.name }}</v-card-title>
          <v-card-actions>
            <v-btn color="success" @click="AlertParam(item.name)"
              >CallName</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h1>{{value1}}</h1>
        <v-text-field name="value1" id="value1" v-model="value1"></v-text-field>
        <v-btn color="success" @click="AlertName(value1)">alert</v-btn>
      </v-col>
    </v-row>
    <!-- <v-main>
        <router-view/>
      </v-main> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Admin",
      show: true,
      datadog: [
        {
          name: "dog1",
          imgLink: require("../../public/img/dog.jpg"),
        },
        {
          name: "dog2",
          imgLink: require("../../public/img/dog.jpg"),
        },
        {
          name: "dog3",
          imgLink: require("../../public/img/dog.jpg"),
        },
      ],
      value1: '',
    };
  },
  methods: {
    AlertName() {
      alert("Hello World");
    },
    AlertParam(item) {
      alert(item);
    },
  },
};
</script>

<style></style>
