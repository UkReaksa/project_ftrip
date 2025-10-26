<template>
  <v-container class="py-10">
    <div class="mb-6">
      <!-- Search Field -->
      <v-text-field
        v-model="searchQuery"
        label="Search Publications"
        append-icon="mdi-magnify"
        outlined
        class="border-thin"
        dense
        hide-details
        clearable
        @keyup.enter="searchPublications"
      ></v-text-field>


    </div>

    <div v-if="filteredPublications.length === 0" class="loading-text">
      No Publications Found
    </div>

    <div v-else>
      <v-row
        v-for="(item, index) in filteredPublications"
        :key="item.id"
        class="mb-6"
      >
        <v-col cols="12">
          <v-card outlined rounded elevation="2" class="pa-4">
            <v-row align="start">
              <!-- Text -->
              <v-col cols="12" md="6">
                <h2 class="font-weight-bold mb-2">{{ item.title }}</h2>
                <p class="text-body-1 mb-4">{{ item.short_description }}</p>
                <p class="text-body-2 mb-2">{{ item.description }}</p>

                <v-btn
                  color="primary"
                  @click="goToSubPublication(item.id)"
                  v-if="item.sub_publications && item.sub_publications.length > 0"
                >
                  See All SubPublications
                </v-btn>
              </v-col>

              <!-- Main Image -->
              <v-col cols="12" md="6">
                <v-img
                  v-if="item.image && item.image.length > 0"
                  :src="`https://ftrip.tech/storage/${item.image[0]}`"
                  height="250px"
                  class="rounded-lg"
                  cover
                ></v-img>
                <div v-else class="no-image-placeholder">
                  No Image Available
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const publication = ref([]);
const searchQuery = ref("");
const router = useRouter();

// Fetch all publications
const fetchPublication = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api1/api/publications");
    publication.value = response.data.data;
  } catch (error) {
    console.error("Error fetching publication:", error);
  }
};

onMounted(() => {
  fetchPublication();
});

// Navigate to SubPublication page
function goToSubPublication(pubId) {
  router.push({ name: "all_publication", params: { id: pubId } });
}

// Computed filtered publications based on searchQuery
const filteredPublications = computed(() => {
  if (!searchQuery.value) return publication.value;
  return publication.value.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Optional: function for the Search button (same as computed)
function searchPublications() {
  // just trigger computed; nothing needed
  console.log("Search triggered for:", searchQuery.value);
}
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
}
p {
  color: #555;
}
.loading-text {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
.no-image-placeholder {
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
