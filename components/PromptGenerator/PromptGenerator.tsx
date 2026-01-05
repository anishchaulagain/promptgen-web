'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Settings2, Target, MessageSquare, Layers, AlertCircle } from "lucide-react";
import { SelectableBadge } from "./SelectableBadge";
import { ConstraintInput } from "./ConstraintInput";
import { PromptOutput } from "./PromptOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePrompt } from "@/hooks/usePrompt";
import { Textarea } from "../ui/textarea";
import { div } from "motion/react-client";

const PLATFORMS = ["ChatGPT", "Claude", "Gemini", "Llama", "Grok", "Perplexity"];
const TONES = [
  "Neutral",
  "Professional",
  "Friendly",
  "Technical",
  "Creative",
  "Formal",
  "Casual",
  "Persuasive",
  "Instructional"
];
const PROMPT_TYPES = [
  "General Assistance",
  "Code Generation",
  "Code Review & Debugging",
  "Technical Explanation",
  "Creative Writing",
  "Academic / Research",
  "Summarization",
  "Data Analysis",
  "System / Role Prompt",
  "Prompt Engineering"
];
const COMPLEXITIES = ["Basic", "Intermediate", "Advanced", "Expert"];

interface FormData {
  platform: string;
  goal: string;
  tone: string;
  complexity: string;
  prompt_type: string;
  constraints: string[];
}

const defaultFormData: FormData = {
  platform: "",
  goal: "",
  tone: "Neutral",
  complexity: "Advanced",
  prompt_type: "General Assistance",
  constraints: [],
}

export const PromptGenerator = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPlatform, setCustomPlatform] = useState("");

  const { generatePrompt, prompt, loading, error } = usePrompt()

  const handleGenerate = async () => {
    const result = await generatePrompt(formData);
    console.log("Form Data:", formData);
    console.log("Response:", result);
  };

  const isFormValid = formData.platform && formData.goal;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-chart-2/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Refined Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              Draft v1.0
            </div>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
            Anisora - A Prompt Architect 
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Configure system parameters to synthesize high-precision language models.
          </p>
        </motion.div>

        {/* New Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: The Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Goal Input Section */}
            <div className="bg-glass p-8 rounded-3xl group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <Label htmlFor="goal" className="text-lg font-bold">
                  Enter Your Raw Prompt
                </Label>
              </div>
              <Textarea
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))}
                placeholder="Enter your raw prompt here..."
                className="min-h-[160px] bg-white/5 dark:bg-black/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-lg leading-relaxed placeholder:text-muted-foreground/50 resize-none rounded-2xl"
              />
            </div>

            {/* Platform Selection */}
            <div className="bg-glass p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Settings2 className="w-5 h-5" />
                </div>
                <Label className="font-bold">Target Platform</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => (
                  <SelectableBadge
                    key={platform}
                    label={platform}
                    selected={!showCustomInput && formData.platform === platform}
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomPlatform("");
                      setFormData((prev) => ({ ...prev, platform }));
                    }}
                  />
                ))}

                {/* Custom Badge */}
                <SelectableBadge
                  label="Custom"
                  selected={showCustomInput}
                  onClick={() => {
                    setShowCustomInput(true);
                    setFormData((prev) => ({ ...prev, platform: customPlatform }));
                  }}
                />
              </div>

              {showCustomInput && (
                <div className="mt-5">
                  <input
                  type="text"
                  placeholder="Enter custom platform..."
                  value={customPlatform}
                  autoFocus
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomPlatform(value);
                    setFormData((prev) => ({ ...prev, platform: value }));
                  }}
                  className="mt-3 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring"
                />
                </div>
              )}
            </div>

            {/* Persona & Tone */}
            <div className="bg-glass p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <Label className="font-bold">Persona & Tone</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {TONES.map((tone) => (
                  <SelectableBadge
                    key={tone}
                    label={tone}
                    selected={formData.tone.toLowerCase() === tone.toLowerCase()}
                    onClick={() => setFormData((prev) => ({ ...prev, tone: tone.toLowerCase() }))}
                  />
                ))}
              </div>
            </div>

            {/* Advanced Configuration Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-glass p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Layers className="w-5 h-5" />
                  </div>
                  <Label className="font-bold">Environment</Label>
                </div>
                <Select
                  value={formData.prompt_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, prompt_type: value }))}
                >
                  <SelectTrigger className="w-full bg-white/5 dark:bg-black/20 border-border/50 h-11 rounded-xl">
                    <SelectValue placeholder="Select context" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass border-border">
                    {PROMPT_TYPES.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize py-3">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-glass p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <Label className="font-bold">Logic Depth</Label>
                </div>
                <Select
                  value={formData.complexity}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, complexity: value }))}
                >
                  <SelectTrigger className="w-full bg-white/5 dark:bg-black/20 border-border/50 h-11 rounded-xl">
                    <SelectValue placeholder="Select depth" />
                  </SelectTrigger>
                  <SelectContent className="bg-glass border-border">
                    {COMPLEXITIES.map((level) => (
                      <SelectItem key={level} value={level} className="capitalize py-3">
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Refinement Rules */}
            <div className="bg-glass p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <Label className="font-bold">Refinement Rules</Label>
              </div>
              <ConstraintInput
                constraints={formData.constraints}
                onChange={(constraints) => setFormData((prev) => ({ ...prev, constraints }))}
              />
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                onClick={handleGenerate}
                disabled={!isFormValid || loading}
                className="w-full h-16 bg-linear-to-r from-primary to-chart-2 hover:opacity-90 text-primary-foreground font-bold text-lg rounded-2xl shadow-2xl shadow-primary/20 disabled:opacity-50 border-none transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calculating...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Wand2 className="w-6 h-6" />
                    Forge Prompt
                  </div>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: The Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-12"
          >
            <PromptOutput prompt={prompt} isLoading={loading} />

            {/* Quick Tips or Stats (Optional filler for right col) */}
            <div className="mt-8 bg-glass/40 p-6 rounded-3xl border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Architecture Tips</h4>
              <ul className="space-y-3">
                {[
                  "Be specific about the persona you want the AI to adopt.",
                  "Add constraints to avoid common pitfalls in AI responses.",
                  "Use high logic depth for complex coding or reasoning tasks."
                ].map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground/60 mt-16 pb-12"
        >
          &copy; 2026 Prompt Architect Engine. All parameters optimized for Gemini Performance.
        </motion.p>
      </div>
    </div>
  );
};
