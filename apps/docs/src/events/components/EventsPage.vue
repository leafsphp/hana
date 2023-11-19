<script setup lang="ts">
import PartnerHero from './EventsHero.vue'
import EventList from './EventList.vue'
import Speak from './Speak.vue'
import { Event } from './type'
import { VTIconSearch } from '@leafphp/docs-theme'
import events from '../events.json'

let query = $ref('')

function filter(p: Event): boolean {
  return (
    includes(p.name, query) || p.region.some((r) => includes(r, query)) || p.location.some((r) => includes(r, query))
  )
}

function includes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase())
}
</script>

<template>
  <PartnerHero />

  <div class="container" v-if="events.length">
    <VTIconSearch class="icon" />
    <input
      placeholder="Search events by name or location"
      v-model="query"
    />
    <EventList :events="events" :filter="filter" />
  </div>
  <div class="flex flex:center-all mb:_10" v-else>
    There are no upcoming events
  </div>
  <Speak />
</template>

<style scoped>
input {
  width: 100%;
  padding: 8px 12px 8px 32px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  margin-bottom: 2em;
}
.container {
  max-width: 960px;
  margin: 1em auto 2em;
  padding: 0 28px;
  position: relative;
}
.icon {
  width: 18px;
  height: 18px;
  fill: var(--vt-c-text-3);
  position: absolute;
  top: 12px;
  left: 32px;
}
</style>
