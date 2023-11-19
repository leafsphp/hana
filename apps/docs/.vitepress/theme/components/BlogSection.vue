<script setup lang="ts">
import { VTIconEdit, VTIconExternalLink } from '@leafphp/docs-theme';

const articles = [
  {
    title: "Build First Recap",
    date: "April 18, 2023",
    link: "https://blog.leafphp.dev/posts/buildfirst-recap.html"
  },
  {
    title: "2023 Docs Updates",
    date: "March 14, 2023",
    link: "https://blog.leafphp.dev/posts/docs-updates.html"
  },
  {
    title: "Getting Started with Leaf",
    date: "January 7, 2023",
    link: "https://blog.leafphp.dev/posts/getting-started.html"
  },
  {
    title: "Eien: December 2022",
    date: "December 27, 2022",
    link: "https://blog.leafphp.dev/posts/eien-december-22.html"
  },
];
</script>

<template>
  <section id="blog" class="testimonials flex flex:center-all d-sm-down:none">
    <div class="flex:center-between py:_10" style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 4rem;">
      <div>
        <h2 class="title mb:_3" style="text-align: left;">Dig into the mind of Leaf with us</h2>
        <p class="mb:_1">
          Our main goal and pride at Leaf is to make PHP development as simple and elegant as possible.
        </p>
        <p>
          Our team is always looking to improve your experience using the Leaf framework and it's ecosystem of tools. You
          can follow along as our team discusses it's insights from the past year and what's to come in 2023.
        </p>
        <a href="https://blog.leafphp.dev" target="_blank" class="mt:_1 flex flex:center-all px:_2 py:_1 mt:_3 read-blog-button">
          <span>Read the Blog</span>
          <VTIconExternalLink height="18px" />
        </a>
      </div>

      <div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          <div class="blog-card" v-for="article in articles">
            <a :href="article.link" target="_blank">
              <div>
                <h4>{{ article.title }}</h4>
                <div>
                  <span style="font-size: 12px;">{{ article.date }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding: 32px 24px;
  /* padding: 42px 32px; */
  background: var(--vt-c-bg-dark);
  transition: border-color 0.5s, background-color 0.5s;
  /* height: 70vh; */
}

.testimonials>div {
  padding: 0px 32px;
  max-width: 900px;
}

.blog-card {
  background: var(--vt-c-bg);
  border-radius: 8px;
  max-height: 160px;
  padding: 32px;
  transition: border-color 0.5s, background-color 0.5s;
  box-shadow: 0 0 0 1px var(--vt-c-bg-mute), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.blog-card:hover {
  box-shadow: 0 0 0 1px var(--vt-c-bg-mute), 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.dark .blog-card:hover {
  box-shadow: 0 0 0 1px var(--vt-c-bg-mute), 0 2px 10px 0 rgba(150, 150, 150, 0.1);
}

.blog-card h4 {
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.dark .NewsLetter {
  background: var(--vt-c-bg);
}

@media (min-width: 768px) {
  .NewsLetter {
    padding: 48px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 512px;
}

.title {
  text-align: center;
  font-size: 36px !important;
  line-height: 45px;
  font-weight: 700;
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .title {
    font-size: 16px;
  }
}

.form {
  padding-top: 8px;
}

.read-blog-button {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-green);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
  display: flex;
  width: fit-content;
  color: white;
}

.read-blog-button svg {
  fill: white;
  margin-left: 8px;
}

@media (min-width: 375px) {
  .form {
    padding-top: 16px;
  }
}

.box {
  position: relative;
  width: 100%;
}

.input {
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
  padding: 11px 128px 11px 16px;
  font-size: 16px;
  width: 100%;
  color: var(--vt-c-text-1);
  transition: border-color 0.25s, background-color 0.25s;
}

.input:hover,
.input:focus {
  border-color: var(--vt-c-brand);
}

.input:focus {
  background-color: var(--vt-c-white);
}

.dark .input {
  background-color: var(--vt-c-bg);
}

.dark .input:focus {
  background-color: var(--vt-c-black-pure);
}

.input::placeholder {
  font-weight: 500;
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.action {
  position: absolute;
  top: 6px;
  right: 6px;
}

.button {
  border-radius: 4px;
  padding: 0 12px;
  letter-spacing: 0.8px;
  line-height: 36px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-dark-1);
  background-color: var(--vt-c-brand);
  transition: background-color 0.25s;
  cursor: pointer;
}

.button:hover {
  background-color: var(--vt-c-brand-dark);
}

.help {
  margin: 0 auto;
  padding: 8px;
  max-width: 480px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .help {
    padding-top: 16px;
  }
}

.link {
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vt-c-brand-dark);
}
</style>
