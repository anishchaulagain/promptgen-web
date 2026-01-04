'use client'
import { motion } from "framer-motion";
import { Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptGenResponse } from "@/types/PromptGen";

interface PromptOutputProps {
  prompt: PromptGenResponse | null;
  isLoading: boolean;
}

export const PromptOutput = ({ prompt, isLoading }: PromptOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-muted-foreground">Generating your prompt...</span>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/5" />
        </div>
      </motion.div>
    );
  }

  if (!prompt) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 rounded-xl bg-card border border-dashed border-border text-center"
      >
        <Sparkles className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          Configure your settings and generate a prompt
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-xl bg-card border border-primary/20 glow-primary"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Generated Prompt</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-3 text-muted-foreground hover:text-foreground"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="ml-2 text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>
      <p className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap">
        {prompt?.prompt}
      </p>
    </motion.div>
  );
};
