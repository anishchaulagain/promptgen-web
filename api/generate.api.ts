import { PromptGenRequest, PromptGenResponse } from "@/types/PromptGen"
import app from "./client"

export const Prompt = {
  generate: async(payload: PromptGenRequest): Promise<PromptGenResponse> => {
      const response = await app.post("/prompt/generate", payload)
      return response.data
  }
}

