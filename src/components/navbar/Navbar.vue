<template>
  <v-app>
    <v-app-bar :color="navColor">
          <!--  -->
    </v-app-bar>
    <v-app-bar :color="navColor1" flat class="elevation-5 rounded">
      <!-- Logo and site title section with two-line text -->
      <div class="d-flex align-center ml-4">
        <!-- Logo image -->
        <img
          src="https://placehold.co/40x40/ffffff/000000?text=LOGO"
          alt="Company Logo"
          class="mr-2 rounded"
          style="object-fit: contain;"
        >
        <!-- Two-line title text -->
        <div class="d-flex flex-column">
          <span class="text-subtitle-2 font-weight-bold line-height-1">FOOD TECHNOLOGY,</span>
          <span class="text-subtitle-2 font-weight-bold line-height-1">RESEARCH & INNOVATION PLATFORM</span>
        </div>
      </div>

      <v-spacer></v-spacer>

      <!-- Navigation links for desktop view -->
      <div class="d-none d-sm-flex align-center ">
        <v-btn
          v-for="link in links"
          :key="link.text"
          :text="link.text"
          variant="text"
          class=" text-capitalize mx-2"
        ></v-btn>
      </div>

      <!-- Hamburger menu for mobile view -->
      <v-app-bar-nav-icon
        class="d-sm-none  mr-4"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Navigation drawer for mobile -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :title="link.text"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content area for demonstration purposes -->
    <v-main>
      <v-container fluid>
        <p class="text-center text-h5 mt-10">
          This is the main content area. The navbar is above.
        </p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

// Hex code for the requested color
const navColor = '#05204A';
const navColor1 = '#FFFFFF ';

// Links to display in the navigation bar
const links = [
  { text: 'Service', url: '#' },
  { text: 'Research & Innovation', url: '#' },
  { text: 'Events', url: '#' },
  { text: 'Publications', url: '#' },
  { text: 'About us', url: '#' },
];

// State for the mobile navigation drawer, using a reactive reference
const drawer = ref(false);
</script>

<style scoped>
/* Optional custom styles can be added here */
.line-height-1 {
  line-height: 1;
}
.text-subtitle-2 {
  font-size: 1.25rem; /* Adjust as needed */
}

</style> 