import os
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from openai import AsyncOpenAI
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

LM_STUDIO_URL = os.getenv("LM_STUDIO_URL", "http://localhost:1234/v1")
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
ai_client = AsyncOpenAI(base_url=LM_STUDIO_URL, api_key="lm-studio")
mongo_client = AsyncIOMotorClient(MONGO_URL)
db = mongo_client["IArbitre_db"]
rules_collection = db["game_rules"]

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    try:
        while True:
            raw_data = await websocket.receive_text()
            
            # Check if data is JSON {"slug": "game_name", "question": "player_question"}
            try:
                data = json.loads(raw_data)
                game_slug = data.get("slug", "monopoly")
                question = data.get("question", "")
            except:
                game_slug = "monopoly"
                question = raw_data

            # Search if rules exists in MongoDB
            print(f"🔍 Recherche des règles pour : {game_slug}")
            game_doc = await rules_collection.find_one({"slug": game_slug})

            # Load system prompt
            if game_doc:
                system_prompt_loaded = game_doc["compiled_prompt"]
            else:
                system_prompt_loaded = "Tu es un assistant utile. Je n'ai pas trouvé les règles de ce jeu dans la base."
            
            messages = [
                {"role": "system", "content": system_prompt_loaded},
                {"role": "user", "content": question}
            ]

            stream = await ai_client.chat.completions.create(
                model="local-model",
                messages=messages,
                stream=True,
            )

            # Get response stream
            full_response = ""
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    await websocket.send_text(content)
            
            await websocket.send_text(" [FIN]")
            
    except WebSocketDisconnect:
        print("🔌 Joueur déconnecté")