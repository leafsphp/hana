<script setup lang="ts">
import { onMounted } from 'vue'
import PartnerHero from './EventsHero.vue'
import PartnerCard from './PartnerCard.vue'
import PartnerList from './EventList.vue'
import Speak from './Speak.vue'
import data from '../events.json'
import { Event } from './type'

let spotlighted = $ref<Event | null>(null)

onMounted(() => {
  const plat = (data as Event[]).filter((d) => d.platinum)
  spotlighted = plat[Math.floor(Math.random() * plat.length)]
})
</script>

<template>
  <div class="PartnerPage">
    <PartnerHero />

    <!-- Spotlight -->
    <div class="spotlight">
      <div class="spotlight-inner">
        <h2>Partner Spotlight</h2>
        <PartnerCard v-if="spotlighted" hero :data="spotlighted" />
      </div>
    </div>

    <div class="featured">
      <h2>Featured Partners</h2>
      <!-- <PartnerList :filter="(p) => p.platinum" /> -->
      <a class="browse-all" href="./all.html">Browse All Partners</a>
    </div>

    <Speak />
  </div>
</template>

<style scoped>
.PartnerPage {
  padding-bottom: 16px;
}

.spotlight {
  background-color: var(--vt-c-bg-soft);
}

.spotlight-inner {
  padding: 36px 48px;
  max-width: 1280px;
  margin: 0px auto;
}

h2 {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 1.5em;
  color: var(--vt-c-text-2);
}

.featured {
  padding: 36px 48px;
  max-width: 960px;
  margin: 0px auto;
}

.browse-all {
  display: block;
  margin: 1.5em auto;
  width: 240px;
  text-align: center;
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.5s, color 0.5s;
}

.browse-all:hover {
  background-color: var(--vt-c-brand-dark);
}

@media (max-width: 768px) {
  .spotlight-inner, .featured {
    padding: 36px 28px;
  }
}
</style>
