import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material';
import InputDropzone from '../Dropzone/index.jsx';
import Axios from '../Axios/index.jsx';


const Home = () => {  // Definindo o componente corretamente
    const [files, setFiles] = useState([]);
    console.log(files)

    const handleFileChange = (e) => {
        setFiles(e.target.files);  // Salva os arquivos no estado
    };

    const sendFiles = () => {
        const formData = new FormData();
      
        if (files) {
          Array.from(files).forEach((file) => {
            formData.append('files', file); // <-- o nome aqui deve ser "files" se o backend espera files: List[UploadFile]
          });
        }
      
        Axios.post('/teste/files/', formData, { // <-- aqui estava "files", agora está correto: formData
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(() => {
            console.log('deu bom!');
            setFiles([])
          })
          .catch((err) => {
            console.log(`erroooooo: ${err}`);
          });
      };
      
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            <Typography variant="h4">Home Page</Typography>
            <Typography>Bem-vindo à página inicial!</Typography>
            <InputDropzone files={files} setFiles={setFiles} onFileAccepted={setFiles} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button 
                    color='warning' 
                    variant='contained'
                    onClick={() => sendFiles(files)}    
                >
                    Teste
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
