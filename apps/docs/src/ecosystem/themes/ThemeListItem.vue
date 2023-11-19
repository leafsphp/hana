<script setup lang="ts">
import { computed } from 'vue'
import { VTLink } from '@leafphp/docs-theme'
import ThemeProduct from './ThemeProduct.vue'

const props = defineProps({
  provider: { type: Object, required: true }
})

const regex = /\[([^\[]+)\](\(.*\))/gm

const description = computed(() => {
  // replace markdown link to html tag.
  // [name](https://...) -> <a href="https://...">name</a>
  return props.provider.description.replace(
    /\[([^\]]+)\]\(([^\)]+)\)/,
    '<a href="$2" class="link" target="_blank" rel="noopener">$1</a>'
  )
})
</script>

<template>
  <section class="ThemeListItem">
    <h2 class="title">{{ provider.name }} <sup class="vt-badge wip" /></h2>
    <p class="description" v-html="description" />

    <div class="container">
      <div class="products">
        <div v-for="product in provider.products" :key="product.name" class="product">
          <ThemeProduct :product="product" />
        </div>
      </div>
    </div>

    <div class="action" v-if="provider.seeMoreUrl">
      <VTLink class="action-link" :href="provider.seeMoreUrl" no-icon>
        See More Themes from {{ provider.name }}
      </VTLink>
    </div>
  </section>
</template>

<style scoped>
.ThemeListItem {
  border-top: 1px solid var(--vt-c-divider-light);
  padding-top: 16px;
}

@media (min-width: 768px) {
  .ThemeListItem {
    padding-top: 48px;
  }
}

.title {
  font-size: 20px;
  font-weight: 500;
  transition: color 0.25s;
}

.description {
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  max-width: 512px;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.description :deep(.link) {
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.description :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}

.container {
  margin: 0 auto;
  padding-top: 32px;
  max-width: 304px;
}

@media (min-width: 640px) {
  .container {
    max-width: 632px;
  }
}

@media (min-width: 960px) {
  .container {
    max-width: 960px;
  }
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: -16px -12px;
  gap: 24px;
}

@media only screen and (max-width: 640px) {
  .container {
    max-width: none !important;
  }

  .products {
    grid-template-columns: repeat(1, 1fr);
  }
}

.product {
  flex-shrink: 0;
  padding: 24px;
  width: 100%;
  background-color: var(--vt-c-bg-soft);
  border-radius: 16px;
}

.product .image {
  height: 250px !important;
}

@media (min-width: 1700px) {
  .product {
    grid-template-columns: repeat(3, 1fr);
  }
}

.action {
  padding-top: 40px;
  text-align: center;
}

.action-link {
  display: inline-block;
  border: 1px solid var(--vt-c-brand);
  border-radius: 24px;
  padding: 0 24px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-brand);
  transition: border-color 0.25s, color 0.25s;
}

.action-link:hover {
  border-color: var(--vt-c-brand-dark);
  color: var(--vt-c-brand-dark);
}
</style>
