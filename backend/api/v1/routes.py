import base64
from fastapi import APIRouter, UploadFile, File
from typing import List


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
            res['img_bytes'] = img_base64

        # reading video
        with open(r'', 'rb') as video:
            video_bytes = video.read()
            video_base64 = base64.b64encode(video_bytes).decode('utf-8')
            res['video_bytes'] = video_base64

        res['titulo'] = 'Test video player'

        final_list.append(res)

        return final_list*4
    except Exception as e:
        raise Exception(f'Erro: {e}')
