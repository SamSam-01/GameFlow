import asyncio
from pypdf import PdfReader
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["IArbitre_db"]
collection = db["game_rules"]

def extract_rules_from_pdf(path):
    try:
        reader = PdfReader(path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print("✅ PDF chargé avec succès !")
        return text
    except Exception as e:
        print(f"⚠️ Erreur PDF : {e}")
        return "Règles introuvables."

async def add_game_to_db(game_name, path):
    print(f"🔄 Traitement de {game_name}...")

    rules = extract_rules_from_pdf(path)
    if not rules:
        return

    SYSTEM_PROMPT = f"""
    Tu es l'Arbitre Officiel du jeu : {game_name}.
    Tu es précis, factuel et concis.
    
    Voici les règles officielles extraites du manuel :
    ------------------------------------------------
    {rules[:15000]} 
    ------------------------------------------------
    
    INSTRUCTION : Réponds à la question du joueur en utilisant UNIQUEMENT les règles ci-dessus.
    Si la réponse n'est pas dans le texte, dis "Je ne sais pas".
    """
    slug = game_name.lower()
    
    await collection.update_one(
        {"slug": slug},
        {"$set": {
            "slug": slug, 
            "game_name": game_name,
            "compiled_prompt": SYSTEM_PROMPT
        }},
        upsert=True
    )
    print(f"✅ {game_name} (slug: {slug}) sauvegardé en base de données !")

async def main():
    await add_game_to_db("Monopoly", "regles_monopoly.pdf")
    await add_game_to_db("Uno", "regles_uno.pdf")

if __name__ == "__main__":
    asyncio.run(main())