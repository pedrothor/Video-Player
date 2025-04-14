import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ video, thumbnail, titulo, width='600px', height='340px' }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);

    // Função para converter base64 em Blob
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
  
    useEffect(() => {
      if (thumbnail) {
        const blob = base64ToBlob(thumbnail, 'image/jpeg'); // ou 'image/png' dependendo do formato
        setThumbnailUrl(URL.createObjectURL(blob));
      }
  
      if (video) {
        const blob = base64ToBlob(video, 'video/mp4');
        setVideoUrl(URL.createObjectURL(blob));
      }
  
      return () => {
        if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
        if (videoUrl) URL.revokeObjectURL(videoUrl);
      };
    }, [video, thumbnail]);
  
    return (
      <Box
        sx={{
            mb: 4
        }}
      >
        <Box sx={{ mb: 1, width: width, height: height }}>
            <ReactPlayer
                url={videoUrl}
                light={thumbnailUrl}
                playing={true}
                controls
                width="100%"
                height="100%"
            />
        </Box>
        <Typography variant="h6">Pauta: {titulo}</Typography>
        <Typography>Inserido por: @chico</Typography>
        <Typography>Inserido em:25/02/2025 às 23:59:59</Typography>
      </Box>
    );
  };
export default VideoPlayer;
