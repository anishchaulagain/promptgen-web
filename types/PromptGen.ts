export interface PromptGenRequest {
    platform: string,
    goal: string,
    tone: string,
    complexity: string,
    prompt_type: string,
    constraints: string[]
}

export interface PromptGenResponse {
    platform: string,
    prompt: string
}