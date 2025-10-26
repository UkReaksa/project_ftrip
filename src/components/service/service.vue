<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">Service</h1>

    <v-row>
      <v-col
        v-for="item in services"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="400" elevation="3">
          <!-- Display first image -->
          <v-img
            v-if="item.image && item.image.length"
            :src="`https://ftrip.tech/storage/${item.image[0]}`"
            height="180px"
            cover
            class="rounded-t-lg"
          />

          <v-card class="ma-2 pa-2" @click="goToDetail(item.id)">
            <v-card-title class="text-h6 font-weight-bold">
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle class="text-caption">
              {{ item.description }}
            </v-card-subtitle>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const services = ref([]);

const fetchServices = async () => {
  try {
    const response = await axios.get("https://ftrip.tech/api1/api/services");
    services.value = response.data.data; // access the data array
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

onMounted(fetchServices);

function goToDetail(id) {
  router.push(`/service/${id}`);
}
</script>
