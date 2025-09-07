<template>

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
      <v-container fluid class="py-10">
   

        <!-- Events Section -->
        <!-- <h1 class="mb-4">All News</h1> -->

        <v-row dense>
          <v-col
            v-for="event in newestEvents"
            :key="event.id"
            cols="12"
            md="4"
            class="mb-6"
          >
            <v-card class="pa-2 hover-card" elevation="3">
              <!-- Event Image -->
              <v-img
                v-if="event.image"
                :src="event.image"
                height="200"
                class="rounded mb-2"
                cover
              />
              <v-img
                v-else
                src="/image/default.jpg"
                height="200"
                class="rounded mb-2"
                cover
              />

              <!-- Title -->
              <v-card-title class="text-h6 font-weight-bold">
                {{ event.title }}
              </v-card-title>

              <!-- Description -->
              <v-card-text>
                <p class="description">{{ event.description }}</p>

                <!-- Date -->
                <p class="text-caption text-grey mt-3">
                  <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                  {{ new Date(event.createdAt).toLocaleDateString() }}
                </p>
              </v-card-text>

              <!-- Buttons -->
              <v-card-actions>
                <v-btn
                  v-if="event.link"
                  :href="event.link"
                  target="_blank"
                  text
                  color="primary"
                >
                  Learn More
                </v-btn>

                <v-btn
                  text
                  color="secondary"
                  @click="openDetails(event)"
                >
                  View Details
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Event Details Modal -->
      <v-dialog v-model="showModal" max-width="600">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">
            {{ selectedEvent?.title }}
          </v-card-title>

          <v-card-text>
            <p class="text-caption text-grey mt-3">
              <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
              {{ selectedEvent ? new Date(selectedEvent.createdAt).toLocaleDateString() : "" }}
            </p>

            <div v-if="selectedEvent?.video" class="mt-3 video-container">
              <iframe
                :src="getEmbedUrl(selectedEvent.video)"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <p>{{ selectedEvent?.description }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="closeDetails">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import Dashbord from "../home/main_home.vue";

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

  const regularMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
  );
  if (regularMatch && regularMatch[1]) {
    return `https://www.youtube.com/embed/${regularMatch[1]}`;
  }

  const shortMatch = url.match(
    /(?:https?:\/\/)?(?:youtu\.be)\/([a-zA-Z0-9_-]+)/
  );
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  return url;
};

// Compute newest 3 events
const newestEvents = computed(() => {
  return events.value
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
});
</script>

<style scoped>
.v-card {
  border-radius: 12px !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
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
</style>
