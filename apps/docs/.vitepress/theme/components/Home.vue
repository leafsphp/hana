<script setup lang="ts">
import NewsLetter from './NewsLetterSubstack.vue'
import BlogSection from './BlogSection.vue'
import Speak from './Speak.vue'
import SponsorsGroup from './SponsorsGroup.vue';
import Testimonials from './Testimonials.vue';
import VueMasteryModal from './VueMasteryModal.vue';
import Footer from './Footer.vue';
// import Banner from './Banner.vue';
</script>

<template>
  <section id="hero">
    <div style="display: flex; justify-content: center; align-items: center;">
      <img src="/logo-circle.png" class="w:20 mr:_10 d-sm-down:none hero-logo" alt="Leaf" />
      <div class="content-left">
        <h1 class="tagline">
          <span class="accent">Leaf 3.0</span>
        </h1>
        <p class="description">
          Simple and elegant PHP
        </p>
        <p class="actions">
          <vue-mastery-modal />
          <a class="get-started" href="/docs/introduction/">
            Get Started
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </a>
        <a class="setup" href="/docs/introduction/installation.html">Install</a>
      </p>
    </div>
  </div>
</section>

  <!-- TODO make dynamic based on data -->
  <!-- <section id="special-sponsor" class="flex-col">
        <span>Special Sponsor</span>
        <a href="https://netlify.com" class="mt:_1" target="_blank">
          <img
            alt="netlify logo"
            style="border-radius: 500px; width: 35px;"
            src="https://user-images.githubusercontent.com/26604242/186772985-b21c2850-3cc3-41c6-9299-fe9cc5bac46a.png" />
          <div>Netlify</div>
        </a>
      </section> -->

  <section id="highlights" class="vt-box-container">
    <div class="vt-box">
      <h2>Approachable 👨🏾‍🏫</h2>
      <p>
        Builds on top of standard PHP with a flexible learning curve + ZERO config.
      </p>
    </div>
    <div class="vt-box">
      <h2>Versatile ☃️</h2>
      <p>
        A rich, incrementally adoptable ecosystem of modules to build powerful apps with.
      </p>
    </div>
    <div class="vt-box">
      <h2>Efficient ⏰</h2>
      <p>
        Blazing Fast <br>
        &lsaquo;40KB Source <br>
        Crazy development time </p>
    </div>
  </section>

  <section id="sponsors">
    <h2>Sponsors</h2>
    <SponsorsGroup tier="sponsor" showLabel placement="landing" />

    <h2 id="contributors">Code Contributors</h2>
    <SponsorsGroup tier="code" showLabel placement="landing" />
  </section>

  <Testimonials />
  <BlogSection />
  <Speak />

  <section class="discord-section flex flex:center-all">
      <div class="d-sm-up:flex flex:center-between w:100">
        <div class="d-sm-up:flex">
          <div class="discord-logo mb-xs:_2">
            <svg viewBox="0 0 48 48" focusable="false" class="chakra-icon css-onkibi">
              <g id="surface1615260">
                <path fill="currentColor" stroke="none" fill-rule="nonzero"
                  d="M 39.246094 10.175781 C 36.445312 8.890625 33.4375 7.941406 30.292969 7.398438 C 30.234375 7.390625 30.179688 7.414062 30.148438 7.46875 C 29.761719 8.15625 29.332031 9.050781 29.03125 9.757812 C 25.652344 9.253906 22.285156 9.253906 18.972656 9.757812 C 18.675781 9.035156 18.230469 8.15625 17.839844 7.46875 C 17.8125 7.414062 17.753906 7.390625 17.695312 7.398438 C 14.554688 7.941406 11.546875 8.886719 8.742188 10.175781 C 8.71875 10.1875 8.695312 10.203125 8.683594 10.226562 C 2.976562 18.75 1.414062 27.0625 2.183594 35.273438 C 2.183594 35.3125 2.207031 35.351562 2.238281 35.375 C 6.003906 38.140625 9.648438 39.816406 13.226562 40.929688 C 13.28125 40.945312 13.34375 40.925781 13.378906 40.878906 C 14.226562 39.722656 14.980469 38.503906 15.628906 37.222656 C 15.664062 37.148438 15.628906 37.058594 15.550781 37.027344 C 14.355469 36.574219 13.214844 36.019531 12.121094 35.390625 C 12.03125 35.339844 12.027344 35.21875 12.105469 35.15625 C 12.335938 34.984375 12.566406 34.804688 12.789062 34.625 C 12.828125 34.589844 12.882812 34.585938 12.929688 34.605469 C 20.132812 37.894531 27.925781 37.894531 35.042969 34.605469 C 35.089844 34.582031 35.144531 34.589844 35.1875 34.621094 C 35.40625 34.804688 35.636719 34.984375 35.871094 35.15625 C 35.949219 35.21875 35.945312 35.339844 35.859375 35.390625 C 34.761719 36.03125 33.621094 36.574219 32.425781 37.027344 C 32.347656 37.054688 32.3125 37.144531 32.347656 37.222656 C 33.011719 38.503906 33.765625 39.71875 34.59375 40.875 C 34.628906 40.925781 34.691406 40.945312 34.75 40.929688 C 38.34375 39.816406 41.988281 38.136719 45.753906 35.375 C 45.785156 35.351562 45.808594 35.3125 45.808594 35.273438 C 46.726562 25.78125 44.273438 17.539062 39.304688 10.230469 C 39.292969 10.203125 39.273438 10.1875 39.246094 10.175781 Z M 16.703125 30.273438 C 14.535156 30.273438 12.75 28.28125 12.75 25.839844 C 12.75 23.394531 14.5 21.402344 16.703125 21.402344 C 18.921875 21.402344 20.691406 23.410156 20.65625 25.839844 C 20.65625 28.28125 18.90625 30.273438 16.703125 30.273438 Z M 31.324219 30.273438 C 29.15625 30.273438 27.371094 28.28125 27.371094 25.839844 C 27.371094 23.394531 29.121094 21.402344 31.324219 21.402344 C 33.542969 21.402344 35.3125 23.410156 35.277344 25.839844 C 35.277344 28.28125 33.542969 30.273438 31.324219 30.273438 Z M 31.324219 30.273438 ">
                </path>
              </g>
            </svg>
          </div>

          <div class="w:100">
            <h2 class="css-1c75i90">Connect with the community</h2>
            <p class="discord-subtext">Ask questions, report issues, and meet new people.</p>
          </div>
        </div>

        <a href="https://discord.gg/Pkrm9NJPE3" rel="noopener" target="_blank"
          class="join-button mt-xs:_3 w-xs:100 flex flex:center-all">
          Join Discord!
        </a>
      </div>
    </section>

  <NewsLetter />
  <Footer />
