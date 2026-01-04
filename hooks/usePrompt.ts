import { Prompt } from "@/api/generate.api";
import { useState } from "react";
import { PromptGenRequest, PromptGenResponse } from "@/types/PromptGen";

export const usePrompt = () => {
    const [prompt, setPrompt] = useState<PromptGenResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePrompt = async (prompt: PromptGenRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await Prompt.generate(prompt);
            setPrompt(response);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    return { prompt, loading, error, generatePrompt };
};