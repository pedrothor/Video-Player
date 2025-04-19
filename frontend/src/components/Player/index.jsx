import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Axios from '../../components/Axios';


const VideoPlayer = ({ thumbnail, titulo, inserido_por, inserido_em, width='600px', height='340px' }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // converter base64 em Blob
    const base64ToBlob = (base64, mimeType) => {
      const byteCharacters = atob(base64); // Decodifica base64
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      return new Blob(byteArrays, { type: mimeType });
    };

    const fetchVideo = async () => {
        setIsLoading(true)
        Axios.get('/teste/videos/heavy/1', {responseType: 'blob'})
        .then((resp) => {
          const blobUrl = URL.createObjectURL(resp.data);
          setVideoUrl(blobUrl);
        })
        .catch((err) => console.log(`Erro ao resgatar base64 de video: ${err}`))
        .finally(() => setIsLoading(false))
    };

    useEffect(() => {
      if (thumbnail) {
        const blob = base64ToBlob(thumbnail, 'image/jpeg'); // ou 'image/png' dependendo do formato
        setThumbnailUrl(URL.createObjectURL(blob));
      }

      return () => {
        if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
      };
    }, [thumbnail]);

    return (
      <Box
        sx={{
            mb: 4
        }}
      >
{/*       npm install react-plyr */}
        <Box sx={{ position: 'relative', mb: 1, width: width, height: height }}>
          {!videoUrl && (
            <>
                <img src={thumbnailUrl} style={{ width: width, height: height, }} />
                {isLoading ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <CircularProgress size={50} sx={{ color: 'white' }} />
                  </Box>
                ) : (
                  <Button
                    onClick={fetchVideo}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '2rem',
                      border: 'none',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                  >
                    ▶
                  </Button>
                )}
              </>
          )}
        {videoUrl && (
            <video src={videoUrl} controls autoPlay style={{ width: width, height: height }} />
        )}
        </Box>
        <Typography variant="h6">Pauta: {titulo}</Typography>
        <Typography>Inserido por: {inserido_por}</Typography>
        <Typography>Inserido em: {inserido_em}</Typography>
      </Box>
    );
  };
export default VideoPlayer;
