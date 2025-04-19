import {useState, useEffect} from 'react'
import VideoPlayer from "../../components/Player";
import { Box, Typography, Grow } from '@mui/material';
import Axios from '../../components/Axios';

const VideoPage = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        Axios.get('/teste/videos')
        .then((resp) => setVideos(resp.data))
        .catch((err) => console.log(`Erro ao resgatar vídeos: ${err}`))
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: 10,
                    flexDirection: 'column',
                }}
            >
                <Box>
                    <Typography variant="h4">Bem vindo aos vídeos!</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        maxWidth: '100%',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    {videos.map((video, index) => (
                        <Grow
                            in={true}
                            timeout={500 + index * 100} // atraso entre cada vídeo (efeito "em cadeia")
                            transformOrigin="0 0 0 0"
                            key={index}
                        >
                            <Box>
                                <VideoPlayer 
                                    thumbnail={video.img_base64}
                                    titulo={video.titulo}
                                    inserido_por={video.inserido_por}
                                    inserido_em={video.inserido_em}
                                    width='350px'
                                    height='200px'
                                />
                            </Box>
                        </Grow>
                    ))}
                </Box>
            </Box>
        </>
    );
  };
  
  export default VideoPage;
  