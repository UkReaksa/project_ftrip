<template>
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Service from "../service/service.vue";
const service = ref([])
const fetchservice = async () => {
  try {
    const response = await axios.get('http://localhost:8000/service')
    Service.value = response.data
  } catch (error) {
    console.error('Error fetching about us data:', error)
  }
}
onMounted( async () => {
  await fetchservice()
  console.log(Service.value)
})
// Colors
const navColor = "#05204A";
const navColor1 = "#FFFFFF";

// Drawer state
const drawer = ref(false);

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
 const icons = [
    'mdi-facebook',
    'mdi-phone',
    'mdi-linkedin',
    'mdi-instagram',
  ]

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

</script>

<style scoped>
.line-height-1 {
  line-height: 1;
}

.text-subtitle-2 {
  font-size: 1.1rem; /* Adjusted size */
}
body {
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
  color: #333;
}
.v-card, .v-list-item, .v-list-group__header {
  border-radius: 8px !important;
}
.main-content h3 {
  color: #05204A;
}
.main-content p, .main-content ul li {
  color: #4b5563;
}
</style>
