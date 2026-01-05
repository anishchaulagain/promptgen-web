'use client'
import { motion } from "framer-motion";
import { Plus, Clock, Star, Settings, ChevronLeft, LayoutDashboard, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Generator", active: true },
    { icon: History, label: "History", active: false },
    { icon: Star, label: "Favorites", active: false },
    { icon: Settings, label: "Settings", active: false },
];

const HISTORY_ITEMS = [
    "Marketing strategy for SaaS",
    "React table component review",
    "Blog post on AI ethics",
];

export const Sidebar = () => {
    return (
        <aside className="w-72 border-r border-border bg-glass/20 hidden md:flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg shadow-primary/20 h-11">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold">New Prompt</span>
                </Button>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                            item.active
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", item.active ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                        {item.label}
                    </button>
                ))}

                <div className="pt-8 pb-4">
                    <h3 className="px-3 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">Recent Architecture</h3>
                    <div className="space-y-1">
                        {HISTORY_ITEMS.map((item) => (
                            <button
                                key={item}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all text-left truncate"
                            >
                                <Clock className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="p-4 border-t border-border">
                <div className="bg-primary/5 rounded-2xl p-4 cursor-pointer hover:bg-primary/10 transition-colors">
                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Pro Plan</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">Upgrade for unlimited neural architectures.</p>
                </div>
            </div>
        </aside>
    );
};
