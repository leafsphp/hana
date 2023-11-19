<script setup lang="ts">
import { computed } from 'vue'
import PartnerCard from './PartnerCard.vue'
import { Event } from './type'

const { filter, events } = defineProps<{
  filter?: (p: Event) => boolean | undefined;
  events: Event[];
}>()

const filtered = computed(() =>
  filter ? (events as Event[]).filter(filter) : (events as Event[])
)
</script>

<template>
  <div class="event-list pb:_5" v-if="filtered?.length">
    <PartnerCard v-for="p in filtered" :key="p.name" :data="p" />
  </div>
</template>

<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
