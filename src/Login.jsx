import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // إرسال طلب تسجيل الدخول
     const response = await axios.post(`${import.meta.env.VITE_API_URL.replace('/patients', '/auth')}/login`, {
  username: username,
  password: password
});

      // 1. حفظ التوكن والصلاحية (Role) في localStorage
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('role', response.data.role); // هنا حفظنا الصلاحية
      localStorage.setItem('isLoggedIn', 'true');

      setMessage('تم تسجيل الدخول بنجاح، جاري التحويل...');
      
      setTimeout(() => {
        window.location.href = "/"; 
      }, 1500);

    } catch (err) {
      // عرض رسالة الخطأ
      setError("خطأ: اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '2px solid #3498db',
    fontSize: '18px',
    textAlign: 'right',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0b1f3a'
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#102a4a',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        width: '400px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ffffff', marginBottom: '30px' }}>تسجيل دخول</h2>
        
        <input 
          type="text" 
          placeholder="اسم المستخدم" 
          style={inputStyle}
          onChange={(e) => setUsername(e.target.value)} 
        />
        
        <input 
            type="password" 
            placeholder="كلمة المرور" 
            style={inputStyle}
            onChange={(e) => {
                const value = e.target.value.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
                setPassword(value);
            }} 
        />
        
        <button type="submit" style={{
          width: '100%',
          padding: '15px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>دخول</button>

        {message && (
          <div style={{ color: '#27ae60', marginTop: '15px', fontWeight: 'bold' }}>
            {message}
          </div>
        )}
        
        {error && (
          <div style={{ color: '#e74c3c', marginTop: '15px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;