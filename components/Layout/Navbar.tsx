'use client'
import { motion } from "framer-motion";
import { Search, Bell, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
    return (
        <nav className="h-16 border-b border-border bg-glass backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold tracking-tight text-gradient hidden md:block">
                    Prompt Architect
                </h1>
                <div className="relative w-64 hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search architecture..."
                        className="pl-10 h-9 bg-white/5 border-none focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Sun className="w-5 h-5 dark:hidden" />
                    <Moon className="w-5 h-5 hidden dark:block" />
                </Button>
                <div className="h-4 w-px bg-border mx-2" />
                <Button variant="ghost" className="gap-2 px-2 hover:bg-primary/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                        JD
                    </div>
                    <span className="text-sm font-medium hidden sm:inline-block">John Doe</span>
                </Button>
            </div>
        </nav>
    );
};
