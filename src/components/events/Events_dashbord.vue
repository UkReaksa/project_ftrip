<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar :color="navColor"></v-app-bar>

    <!-- Main Navbar -->
    <v-app-bar :color="navColor1" flat class="elevation-2 rounded">
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
      <div class="d-none d-md-flex">
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/partner" text>Partner</v-btn>
       <v-btn to="/dashbord_service" text>Service</v-btn>
        <v-btn to="/research" text>Research & Innovation</v-btn>
        <v-btn to="/events" text>Events</v-btn>
        <v-btn to="/publications" text>Publications</v-btn>
        <v-btn to="/dashbord_about/" text>About Us</v-btn>
      </div>

      <!-- Mobile Menu Toggle -->
      <v-app-bar-nav-icon
        class="d-md-none mr-4"
        @click.stop="drawer = !drawer"
      />

      <!-- Partner Logos -->
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

    <!-- Mobile Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          link
          @click="drawer = false"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="grey lighten-4">
      <div  >
        <Dashbord />
         </div>
      <div class="mt-1">
        <Events />
      </div>
    </v-main>
      
      
   
    <!-- Footer -->
    <v-footer color="indigo-darken-4" class="py-4">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            class="text-caption text-white d-flex flex-column ga-1"
          >
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
import { onMounted, ref } from "vue";
import axios from "axios";
import Dashbord from "../home/main_home.vue";
import Events  from "./Event.vue"; 

// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// State
const events = ref([]);
const drawer = ref(false);
const showModal = ref(false);
const selectedEvent = ref(null);

// Navigation links
const links = [
  { text: "Home", to: "/" },
  { text: "Partner", to: "/partner" },
  { text: "Service", to: "/service" },
  { text: "Research & Innovation", to: "/research" },
  { text: "Events", to: "/events" },
  { text: "Publications", to: "/publications" },
  { text: "About Us", to: "/dashbord_about" },
];

// Fetch events
onMounted(() => {
  axios
    .get("http://localhost:8000/api/events")
    .then((response) => {
      events.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
});

// Modal functions
const openDetails = (event) => {
  selectedEvent.value = event;
  showModal.value = true;
};

const closeDetails = () => {
  selectedEvent.value = null;
  showModal.value = false;
};

// Convert YouTube URL to embed
const getEmbedUrl = (url) => {
  if (!url) return "";

  // Regular YouTube URL
  const regularMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
  );
  if (regularMatch && regularMatch[1]) {
    return `https://www.youtube.com/embed/${regularMatch[1]}`;
  }

  // Short YouTube URL
  const shortMatch = url.match(
    /(?:https?:\/\/)?(?:youtu\.be)\/([a-zA-Z0-9_-]+)/
  );
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // Already an embed URL or other URL
  return url;
};

</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #f3f4f6;
  color: #333;
}

.v-card {
  border-radius: 12px !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.v-card-title {
  color: #05204A;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
}
</style>
