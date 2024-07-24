<template>
  <div class="dashboard">
    <v-container>
      <div
        style="display: flex; justify-content: flex-end; align-items: center;"
      >
      <v-text-field
          v-model="searchTerm"
          label="Search products"
          class="mr-4"
        ></v-text-field>
        <v-btn style="color:aliceblue;" color="#B81F20" @click="showAddProductDialog">Add Product</v-btn>
      </div>
      <v-row>
        <v-col
          v-for="product in filteredProducts"
          :key="product._id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="product-card">
            <v-img
              :src="getProductImageUrl(product.img)"
              aspect-ratio="1.2"
            ></v-img>

            <div class="card-content">
              <h2 class="title">{{ product.name }}</h2>
              <p class="description">{{ product.description }}</p>
              <h2>$ {{ product.price }} USD</h2>

              <v-card-actions style="padding-left: 0">
                <v-btn color="primary" @click="showEditProductDialog(product)"
                  >Edit</v-btn
                >
                <v-btn
                  color="error"
                  @click="showDeleteConfirmation(product._id)"
                  >Delete</v-btn
                >
                <v-btn color="success" @click="showAddToCartDialog(product)"
                  ><v-icon>mdi-cart-arrow-down</v-icon></v-btn
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Add/Edit Product Dialogs -->
      <ProductFormDialog
        :dialog.sync="addProductDialog"
        :productData="newProduct"
        @submit="addProduct"
      />
      <ProductFormDialog
        :dialog.sync="editProductDialog"
        :productData="currentProduct"
        :isEdit="true"
        @submit="updateProduct"
      />

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="deleteConfirmationDialog" max-width="300">
        <v-card>
          <v-card-title>Confirm Delete</v-card-title>
          <v-card-text>
            Are you sure you want to delete this product?
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="confirmDelete">Delete</v-btn>
            <v-btn @click="cancelDelete">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="addToCartDialog" max-width="400">
        <v-card>
          <v-card-title>Add to Cart</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="quantity"
                    label="Quantity"
                    type="number"
                    min="1"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addToCart">Add to Cart</v-btn>
            <v-btn @click="cancelAddToCart">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Modal for confirming order
      <v-dialog v-model="placeOrderDialog" max-width="400">
        <v-card>
          <v-card-title>Place Order</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p>Confirm your order for {{ selectedProduct?.name }}</p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="placeOrder">Place Order</v-btn>
            <v-btn @click="cancelPlaceOrder">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->

      <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
        {{ snackbar.message }}
        <v-btn color="red" text @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { isAuthenticated } from "@/helpers/auth";
import ProductFormDialog from "@/components/ProductFormDialog.vue";

export default {
  components: {
    ProductFormDialog,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      addProductDialog: false,
      editProductDialog: false,
      deleteConfirmationDialog: false,
      addToCartDialog: false,
      newProduct: {
        name: "",
        description: "",
        price: "",
        amount: "",
        img: null,
      },
      currentProduct: {},
      productIdToDelete: null,
      snackbar: {
        show: false,
        message: "",
        timeout: 3000,
      },
      searchTerm: "",
      quantity: 1, 
    };
  },
  created() {
    if (!isAuthenticated()) {
      this.$router.push("/login");
    } else {
      this.fetchProducts();
    }
  },
  watch: {
    searchTerm(newTerm) {
      this.filterProducts(newTerm);
    },
    products: {
      handler() {
        this.filterProducts(this.searchTerm);
      },
      immediate: true,
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/API/v1/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.products = response.data.data;
        this.filterProducts(this.searchTerm); 
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    filterProducts(term) {
      const searchTerm = term ? term.toLowerCase() : '';
      console.log("search",searchTerm)
      console.log('filter',this.filteredProducts)
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    },
    getProductImageUrl(filename) {
      return `http://localhost:3000/images/${filename}`;
    },

    showAddProductDialog() {
      this.newProduct = {
        name: "",
        description: "",
        price: "",
        amount: "",
        img: null,
      };
      this.addProductDialog = true;
    },
    showEditProductDialog(product) {
      this.currentProduct = { ...product };
      this.editProductDialog = true;
    },
    showDeleteConfirmation(productId) {
      this.productIdToDelete = productId;
      this.deleteConfirmationDialog = true;
    },
    cancelDelete() {
      this.deleteConfirmationDialog = false;
      this.productIdToDelete = null;
    },
    showAddToCartDialog(product) {
      this.selectedProduct = product;
      this.addToCartDialog = true;
    },
    async addProduct(product) {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        for (let key in product) {
          formData.append(key, product[key]);
        }
        const response = await axios.post(
          "http://localhost:3000/API/v1/products",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.products.push(response.data.data);
        this.filterProducts(this.searchTerm); // Update filteredProducts after adding
        this.addProductDialog = false;
        this.snackbar.message = "Product added successfully!";
        this.snackbar.show = true;
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    async updateProduct(product) {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        for (let key in product) {
          formData.append(key, product[key]);
        }
        const response = await axios.put(
          `http://localhost:3000/API/v1/products/${product._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const index = this.products.findIndex((p) => p._id === product._id);
        this.$set(this.products, index, response.data.data);
        this.filterProducts(this.searchTerm); // Update filteredProducts after updating
        this.editProductDialog = false;
        this.snackbar.message = "Product updated successfully!";
        this.snackbar.show = true;
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async confirmDelete() {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:3000/API/v1/products/${this.productIdToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.products = this.products.filter(
          (product) => product._id !== this.productIdToDelete
        );
        this.filterProducts(this.searchTerm); // Update filteredProducts after deleting
        this.deleteConfirmationDialog = false;
        this.snackbar.message = "Product deleted successfully!";
        this.snackbar.show = true;
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    async addToCart() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:3000/API/v1/products/${this.selectedProduct._id}/orders`,
          {
            quantity: parseInt(this.quantity),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Order placed:", response.data);
        this.addToCartDialog = false;
        this.snackbar.message = "Product added to cart!";
        this.snackbar.show = true;
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    cancelAddToCart() {
      this.selectedProduct = null;
      this.quantity = 1; // Reset quantity to default
      this.addToCartDialog = false;
    },
  },
};
</script>

<style scoped>
.product-card {
  height: 100%;
  margin-bottom: 20px;
}

.card-content {
  padding: 15px 15px 0px 15px;
}

.dashboard {
  padding: 30px;
  background-color: #f7f7f7;
}

.title {
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
}

.description {
  font-weight: 200;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
