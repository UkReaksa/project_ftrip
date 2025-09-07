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

    <!-- Mobile Drawer -->
    <!-- <v-navigation-drawer v-model="drawer" temporary>
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
    </v-navigation-drawer> -->

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
                <div v-for="item in about_us" :key="item.id">
                  <h3 :id="item.id" class="text-h5 font-weight-bold mt-6">{{ item.title }}</h3>
                  <p class="text-body-1 mt-2">
                    {{ item.description }}
                  </p>
                </div>

                <!-- <h3 id="our-vision" class="text-h5 font-weight-bold mt-6">Our Vision</h3>
                <p class="text-body-1 mt-2">
                  To become a leading national platform for food technology research and innovation that contributes to safe, sustainable, and inclusive food systems in Cambodia.
                </p>

                <h3 id="our-mission" class="text-h5 font-weight-bold mt-6">Our Mission</h3>
                <p class="text-body-1 mt-2">
                  To strengthen research, technology transfer, and innovation capacity in food systems by linking universities, government agencies, private sector actors, and development partners.
                </p>

                <h3 id="strategic-objectives" class="text-h5 font-weight-bold mt-6">Strategic Objectives</h3>
                <ul class="text-body-1 mt-2 pl-6">
                  <li>Promote applied research and innovation in food technology and value chains.</li>
                  <li>Support technology transfer and commercialization of research outcomes.</li>
                  <li>Provide technical assistance and services to SMEs, entrepreneurs, and stakeholders.</li>
                  <li>Strengthen human capacity through training, knowledge sharing, and networking.</li>
                  <li>Facilitate collaboration among national and international partners.</li>
                </ul>

                <h3 id="governance" class="text-h5 font-weight-bold mt-6">Governance</h3>
                <ul class="text-body-1 mt-2 pl-6">
                  <li><b>Steering Committee (SC):</b> Provides policy guidance and oversight.</li>
                  <li><b>Operations Management Committee (OMC):</b> Oversees daily operations and management.</li>
                  <li><b>Technical Units (TU):</b> Thematic teams that provide technical expertise and implement activities.</li>
                  <li><b>Secretariat:</b> Based at the Royal University of Agriculture, coordinating activities and communication.</li>
                </ul>

                <h3 id="founding-partners" class="text-h5 font-weight-bold mt-6">Founding Partners</h3>
                <p class="text-body-1 mt-2">
                  The Food Technology, Research and Innovation Platform (FTRIP) was jointly established through the collaboration of national institutions, academia, industry associations, and international partners.
                </p>

                <p class="text-body-1 font-weight-bold mt-4">Its founding partners include:</p>
                <ul class="text-body-1 mt-2 pl-6">
                  <li>United Nations Industrial Development Organization (UNIDO) under the CAPFISH–Capture Programme</li>
                  <li>Royal University of Agriculture (RUA)</li>
                  <li>National University of Battambang (NUBB)</li>
                  <li>Institute of Technology of Cambodia (ITC)</li>
                  <li>Preak Leap National Institute of Agriculture (PNIA)</li>
                  <li>Cambodia Food Manufacture Association (CFMA)</li>
                  <li>Federation of Associations for Small and Medium Enterprises of Cambodia (FASMEC)</li>
                </ul> -->

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
import { onMounted, ref } from "vue";
import axios from "axios";
const about_us = ref([])
const fetchAboutUs = async () => {
  try {
    const response = await axios.get('http://localhost:8000/about_us')
    about_us.value = response.data
  } catch (error) {
    console.error('Error fetching about us data:', error)
  }
}
onMounted( async () => {
  await fetchAboutUs()
  console.log(about_us.value)
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
