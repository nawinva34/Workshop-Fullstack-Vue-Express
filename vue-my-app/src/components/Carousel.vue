<template>
  <v-carousel height="600" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-img
        :src="slide.img"
        class="carousel-img"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          img: "https://kingkongpetshop.com/wp-content/uploads/2022/08/kingkong-petshop-home-2-1024x683.jpg",
        },
        {
          img: "https://kingkongpetshop.com/wp-content/uploads/2022/08/kingkong-petshop-home-1-1024x683.jpg",
        },
        {
          img: "https://assets.contenthub.wolterskluwer.com/api/public/content/img-ct-pet-shop-licensing?v=0baf0d1d",
        },
        {
          img: "https://www.rdasia.com/wp-content/uploads/sites/2/2019/06/6-things-pet-shops-wont-tell-you-ISTOCK-770x500.jpg",
        },
      ],
    };
  },
};
</script>

<style>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}
</style>
