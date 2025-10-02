<template>
 <div class="px-10 ">
  <h1 class="section-title">FTRIP Founders</h1>
</div><br>
    <v-row dense justify="space-around" align="center" mt-5>
      <!-- Loop through partners -->
      <v-col
        v-for="(item, index) in partners"
        :key="index"
        cols="12"
        sm="6"
        md="5"
      
      >
        <v-card class="pa-3" outlined @click="goToDetail(index)" style="cursor: pointer;">
          <v-row>
            <v-col cols="3" class="d-flex align-center justify-center">
              <v-img
                :src="item.image"
                max-width="100"
              ></v-img>
            </v-col>
            <v-col cols="9">
              <h3 class="headline">{{ item.title }}</h3>
              <p><strong>Phone:</strong> {{ item.phone }}</p>
              <p><strong>Email:</strong> {{ item.email }}</p>
              <p><strong>Address:</strong> {{ item.address }}</p>
              <p>
                <strong>Website:</strong>
                <a :href="item.website" target="_blank">{{ item.website }}</a>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const partners = ref([]);
const router = useRouter();

const fetchPartners = async () => {
  try {
    const response = await axios.get('http://localhost:8000/partners');
    partners.value = response.data;
  } catch (error) {
    console.error('Error fetching partners:', error);
  }
};

onMounted(fetchPartners);

function goToDetail(index) {
  router.push(`/partner/${index}`);
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
a {
  color: #1976d2;
  text-decoration: none;
}

</style>
