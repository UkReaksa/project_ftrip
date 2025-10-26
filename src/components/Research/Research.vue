<template>

  <v-main class="grey lighten-4">
    <v-container fluid class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="9">
          <v-card class="rounded-lg pa-6" elevation="0" style="background-color: transparent;">
            <section class="main-content">
              <h2 class="text-h4 font-weight-bold" :style="{ color: '#05204A' }">Research & Innovation</h2>

              <!-- Display research/services -->
              <div v-for="item in service" :key="item.id" class="mt-6">
                <!-- Content container with border -->
                <div class="content-border pa-4 mb-6">
                  <v-row align="start" no-gutters>
                    <!-- Text content on left -->
                    <v-col cols="12" md="8" class="pr-md-4">
                      <h3 :id="'section-' + item.id" class="text-h5 font-weight-bold mb-3">{{ item.title }}</h3>

                      <!-- Description with See More -->
                      <p
                        class="text-body-1 description"
                        :class="{ 'clamped': !expandedItems[item.id] }"
                      >
                        {{ item.description }}
                      </p>
                      <v-btn
                        text
                        small
                        class="mt-2"
                        variant="outlined"
                        @click="toggleExpand(item.id)"
                      >
                        {{ expandedItems[item.id] ? "See Less" : "See More" }}
                      </v-btn>
                    </v-col>

                    <!-- Images on right -->
                    <v-col cols="12" md="4">
                      <div v-if="parseImages(item.images).length > 0" class="images-container">
                        <div
                          v-for="(img, index) in parseImages(item.images)"
                          :key="index"
                          class="image-item mb-3"
                        >
                          <v-img
                            :src="storageUrl(img)"
                            :alt="`${item.title} image ${index + 1}`"
                            height="150"
                            cover
                            class="rounded-lg"
                          ></v-img>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>

              <div class="content-border pa-4 mt-8">
                <p class="text-body-1 font-weight-bold mb-2">With support and collaboration from:</p>
                <ul class="text-body-1 mt-2 pl-6">
                  <li>Fisheries Administration, Ministry of Agriculture, Forestry and Fisheries (MAFF)</li>
                  <li>Ministry of Industry, Science, Technology and Innovation (MISTI)</li>
                </ul>
              </div>
            </section>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
=======
  <v-app>
    <v-container fluid>
      <v-row>
        <!-- Left Sidebar -->
        <v-col cols="12" md="3" class="pa-4">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-icon class="mr-2">mdi-chevron-right</v-icon>
                Thematic Areas
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-icon class="mr-2" color="primary">mdi-square</v-icon>
                Key Initiatives
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Content -->
        <v-col cols="12" md="9" class="pa-4">
          <!-- Thematic Areas -->
          <div class="mb-8">
            <h3 class="text-h5 font-weight-bold mb-4">Thematic Areas</h3>
            <v-row>
              <v-col cols="12" md="6">
                <ul>
                  <li>Food safety and quality assurance</li>
                  <li>Postharvest handling and storage</li>
                  <li>Food processing and value addition</li>
                  <li>Packaging innovation</li>
                  <li>Nutrition and sustainable diets</li>
                  <li>Climate-smart food technologies</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  src="/image1.jpg"
                  aspect-ratio="16/9"
                  class="mb-3 rounded"
                ></v-img>
                <v-img
                  src="/image2.jpg"
                  aspect-ratio="16/9"
                  class="mb-3 rounded"
                ></v-img>
                <v-img
                  src="/image3.jpg"
                  aspect-ratio="16/9"
                  class="mb-3 rounded"
                ></v-img>
              </v-col>
            </v-row>
          </div>

          <!-- Key Initiatives -->
          <div>
            <h3 class="text-h5 font-weight-bold mb-4">Key Initiatives</h3>
            <v-row>
              <v-col cols="12" md="6">
                <ul>
                  <li>Food safety and quality assurance</li>
                  <li>Postharvest handling and storage</li>
                  <li>Food processing and value addition</li>
                  <li>Packaging innovation</li>
                  <li>Nutrition and sustainable diets</li>
                  <li>Climate-smart food technologies</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  src="/image1.jpg"
                  aspect-ratio="16/9"
                  class="mb-3 rounded"
                ></v-img>
                <v-img
                  src="/image2.jpg"
                  aspect-ratio="16/9"
                  class="mb-3 rounded"
                ></v-img>
                <v-img
                  src="/image3.jpg"
                  aspect-ratio="16/9"
                  class="mb-3 rounded"
                ></v-img>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
>>>>>>> d25964936f7b86ee7ae9cce80ed6117548d8334c
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const service = ref([]);
const expandedItems = ref({}); // store expanded state per item

// Toggle expand/collapse
const toggleExpand = (id) => {
  expandedItems.value[id] = !expandedItems.value[id];
};

// Fetch research/services
const fetchService = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api1/api/service-research-innovations");
    service.value = response.data.data || [];

    // Initialize expanded state (false for all items)
    service.value.forEach((item) => {
      expandedItems.value[item.id] = false;
    });

    console.log("Fetched service data:", service.value);
  } catch (error) {
    console.error("Error fetching service data:", error);
  }
};

// Helper: build full storage URL
const storageUrl = (path) => `https://ftrip.tech/storage/${path}`;

// Parse JSON string images to array
const parseImages = (images) => {
  try {
    return JSON.parse(images);
  } catch {
    return [];
  }
};

onMounted(fetchService);
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
.v-card,
.v-list-item,
.v-list-group__header {
  border-radius: 8px !important;
}
.main-content h3 {
  color: #05204A;
}
.main-content p,
.main-content ul li {
  color: #4b5563;
}

/* New styles for bordered layout */
.content-border {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background-color: white;
  transition: border-color 0.3s ease;
}
.content-border:hover {
  border-color: #05204A;
}

.images-container {
  width: 100%;
}

.image-item {
  transition: transform 0.3s ease;
}
.image-item:hover {
  transform: scale(1.02);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .content-border {
    margin-bottom: 20px;
  }

  .images-container {
    margin-top: 20px;
  }

  .pr-md-4 {
    padding-right: 0 !important;
  }
}

/* Text alignment */
.text-content {
  text-align: left;
}

/* Image styling */
.v-img {
  border: 1px solid #e2e8f0;
}

/* List styling */
ul {
  margin-bottom: 0;
}
li {
  margin-bottom: 4px;
}

/* Clamp text for "See More" */
.description.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 6; /* show 6 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
