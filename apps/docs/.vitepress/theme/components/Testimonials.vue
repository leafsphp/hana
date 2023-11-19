<script setup lang="ts">
const activeCard = $ref(1);
const showAll = $ref(false);

const showOnly = (maxText: number, input: string) =>
  input.length > maxText ? `${input.substring(0, maxText)}...` : input;

const testimonials = [
  {
    name: 'propeller-aaron',
    username: 'propeller-aaron',
    url: 'https://github.com/propeller-aaron',
    image: 'https://avatars.githubusercontent.com/u/52088295?v=4',
    description: "Thanks for making this! I have been looking for an alternative to Silex for a few years now. I have tried other frameworks like Lumen, Laravel & Slim, but they were always a pain to setup with my VM's, and usually forced you to adhere to a console generated bundle.",
  },
  {
    name: 'jamie-syon',
    username: 'jamie-syon',
    url: 'https://github.com/jamie-syon',
    image: 'https://avatars.githubusercontent.com/u/86834565?v=4',
    description: `I'm currently looking for a framework to replace our in-house built MVC framework which we have spent quite some time building over the years.

I just don't "get" the major frameworks and to me I want something simple which I can add to if needed and now I come across Leaf. Wow. I think you've done a great job! ...

Thanks!`,
  },
  {
    name: 'Carlos Cárdenas',
    username: 'carlos_cardenas1',
    url: 'https://www.producthunt.com/@carlos_cardenas1',
    image: 'https://ph-avatars.imgix.net/2028422/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
    description: "Awesome, I just found about it and already using it for a client's site. Clean, well organized and the MVC versión is just great!!!",
  },
];
</script>

<template>
  <section id="newsletter" class="testimonials flex-col d-sm-down:none flex:center-all py:_10">
    <div class="css-1if0kxm">
      <h2 class="title mb:_5">Loved by thousands of <br> product people like you.</h2>

      <div class="flex" style="gap: 10px; transition: ease all .3s;">
        <div
          :style="`max-width: ${activeCard === index && showAll ? '100%' : '33%'}; display: ${activeCard !== index && showAll ? 'none' : 'auto'}`"
          class="css-2ilrjx cursor:pointer" target="_blank" v-for="(testimonial, index) in testimonials">
          <div @click="showAll = !showAll; activeCard = index" @mouseleave="showAll = false; activeCard = index"
            class="css-itvw0n p:_4 border-radius:sm" style="background: var(--vt-c-bg);">
            <p class="css-rltemf">
              {{ activeCard === index && showAll ? testimonial.description : showOnly(135, testimonial.description) }}
            </p>

            <div class="flex flex:center-start mt:_2">
              <img :src="testimonial?.image" class="w:_4 h:_4 border-radius:50 mr:_1" alt="">

              <div>
                <h6>{{ testimonial?.name }}</h6>
                <small class="css-sllbpf">@{{ testimonial?.username }}
                  <!-- {{ testimonial?.date }} -->
                </small>
              </div>
            </div>
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
  background: var(--vt-c-bg-soft);
  transition: border-color 0.5s, background-color 0.5s;
  /* height: 70vh; */
}

.testimonials>div {
  padding: 0px 32px;
  max-width: 900px;
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
