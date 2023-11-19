<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>Build anything with Leaf</template>
      <template #lead>
        Quickly get a project started with any of our examples ranging from using parts of the framework to modules and themes.
      </template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      Want to feature your work here?
      <a class="link" target="_blank" href="https://github.com/leafsphp/demos/issues/new?assignees=&labels=addition&template=add_project.md&title=Add+To+Project+Showcase">Contact us!</a>
    </ThemeContact>
  </div>
</template>
