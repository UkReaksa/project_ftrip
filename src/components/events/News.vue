<template>
  <v-app>   
    <navbar />

    <v-main class="main-background"> <!-- Applied page background color -->
     
      <!-- Added a frame/border around the entire content -->
      <v-container class="main-content-frame pa-4 pa-md-6 my-5"> 
        <!-- Back Button -->
        <v-btn color="primary" class="mb-6" @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back to All Posts
        </v-btn>

        <v-row>
          <!-- --------------------------------- -->
          <!-- LEFT COLUMN: MAIN CONTENT (8/12) -->
          <!-- --------------------------------- -->
          <v-col cols="12" md="8">
            <!-- Show post only if available -->
            <v-card v-if="post" elevation="0" rounded class="pa-6 custom-post-card">
              <h2 class="text-h4 font-weight-bold mb-4">{{ post.title }}</h2>
              <p class="mb-8 text-body-1">{{ post.content }}</p>

              <!-- Images Grid (Clean Style) -->
              <div v-if="post.images && post.images.length" class="mb-8">
                <h3 class="text-h6 mb-4 font-weight-medium">🖼️ Attached Images</h3>
                <v-row dense>
                  <v-col
                    v-for="img in post.images"
                    :key="img.id"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <!-- Applying simplified image style -->
                    <v-img
                      :src="storageUrl(img.image_url)"
                      height="200"
                      class="rounded-sm mb-2 clean-image"
                      cover
                    ></v-img>
                  </v-col>
                </v-row>
              </div>

              <!-- Videos Grid (Clean Style) -->
              <div v-if="post.videos && post.videos.length">
             
                <v-row dense>
                  <v-col
                    v-for="vid in post.videos"
                    :key="vid.id"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <!-- Wrapper now only controls layout, not "chunky" style -->
                    <div class="video-wrapper">
                      
                      <template v-if="getYouTubeEmbedUrl(vid.video_url)">
                        <!-- YouTube Iframe - uses clean video styling -->
                       
                      </template>
                      <template v-else>
                        <!-- Direct File Video Tag -->
                        <video
                          controls
                          class="clean-video-box"
                        >
                          <source :src="storageUrl(vid.video_url)" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </template>

                      <!-- Title is now simple and left-aligned -->
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

          <!-- ------------------------------ -->
          <!-- RIGHT COLUMN: SIDEBAR (4/12) -->
          <!-- ------------------------------ -->
          <v-col cols="12" md="4">
            <!-- Mock Sidebar: Featured Video Block -->
            <v-card elevation="2" rounded="lg" class="pa-4 mb-4 sidebar-card">
              <h4 class="text-subtitle-1 font-weight-bold mb-3">Graduation Day at NUBB</h4>
              
              <div class="sidebar-video-container">
                <!-- Use a placeholder for the prominent video shown in the screenshot -->
                <iframe 
                  src="https://www.youtube.com/embed/JbfMOqPGDVQ"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  class="sidebar-video-iframe"
                  title="Featured YouTube video player"
                ></iframe>
              </div>
            </v-card>
            
            <!-- Mock Sidebar: Info/Social Block -->
            <v-card elevation="0" rounded="lg" class="pa-4 sidebar-card secondary-sidebar">
              <div class="d-flex align-center mb-2">
                <v-avatar size="48" rounded="sm">
                  <v-img src="https://placehold.co/48x48/05204A/FFFFFF?text=FTRIP" alt=""></v-img>
                </v-avatar>
                <div class="ml-3">
                  <p class="font-weight-bold text-subtitle-1 mb-0">Ftrip</p>
                  <p class="text-caption text-medium-emphasis mb-0">81,069 followers</p>
                </div>
              </div>
              <v-divider class="my-2"></v-divider>
              <v-btn block variant="tonal" color="primary" size="small" class="mt-2">
                <v-icon start>mdi-thumb-up-outline</v-icon>
                Follow Page
              </v-btn>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import navbar from "../navbar/navbar.vue";

