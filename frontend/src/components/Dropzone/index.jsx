import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function InputDropzone({ files, setFiles, onFileAccepted }) {
    
    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = [...files, ...acceptedFiles];
        setFiles(newFiles);
        
        if (typeof onFileAccepted === 'function') {
            onFileAccepted(newFiles);
        }
    }, [files, onFileAccepted]);
  
    const removeFile = (fileToRemove) => {
        const updatedFiles = files.filter((file) => file !== fileToRemove);
        setFiles(updatedFiles);
        
        if (typeof onFileAccepted === 'function') {
            onFileAccepted(updatedFiles);
        }
    };
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true
    });
    
    const zoneColor = isDragActive ? 'green' : 'white'
    
    return (
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          padding: '30px',
          textAlign: 'center',
          borderRadius: '10px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          borderColor: zoneColor
        }}
      >
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <Typography variant="body1" sx={{color: zoneColor}}>
            Arraste um arquivo ou clique para selecionar
          </Typography>
        ) : (
          <Stack spacing={1}>
            {files.map((file, index) => (
                <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        borderRadius: '5px',
                        padding: '8px 12px',
                        '&:hover .file-name': {
                        color: 'green',
                        },
                        '&:hover .close-icon': {
                        color: 'green',
                        }
                    }}
                    >
                    <Typography
                        variant="body2"
                        className="file-name"
                        sx={{ wordBreak: 'break-all', color: 'white' }}
                    >
                        {file.name}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file);
                        }}
                    >
                        <CloseIcon fontSize="small" className="close-icon" sx={{ color: 'white', marginLeft: 1 }} />
                    </IconButton>
                </Box>
            ))}
          </Stack>
        )}
      </Box>
    );
}