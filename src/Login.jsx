import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 1. أضفنا هذه الحالة

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 2. بدأ التحميل
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`https://medical-api-4te3.onrender.com/api/auth/login`, {
        username: username,
        password: password
      });

      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('isLoggedIn', 'true');

      setMessage('تم تسجيل الدخول بنجاح، جاري التحويل...');
      
      setTimeout(() => {
        window.location.href = "/"; 
      }, 1500);

    } catch (err) {
      setError("خطأ: اسم المستخدم أو كلمة المرور غير صحيحة");
    } finally {
      setIsLoading(false); // 3. انتهى التحميل (سواء نجح أو فشل)
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
        
        {/* 4. الزر يتغير شكله بناءً على isLoading */}
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: isLoading ? '#7f8c8d' : '#27ae60', // رمادي عند التحميل
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'جاري الدخول...' : 'دخول'}
        </button>

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