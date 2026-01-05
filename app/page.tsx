import { PromptGenerator } from "../components/PromptGenerator/PromptGenerator";
import { Sidebar } from "../components/Layout/Sidebar";
import { Navbar } from "../components/Layout/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* <Navbar /> */}
        <main className="flex-1 overflow-y-auto">
          <PromptGenerator />
        </main>
      </div>
    </div>
  );
}
