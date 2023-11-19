<template>
  <footer>
    <div class="footer-row flex flex:center-start">
      <div class="flex flex:center-all">
        <img src="/logo.png" class="w:_3 mr:_1 d-sm-down:none hero-logo" alt="Leaf" />
        <h3>Leaf PHP</h3>
      </div>
    </div>
    <div class="footer-grid">
      <div>
        <h4 class="mb:_1">Learn Leaf</h4>
        <ul>
          <li>
            <a href="/docs/introduction/" target="_blank">Getting Started</a>
          </li>
          <li>
            <a href="/tutorial/" target="_blank">Tutorial</a>
          </li>
          <li>
            <a href="https://sandbox.leafphp.dev/" target="_blank">Online Playground</a>
          </li>
          <li>
            <a href="https://youtube.com/@leafphp" target="_blank">YouTube videos</a>
          </li>
          <li>
            <a href="/ecosystem/showcase.html" target="_blank">Project Showcase</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="mb:_1">Community</h4>
        <ul>
          <li>
            <a href="https://twitter.com/leafphp" target="_blank">Twitter</a>
          </li>
          <li>
            <a href="https://youtube.com/@leafphp" target="_blank">Discord</a>
          </li>
          <li>
            <a href="https://github.com/leafsphp" target="_blank">GitHub</a>
          </li>
          <li>
            <a href="/community/contributing/" target="_blank">Contribute to Leaf</a>
          </li>
          <li>
            <a href="/community/join" target="_blank">Join our community</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="mb:_1">About</h4>
        <ul>
          <li>
            <a href="/community/team" target="_blank">Our team</a>
          </li>
          <li>
            <a href="/support/" target="_blank">Our Sponsors</a>
          </li>
          <li>
            <a href="/events/" target="_blank">Events</a>
          </li>
          <li>
            <a href="/community/faq" target="_blank">FAQ</a>
          </li>
          <li>
            <a href="https://blog.leafphp.dev" target="_blank">Our Blog</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding: 48px 0;
  background-color: var(--vt-c-bg-soft);
  transition: border-top 0.5s, background-color 0.5s;
}

.dark footer {
  border-top: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
}

.footer-row {
  margin: 0px auto 48px;
  max-width: 900px;
  padding: 0 32px;
}

footer .footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  max-width: 900px;
  margin: 32px auto;
  padding: 0 32px;
}

h4 {
  margin-bottom: 16px;
}

ul li {
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--vt-c-text-2);
}

ul li:hover {
  color: var(--vt-c-text-1);
}

h3 {
  font-weight: 700;
  font-size: 18px;
}
</style>
