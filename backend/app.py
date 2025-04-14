from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import routes

def create_app() -> FastAPI:
    app = FastAPI(title="Minha API")

    origins = [
        "http://localhost:3000",
        "http://localhost:3000/videos",
        "http://localhost:5173",
        "http://localhost:5173/videos",
    ]

    # Configurar CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # Altere para domínios específicos em produção
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Incluir rotas
    app.include_router(routes.api)

    return app
