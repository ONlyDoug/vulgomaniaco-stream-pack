#!/usr/bin/env python3
"""
Setup Automático do Ambiente de Live no Discord
Canal: VulgoManiaco | Guilda: IVEXI | Albion Online

Cria a categoria '╭── ✦ 🎙️ QG DA LIVE' e os 4 canais oficiais com a matriz cirúrgica
de permissões na API oficial do Discord v10 sem necessitar de bibliotecas externas.

Uso:
    python3 scripts/setup_discord_live_channels.py --token "SEU_BOT_TOKEN" --guild-id "ID_DO_SERVIDOR"
    python3 scripts/setup_discord_live_channels.py --dry-run
"""

import sys
import json
import argparse
import urllib.request
import urllib.error

API_BASE = "https://discord.com/api/v10"

# Discord Channel Types
CHANNEL_TYPE_TEXT = 0
CHANNEL_TYPE_VOICE = 2
CHANNEL_TYPE_CATEGORY = 4

# Discord Permission Flags
PERM_STREAM = 1 << 9         # Compartilhar Vídeo / Tela
PERM_VIEW_CHANNEL = 1 << 10   # Ver Canal
PERM_CONNECT = 1 << 20        # Conectar ao canal de voz
PERM_SPEAK = 1 << 21          # Falar no canal de voz

CATEGORY_NAME = "╭── ✦ 🎙️ QG DA LIVE"

CHANNELS_CONFIG = [
    {
        "name": "💬-bate-papo",
        "display_name": "💬 | bate-papo",
        "type": CHANNEL_TYPE_TEXT,
        "rate_limit_per_user": 5,
        "topic": "Chat de texto aberto para acompanhar e comentar a live do VulgoManiaco!",
        "overwrites": []
    },
    {
        "name": "🎬-clips-e-momentos",
        "display_name": "🎬 | clips-e-momentos",
        "type": CHANNEL_TYPE_TEXT,
        "rate_limit_per_user": 0,
        "topic": "Envio de links de clipes da Twitch, jogadas da guilda IVEXI e memes para reagir na live.",
        "overwrites": []
    },
    {
        "name": "🔴-call-da-live",
        "display_name": "🔒 🔴 | call-da-live",
        "type": CHANNEL_TYPE_VOICE,
        "bitrate": 96000,
        "user_limit": 10,
        "overwrites": [
            {
                # @everyone id é o próprio guild_id
                "type": 0,  # Role
                "allow": str(PERM_VIEW_CHANNEL | PERM_SPEAK),
                "deny": str(PERM_CONNECT | PERM_STREAM)
            }
        ]
    },
    {
        "name": "⏳-sala-de-espera",
        "display_name": "⏳ | sala-de-espera",
        "type": CHANNEL_TYPE_VOICE,
        "bitrate": 64000,
        "user_limit": 25,
        "overwrites": [
            {
                "type": 0,  # Role
                "allow": str(PERM_VIEW_CHANNEL | PERM_CONNECT),
                "deny": str(PERM_SPEAK | PERM_STREAM)
            }
        ]
    }
]

def make_request(url, token, data=None, method="GET"):
    headers = {
        "Authorization": f"Bot {token}",
        "User-Agent": "DiscordLiveSetup-IVEXI (https://github.com/ONlyDoug/vulgomaniaco-stream-pack, 1.0)",
        "Content-Type": "application/json"
    }
    encoded_data = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode("utf-8")
        print(f"❌ Erro HTTP {e.code}: {error_msg}")
        raise

