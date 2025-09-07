<template>
  <v-app>
    <v-app-bar :color="navColor"></v-app-bar>

    <v-app-bar :color="navColor1" flat class="elevation-2 rounded">
      <div class="d-flex align-center ml-4">
        <v-img
          src="./image/ftrip.png"
          alt="Company Logo"
          class="mr-2 rounded"
          contain
          width="50"
          height="50"
        />
        <div class="d-flex flex-column">
          <span class="text-subtitle-2 font-weight-bold line-height-1">
            FOOD TECHNOLOGY,
          </span>
          <span class="text-subtitle-2 font-weight-bold line-height-1">
            RESEARCH & INNOVATION PLATFORM
          </span>
        </div>
      </div>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex align-center">
        <v-btn
          v-for="link in links"
          :key="link.text"
          :text="link.text"
          variant="text"
          class="text-capitalize mx-2"
        />
      </div>

      <v-app-bar-nav-icon
        class="d-sm-none mr-4"
        @click.stop="drawer = !drawer"
      />

      <div class="d-flex align-center mr-4">
        <v-img
          src="./image/1.png"
          alt="Company Logo 1"
          class="rounded"
          contain
          width="50"
          height="50"
        />
        <v-img
          src="./image/2.png"
          alt="Company Logo 2"
          class="rounded"
          contain
          width="50"
          height="50"
        />
        <v-img
          src="./image/3.png"
          alt="Company Logo 3"
          class="rounded"
          contain
          width="50"
          height="50"
        />
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense class="d-flex flex-column justify-center align-center">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :title="link.text"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main class="mt-2">
      <v-carousel cycle hide-delimiter-background height="400">
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        />
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        />
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        />
      </v-carousel>
      <!-- dashbord -->
      <div class="mt-5">
        <Dashbord />
      </div>
      
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Dashbord from "./Dashbord_home.vue";

// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// Navigation links
const links = [
  { text: "Home", url: "#" },
  { text: "Partner", url: "#" },
  { text: "Service", url: "#" },
  { text: "Research & Innovation", url: "#" },
  { text: "Events", url: "#" },
  { text: "Publications", url: "#" },
  { text: "About us", url: "#" },
];

// Drawer state
const drawer = ref(false);
</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem; /* Adjusted size */
}
</style>
