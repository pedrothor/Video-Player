import re
import json
import base64
from io import BytesIO
from typing import List
from fastapi.responses import StreamingResponse
from fastapi import APIRouter, UploadFile, File, Request, Response


api = APIRouter(prefix='/teste')

@api.get('/')
async def home():
    return 'API on'


@api.post("/files")
async def upload_files(files: List[UploadFile] = File(...)):
    try:
        for file in files:
            contents = await file.read()
            print(f"Recebido: {file.filename} ({file.content_type}) com {len(contents)} bytes")


            # saving of disk
            with open(f"uploaded_{file.filename}", "wb") as f:
                f.write(contents)

        return {"message": f"{len(files)} arquivo(s) recebido(s) com sucesso!"}
    except Exception as e:
        raise Exception(f'Erro: {e}')


@api.get('/videos')
async def videos():
    try:
        res = {}
        final_list = []

        # reading img
        with open(r'', 'rb') as img:
            img_bytes = img.read()
            img_base64 = base64.b64encode(img_bytes).decode('utf-8')
            res['img_base64'] = img_base64

        res['titulo'] = 'Test video player'
        res['inserido_por'] = '@test'
        res['inserido_em'] = '25/02/2025 às 23:59:59'

        final_list.append(res)

        return final_list*4
    except Exception as e:
        raise Exception(f'Erro: {e}')


@api.get('/videos/{video_id}')
async def get_video():
    try:
        res = {}

        # reading video
        with open(r'', 'rb') as video:
            video_bytes = video.read()
            video_base64 = base64.b64encode(video_bytes).decode('utf-8')
            res['video_b64'] = video_base64

        return json.dumps(res)
    except Exception as e:
        raise Exception(f'Erro: {e}')


@api.get("/videos/heavy/{video_id}")
async def get_video_heavy(video_id, request: Request):
    # path
    video_path = r""

    with open(video_path, 'rb') as video_file:
        video_bytes = video_file.read()

    video_size = len(video_bytes)

    # caso seja necessario usar streaming pro front pegar so uma parte do video
    range_header = request.headers.get('range')
    if range_header:
        match = re.search(r"bytes=(\d+)-(\d*)", range_header)
        if match:
            byte1 = int(match.group(1))
            byte2 = int(match.group(2)) if match.group(2) else video_size - 1
        else:
            byte1 = 0
            byte2 = video_size - 1

        chunk = video_bytes[byte1:byte2 + 1]
        content_length = byte2 - byte1 + 1

        headers = {
            "Content-Range": f"bytes {byte1}-{byte2}/{video_size}",
            "Accept-Ranges": "bytes",
            "Content-Length": str(content_length),
            "Content-Type": "video/mp4"
        }

        return StreamingResponse(BytesIO(chunk), status_code=206, headers=headers)

    # se nao tiver streaming, retorna o video completo
    return Response(content=video_bytes, media_type="video/mp4")