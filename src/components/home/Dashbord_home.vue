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

      <!-- Desktop Menu -->
      <div class="d-none d-md-flex">
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/partner" text>Partner</v-btn>
        <v-btn to="/service" text>Service</v-btn>
        <v-btn to="/research" text>Research & Innovation</v-btn>
        <v-btn to="/events" text>Events</v-btn>
        <v-btn to="/publications" text>Publications</v-btn>
        <v-btn to="/dashbord_about/" text>About Us</v-btn>
      </div>

      <!-- Mobile Toggle -->
      <v-app-bar-nav-icon
        class="d-md-none mr-4"
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

    <v-main class="mt-2">
      <v-carousel cycle hide-delimiter-background height="400">
        <v-carousel-item src="./image/home_photo.jpg" cover />
        <v-carousel-item src="./image/home_photo2.jpg" cover />
        <v-carousel-item src="./image/home_photo.jpg" cover />
      </v-carousel>

      <!-- Dashboard -->
      <div class="mt-4">
        <Dashbord />
      </div>

      <!-- About new info -->
      <div class="ml-6">
        <h1 class="text-h5">New</h1>
      </div>
      <div
        class="ml-6 cursor-pointer d-flex justify-end mr-6"
      >
        <v-btn
          to="/events"
          variant="outlined"
          color="indigo"
          text
        >All</v-btn>
      </div>
     
        <div class="mt-1">
          <New_infomation />
        </div>
        <div class="text-center">
          <h1>FTRIP Highlights</h1>
        </div>
        <div >
          <Ftrip_highlights />
        </div>
   
 </v-main>
    <!-- Footer -->
       <v-footer color="indigo-darken-4" class="py-4">
        <v-container>
          <v-row>
            <!-- Left side: contact info -->
            <v-col cols="12" md="6" class="text-caption text-white d-flex flex-column ga-1">
              <div class="d-flex align-center ga-2">
                <v-icon size="small">mdi-email</v-icon>
                <span>Email: <a href="mailto:srean.pao@nubb.edu.kh" class="text-white">srean.pao@nubb.edu.kh</a></span>
              </div>

              <div class="d-flex align-center ga-2">
                <v-icon size="small">mdi-phone</v-icon>
                <span>Phone: <a href="tel:+855882424698" class="text-white">+855 882 424 698</a></span>
              </div>

              <div class="d-flex align-center ga-2">
                <v-icon size="small">mdi-earth</v-icon>
                <span>
                  Follow us:
                  <a href="#" class="text-white">Facebook</a> |
                  <a href="#" class="text-white">LinkedIn</a> |
                  <a href="#" class="text-white">FTRIP Channel</a>
                </span>
              </div>
            </v-col>

            <!-- Right side: organization info -->
            <v-col cols="12" md="6" class="text-caption text-white text-md-right">
              <p>
                Food Technology, Research and Innovation Platform (FTRIP) <br />
                Secretariat: National University of Battambang, Cambodia
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Dashbord from "./main_home.vue";
import New_infomation from "./New_infomation.vue";
import Ftrip_highlights from "./Ftrip_highlights.vue";
import axios from "axios";

// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// Drawer state
const drawer = ref(false);

// Navigation links for drawer
const links = [
  { text: "Home", to: "/" },
  { text: "Partner", to: "/partner_dashbord" },
  { text: "Service", to: "/service" },
  { text: "Research & Innovation", to: "/research" },
  { text: "Events", to: "/events" },
  { text: "Publications", to: "/publications" },
  { text: "About Us", to: "/dashbord_about" },
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
