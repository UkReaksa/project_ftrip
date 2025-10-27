<template>
  <v-app>
    <navbar />

    <v-main class="main-background">
      <v-container class="main-content-frame pa-4 pa-md-6 my-5">
        <!-- Back Button -->
        <v-btn color="primary" class="mb-6" @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back to All Posts
        </v-btn>

        <v-row>
          <!-- LEFT COLUMN: MAIN CONTENT -->
          <v-col cols="12" md="8">
            <v-card v-if="post" elevation="0" rounded class="pa-6 custom-post-card">
              <h2 class="text-h4 font-weight-bold mb-4">{{ post.title }}</h2>

              <!-- Render content safely with bold/underline/italic -->
              <div v-html="sanitizedContent" class="mb-8 text-body-1"></div>

              <!-- Images -->
              <div v-if="post.images && post.images.length" class="mb-8">
                <h3 class="text-h6 mb-4 font-weight-medium">🖼️ Attached Images</h3>
                <v-row dense>
                  <v-col v-for="img in post.images" :key="img.id" cols="12" sm="6" md="4">
                    <v-img 
                      :src="storageUrl(img.image_url)" 
                      height="200" 
                      class="rounded-sm mb-2 clean-image" 
                      cover
                    ></v-img>
                  </v-col>
                </v-row>
              </div>

              <!-- Videos -->
              <div v-if="post.videos && post.videos.length">
                <v-row dense>
                  <v-col v-for="vid in post.videos" :key="vid.id" cols="12" sm="6" md="4">
                    <div class="video-wrapper">
                      <template v-if="getYouTubeEmbedUrl(vid.video_url)">
                        <iframe
                          :src="getYouTubeEmbedUrl(vid.video_url)"
                          frameborder="0"
                          allowfullscreen
                          class="clean-video-box"
                        ></iframe>
                      </template>
                      <template v-else>
                        <video controls class="clean-video-box">
                          <source :src="storageUrl(vid.video_url)" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </template>
                      <p class="video-title">{{ vid.title || 'No title provided' }}</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <!-- Loader or empty state -->
            <div v-else class="text-center my-10">
              <v-progress-circular indeterminate color="primary" size="64" width="6" />
              <p class="mt-4 text-h6 text-medium-emphasis">Loading post...</p>
            </div>
          </v-col>

          <!-- RIGHT COLUMN: SIDEBAR -->
          <v-col cols="12" md="4">
            <v-card elevation="2" rounded="lg" class="pa-4 mb-4 sidebar-card">
              <h4 class="text-subtitle-1 font-weight-bold mb-3">Featured Video</h4>
              <div class="sidebar-video-container">
                <iframe
                  src="https://www.youtube.com/embed/JbfMOqPGDVQ"
                  frameborder="0"
                  allowfullscreen
                  class="sidebar-video-iframe"
                  title="Featured YouTube video player"
                ></iframe>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import DOMPurify from "dompurify";
import { marked } from "marked";
import navbar from "../navbar/navbar.vue";

const route = useRoute();
const router = useRouter();
const post = ref(null);

const BASE_API_URL = "https://ftrip.tech/api1";

// Get post ID from route
const id = route.params.id;

// Fetch post
const fetchPost = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/posts/${id}`);
    post.value = res.data.data || null;

    if (post.value && !post.value.images) post.value.images = [];
    if (post.value && !post.value.videos) post.value.videos = [];
  } catch (err) {
    console.error(err);
  }
};

// Sanitize and parse Markdown content
const sanitizedContent = computed(() => {
  if (!post.value || !post.value.content) return "";

  // Parse Markdown to HTML
  let html = marked.parse(post.value.content);

  // Optional: support underline using __text__
  html = html.replace(/__(.*?)__/g, "<u>$1</u>");

  // Sanitize HTML
  return DOMPurify.sanitize(html);
});

// Helper: Storage URL
const storageUrl = (path) => {
  if (!path) return 'https://placehold.co/200x200/cccccc/333333?text=No+Image';
  if (path.startsWith('http')) return path;
  return `https://ftrip.tech/storage/${path}`;
};

// YouTube embed helper
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
};

// Go back to list
const goBack = () => router.push("/events");

onMounted(fetchPost);
</script>

<style scoped>
/* Base Styles */
.v-card {
  border-radius: 8px;
}

h2, h3 {
  color: #05204A; 
}

/* Page & Frame */
.main-background {
  background-color: #f5f5f5;
}
.main-content-frame {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Post card */
.custom-post-card {
  border: none;
  background: #ffffff;
  box-shadow: none !important;
  padding: 0 !important;
}

/* Images & Videos */
.clean-image {
  border-radius: 4px; 
  border: 1px solid #e0e0e0; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0; 
  background-color: transparent; 
  border: none; 
  box-shadow: none;
  height: 100%; 
}

.clean-video-box {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  border: 1px solid #e0e0e0; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
}

.video-title {
  font-weight: 500; 
  color: #333;
  text-align: left;
  margin-top: 5px; 
  padding: 0;
  border-bottom: none; 
  width: 100%; 
}

/* Sidebar */
.sidebar-card {
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.sidebar-video-container {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar-video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