def setup_discord_environment(token, guild_id, dry_run=False):
    print("=" * 65)
    print("🎙️ CONFIGURADOR DO AMBIENTE DE LIVE DISCORD — GUILDA IVEXI")
    print(f"   Categoria: {CATEGORY_NAME}")
    print(f"   Guild ID:  {guild_id}")
    print("=" * 65)

    if dry_run:
        print("\n🔍 MODO DE SIMULAÇÃO (--dry-run) ATIVADO. Nenhum canal será criado na API.")
        print(f"-> Seria criada a categoria: '{CATEGORY_NAME}'")
        for ch in CHANNELS_CONFIG:
            tipo = "VOZ" if ch["type"] == CHANNEL_TYPE_VOICE else "TEXTO"
            print(f"   [{tipo}] {ch['display_name']} (slug: {ch['name']})")
        print("\n✅ Simulação concluída com sucesso! Os parâmetros estão válidos.")
        return True

    # 1. Cria a categoria principal
    print(f"\n1. Criando Categoria: '{CATEGORY_NAME}'...")
    cat_payload = {
        "name": CATEGORY_NAME,
        "type": CHANNEL_TYPE_CATEGORY
    }
    cat_data = make_request(f"{API_BASE}/guilds/{guild_id}/channels", token, cat_payload, method="POST")
    cat_id = cat_data["id"]
    print(f"   ✅ Categoria criada com sucesso! (ID: {cat_id})")

    # 2. Cria cada um dos canais dentro da categoria
    for idx, ch in enumerate(CHANNELS_CONFIG, start=2):
        print(f"\n{idx}. Criando Canal: '{ch['display_name']}'...")
        payload = {
            "name": ch["display_name"] if ch["type"] == CHANNEL_TYPE_VOICE else ch["name"],
            "type": ch["type"],
            "parent_id": cat_id
        }

        if "rate_limit_per_user" in ch and ch["rate_limit_per_user"] > 0:
            payload["rate_limit_per_user"] = ch["rate_limit_per_user"]

        if "topic" in ch:
            payload["topic"] = ch["topic"]

        if "bitrate" in ch:
            payload["bitrate"] = ch["bitrate"]

        if "user_limit" in ch:
            payload["user_limit"] = ch["user_limit"]

        # Configura permissões cirúrgicas para @everyone (id = guild_id)
        if ch["overwrites"]:
            overwrites = []
            for ow in ch["overwrites"]:
                overwrites.append({
                    "id": guild_id,
                    "type": ow["type"],
                    "allow": ow["allow"],
                    "deny": ow["deny"]
                })
            payload["permission_overwrites"] = overwrites

        ch_data = make_request(f"{API_BASE}/guilds/{guild_id}/channels", token, payload, method="POST")
        print(f"   ✅ Canal criado com sucesso! (ID: {ch_data['id']})")

    print("\n" + "=" * 65)
    print("🎉 AMBIENTE DE LIVE CONFIGURADO COM SUCESSO NO DISCORD!")
    print("   - Call da Live restrita: Ninguém entra sozinho.")
    print("   - Sala de espera: Membros aguardam mutados na fila.")
    print("   - Bate-papo: Aberto com slowmode de 5s.")
    print("   - Clips: Pronto para envio de momentos marcantes da live.")
    print("=" * 65)
    return True

def main():
    parser = argparse.ArgumentParser(description="Criador do Ambiente de Live Discord - Guilda IVEXI")
    parser.add_argument("--token", help="Token do Bot do Discord (com permissão MANAGE_CHANNELS)")
    parser.add_argument("--guild-id", help="ID do Servidor Discord (Guild ID)")
    parser.add_argument("--dry-run", action="store_true", help="Simula a criação sem chamar a API")

    args = parser.parse_args()

    if args.dry_run:
        setup_discord_environment("DUMMY_TOKEN", args.guild_id or "123456789", dry_run=True)
        return

    token = args.token
    if not token:
        token = input("Digite o Token do Bot do Discord: ").strip()

    guild_id = args.guild_id
    if not guild_id:
        guild_id = input("Digite o ID do Servidor Discord (Guild ID): ").strip()

    if not token or not guild_id:
        print("❌ Token e Guild ID são obrigatórios.")
        sys.exit(1)

    try:
        setup_discord_environment(token, guild_id, dry_run=False)
    except Exception as e:
        print(f"\n❌ Falha na execução: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
