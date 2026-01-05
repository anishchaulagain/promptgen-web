import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SelectableBadgeProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const SelectableBadge = ({ label, selected, onClick }: SelectableBadgeProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-5 py-2.5 rounded-xl cursor-pointer font-semibold text-sm transition-all duration-300 border-2",
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/30 scale-105"
          : "bg-white/5 dark:bg-black/20 text-muted-foreground border-transparent hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
      )}
    >
      {label}
    </motion.button>
  );
};
