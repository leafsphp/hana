<script setup lang="ts">
import { VTLink } from '@leafphp/docs-theme';

const handleSubmit = () => window.open('https://tinyletter.com/leafphp', 'popupwindow', 'scrollbars=yes,width=800,height=600');
</script>

<template>
  <section id="newsletter" class="NewsLetter">
    <div class="container">
      <h2 class="title">Subscribe to our newsletter.</h2>

      <form action="https://tinyletter.com/leafphp" method="post" target="popupwindow" @submit="handleSubmit">
        <div class="subscribe-form">
          <input type="text" placeholder="email@example.com" name="email" id="tlemail" />
          <button type="submit">Subscribe</button>
        </div>
        <input type="hidden" value="1" name="embed" />
      </form>

      <p class="help">
        You can read our blog posts at
        <VTLink class="link" href="https://blog.leafphp.dev/" no-icon>blog.leafphp.dev</VTLink>. You may also go social
        at
        <VTLink class="link" href="https://twitter.com/leafphp" no-icon>Twitter</VTLink>, or join our
        <VTLink class="link" href="https://github.com/leafsphp/leaf/discussions/37" no-icon>discussions</VTLink> or
        watch our <VTLink class="link" href="https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw" no-icon>videos on
          YouTube.</VTLink>

        <div class="flex flex:center-all mt:_4">
          <a href="https://www.netlify.com">
            <img src="https://www.netlify.com/v3/img/components/netlify-dark.svg" alt="Deploys by Netlify" />
          </a>
        </div>
      </p>
    </div>
  </section>
</template>

<style scoped>
.NewsLetter {
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  border: none !important;
  padding: 72px 24px;
  background: var(--vt-c-bg-soft);
  transition: border-color 0.5s, background-color 0.5s;
}

.dark .NewsLetter {
  border-top-color: var(--vt-c-divider-light);
  border-bottom-color: var(--vt-c-divider-light);
}

.container {
  margin: 0 auto;
  max-width: 512px;
}

.title {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  margin-bottom: 8px;
}

.subscribe-form {
  position: relative;
  max-width: 550px;
  margin: 0 auto;
  box-sizing: border-box;
}

input[type=text] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 80px 10px 20px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid var(--vt-c-divider-light);
  font-size: 16px;
}

button {
  position: absolute;
  padding: 4px 20px;
  margin: 0;
  height: calc(100% - 8px);
  right: 4px;
  top: 4px;
  cursor: pointer;
  background-color: var(--vt-c-green);
  width: 30%;
  border-radius: 2em;
}

@media (min-width: 375px) {
  .title {
    font-size: 16px;
  }
}

.form {
  padding-top: 8px;
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
