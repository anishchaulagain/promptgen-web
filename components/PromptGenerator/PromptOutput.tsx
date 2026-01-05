'use client'
import { motion } from "framer-motion";
import { Copy, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptGenResponse } from "@/types/PromptGen";
import { cn } from "@/lib/utils";

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
      setTimeout(() => setCopied(false), 4000);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 md:p-8 rounded-3xl bg-glass overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-chart-2 animate-pulse" />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </div>
          <div>
            <h3 className="font-bold text-foreground">Synthesizing Prompt</h3>
            <p className="text-xs text-muted-foreground">Applying linguistic optimizations...</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-5 bg-primary/5 rounded-lg animate-pulse w-full" />
          <div className="h-5 bg-primary/5 rounded-lg animate-pulse w-[92%]" />
          <div className="h-5 bg-primary/5 rounded-lg animate-pulse w-[85%]" />
        </div>
      </motion.div>
    );
  }

  if (!prompt) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 md:p-10 rounded-3xl bg-glass border-dashed border-2 border-border/50 text-center group hover:border-primary/30 transition-colors"
      >
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Sparkles className="w-8 h-8 text-muted-foreground/30" />
        </div>
        <p className="text-muted-foreground font-medium">
          Your architectural masterpiece will appear here
        </p>
        <p className="text-[10px] text-muted-foreground/40 mt-1 uppercase tracking-[0.2em]">
          Awaiting Configuration
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-glass shadow-2xl shadow-primary/5 group border border-primary/10 overflow-hidden"
    >
      {/* Decorative background scanline effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 relative z-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold mr-4 sm:mr-0  text-lg text-foreground tracking-tight">Synthesized</h3>
              <div className="px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                Validated
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Model: {prompt.platform}</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
          <Button
            onClick={handleCopy}
            className={cn(
              "h-11 px-6 w-full sm:w-auto rounded-xl cursor-pointer font-bold transition-all duration-300 gap-2 shadow-xl",
              copied
                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/20"
                : "bg-primary text-primary-foreground shadow-primary/20"
            )}
            disabled={copied}
          >
            {copied ? (
              <Check className="w-5 h-5 stroke-[3px]" />
            ) : (
              <Copy className="w-5 h-5 opacity-80" />
            )}
            {copied ? "Copied" : "Copy Architecture"}
          </Button>
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative rounded-2xl bg-black/5 dark:bg-black/60 border border-white/5 font-mono text-sm leading-relaxed text-foreground/90 selection:bg-primary/30 overflow-hidden">
          {/* Header of code block */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/10 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
            <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">Neural.cfg</span>
          </div>
          <div className="p-4 sm:p-6 md:p-8 whitespace-pre-wrap min-h-[160px] max-h-[500px] overflow-y-auto custom-scrollbar">
            {prompt?.prompt}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-y-4 gap-x-6 relative z-10 border-t border-border/40 pt-6">
        <div className="flex flex-col gap-1 w-[45%] sm:w-auto">
          <span className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Complexity</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn("w-3 h-1 rounded-full", i <= 4 ? "bg-primary/40" : "bg-muted")} />
            ))}
          </div>
        </div>
        <div className="h-8 w-px bg-border/40 hidden sm:block" />
        <div className="flex flex-col gap-0.5 w-[45%] sm:w-auto">
          <span className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Token Density</span>
          <span className="text-xs font-mono font-bold">~{prompt.prompt.split(' ').length * 1.3 | 0} Units</span>
        </div>
        <div className="h-8 w-px bg-border/40 hidden sm:block" />
        <div className="flex flex-col gap-0.5 w-full sm:w-auto">
          <span className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Inference Pass</span>
          <span className="text-xs font-mono font-bold text-primary">S-Tier Optimized</span>
        </div>
      </div>
    </motion.div>
  );
};
