'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Settings2, Target, MessageSquare, Layers, AlertCircle } from "lucide-react";
import { SelectableBadge } from "./SelectableBadge";
import { ConstraintInput } from "./ConstraintInput";
import { PromptOutput } from "./PromptOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePrompt } from "@/hooks/usePrompt";
import { PromptGenResponse } from "@/types/PromptGen";
import { Textarea } from "../ui/textarea";

const PLATFORMS = ["ChatGPT", "Claude", "Gemini", "Llama", "Mistral", "GPT-4", "Custom"];
const TONES = ["Neutral", "Professional", "Friendly", "Technical", "Creative", "Formal", "Casual"];
const PROMPT_TYPES = ["general", "code", "writing", "analysis", "creative", "research", "summarization"];
const COMPLEXITIES = ["basic", "intermediate", "advanced", "expert"];

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
  tone: "neutral",
  complexity: "advanced",
  prompt_type: "general",
  constraints: [],
}

export const PromptGenerator = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData)

  const { generatePrompt, prompt, loading, error } = usePrompt()

  const handleGenerate = async () => {
    const result = await generatePrompt(formData);
    console.log("Form Data:", formData);
    console.log("Response:", result);
    // if (result?.platform) {
    //   setFormData(defaultFormData);
    // }
  };

  const isFormValid = formData.platform && formData.goal;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Wand2 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Prompt Generator</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Craft the perfect AI prompt with intelligent suggestions and customizable parameters
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Platform Selection */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Platform</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <SelectableBadge
                  key={platform}
                  label={platform}
                  selected={formData.platform === platform}
                  onClick={() => setFormData((prev) => ({ ...prev, platform }))}
                />
              ))}
            </div>
          </div>

          {/* Goal Input */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-primary" />
              <Label htmlFor="goal" className="text-sm font-medium">
                Goal
              </Label>
            </div>
            <Textarea
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData((prev) => ({ ...prev, goal: e.target.value }))}
              placeholder="What do you want the AI to accomplish?"
              className="bg-surface-elevated border-border focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          {/* Tone Selection */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Tone</Label>
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

          {/* Prompt Type & Complexity */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-primary" />
                <Label className="text-sm font-medium">Prompt Type</Label>
              </div>
              <Select
                value={formData.prompt_type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, prompt_type: value }))}
              >
                <SelectTrigger className="bg-surface-elevated border-border focus:border-primary/50 focus:ring-primary/20">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {PROMPT_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-4 h-4 text-primary" />
                <Label className="text-sm font-medium">Complexity</Label>
              </div>
              <Select
                value={formData.complexity}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, complexity: value }))}
              >
                <SelectTrigger className="bg-surface-elevated border-border focus:border-primary/50 focus:ring-primary/20">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {COMPLEXITIES.map((level) => (
                    <SelectItem key={level} value={level} className="capitalize">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Constraints */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Constraints</Label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
            <ConstraintInput
              constraints={formData.constraints}
              onChange={(constraints) => setFormData((prev) => ({ ...prev, constraints }))}
            />
          </div>

          {/* Generate Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              onClick={handleGenerate}
              disabled={!isFormValid || loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              {loading ? "Generating..." : "Generate Prompt"}
            </Button>
          </motion.div>

          {/* Output */}
          <PromptOutput prompt={prompt} isLoading={loading} />
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Configure your settings above and click generate to create your AI prompt
        </motion.p>
      </div>
    </div>
  );
};
