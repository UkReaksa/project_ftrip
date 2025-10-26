<template>
  <v-app>
    <!-- Top App Bar (color bar only) -->
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
      <div class="d-none d-md-flex">
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/partner" text>Partner</v-btn>
        <v-btn to="/service" text>Service</v-btn>
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
    <v-main class="my-5" v-if="partners">
      <v-card elevation="2" rounded="lg" class="pa-6">
        <h1 class="text-h5 font-weight-bold mb-2">
          {{ partners.title }}
        </h1>

        <v-card>
          <div class="carousel-wrapper">
            <v-carousel cycle hide-delimiter-background height="400">
              <!-- Image -->
              <v-carousel-item v-if="partners.image">
                <v-img :src="partners.image" cover height="400" />
              </v-carousel-item>

              <!-- Video -->
              <v-carousel-item v-if="partners.video">
                <video
                  controls
                  style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;"
                >
                  <source :src="partners.video" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-card>
      </v-card>
      <br />
      <p>{{ partners.partner_description }}</p>
    </v-main>

    <div v-else class="text-center my-10">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const partners = ref(null);
const index = ref(0); // Default to 0
const drawer = ref(false); // Mobile menu state

const fetchPartners = async () => {
  try {
    const response = await axios.get('https://ftrip.tech/api1/api/partners');
    index.value = parseInt(route.params.index) || 0; // If no param, default to 0
    partners.value = response.data[index.value];
  } catch (error) {
    console.error('Error fetching partners:', error);
  }
};

onMounted(fetchPartners);

const navColor = '#05204A';
const navColor1 = '#FFFFFF';
</script>
