<template>
  <v-container class="py-10">
    <!-- Loading State -->
    <div v-if="publication.length === 0" class="loading-text">
      Loading Publications...
    </div>

    <!-- Publication Items -->
    <div v-else>
      <v-row
        v-for="(item, index) in publication"
        :key="item.id"
        align="center"
        class="mb-12"
        :class="{'flex-row-reverse': index % 2 !== 0}"
      >
        <!-- Text -->
        <v-col cols="12" md="6">
          <h2 class="font-weight-bold mb-2">{{ item.title }}</h2>
          <p class="text-body-1">{{ item.short_description }}</p>
        </v-col>

        <!-- Image -->
        <v-col cols="12" md="6">
          <v-img
            :src="item.image"
            height="250px"
            class="rounded-lg"
            cover
          ></v-img>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const publication = ref([]); // ✅ fixed variable name

const fetchPublication = async () => {
  try {
    const response = await axios.get("http://localhost:8000/publication");
    publication.value = response.data;
  } catch (error) {
    console.error("Error fetching publication:", error);
  }
};

onMounted(() => {
  fetchPublication();
});
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
</style>
