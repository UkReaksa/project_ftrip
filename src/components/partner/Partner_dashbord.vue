<template>
  <v-app>
    <!-- Top Navbar -->
    <v-app-bar :color="navColor"></v-app-bar>

    <!-- Main Navbar -->
    <v-app-bar :color="navColor1" flat class="elevation-2 rounded">
      <!-- Logo + Title -->
      <div class="d-flex align-center ml-4">
        <v-img
          src="/image/ftrip.png"
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

      <!-- Desktop Menu -->
      <div class="d-none d-sm-flex align-center">
        <v-btn
          v-for="link in links"
          :key="link.text"
          :text="link.text"
          variant="text"
          class="text-capitalize mx-2"
        />
      </div>

      <!-- Mobile Menu Toggle -->
      <v-app-bar-nav-icon
        class="d-sm-none mr-4"
        @click.stop="drawer = !drawer"
      />

      <!-- Right Logos -->
      <div class="d-flex align-center mr-4">
        <v-img
          src="/image/1.png"
          alt="Company Logo 1"
          class="rounded"
          contain
          width="50"
          height="50"
        />
        <v-img
          src="/image/2.png"
          alt="Company Logo 2"
          class="rounded"
          contain
          width="50"
          height="50"
        />
        <v-img
          src="/image/3.png"
          alt="Company Logo 3"
          class="rounded"
          contain
          width="50"
          height="50"
        />
      </div>
    </v-app-bar>

    <!-- Drawer (Mobile Menu) -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense class="d-flex flex-column justify-center align-center">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :title="link.text"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Page Content -->
      <!-- Hero Section -->
   <!-- Hero Section -->
<v-container fluid class="pa-0">
  <div class="hero-section">
    <v-img
      src="/image/home_photo2.jpg"
      alt="Members Banner"
      height="350"
      class="rounded-lg"
      cover
    >
      <!-- Overlay text -->
      <div class="overlay">
        <h1 class="overlay-text">Member & Partner</h1>
      </div>
    </v-img>
  </div>

  <!-- Section Title -->
  <v-container class="py-6">
    <h2 class="section-title">FTRIP MEMBERS</h2>
  </v-container>
</v-container>

    <v-main class="mt-2">
     

      <!-- Dashboard -->
      <div class="mt-5">
        <!-- Add your dashboard content here -->
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

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
.hero-section {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-text {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.section-title {
  font-size: 1.6rem;
  font-weight: 900;
}

</style>
