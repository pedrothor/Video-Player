import {useState, useEffect} from 'react'
import VideoPlayer from "../../components/Player";
import { Box, Typography, Button } from '@mui/material';
import Axios from '../../components/Axios';

const VideoPage = () => {  // Definindo o componente corretamente
    const [videos, setVideos] = useState([])
    const [teste, setTeste] = useState(false)

    useEffect(() => {
        Axios.get('/teste/videos')
        .then((resp) => setVideos(resp.data))
        .catch((err) => console.log(`Erro ao resgatar vídeos: ${err}`))
    }, [teste]);
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
    
                    {videos.map((video) => {
                        return (
                            <VideoPlayer 
                                video={video.video_bytes} 
                                thumbnail={video.img_bytes} 
                                titulo={video.titulo}
                                width='300px'
                                height='150px'
                            />
                        )
                    })}
                </Box>
            </Box>
        </>
    );
  };
  
  export default VideoPage;
  