// --- Setup ---
const route = useRoute();
const router = useRouter();
const post = ref(null);
const loading = ref(false);

// Get post ID from route params https://ftrip.tech/api1
const id = route.params.id;

 const BASE_API_URL = "https://ftrip.tech/api1"; 
// --- Methods ---

// Helper function to extract and format YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  // Regex to match various YouTube URL formats (watch?v=, youtu.be/, embed/, etc.)
  // It extracts the 11-character video ID
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  if (match && match[1]) {
    // Return a clean embed URL
    // Adding rel=0 to prevent related videos after playback
    return `https://www.youtube.com/embed/${match[1]}?rel=0`;
  }
  return null;
};


// Convert storage path to full URL (used for non-YouTube video files and images)
const storageUrl = (path) => {
  // Use the BASE_API_URL for storage paths
  if (!path) return 'https://placehold.co/200x200/cccccc/333333?text=No+Image';
  // If it's already a full HTTP URL (like a YouTube link that failed the regex, or a different external link), return it.
  if (path.startsWith('http')) return path; 
  return `https://ftrip.tech/storage/${path}`;
};

// Fetch post by ID
const fetchPost = async () => {
  if (!id) {
    console.warn("No post ID found in route params.");
    return;
  }
  loading.value = true;
  try {
    const res = await axios.get(`${BASE_API_URL}/api/posts/${id}`);
    post.value = res.data.data || null;
    // For local testing, ensure the nested media arrays exist
    if (post.value && !post.value.images) post.value.images = [];
    if (post.value && !post.value.videos) post.value.videos = [];
    console.log("Fetched post:", post.value);
  } catch (err) {
    console.error("Error fetching post:", err.response?.data || err.message);
    // Optionally redirect if post not found
    // router.push("/events");
  } finally {
    loading.value = false;
  }
};

// Back to all posts page
const goBack = () => {
  // Make sure this route matches your list view
  router.push("/events");
};

// --- Lifecycle ---
onMounted(fetchPost);
</script>

<style scoped>
/* Base Styles */
.v-card {
  border-radius: 8px;
}

h2, h3 {
  color: #05204A; /* Deep Blue Primary Color */
}

/* ---------------------------------- */
/* NEW MAIN BORDER STYLES */
/* ---------------------------------- */
.main-background {
  background-color: #f5f5f5; /* Light gray background for the page */
}

/* Add a border around the entire main content block */
.main-content-frame {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Main Content Card - No harsh borders/shadows, now wrapped by the frame */
.custom-post-card {
  border: none;
  background: #ffffff;
  box-shadow: none !important;
  padding: 0 !important; /* Remove v-card pa-6 as it's handled by the container frame padding */
}

/* ---------------------------------- */
/* CLEAN UNIVERSITY LAYOUT STYLES */
/* ---------------------------------- */

/* Images (Clean Style) */
.clean-image {
  /* Minimal styling: slight rounded corners, light border, minimal shadow */
  border-radius: 4px; 
  border: 1px solid #e0e0e0; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Very subtle lift */
  transition: none;
}

/* Videos Wrapper (Used for layout, clean style) */
.video-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align left to match image title placement */
  padding: 0; 
  background-color: transparent; 
  border: none; 
  box-shadow: none;
  height: 100%; 
}

/* Video element/iframe (Clean Style) */
.clean-video-box {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  /* Minimal border/shadow */
  border: 1px solid #e0e0e0; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
}

/* Video title/description (Simple, left-aligned) */
.video-title {
  font-weight: 500; 
  color: #333;
  text-align: left;
  margin-top: 5px; 
  padding: 0;
  border-bottom: none; 
  width: 100%; 
}

/* ---------------------------------- */
/* SIDEBAR STYLES (MATCHING SCREENSHOT) */
/* ---------------------------------- */

.sidebar-card {
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.secondary-sidebar {
    background-color: #fcfcfc;
}

/* Aspect ratio container for prominent sidebar video (16:9) */
.sidebar-video-container {
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (9 / 16) */
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
