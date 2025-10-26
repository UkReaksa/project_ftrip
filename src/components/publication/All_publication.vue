<template>
    <v-app>

            <!-- Top App Bar -->
    <v-app-bar :color="navColor" app></v-app-bar>

    <!-- Main Navbar -->
    <v-app-bar :color="navColor1" flat class="elevation-2 rounded" app>
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
        <v-btn to="/dadhbord_research" text>Research & Innovation</v-btn>
        <v-btn to="/events" text>Events</v-btn>
        <v-btn to="/dadhbord_publication" text>Publications</v-btn>
        <v-btn to="/dashbord_about" text>About Us</v-btn> <!-- Fixed route -->
      </div>

      <!-- Mobile Menu Toggle -->
      <v-app-bar-nav-icon
        class="d-md-none mr-4"
        @click.stop="drawer = !drawer"
        aria-label="Open navigation menu"
      />

      <!-- Partner Logos -->
      <div class="d-flex align-center mr-4">
        <v-img
          src="/image/1.png"
          alt="Company Logo 1"
          class="rounded mx-1"
          contain
          width="50"
          height="50"
          loading="lazy"
        />
        <v-img
          src="/image/2.png"
          alt="Company Logo 2"
          class="rounded mx-1"
          contain
          width="50"
          height="50"
          loading="lazy"
        />
        <v-img
          src="/image/3.png"
          alt="Company Logo 3"
          class="rounded mx-1"
          contain
          width="50"
          height="50"
          loading="lazy"
        />
      </div>
    </v-app-bar>
    <v-main>
           <v-container class="py-10">
    <div v-if="loading" class="loading-text">
      Loading SubPublications...
    </div>

    <div v-else-if="publication">
      <h2 class="font-weight-bold mb-4">{{ publication.title }}</h2>
      <p class="text-body-1 mb-2">{{ publication.short_description }}</p>
      <p class="text-body-2 mb-4">{{ publication.description }}</p>

      <h4 v-if="publication.sub_publications && publication.sub_publications.length > 0" class="mb-4">
        SubPublications
      </h4>

      <v-row>
        <v-col
          v-for="(sub, index) in publication.sub_publications"
          :key="index"
          cols="12"
          sm="6"
        >
          <v-card class="pa-3 mb-3" outlined>
            <h5 class="mb-1">{{ sub.title }}</h5>
            <p class="text-body-2 mb-2">{{ sub.description }}</p>

            <v-row v-if="sub.images && sub.images.length > 0" dense>
              <v-col
                v-for="(img, imgIndex) in sub.images"
                :key="imgIndex"
                cols="6"
              >
                <v-img
                  :src="`https://ftrip.tech/storage/${img}`"
                  height="100"
                  class="rounded"
                  cover
                ></v-img>
              </v-col>
            </v-row>

            <div v-else class="no-image-placeholder-sub text-center">
              No SubPublication Image
            </div>
          </v-card>
        </v-col>
      </v-row>

    </div>

    <div v-else class="loading-text">
      Publication not found.
    </div>
  </v-container>
    </v-main>
 

    <Footer/>
    </v-app>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Footer from "../footer/Footer.vue";
const route = useRoute();
const publication = ref(null);
const loading = ref(true);

const fetchPublicationById = async () => {
  try {
    const id = route.params.id; // get the id from route
    const res = await axios.get(`https://ftrip.tech/api1/api/publications/${id}`);
    publication.value = res.data.data; // assuming API returns {data: {...}}
  } catch (error) {
    console.error("Error fetching publication:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPublicationById();
});
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.2rem;
}
h5 {
  font-size: 1rem;
}
p {
  color: #555;
}
.loading-text {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
.no-image-placeholder-sub {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  color: #999;
  font-weight: 500;
  text-align: center;
  border-radius: 6px;
}
</style>
