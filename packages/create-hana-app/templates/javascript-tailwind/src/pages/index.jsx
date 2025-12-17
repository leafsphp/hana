export default function Home() {
  return (
    <main className="flex flex-col items-center py-3 md:py-15 px-9 md:px-30 gap-30">
      <div className="flex items-center justify-end w-full">
        <p>BY</p>
        <img
          src="https://www.leafphp.dev/logo-circle.png"
          width={39}
          alt=""
          className="ml-2.5"
        />
        <p className="ml-1.5 font-bold">Leaf</p>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-2.5 w-full max-w-[473px] max-h-[473px] aspect-square bg-[url(eclipse.svg)] bg-cover bg-no-repeat">
        <h1 className="text-[52px] font-light font-inter tracking-[0.1em]">
          HANA
        </h1>
        <p className="font-inter font-light">Lightweight React for Humans</p>
        <p className="font-berkeley absolute bottom-0 m-0 text-base py-4 px-8 leading-none bg-code border border-[rgba(172,175,176,0.3)] rounded-2xl">
          Get started by editing
          <code className="text-code-span"> pages/index.tsx</code>
        </p>
      </div>

      <div className="flex items-center gap-50">
        <a
          className="text-inherit underline-none rounded-[100px] border border-border bg-background py-3 px-5"
          href="https://hanajs.dev/"
          target="_blank"
        >
          Docs
        </a>
      </div>
    </main>
  );
}
