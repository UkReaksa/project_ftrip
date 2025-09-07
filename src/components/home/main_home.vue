<template>
  <v-container fluid class="mb-16 border">
    <v-row class="d-flex justify-center border">
      <!-- Left Side Large Image -->
      <v-col cols="12" md="4">
        <v-card class="pa-2 border" elevation="2">
          <v-img
            src="./image/home_photo.jpg"
            aspect-ratio="16/9"
            class="rounded-lg"
          />
        </v-card>
      </v-col>

      <!-- Right Side with 2 stacked images -->
      <v-col cols="12" md="2" class="d-flex flex-column gap-4">
        <v-card class="pa-2 border" elevation="2">
          <v-img
            src="./image/home_photo2.jpg"
            aspect-ratio="16/9"
            class="rounded-lg"
          />
        </v-card>

        <v-card class="pa-2 border" elevation="2">
          <v-img
            src="./image/home_photo2.jpg"
            aspect-ratio="16/9"
            class="rounded-lg"
          />
        </v-card>
      </v-col>

      <!-- Text Section -->
      <v-col>
        <v-card class="pa-5 text-center border" elevation="2">
          <h3 class="font-weight-bold">WELCOME TO FTRIP</h3>
          <p class="text-body-2">
            The Food Technology, Research and Innovation Platform (FTRIP) is a
            national platform established to foster collaboration between
            academia, government, and the private sector in advancing food
            technology, research, and innovation in Cambodia.
          </p>

          <p class="text-body-2">
            Our mission is to drive sustainable, safe, and competitive food value
            chains through research, innovation, and knowledge transfer.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// no script
</script>

<style scoped>
.rounded-lg {
  border-radius: 12px;
}

.gap-4 {
  gap: 16px;
}

/* Border style */
.border {
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
