<template>
     <v-app-bar :color="navColor"></v-app-bar>
  <v-app-bar :color="navColor1" flat class="elevation-2 rounded">
    <!-- Left Logo + Title -->
    <div class="d-flex align-center ml-4">
      <v-img
        src="/image/ftrip.png"
        alt="FTRIP Logo"
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

    <v-spacer />

  <!-- Desktop Menu -->
      <div class="d-none d-md-flex">
        <v-btn
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          variant="text"
        >
          {{ link.text }}
        </v-btn>
      </div>

    <!-- Mobile Toggle -->
    <v-app-bar-nav-icon
      class="d-md-none mr-4"
      @click.stop="drawer = !drawer"
    />

    <!-- Partner Logos (right side) -->
    <div class="d-flex align-center mr-4 d-none d-sm-flex">
      <v-img
        v-for="(logo, index) in logos"
        :key="index"
        :src="logo.src"
        :alt="logo.alt"
        class="rounded ml-2"
        contain
        width="50"
        height="50"
      />
    </div>

    <!-- Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          link
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

// Colors

// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// Drawer state
const drawer = ref(false);

// Menu links
const links = [
  { text: "Home", to: "/" },
  { text: "Partner", to: "/partner" },
  { text: "Service", to: "/dashbord_service" },
  { text: "Research & Innovation", to: "/dashboard_research" },
  { text: "Events", to: "/events" },
  { text: "Publications", to: "/dashboard_publication" },
  { text: "About Us", to: "/dashbord_about" },
];

// Partner logos
const logos = [
  { src: "/image/1.png", alt: "Partner 1" },
  { src: "/image/2.png", alt: "Partner 2" },
  { src: "/image/3.png", alt: "Partner 3" },
];
</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem;
}
</style>
