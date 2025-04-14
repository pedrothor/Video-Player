from api.v1.routes import *

app = FastAPI(title="Teste Projeto FastAPI")

app.include_router(rota_usuarios.router, prefix="/api/v1/usuarios", tags=["Usuários"])
