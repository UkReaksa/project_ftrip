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
      <div class="d-none d-md-flex">
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/partner" text>Partner</v-btn>
        <v-btn to="/service" text>Service</v-btn>
        <v-btn to="/research" text>Research & Innovation</v-btn>
        <v-btn to="/events" text>Events</v-btn>
        <v-btn to="/publications" text>Publications</v-btn>
        <v-btn to="/dashbord_about/" text>About Us</v-btn>
      </div>

      

      <!-- ✅ Mobile Menu Toggle -->
      <v-app-bar-nav-icon
        class="d-sm-none mr-4"
        @click.stop="drawer = !drawer"
      />

      <!-- ✅ Right Logos -->
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

    <!-- ✅ Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          link
          router
          @click="drawer = false"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- ✅ Page Content -->
    <!-- <v-container fluid class="pa-0">
      <div class="hero-section">
        <v-img
          src="/image/home_photo2.jpg"
          alt="Members Banner"
          height="350"
          class="rounded-lg"
          cover
        >
          <div class="overlay">
            <h1 class="overlay-text">Member & Partner</h1>
          </div>
        </v-img>
      </div>
    </v-container> -->
   <v-main class="mt-2">
  <div class="carousel-wrapper">
    <v-carousel cycle hide-delimiter-background height="400">
      <v-carousel-item src="./image/home_photo.jpg" cover />
      <v-carousel-item src="./image/home_photo2.jpg" cover />
      <v-carousel-item src="./image/home_photo.jpg" cover />
    </v-carousel>

    <!-- Overlay text -->
    <div class="overlay ">
      <h1 class="overlay-text">Member & Partner</h1>
    </div>
  </div>
</v-main>


    <v-main>

      <div class="mt-1">
        <Partner_team />
      </div>

      <div class="mt-1">
        <Members />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Partner_team from "./Partner_team.vue";
import Members from "./members.vue";


// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";



// Drawer state
const drawer = ref(false);

</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem;
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
.overlay-text {
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}
.carousel-wrapper {
  position: relative;
}
</style>
