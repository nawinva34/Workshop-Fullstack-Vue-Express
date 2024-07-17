<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="100vh"
    class="d-flex align-center"
  >
    <v-container fluid>
      <v-row justify="center" align="center" style="padding: 200px;">
        <v-col cols="12" md="4" class="text-center">
          <v-card width="350">
            <v-img src="/img/dog.jpg" height="400px"></v-img>
            <v-card-title style="padding-bottom: 10px;">
              <v-icon left>mdi-account</v-icon>
              Nawin Lakanawiwat
            </v-card-title>
            <v-card-title style="padding-top: 0;">Software Developer</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <p class="info-text" style="font-size: 24px">Name: Nawin Lakawiwat (wa)</p>
              <p class="info-text">Age: 23</p>
              <p class="info-text">Education: Prince of Songkla University (Technology information)</p>
              <p class="info-text">Location: Hatyai</p>
              <p class="info-text">Hobby: Playing Games</p>
              <p class="info-text">สิ่งที่ชอบ: ชอบเธอ!</p>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title>Skills</v-card-title>
            <v-card-text>
              <v-chip-group column>
                <v-chip color="primary" class="ma-2">JavaScript</v-chip>
                <v-chip color="secondary" class="ma-2">TypeScript</v-chip>
                <v-chip color="primary" class="ma-2">NextJs</v-chip>
                <v-chip color="secondary" class="ma-2">ReactJs</v-chip>
                <v-chip color="primary" class="ma-2">Vue.js</v-chip>
                <v-chip color="secondary" class="ma-2">HTML & CSS</v-chip>
                <v-chip color="primary" class="ma-2">Vuetify</v-chip>
                <v-chip color="secondary" class="ma-2">Ant Design</v-chip>
                <v-chip color="primary" class="ma-2">Style Component</v-chip>
                <v-chip color="secondary" class="ma-2">Tailwind CSS</v-chip>
                <v-chip color="primary" class="ma-2">Node.js</v-chip>
                <v-chip color="secondary" class="ma-2">Express.js</v-chip>
                <v-chip color="primary" class="ma-2">MongoDB</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {};
</script>

<style scoped>
.v-parallax {
  min-height: 100vh;
}

.info-text {
  color: #3b3635;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

@media (min-width: 1300px) {
  .v-container {
    max-width: 80%;
  }
}
</style>
