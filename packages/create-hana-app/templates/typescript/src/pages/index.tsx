import styles from './index.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.row} style={{ marginLeft: 'auto' }}>
        <p>BY</p>
        <img
          src="https://www.leafphp.dev/logo-circle.png"
          width={39}
          alt=""
          className="ms-10"
        />
        <p style={{ fontWeight: 700 }} className="ms-5">
          Leaf
        </p>
      </div>
      <div className={styles.center}>
        <h1>HANA</h1>
        <p>Lightweight React for Humans</p>
        <p className={styles.code}>
          Get started by editing
          <code className={styles.codespan}> pages/index.tsx</code>
        </p>
      </div>

      <div className={styles.row} style={{ gap: 50 }}>
        <a className={styles.button} href="https://hanajs.dev/" target="_blank">
          Docs
        </a>
      </div>
    </main>
  );
}
