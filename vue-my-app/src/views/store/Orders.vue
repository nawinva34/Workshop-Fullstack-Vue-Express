<template>
  <div class="orders">
    <v-container>
      <h1 class="pb-3">Order Page</h1>
      <v-data-table
        :headers="headers"
        :items="orders"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="primary" @click="viewOrder(item)">View Details</v-btn>
        </template>
        <template v-slot:[`item.orders_ID`]="{ item }">
          {{ item.orderNumber }}
        </template>
        <template v-slot:[`item.productDetail.name`]="{ item }">
          {{ item.productDetail.name }}
        </template>
        <template v-slot:[`item.productDetail.price`]="{ item }">
          $ {{ item.productDetail.price }} USD
        </template>
        <template v-slot:[`item.totalPrice`]="{ item }">
          $ {{ calculateTotalPrice(item) }} USD
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      headers: [
        { text: 'Order Number', value: 'orderNumber' },
        { text: 'Product Name', value: 'productDetail.name' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Price', value: 'productDetail.price' },
        { text: 'Total Price', value: 'totalPrice' }, 
      ],
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/API/v1/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.orders = response.data.data.map((order, index) => {
          return {
            ...order,
            orderNumber: index + 1,
          };
        });

        console.log(this.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    viewOrder(order) {
      console.log('View order:', order);
    },
    calculateTotalPrice(item) {
      return item.quantity * item.productDetail.price;
    },
  },
};
</script>


<style scoped>
.orders {
  padding: 30px;
}
</style>
