import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import run from './../assets/images/run.jpg';

function LoginRunner() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    try {

      const response = await fetch(`http://localhost:3030/runner/${username}/${password}`, { method: 'GET' });
      if(response.status === 200){
        const responseData = await response.json();
        localStorage.setItem('runner', JSON.stringify(responseData["data"]));

        window.location.href = '/run/runofrunner';
      }else if(response.status === 404){
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }else{
        alert('เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch {
      alert('แย่ๆๆ' + error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '60%', boxShadow: 2, mx: 'auto', mt: 10, py: 5 }}>
        <Typography variant='h3' align='center' color='#011474'>
          เข้าใช้งาน<br />Running Web Application
        </Typography>
        <Avatar alt='Running' src={run} variant='rounded' sx={{ mx: 'auto', mt: 3, width: 120, height: 120, boxShadow: 2 }} />
        <Box sx={{ width: '60%', mx: 'auto', mt: 3 }}>
          <TextField label='Username' fullWidth variant='outlined' sx={{ mb: 2 }} 
          value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label='Password' type='password' fullWidth variant='outlined' sx={{ mb: 4 }} 
          value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant='contained' fullWidth sx={{ py: 2, backgroundColor: '#011474' }} onClick={handleLoginClick}>
            Login
          </Button>
          <Typography align='center' mt={4}>
            ยังไม่มีบัญชีผู้ใช้?{' '}
            <Link to='/runner/registerrunner' style={{ textDecoration: 'none', color: '#ff0000' }}>ลงทะเบียน</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginRunner;
