from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import OpenAI
from pydantic import BaseModel
from typing import Dict, List
import logging
from collections import defaultdict

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key='sk-cAqEOuDHGqqrN0KGfFV1Z5kkHIMjYo-fR_C6sWdmOHT3BlbkFJwQ3T4FnvfIK0gAdOIVLt48gEyXajBzvd5TubTMoN4A')
session_histories: Dict[str, List[Dict[str, str]]] = defaultdict(list)

class ChatMessage(BaseModel):
    message: str
    session_id: str

def truncate_context(messages: List[Dict[str, str]], max_words: int = 300) -> List[Dict[str, str]]:
    """Truncate conversation history to stay within token limits"""
    truncated_messages = []
    word_count = 0
    
    system_prompt = {
        "role": "system",
        "content": "You are a helpful assistant answering questions about Aditya Kumar's portfolio. Be concise and friendly in your responses."
    }
    truncated_messages.append(system_prompt)
    
    for msg in reversed(messages):
        msg_words = len(msg['content'].split())
        if word_count + msg_words <= max_words:
            truncated_messages.insert(1, msg)  
            word_count += msg_words
        else:
            break
            
    return truncated_messages

@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        if not message.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        if not message.session_id:
            raise HTTPException(status_code=400, detail="Session ID is required")

        session_histories[message.session_id].append({
            "role": "user",
            "content": message.message.strip()
        })

        messages = truncate_context(session_histories[message.session_id])

        response = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=messages,
            temperature=0.4,
            max_tokens=150
        )

        ai_message = response.choices[0].message.content
        session_histories[message.session_id].append({
            "role": "assistant",
            "content": ai_message
        })

        return JSONResponse(content={"response": ai_message})

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/clear_session")
async def clear_session(session_id: str):
    try:
        if session_id in session_histories:
            del session_histories[session_id]
            return JSONResponse(content={"status": "Session cleared successfully"})
        return JSONResponse(content={"status": "Session not found"}, status_code=404)
    except Exception as e:
        logger.error(f"Error clearing session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    

# uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4 --reload