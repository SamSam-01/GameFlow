import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from openai import AsyncOpenAI
from pypdf import PdfReader

app = FastAPI()
client = AsyncOpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

def init_rules(file):
    try:
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print("✅ PDF chargé avec succès !")
        return text
    except Exception as e:
        print(f"⚠️ Erreur PDF : {e}")
        return "Règles introuvables."

GAME_RULES = init_rules("regles_monopoly.pdf")

SYSTEM_PROMPT = f"""
Tu es un assistant expert. Voici les règles officielles sur lesquelles tu dois te baser :
--- DEBUT REGLES ---
{GAME_RULES}
--- FIN REGLES ---
Ne réponds qu'en utilisant ces règles.
"""

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    chat_history = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]
    
    try:
        while True:
            question = await websocket.receive_text()
            
            chat_history.append({"role": "user", "content": question})

            stream = await client.chat.completions.create(
                model="local-model",
                messages=chat_history, 
                stream=True,
            )

            full_response = ""
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    await websocket.send_text(content)
            
            await websocket.send_text(" [FIN]")
            
    except WebSocketDisconnect:
        print("Joueur parti")