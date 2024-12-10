import { Navbar } from "./components/Navbar.tsx";

function App() {

  return (
    <>
      <div className="flex min-h-screen w-full">
        <div
          className="flex min-h-screen w-full bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
          <Navbar></Navbar>
        </div>
      </div>
    </>
  );
}

export default App;