</template>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: left;
}

.hero-logo {
  max-width: 250px;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .get-started {
  margin-right: 18px;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  transition-duration: 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.actions .get-started,
.actions .setup {
  color: var(--vt-c-text-code);
}

.actions .get-started:hover,
.actions .setup:hover {
  background-color: var(--vt-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover,
.dark .actions .setup:hover {
  background-color: var(--vt-c-gray-dark-3);
}

#special-sponsor {
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 12px 24px;
  text-align: center;
}

#special-sponsor span {
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  margin: 0 24px;
}

#special-sponsor img {
  display: inline-block;
  vertical-align: middle;
  height: 36px;
}

.dark #special-sponsor img {
  filter: grayscale(1);
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

#sponsors {
  max-width: 900px;
  margin: 0px auto;
}

#sponsors h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}

#sponsors .sponsor-container {
  margin-bottom: 3em;
}

.discord-section {
  /* padding: 40px 10%; */
  background: var(--vt-c-bg-soft);
}

.discord-subtext {
  font-size: 12px;
}

.discord-section>div {
  padding: 0px 32px;
  max-width: 900px;
}

.discord-logo {
  width: 50px;
  height: 50px;
  margin-right: 1.25rem;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }

  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 64px 32px;
  }

  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }

  #special-sponsor img {
    display: block;
    margin: 2px auto 1px;
  }

  #highlights h3 {
    margin-bottom: 0.6em;
  }

  #highlights .vt-box {
    padding: 20px 36px;
  }

  .actions a {
    margin: 0.5em 0;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
