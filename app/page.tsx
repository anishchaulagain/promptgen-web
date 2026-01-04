import Image from "next/image";
import { PromptGenerator } from "../components/PromptGenerator/PromptGenerator";

export default function Home() {
  return (
    <div>
      <PromptGenerator />
    </div>
  );
}
