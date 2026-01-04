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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border",
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
          : "bg-badge text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
      )}
    >
      {label}
    </motion.button>
  );
};
