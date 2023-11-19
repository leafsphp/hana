<script setup lang="ts">
const { title, description, subject, link, useLink = false } = defineProps(['title', 'description', 'subject', 'link', 'useLink']);

const show = $ref(false);
</script>

<template>
  <div className="custom-block video-docs">
    <p className="video-docs-title">{{ title ?? 'Video Docs' }}</p>
    <p>{{ description }}</p>

    <section className="video-lesson">
      <a v-if="useLink" :href="link" target="_blank" rel="sponsored noopener" :title="subject">
        {{ subject }}
      </a>
      <a href="#" @click="show = true">{{ subject }}</a>
    </section>
  </div>

  <Teleport v-if="show" to="body">
    <div @click="show = false" className="vuemastery-modal-mask">
      <div className="vuemastery-modal-wrapper">
        <div className="vuemastery-modal-container">
          <div className="vuemastery-modal-content">
            <div className="vuemastery-video-space">
              <iframe :src="link" style="
                  height: 100%;
                  left: 0;
                  position: absolute;
                  top: 0;
                  width: 100%;
                  border-radius: 6px;
                " frameBorder="0" allowFullScreen allow="autoplay"></iframe>
            </div>
          </div>

          <div className="vuemastery-modal-footer">
            <p className="vuemastery-modal-footer-text">
              Watch our videos on
              <a href="https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw" target="_blank"
                rel="sponsored noopener" title="Leaf PHP on YouTube">
                our YouTube channel.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.video-lesson:before {
  content: 'play_circle_filled';
  font-family: 'Material Icons';
  font-size: 35px;
  display: inline-block;
  color: #73abfe;
  height: 35px !important;
  width: 35px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin-right: 10px;
}

.video-lesson,
.video-lesson a {
  color: #486491;
  position: relative;
}

.video-lesson {
  display: flex;
  align-items: center;
  background-color: #e7ecf3;
  padding: 1em 1.25em;
  border-radius: 2px;
  margin: 24px 0;
}

.video-lesson a:hover {
  text-decoration: underline;
}

.vuemastery-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 30;
  transition: opacity 0.3s ease;
}

.vuemastery-modal-wrapper {
  display: block;
  box-sizing: border-box;
  border-radius: 8px;
  position: fixed;
  width: 75%;
  height: auto;
  padding: 0.5em;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 40;
}

.dark .vuemastery-modal-wrapper {
  background-color: var(--vt-c-bg-soft);
}

.vuemastery-modal-content {
  margin-bottom: 10px;
}

.vuemastery-video-space {
  position: relative;
  padding: 56.25% 0 0 0;
}

.vuemastery-modal-footer-text {
  color: var(--vt-c-text-2);
  margin-bottom: 0.5em;
  text-align: center;
  word-spacing: 0.05em;
  font-size: 12px;
}

.vuemastery-modal-footer-text a {
  color: #42b983;
  font-weight: 600;
}

.dark .vuemastery-modal-footer-text {
  color: var(--vt-c-text-2);
  font-weight: 600;
}
</style>
