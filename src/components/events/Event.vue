<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">All Events</h1>

    <v-row>
      <v-col
        v-for="(item, index) in events"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="400" elevation="3">
          <v-img :src="item.image" height="180px" cover class="rounded-t-lg" />

          <v-card class="ma-2 pa-2" @click="goToDetail(index)">
            <v-card-title class="text-h6 font-weight-bold">
               {{ item.title }}
            </v-card-title>

          <v-card-subtitle class="text-caption ">
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
const events = ref([]);

const fetchEvents = async () => {
  try {
    const response = await axios.get("http://localhost:8000/events");
    events.value = response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

onMounted(fetchEvents);

function goToDetail(index) {
  router.push(`/event/${index}`); // 👈 go by index
}
</script>
