<template>
  <v-app>
    <!-- Navbar -->
    <navbar/>

    <v-main class="my-10" v-if="service">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" lg="10" xl="8">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-h3 font-weight-bold mb-4 text-primary">
                {{ service.title }}
              </h1>
            </div>

            <!-- Image Carousel -->
            <v-carousel cycle hide-delimiter-background height="500">
              <v-carousel-item
                v-for="(img, idx) in service.image"
                :key="idx"
              >
                <v-img
                  :src="`https://ftrip.tech/storage/${img}`"
                  cover
                  height="500"
                />
              </v-carousel-item>
            </v-carousel>

            <!-- 📄 Description -->
            <div class="mt-10 text-body-1 leading-relaxed">
              <template v-for="(block, index) in descriptionBlocks" :key="index">
                <!-- Text -->
                <p
                  v-if="block.type === 'text'"
                  class="mb-6"
                  v-html="block.content"
                ></p>

                <!-- Image -->
                <div v-else-if="block.type === 'image'" class="text-center mb-8">
                  <v-img
                    :src="block.src"
                    :alt="block.alt"
                    max-height="400"
                    contain
                    class="rounded-lg mx-auto mb-2"
                  />
                  <div v-if="block.caption" class="text-caption text-medium-emphasis">
                    {{ block.caption }}
                  </div>
                </div>
              </template>
            </div>

            <!-- 🎥 YouTube Links Section -->
            <div v-if="service.links && service.links.length" class="text-center mt-8">
              <h3 class="text-h6 font-weight-bold mb-4 text-primary">Watch Related Videos</h3>

              <div class="flex flex-wrap justify-center gap-4">
                <a
                  v-for="(link, idx) in service.links"
                  :key="idx"
                  :href="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-btn
                    color="red darken-1"
                    prepend-icon="mdi-youtube"
                    variant="flat"
                  >
                    Watch on YouTube
                  </v-btn>
                </a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div v-else class="text-center my-10">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <Footer />
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Footer from "../footer/Footer.vue";
import navbar from "../navbar/navbar.vue";

const route = useRoute();
const service = ref(null);

// ✅ Fetch Service by ID
const fetchServiceById = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`https://ftrip.tech/api1/api/expertises/${id}`);
    service.value = response.data.data;
  } catch (error) {
    console.error("Error fetching service detail:", error);
  }
};

// ✅ Make URLs clickable in text (non-YouTube)
const makeLinksClickable = (text) => {
  if (!text) return "";
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#1976D2; text-decoration:underline;">${url}</a>`
  );
};

// ✅ Parse description into blocks (text + optional embedded images)
const descriptionBlocks = computed(() => {
  if (!service.value || !service.value.description) return [];

  const blocks = [];
  const parts = service.value.description.split(/(\{\{img:.*?\}\})/g);

  parts.forEach((part) => {
    if (part.startsWith("{{img:") && part.endsWith("}}")) {
      const imgContent = part.slice(6, -2);
      const [src, ...captionParts] = imgContent.split("|");
      blocks.push({
        type: "image",
        src: src.trim().startsWith("http")
          ? src.trim()
          : `https://ftrip.tech/storage/${src.trim()}`,
        alt: captionParts.join("|").trim() || "Service Image",
        caption: captionParts.join("|").trim(),
      });
    } else if (part.trim() !== "") {
      part
        .split("\n")
        .filter((p) => p.trim() !== "")
        .forEach((p) => {
          blocks.push({
            type: "text",
            content: makeLinksClickable(p.trim()),
          });
        });
    }
  });

  return blocks;
});

onMounted(fetchServiceById);
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.8;
}

.text-primary {
  color: #05204a;
}

.description-box a {
  color: #1976d2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 1.75rem !important;
  }
}
</style>
