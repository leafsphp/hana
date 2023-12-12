export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Layout</h1>
      <h2>This is something else</h2>
      <h3>Another thing</h3>
      {children}
    </div>
  );
}
