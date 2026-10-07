#!/usr/bin/env python3
"""
Exportador oficial da Coleção de Cenas do OBS Studio (.json) para o streamer VulgoManiaco.
Gera um arquivo JSON 100% compatível com 'Coleção de Cenas > Importar' do OBS Studio,
com as 5 cenas em 1080p60, posicionamento da webcam e fontes de navegador.
"""

import os
import sys
import json
import argparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OBS_DIR = os.path.join(BASE_DIR, 'obs')
PUBLIC_OBS_DIR = os.path.join(BASE_DIR, 'public', 'obs')

os.makedirs(OBS_DIR, exist_ok=True)
os.makedirs(PUBLIC_OBS_DIR, exist_ok=True)

def build_scene_collection(base_url="https://vulgomaniaco-stream-pack.vercel.app", collection_name="VulgoManiaco - Albion Online Stream Pack"):
    base_url = base_url.rstrip('/')
    custom_css = "body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }"

    return {
        "name": collection_name,
        "current_scene": "🎮 02 - GAMEPLAY (Albion Online)",
        "current_program_scene": "🎮 02 - GAMEPLAY (Albion Online)",
        "scene_order": [
            {"name": "⏳ 01 - ABERTURA (Starting Soon)"},
            {"name": "🎮 02 - GAMEPLAY (Albion Online)"},
            {"name": "☕ 03 - INTERVALO (Pausa / BRB)"},
            {"name": "💬 04 - JUST CHATTING (Conversa & Reunião)"},
            {"name": "🛑 05 - ENCERRAMENTO (Ending Stream)"}
        ],
        "sources": [
            # 1. Alertas Globais OBS
            {
                "id": "browser_source",
                "name": "🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "url": f"{base_url}/alerts",
                    "width": 1920,
                    "height": 1080,
                    "fps": 60,
                    "css": custom_css,
                    "shutdown": False,
                    "restart_when_active": False
                }
            },
            # 2. Tela de Abertura
            {
                "id": "browser_source",
                "name": "⏳ HUD Abertura (Starting Soon)",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "url": f"{base_url}/scenes/starting",
                    "width": 1920,
                    "height": 1080,
                    "fps": 60,
                    "css": custom_css,
                    "shutdown": True,
                    "restart_when_active": True
                }
            },
            # 3. Overlay de Gameplay (Facecam & Anti-Snipe)
            {
                "id": "browser_source",
                "name": "🎮 Overlay de Gameplay (Facecam & Anti-Snipe)",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "url": f"{base_url}/overlay/gameplay",
                    "width": 1920,
                    "height": 1080,
                    "fps": 60,
                    "css": custom_css,
                    "shutdown": False,
                    "restart_when_active": False
                }
            },
            # 4. Tela de Intervalo (BRB)
            {
                "id": "browser_source",
                "name": "☕ HUD Intervalo (BRB)",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "url": f"{base_url}/scenes/brb",
                    "width": 1920,
                    "height": 1080,
                    "fps": 60,
                    "css": custom_css,
                    "shutdown": True,
                    "restart_when_active": True
                }
            },
            # 5. Cena de Just Chatting
            {
                "id": "browser_source",
                "name": "💬 HUD Just Chatting",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "url": f"{base_url}/scenes/chatting",
                    "width": 1920,
                    "height": 1080,
                    "fps": 60,
                    "css": custom_css,
                    "shutdown": True,
                    "restart_when_active": True
                }
            },
            # 6. Cena de Encerramento
            {
                "id": "browser_source",
                "name": "🛑 HUD Encerramento (Ending)",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "url": f"{base_url}/scenes/ending",
                    "width": 1920,
                    "height": 1080,
                    "fps": 60,
                    "css": custom_css,
                    "shutdown": True,
                    "restart_when_active": True
                }
            },
            # 7. Captura de Jogo (Albion Online)
            {
                "id": "game_capture",
                "name": "⚔️ Captura de Jogo (Albion Online)",
                "muted": False,
                "volume": 1.0,
                "settings": {
                    "capture_mode": "window",
                    "window": "Albion-Online.exe:Albion-Online:Albion-Online",
                    "hook_rate": 1,
                    "cursor": True
                }
            },
            # 8. Webcam do Streamer (Facecam Gameplay 16:9 - 384x216)
            {
                "id": "dshow_input",
                "name": "📷 Webcam do Streamer (Facecam Gameplay)",
                "muted": False,
                "volume": 1.0,
                "settings": {}
            },
            # 9. Webcam Grande (Just Chatting - 1224x640)
            {
                "id": "dshow_input",
                "name": "📷 Webcam do Streamer (Just Chatting Grande)",
                "muted": False,
                "volume": 1.0,
                "settings": {}
            },

            # ================= CENA 01: ABERTURA =================
            {
                "id": "scene",
                "name": "⏳ 01 - ABERTURA (Starting Soon)",
                "settings": {
                    "items": [
                        {
                            "name": "⏳ HUD Abertura (Starting Soon)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        {
                            "name": "🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        }
                    ]
                }
            },

            # ================= CENA 02: GAMEPLAY (ALBION ONLINE) =================
            {
                "id": "scene",
                "name": "🎮 02 - GAMEPLAY (Albion Online)",
                "settings": {
                    "items": [
                        # Camada 1 (Fundo): Jogo em tela cheia
                        {
                            "name": "⚔️ Captura de Jogo (Albion Online)",
                            "visible": True,
                            "locked": False,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        # Camada 2: Câmera perfeitamente alinhada dentro da moldura (x=32, y=824, w=384, h=216)
                        {
                            "name": "📷 Webcam do Streamer (Facecam Gameplay)",
                            "visible": True,
                            "locked": False,
                            "pos": {"x": 32.0, "y": 824.0},
                            "bounds": {"x": 384.0, "y": 216.0},
                            "bounds_type": 2, # OBS_BOUNDS_SCALE_INNER
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        # Camada 3: Overlay tático (Facecam Bezel + Anti-Snipe no minimapa)
                        {
                            "name": "🎮 Overlay de Gameplay (Facecam & Anti-Snipe)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        # Camada 4 (Topo): Alertas
                        {
                            "name": "🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        }
                    ]
                }
            },

            # ================= CENA 03: INTERVALO (BRB) =================
            {
                "id": "scene",
                "name": "☕ 03 - INTERVALO (Pausa / BRB)",
                "settings": {
                    "items": [
                        {
                            "name": "☕ HUD Intervalo (BRB)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        {
                            "name": "🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        }
                    ]
                }
            },

            # ================= CENA 04: JUST CHATTING =================
            {
                "id": "scene",
                "name": "💬 04 - JUST CHATTING (Conversa & Reunião)",
                "settings": {
                    "items": [
                        {
                            "name": "📷 Webcam do Streamer (Just Chatting Grande)",
                            "visible": True,
                            "locked": False,
                            "pos": {"x": 40.0, "y": 106.0},
                            "bounds": {"x": 1224.0, "y": 640.0},
                            "bounds_type": 2,
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        {
                            "name": "💬 HUD Just Chatting",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        {
                            "name": "🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        }
                    ]
                }
            },

            # ================= CENA 05: ENCERRAMENTO =================
            {
                "id": "scene",
                "name": "🛑 05 - ENCERRAMENTO (Ending Stream)",
                "settings": {
                    "items": [
                        {
                            "name": "🛑 HUD Encerramento (Ending)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        },
                        {
                            "name": "🔔 Camada de Alertas OBS (Follow / Sub / Dono / Raid)",
                            "visible": True,
                            "locked": True,
                            "pos": {"x": 0.0, "y": 0.0},
                            "scale": {"x": 1.0, "y": 1.0}
                        }
                    ]
                }
            }
        ]
    }

def main():
    parser = argparse.ArgumentParser(description="Gera Coleção de Cenas oficial do OBS Studio (.json)")
    parser.add_argument("--base-url", default="https://vulgomaniaco-stream-pack.vercel.app", help="URL base onde os overlays estão hospedados (padrão: https://vulgomaniaco-stream-pack.vercel.app)")
    parser.add_argument("--output", default="", help="Caminho do arquivo de saída customizado")
    args = parser.parse_args()

    data = build_scene_collection(args.base_url)

    out_file = args.output or os.path.join(OBS_DIR, "vulgomaniaco-albion-scene-collection.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    public_out = os.path.join(PUBLIC_OBS_DIR, "vulgomaniaco-albion-scene-collection.json")
    with open(public_out, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✓ Coleção de Cenas do OBS gerada com sucesso!")
    print(f"  • Arquivo OBS: {out_file}")
    print(f"  • Arquivo Web: {public_out}")
    print(f"  • URL Base configurada: {args.base_url}")
    print(f"  • Total de Cenas: {len(data['scene_order'])}")
    print(f"  • Total de Fontes: {len(data['sources'])}")

if __name__ == "__main__":
    main()
