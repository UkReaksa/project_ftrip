<template>
  <v-app>
    <v-app-bar :color="navColor"></v-app-bar>

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
        <v-btn to="/dadhbord_research" text>Research & Innovation</v-btn>
        <v-btn to="/events" text>Events</v-btn>
        <v-btn to="/dadhbord_publication" text>Publications</v-btn>
        <v-btn to="/dashbord_about" text>About Us</v-btn> <!-- Fixed route -->
      </div>

      <v-app-bar-nav-icon
        class="d-md-none mr-4"
        @click.stop="drawer = !drawer"
      />

      <div class="d-flex align-center mr-4">
        <v-img src="/image/1.png" width="50" height="50" />
        <v-img src="/image/2.png" width="50" height="50" />
        <v-img src="/image/3.png" width="50" height="50" />
      </div>
    </v-app-bar>

    <v-main class="my-10" v-if="service">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" lg="10" xl="8">
            <!-- Header Section -->
            <div class="text-center mb-8">
              <h1 class="text-h3 font-weight-bold mb-4 text-primary">
                {{ service.title }}
              </h1>

              <div class="d-flex align-center justify-center flex-wrap text-grey-darken-1 mb-6">
                <div v-if="service.author" class="d-flex align-center mr-6 mb-2">
                  <v-icon size="small" class="mr-2">mdi-account-circle-outline</v-icon>
                  <span class="text-caption font-weight-bold">{{ service.author.name }}</span>
                </div>

                <div v-if="service.published_date" class="d-flex align-center mr-6 mb-2">
                  <v-icon size="small" class="mr-2">mdi-calendar-blank-outline</v-icon>
                  <span class="text-caption font-weight-bold">{{ formatDate(service.published_date) }}</span>
                </div>

                <div v-if="service.category" class="d-flex align-center mb-2">
                  <v-icon size="small" class="mr-2">mdi-tag-outline</v-icon>
                  <v-chip size="small" :color="navColor" variant="flat" label>{{ service.category.name }}</v-chip>
                </div>
              </div>
            </div>

            <!-- Featured Image Carousel -->
            <v-card elevation="4" rounded="lg" class="overflow-hidden mb-8">
              <v-carousel cycle hide-delimiter-background height="500">
                <v-carousel-item
                  v-for="(img, idx) in service.image"
                  :key="idx"
                >
                  <v-img
                    :src="`http://127.0.0.1:8000/storage/${img}`"
                    cover
                    height="500"
                  />
                </v-carousel-item>
              </v-carousel>
            </v-card>

            <!-- Content with Embedded Images -->
            <div class="description-box text-body-1 leading-relaxed">
              <template v-for="(block, index) in descriptionBlocks" :key="index">
                <!-- Text Block -->
                <p v-if="block.type === 'text'" class="mb-4">{{ block.content }}</p>
                
                <!-- Image Block -->
                <ImageCard
                  v-else-if="block.type === 'image'"
                  :src="block.src"
                  :alt="block.alt"
                  :caption="block.caption"
                  class="my-8"
                />
              </template>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div v-else class="text-center my-10">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <!--  Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Footer from "../footer/Footer.vue";

// Define the ImageCard component inline
const ImageCard = {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    },
    caption: {
      type: String,
      default: ''
    }
  },
  template: `
    <v-card class="image-card" elevation="2" rounded="lg">
      <v-img
        :src="src"
        :alt="alt"
        cover
        height="auto"
        max-height="400"
        class="align-end"
      />
      <v-card-text v-if="caption" class="text-center text-caption font-italic text-medium-emphasis py-2 px-4">
        {{ caption }}
      </v-card-text>
    </v-card>
  `,
  name: 'ImageCard'
};

const route = useRoute();
const service = ref(null);

const fetchServiceById = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`https://ftrip.tech/api1/api/services/${id}`);
    service.value = response.data.data;
  } catch (error) {
    console.error("Error fetching service detail:", error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Computed property to parse the description into blocks
const descriptionBlocks = computed(() => {
  if (!service.value || !service.value.description) return [];

  const blocks = [];
  const parts = service.value.description.split(/(\{\{img:.*?\}\})/g); // Split by image placeholders

  parts.forEach(part => {
    if (part.startsWith('{{img:') && part.endsWith('}}')) {
      const imgContent = part.substring(6, part.length - 2); // Remove '{{img:' and '}}'
      const [src, ...captionParts] = imgContent.split('|');
      const caption = captionParts.join('|') || ''; // Join parts back in case caption has pipes

      blocks.push({
        type: 'image',
        src: src.trim().startsWith('http') ? src.trim() : `https://ftrip.tech/storage/${src.trim()}`,
        alt: caption.trim() || 'Service Image',
        caption: caption.trim()
      });
    } else if (part.trim() !== '') {
      // Split text into paragraphs (separated by newlines)
      part.split('\n').filter(p => p.trim() !== '').forEach(p => {
        blocks.push({
          type: 'text',
          content: p.trim()
        });
      });
    }
  });
  return blocks;
});

// Colors
const navColor = "#05204A";
const navColor1 = "#ffffff";

onMounted(fetchServiceById);
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.8;
}

.description-box {
  background: #f9fafb;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.text-primary {
  color: #05204a;
}

/* Optional: Additional styling for the embedded image card */
.image-card {
  max-width: 100%; 
  margin: 0 auto;
  border: 1px solid #e0e0e0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .description-box {
    padding: 20px;
  }
  
  .text-h3 {
    font-size: 1.75rem !important;
  }
}
</style>