<template>
    <v-dialog v-model="localDialog" max-width="500">
      <v-card>
        <v-card-title>{{ isEdit ? "Edit Product" : "Add Product" }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-text-field
              label="Name"
              v-model="product.name"
              :rules="[(v) => !!v || 'Name is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Description"
              v-model="product.description"
              :rules="[(v) => !!v || 'Description is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Price"
              v-model="product.price"
              :rules="[(v) => !!v || 'Price is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Amount"
              v-model="product.amount"
              :rules="[(v) => !!v || 'Amount is required']"
              required
            ></v-text-field>
            <v-file-input
              label="Image"
              v-model="product.img"
              :rules="[(v) => !!v || 'Image is required']"
              required
            ></v-file-input>
            <v-btn type="submit" :disabled="!valid">{{ isEdit ? "Save" : "Add" }}</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="localDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      dialog: Boolean,
      productData: Object,
      isEdit: Boolean,
    },
    data() {
      return {
        localDialog: this.dialog,
        valid: false,
        product: { ...this.productData },
      };
    },
    watch: {
      dialog(value) {
        this.localDialog = value;
      },
      localDialog(value) {
        this.$emit("update:dialog", value);
      },
      productData(value) {
        this.product = { ...value };
      },
    },
    methods: {
      submitForm() {
        this.$emit("submit", this.product);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  