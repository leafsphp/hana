<template>
  <div class="event-hero flex-col flex:center-all my:_10">
    <img src="/logo-circle.png" class="h:_10 w:_10 mb:_2" alt="">
    <h1 class="title">Leaf PHP Events</h1>
    <p class="lead">
      Find out about upcoming conferences, workshops and meetups in your area.
    </p>
  </div>
</template>

<style scoped>
.event-hero {
  padding: 48px 24px;
  text-align: center;
  margin: 0 auto;
  max-width: 688px;
}

@media (min-width: 768px) {
  .event-hero {
    padding: 64px 32px;
  }
}

.title,
.lead,
.event-hero :deep(.link) {
  transition: color 0.25s;
}

.title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 0.3em;
}

@media (min-width: 768px) {
  .title {
    line-height: 40px;
    font-size: 40px;
  }
}

.lead {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vt-c-text-2);
}

.lead a {
  color: var(--vt-c-brand);
}

.event-hero :deep(.link) {
  color: var(--vt-c-brand);
}

.event-hero :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}
</style>
