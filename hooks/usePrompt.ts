import { Prompt } from "@/api/generate.api";
import { useState } from "react";
import { PromptGenRequest, PromptGenResponse } from "@/types/PromptGen";

export const usePrompt = () => {
    const [prompt, setPrompt] = useState<PromptGenResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePrompt = async (promptRequest: PromptGenRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await Prompt.generate(promptRequest);
            setPrompt(response);
            return response;
        } catch (error) {
            setError(error as string);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { prompt, loading, error, generatePrompt };
};