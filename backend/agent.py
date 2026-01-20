import os
import requests
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
import json

# Configuration for NVIDIA API (from user Snippet)
NVIDIA_API_KEY = "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"
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"

class MentalHealthAgent:
    def __init__(self):
        self.llm = ChatOpenAI(
            base_url=NVIDIA_BASE_URL,
            api_key=NVIDIA_API_KEY,
            model="meta/llama-4-maverick-17b-128e-instruct",
            temperature=0.7,
            max_tokens=512
        )
        self.memories = {}  # In-memory storage for session histories
        
        # CBT Therapist Prompt
        self.therapist_prompt = PromptTemplate(
            input_variables=["history", "input", "language"],
            template="""
            You are a compassionate and professional mental health assistant trained in Cognitive Behavioral Therapy (CBT).
            Your goal is to support the user, listen to their concerns, and guide them using CBT principles.
            
            Current Conversation:
            {history}
            
            User: {input}
            
            Please respond in {language}. 
            Identify key emotions and provide a constructive, empathetic response.
            Do not provide medical diagnosis, but offer support and coping strategies.
            """
        )
        
        # Analysis Prompt (Stress/Emotion)
        self.analysis_prompt = PromptTemplate(
            input_variables=["input"],
            template="""
            Analyze the following user message for emotional state and stress level.
            User Message: "{input}"
            
            Return ONLY a JSON object with the following keys:
            - "emotion": (one word describing the dominant emotion, e.g., Anxiety, Sadness, Anger, Joy, Neutral)
            - "stress_level": (Low, Medium, High)
            
            Do not include any explanation, just the JSON.
            """
        )

    def _get_memory(self, session_id):
        if session_id not in self.memories:
            self.memories[session_id] = ConversationBufferMemory(memory_key="history")
        return self.memories[session_id]

    def process_message(self, message, language="English", session_id="default"):
        memory = self._get_memory(session_id)
        
        # 1. Generate Response
        chain = LLMChain(llm=self.llm, prompt=self.therapist_prompt, memory=memory)
        response_text = chain.run(input=message, language=language)
        
        # 2. Analyze Emotion/Stress (Parallel call concept)
        # Using a fresh LLM call for analysis to ensure JSON format
        analysis_chain = LLMChain(llm=self.llm, prompt=self.analysis_prompt)
        try:
            analysis_text = analysis_chain.run(input=message)
            # Simple cleanup if the model adds markdown code blocks
            clean_json = analysis_text.strip().replace("```json", "").replace("```", "")
            analysis_data = json.loads(clean_json)
        except Exception:
            # Fallback if parsing fails
            analysis_data = {"emotion": "Neutral", "stress_level": "Unknown"}

        return {
            "response": response_text,
            "stress_level": analysis_data.get("stress_level", "Unknown"),
            "emotion": analysis_data.get("emotion", "Neutral")
        }

    def generate_report(self, session_id):
        memory = self._get_memory(session_id)
        history = memory.buffer
        
        report_prompt = PromptTemplate(
            input_variables=["history"],
            template="""
            Based on the following conversation history with a user, generate a summary report.
            
            Conversation History:
            {history}
            
            The report should include:
            1. **Summary of Concerns**: What is troubling the user?
            2. **Emotional Analysis**: General emotional trend.
            3. **Suggested Precautions/Resolutions**: Actionable CBT-based steps they can take.
            
            Format as Markdown.
            """
        )
        
        chain = LLMChain(llm=self.llm, prompt=report_prompt)
        report = chain.run(history=history)
        return report
