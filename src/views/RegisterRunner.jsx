import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import run from './../assets/images/run.jpg';
import person from './../assets/images/person.png';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
 
function RegisterRunner() {
  // สร้าง state เพื่อเก็บข้อมูลที่กรอก
  const [runnerImage, setRunnerImage] = useState(null);
  const [runnerName, setRunnerName] = useState('');
  const [runnerUsername, setRunnerUsername] = useState('');
  const [runnerPassword, setRunnerPassword] = useState('');
 
  const SelectFile = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  });
 
  // ฟังก์ชั่นการจัดการเลือกไฟล์รูป
  const handleImagefile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRunnerImage(file);
    }
  };
 
  // ฟังก์ชั่นการลงทะเบียน
  const handleRegisterClick = async (e) => {
    e.preventDefault();  // ป้องกันการรีเฟรชหน้าเมื่อกดปุ่ม
 
    if (runnerName === '' || runnerUsername === '' || runnerPassword === '') {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
 
    const formData = new FormData();
    formData.append('runnerName', runnerName);
    formData.append('runnerUsername', runnerUsername);
    formData.append('runnerPassword', runnerPassword);
    if (runnerImage) {
      formData.append('runnerImage', runnerImage);
    }
 
    try {
      const response = await fetch('http://localhost:3030/runner', {
        method: 'POST',
        body: formData,
      });
      if (response.status === 201) {
        alert('ลงทะเบียนสำเร็จ');
        window.location.href = '/';
      } else {
        alert('ลงทะเบียนไม่สำเร็จ');
      }
 
    } catch (error) {
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครัง หรือติดต่อผู้ดูแล : ${error}`);
    }
  };
 
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '60%', boxShadow: 2, mx: 'auto', my: 10, py: 5 }}>
        <Typography variant='h3' sx={{ textAlign: 'center', color: '#011474' }}>
          ลงทะเบียน<br />Running Web Application
        </Typography>
        <Avatar alt="Running" src={run} variant='rounded' sx={{ mx: 'auto', mt: 3, width: 120, height: 120, boxShadow: 2 }} />
        <Box sx={{ width: '60%', mx: 'auto', mt: 3 }}>
          <Typography>
            ป้อนชื่อ
          </Typography>
          <TextField
            variant='outlined'
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            label='Fullname'
            value={runnerName}
            onChange={(e) => setRunnerName(e.target.value)}
          />
          <Typography>
            ป้อนชื่อผู้ใช้
          </Typography>
          <TextField
            variant='outlined'
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            label='Username'
            value={runnerUsername}
            onChange={(e) => setRunnerUsername(e.target.value)}
          />
          <Typography>
            ป้อนรหัสผ่าน
          </Typography>
          <TextField
            variant='outlined'
            fullWidth
            sx={{ mt: 2, mb: 4 }}
            label='Password'
            value={runnerPassword}
            onChange={(e) => setRunnerPassword(e.target.value)}
          />
          {/* -------------------------*/}
          <Avatar
            alt='Runner'
            variant='rounded'
            sx={{ mx: 'auto', mb: 3, width: 120, height: 120, boxShadow: 2 }}
            src={runnerImage ? URL.createObjectURL(runnerImage) : person}
          />
 
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              sx={{ py: 2 }}
              variant='contained'
              component='label'
              color='success'
              startIcon={<CloudUploadIcon />}
            >
              Select file upload
              <SelectFile type='file' accept="image/*" onChange={handleImagefile} />
            </Button>
          </Box>
          {/* -------------------------*/}
          <Button
            variant='contained'
            fullWidth
            sx={{ pt: 2, pb: 2, backgroundColor: '#011474' }}
            onClick={handleRegisterClick}
          >
            ลงทะเบียน
          </Button>
          <Typography sx={{ mt: 4, textAlign: 'center' }}>
            <Typography sx={{ display: 'inline', ml: 1 }}>
              <Link to='/' style={{ textDecoration: 'none', color: '#ff0000' }}>
                LOGIN
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
 
export default RegisterRunner;