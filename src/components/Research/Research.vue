<template>
   <!-- Main Content -->
     <v-main class="grey lighten-4">
      <v-container fluid class="py-10">
        <v-row>
          <!-- Sidebar -->
          <v-col cols="12" md="3">
            <v-card class="rounded-lg pa-4" elevation="2">
              <v-list nav dense>
                <v-subheader class="font-weight-bold text-h6">About Us</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item @click="scrollToSection('who-we-are')">
                    <v-list-item-content>
                      <v-list-item-title>Who We Are</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="scrollToSection('our-vision')">
                    <v-list-item-content>
                      <v-list-item-title>Our Vision</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="scrollToSection('our-mission')">
                    <v-list-item-content>
                      <v-list-item-title>Our Mission</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="scrollToSection('strategic-objectives')">
                    <v-list-item-content>
                      <v-list-item-title>Strategic Objectives</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="scrollToSection('governance')">
                    <v-list-item-content>
                      <v-list-item-title>Governance</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="scrollToSection('founding-partners')">
                    <v-list-item-content>
                      <v-list-item-title>Founding Partners</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <!-- Main Content -->
          <v-col cols="12" md="9">
            <v-card class="rounded-lg pa-6" elevation="2">
              <section>
                <h2 class="text-h4 font-weight-bold" :style="{ color: '#05204A' }">About Us</h2>
                <div v-for="item in Service " :key="item.id">
                  <h3 :id="item.id" class="text-h5 font-weight-bold mt-6">{{ item.title }}</h3>
                  <p class="text-body-1 mt-2">
                    {{ item.description }}
                  </p>
                </div>


                <p class="text-body-1 font-weight-bold mt-4">With support and collaboration from:</p>
                <ul class="text-body-1 mt-2 pl-6">
                  <li>Fisheries Administration, Ministry of Agriculture, Forestry and Fisheries (MAFF)</li>
                  <li>Ministry of Industry, Science, Technology and Innovation (MISTI)</li>
                </ul>
              </section>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
