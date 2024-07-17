<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="height: 100vh"
  >
    <v-card width="400">
      <v-card-title>Grade Calculator</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="calculateGrade">
          <v-text-field
            v-model="score"
            label="Enter your score"
            type="number"
            required
          ></v-text-field>
          <v-btn color="primary" type="submit">Calculate Grade</v-btn>
        </v-form>
        <v-alert
          v-if="gradeMessage"
          :type="alertType"
          :color="alertColor"
          class="mt-4"
        >
          {{ gradeMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      score: "",
      gradeMessage: "",
      alertColor: "",
      alertType: "info",
    };
  },
  methods: {
    calculateGrade() {
      const score = parseInt(this.score);
      if (score >= 80 && score <= 100) {
        this.gradeMessage = "Your grade is: A";
        this.alertColor = "green";
      } else if (score >= 70 && score <= 79) {
        this.gradeMessage = "Your grade is: B";
        this.alertColor = "blue";
      } else if (score >= 60 && score <= 69) {
        this.gradeMessage = "Your grade is: C";
        this.alertColor = "yellow";
      } else if (score >= 50 && score <= 59) {
        this.gradeMessage = "Your grade is: D";
        this.alertColor = "orange";
      } else if (score >= 0 && score < 50) {
        this.gradeMessage = "Your grade is: F";
        this.alertColor = "red";
      } else {
        this.gradeMessage = "Invalid score";
        this.alertColor = "black";
        this.alertType = "error";
        return;
      }
      this.alertType = "info";
    },
  },
};
</script>

<style></style>
