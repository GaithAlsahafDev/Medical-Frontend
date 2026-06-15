import { useState, useEffect } from 'react';
import './App.css';
// استيراد صورة الشعار بالمسار الصحيح من مشروعكِ:
import logo from './logo.png.png'; 
import ashuraImage from './ashura.png';

// قائمة الأدوية المنظمة والمقسمة حسب الأقسام الطبية بدقة
const allMedicationsByCategory = {
  "أدوية الجهاز الهضمي": [
    "Rennie — (الحموضة)",
    "Omeprazole (20 mg)",
    "Omeprazole (40 mg)",
    "Esomeprazole (20 mg)",
    "Esomeprazole (40 mg)",
    "Buscopan — 10 mg (المغص)",
    "Enterostop — Tab (الإسهال)",
    "Flagyl (250 mg)",
    "Flagyl (500 mg)",
    "No Vomit — 8 mg (الغثيان والتقيؤ)",
    "Plasil — 10 mg (الغثيان والتقيؤ)",
    "Vitamin B6 (الغثيان ونقص الفيتامين)",
    "Cinnarizine — 25 mg (الدوخة ودوار السفر)",
    "Duspatalin — 135 mg (القولون العصبي)",
    "Colona — Tab (القولون العصبي)"
  ],
  "المضادات الحيوية": [
    "Amoxil (250 mg)",
    "Amoxil (500 mg)",
    "Keflex (250 mg)",
    "Keflex (500 mg)",
    "Azithromycin (250 mg)",
    "Azithromycin (500 mg)",
    "Amoxil Syrup (125 mg/5 ml)",
    "Amoxil Syrup (250 mg/5 ml)",
    "Azithromycin Syrup (200 mg/5 ml)",
    "Flagyl Syrup (125 mg/5 ml)",
    "Flagyl Syrup (200 mg/5 ml)"
  ],
  "الحساسية والزكام": [
    "Butadin — 2 mg (الحساسية)",
    "Histadine — 10 mg (الحساسية)",
    "Loratadine — 10 mg (الحساسية)",
    "Dexon — 0.5 mg (الحساسية والالتهاب)",
    "Allermin — 4 mg (الحساسية)",
    "Flu Out (الزكام والإنفلونزا)",
    "Loratadine Syrup (5 mg/5 ml)",
    "Toplexil Syrup (السعال)",
    "Zecuf Syrup (السعال)",
    "Solvodin Syrup (مذيب للبلغم)"
  ],
  "السكري والضغط": [
    "Daonil — 5 mg (السكري)",
    "Glibesyn — 5 mg (السكري)",
    "Metformin (500 mg)",
    "Metformin (850 mg)",
    "Capoten (25 mg)",
    "Capoten (50 mg)",
    "Lasix — 20 mg (مدر بول)",
    "Aspirin — 100 mg (مميع دم)"
  ],
  "المسكنات ومضادات الالتهاب": [
    "Ibuprofen (Brufen) (200 mg)",
    "Ibuprofen (Brufen) (400 mg)",
    "Voltaren (25 mg)",
    "Voltaren (50 mg)",
    "Voltaren (100 mg)",
    "Ponstan (250 mg)",
    "Ponstan (500 mg)",
    "Kanagesic — Tab (مسكن ألم)",
    "Norgesic — Tab (تشنج العضلات)",
    "Mobic (7.5 mg)",
    "Mobic (15 mg)",
    "Indocid (25 mg)",
    "Indocid (50 mg)",
    "Paracetamol (500 mg)",
    "Paracetamol (1G)",
    "Panadol (500 mg)",
    "Diclofenac Sachet (50 mg)"
  ],
  "الكريمات والمراهم": [
    "Fusidin Ointment (2%)",
    "Flamazine (1%)",
    "Nystacort Ointment (Nystatin + Triamcinolone)",
    "Fugidin Cream (2%)",
    "Celavex Cream",
    "Betnosam (0.1% Cream)",
    "Betnosam (0.1% Ointment)",
    "Dermodin Ointment (0.1%)",
    "Rheumalgin Cream",
    "Voltaren Gel (1%)",
    "Voltaren Gel (2%)"
  ],
  "الشرابات": [
    "Antipyrol Syrup (خافض حرارة)",
    "Antispasmin Syrup (مغص الأطفال)"
  ],
  "المغذيات والمستلزمات": [
    "Normal Saline (500 ml)",
    "Glucose Saline (G/S) (500 ml)",
    "Ringer Solution (500 ml)",
    "Paracetamol IV Infusion (1000 mg / 100 ml)",
    "Wound Plaster (لاصق جروح)",
    "IV Giving Set (جهاز إعطاء)",
    "Yellow Cannula — 24G",
    "Blue Cannula — 22G",
    "Pink Cannula — 20G"
  ]
};

function App() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [medications, setMedications] = useState([]);
  const [procedure, setProcedure] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [doctors, setDoctors] = useState([]);
  
  // حقول العلامات الحيوية
  const [pulse, setPulse] = useState('');
  const [bp, setBp] = useState('');
  const [bg, setBg] = useState('');
  const [o2, setO2] = useState('');

  // الحقول الشخصية
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [selectedPatientName, setSelectedPatientName] = useState('');

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newDocUsername, setNewDocUsername] = useState('');
  const [newDocPassword, setNewDocPassword] = useState('');

  // الـ State المسؤول عن فتح وإغلاق القوائم المنسدلة لكل قسم بشكل مستقل
  const [openDropdown, setOpenDropdown] = useState(null);

  //const API_URL = 'http://localhost:5186/api/patients';
   // ... (داخل الـ component في App.jsx)

// ضع هذه الأسطر هنا تحت بعضها:
const API_URL = 'https://medical-api-4te3.onrender.com/api/patients';
const AUTH_URL = import.meta.env.VITE_API_URL.replace('/patients', '/auth');

// ... (باقي الكود)

  // استدعاء دالة جلب المرضى عند تحميل الصفحة مباشرة لتحديث العداد والجدول
  useEffect(() => {
    fetchPatients();
  }, []);
  useEffect(() => {
  if (showRegisterModal) {
    fetchDoctors();
  }
}, [showRegisterModal]);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        alert("غير مصرح لك بالدخول!");
        window.location.href = "/login";
        return;
      }
      
      const data = await response.json();
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('خطأ في الاتصال بالـ API:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    //  تنظيف وتأمين الحقول لضمان عدم إرسال قيم فارغة تضايق السيرفر وتسبب خطأ 400
    const newPatient = { 
      name: name ? name.trim() : "-",
      address: address ? address.trim() : "-",
      birthDate: birthDate ? birthDate.trim() : "-",
      phone: phone ? phone.trim() : "-",
      info: info ? info.trim() : "-",
      medications: medications.length > 0 ? medications.join(', ') : "-",
      procedure: procedure ? procedure.trim() : "-",
      pulse: pulse ? pulse.trim() : "-",
      bp: bp ? bp.trim() : "-",
      bg: bg ? bg.trim() : "-",
      o2: o2 ? o2.trim() : "-"
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newPatient),
      });

      if (response.status === 401) {
        alert("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً");
        window.location.href = "/login";
        return;
      }

      //  كشف تفاصيل الحقل المكسور إذا رمى السيرفر خطأ 400 بدلاً من الرفض الصامت
      if (response.status === 400) {
        const errorData = await response.json();
        console.error("تفاصيل الخطأ من السيرفر:", errorData);
        alert("لم يتم الحفظ بسبب تعارض الحقول: " + JSON.stringify(errorData));
        return;
      }

      if (response.ok) {
        setName(''); setAddress(''); setBirthDate(''); setPhone('');
        setInfo(''); setMedications([]); setProcedure('');
        setPulse(''); setBp(''); setBg(''); setO2('');
        fetchPatients(); 
        setOpenDropdown(null); // غلق أي قائمة مفتوحة بعد الحفظ
        alert("🎉 تم حفظ سجل المريض بنجاح!");
      }
    } catch (error) {
      console.error('خطأ في إرسال البيانات:', error);
    }
  };
  const fetchDoctors = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${AUTH_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
        const data = await response.json();
        //  الإضافة هنا: استثناء المستخدم الذي دوره "Admin"
        setDoctors(data.filter(u => u.role !== 'Admin')); 
    }
  };


  // بناء خارطة السجلات الفرعية وتجنب الأخطاء عند انعدام حقول المريض الحالية
  const historyMap = {};
  const uniquePatientsMap = {};

  if (Array.isArray(patients)) {
    patients.forEach((patient) => {
      if (!patient) return;
      const pName = (patient.name || patient.Name || "").toString().trim().toLowerCase();
      const pBirth = (patient.birthDate || patient.BirthDate || "").toString().trim();
      const uniqueKey = `${pName}_${pBirth}`; 
      
      if (!historyMap[uniqueKey]) {
        historyMap[uniqueKey] = [];
      }
      historyMap[uniqueKey].push(patient);
      uniquePatientsMap[uniqueKey] = patient;
    });
  }

  const uniquePatientsList = Object.values(uniquePatientsMap);

  const filteredPatients = searchTerm.trim() === "" 
    ? [] 
    : uniquePatientsList.filter((patient) => {
        const pName = patient.name || patient.Name || "";
        return pName.toLowerCase().includes(searchTerm.toLowerCase());
      });

  const handleViewHistory = (patient) => {
    if (!patient) return;
    const pName = (patient.name || patient.Name || "").trim().toLowerCase();
    const pBirth = (patient.birthDate || patient.BirthDate || "").trim();
    const uniqueKey = `${pName}_${pBirth}`;
    
    const history = historyMap[uniqueKey] || [];
    const sortedHistory = [...history].reverse();
    setSelectedPatientHistory(sortedHistory);
    setSelectedPatientName(patient.name || patient.Name || "غير معروف");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  };

  const handleRegisterDoctor = async () => {
    try {
      const token = localStorage.getItem('token'); 
      // استبدل السطر الذي يحتوي على AUTH_URL بهذا السطر المباشر:
const response = await fetch(`https://medical-api-4te3.onrender.com/api/auth/register`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    username: newDocUsername,
    password: newDocPassword
  })
});

      if (response.status === 401 || response.status === 403) {
        alert("عذراً، انتهت الجلسة أو لا تملك صلاحية أدمن لإضافة مستخدمين!");
        return;
      }

      if (response.ok) {
        alert("تمت إضافة الطبيب بنجاح في قاعدة البيانات!");
        setShowRegisterModal(false);
        setNewDocUsername(''); 
        setNewDocPassword('');
      } else {
        alert("فشل في إضافة الطبيب، تأكد من البيانات.");
      }
    } catch (error) {
      console.error("خطأ أثناء الاتصال بالسيرفر:", error);
    }
  };
  
  const handleDeleteDoctor = async (username) => {
    if (!window.confirm(`هل أنت متأكد من حذف الطبيب: ${username}؟`)) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${AUTH_URL}/delete-doctor/${username}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert("تم حذف الطبيب بنجاح!");
        
        //  الحل هنا: قم بتحديث القائمة فوراً في الـ State
        // هذا السطر يزيل الطبيب من القائمة المعروضة أمامك فوراً
        setDoctors(doctors.filter(d => d.username !== username));
        
      } else {
        alert("فشل في حذف الطبيب.");
      }
    } catch (error) {
      console.error("خطأ:", error);
    }
  };
  const toggleDropdown = (category) => {
    if (openDropdown === category) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(category);
    }
  };

  return (
   <div className="medical-container" style={{ paddingTop: '5px' }}>
  
  {/* حاوية الأزرار العلوية الموحدة (ريسبونسيف) */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    width: '100%',
    boxSizing: 'border-box'
  }}>
    
    {/* زر تسجيل الخروج */}
    <button 
      onClick={handleLogout}
      style={{
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px'
      }}
    >
      تسجيل خروج 
    </button>

    {/* زر إضافة طبيب (يظهر فقط للأدمن) */}
    {localStorage.getItem('role') === 'Admin' && (
      <button 
        onClick={() => setShowRegisterModal(true)} 
        style={{ 
          backgroundColor: '#f1e68d', 
          color: '#5a4e00', 
          padding: '8px 16px', 
          borderRadius: '8px', 
          border: '1px solid #d4c45e', 
          cursor: 'pointer', 
          fontWeight: 'bold' 
        }}
      >
        ➕ إضافة طبيب
      </button>
    )}
  </div>
      
      {/* ترويسة مرنة تحتوي على (الصور الجانبية + الشعار + العنوان) */}
<div style={{
  display: 'flex',
  justifyContent: 'center', // توسيط العناصر
  alignItems: 'center',
  flexWrap: 'wrap',         // 🟢 هذه تجعل العناصر تنزل للسطر التالي إذا صغرت الشاشة
  gap: '15px',
  padding: '15px',
  backgroundColor: '#102a4a',
  borderRadius: '12px',
  margin: '20px auto', 
  width: '95%',
  maxWidth: '900px',
  direction: 'rtl'
}}>
  {/* الصور الجانبية والشعار */}
  <img src={ashuraImage} alt="عاشور" style={{ width: '15%', minWidth: '80px', maxWidth: '150px', height: 'auto' }} />
  <img src={logo} alt="شعار" style={{ width: '15%', minWidth: '80px', maxWidth: '150px', height: 'auto', borderRadius: '50%' }} />
  <img src={ashuraImage} alt="عاشور" style={{ width: '15%', minWidth: '80px', maxWidth: '150px', height: 'auto' }} />

  {/* العنوان */}
  <h1 style={{ 
    color: '#afc995',
    fontSize: 'clamp(14px, 4vw, 20px)',
    width: '50%', // العنوان يأخذ السطر كاملاً تحت الصور
    textAlign: 'center',
    border: '2px solid #afc995',
    borderRadius: '30px',
    boxShadow: '0 0 15px rgba(127, 255, 0, 0.3)',
    textShadow: '1px 1px 2px black',
    fontWeight: 'bold',
    marginTop: '10px'
  }}>
    المفرزة الطبية لفريق أصدقاء الإنسانية التطوعي
  </h1>
</div>
      
      <style>{`
        @keyframes soft-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .vital-signs-container {
          background-color: #102a4a;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          border: 1px dashed #3498db;
        }
        .patient-info-grid {
        display: grid;
          color: #ffffff;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 15px;
          width: 100%;
          margin-bottom: 15px;
        }
        .vital-signs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 15px;
          margin-top: 5px;
        }
        .dropdown-wrapper {
          background: #0d223c;
          border: 1px solid #1e3d63;
          border-radius: 6px;
          margin-bottom: 8px;
          overflow: hidden;
        }
        .dropdown-header-btn {
          width: 100%;
          background: #11294a;
          color: #f1e68d;
          padding: 12px 15px;
          font-size: 14px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          direction: rtl;
        }
        .dropdown-header-btn:hover {
          background: #16335c;
        }
        .dropdown-content-panel {
          padding: 12px;
          background: #09192d;
          border-top: 1px solid #1e3d63;
          max-height: 250px;
          overflow-y: auto;
        }
        .selected-count-badge {
          background-color: #27ae60;
          color: white;
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 11px;
          margin-right: 8px;
        }
        .medical-table th, .medical-table td {
          padding: 12px 10px;
          vertical-align: middle;
        }
        .medical-table td:nth-child(5) {
          min-width: 200px;
          line-height: 1.5;
        }
        .badge-general {
          display: inline-block;
          white-space: nowrap;
          padding: 4px 10px;
          border-radius: 4px;
          background-color: #3498db;
          color: white;
          font-weight: bold;
          font-size: 12px;
        }
        input[type="date"]::-webkit-datetime-edit-text,
        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          margin-right: 10px;
          margin-left: 0;
          cursor: pointer;
        }
      `}</style>
      
      {/* فورم إدخال البيانات */}
      <div className="medical-card" style={{ marginTop: '0px' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>اسم المريض الكامل:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="الاسم الثلاثي أو الكامل للمريض" />
          </div>

          {/* شبكة الحقول الشخصية */}
          <div className="patient-info-grid">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>تاريخ الميلاد:</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required style={{
                direction: 'rtl',         
                textAlign: 'right',       
                color: '#ccc',            
              }}/>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>العنوان / السكن:</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="المحافظة / المنطقة" />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>رقم الهاتف:</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="ادخل رقم الهاتف" style={{ textAlign: 'right' }}/>
            </div>
          </div>

          {/* صندوق خانات العلامات الحيوية */}
          <div className="vital-signs-container">
            <span style={{ fontWeight: 'bold', color: '#2980b9', display: 'block', marginBottom: '8px', fontSize: '14px' }}>
               لوحة إدخال العلامات الحيوية (Vital Signs):
            </span>
            <div className="vital-signs-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>النبض (Pulse):</label>
                <input type="text" value={pulse} onChange={(e) => setPulse(e.target.value)} placeholder="/ min" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>الضغط (BP):</label>
                <input type="text" value={bp} onChange={(e) => setBp(e.target.value)} placeholder="mmHg" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>السكر (BG):</label>
                <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} placeholder="mg/dL" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>الأكسجين (O2):</label>
                <input type="text" value={o2} onChange={(e) => setO2(e.target.value)} placeholder="%" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>التشخيص / الحالة المرضية الحالية:</label>
            <textarea value={info} onChange={(e) => setInfo(e.target.value)} required rows="3" placeholder="الحالة المرضية للزيارة الحالية بالتفصيل" />
          </div>

          <div style={{ width: '100%', marginBottom: '10px', fontWeight: 'bold', color: '#cfe3ff', textAlign: 'right' }}>
             اختر الأدوية المطلوبة(اضغط على القسم لفتح القائمة واختيار أدوية):
          </div>

          {/* القوائم المنسدلة المدمجة والذكية */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', direction: 'rtl' }}>
            {Object.entries(allMedicationsByCategory).map(([category, meds]) => {
              const selectedInThisCategory = meds.filter(m => medications.includes(m)).length;

              return (
                <div key={category} className="dropdown-wrapper">
                  <button
                    type="button"
                    className="dropdown-header-btn"
                    onClick={() => toggleDropdown(category)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{category}</span>
                      {selectedInThisCategory > 0 && (
                        <span className="selected-count-badge">تم اختيار {selectedInThisCategory}</span>
                      )}
                    </div>
                    <span>{openDropdown === category ? "🔼" : "🔽"}</span>
                  </button>

                  {openDropdown === category && (
                    <div className="dropdown-content-panel">
                      <div className="medications-grid">
                        {meds.map((med) => (
                          <label key={med} className="med-checkbox" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '4px', padding: '6px 10px', background: '#11294a', borderRadius: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={medications.includes(med)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setMedications([...medications, med]);
                                } else {
                                  setMedications(medications.filter((m) => m !== med));
                                }
                              }}
                            />
                            <span style={{ color: '#fff', fontSize: '13px' }}>{med}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {medications.length > 0 && (
            <div style={{ background: '#102a4a', padding: '10px', borderRadius: '6px', marginTop: '10px', color: '#afc995', fontSize: '13px', textAlign: 'right', direction: 'rtl', border: '1px solid #27ae60' }}>
              <strong>💊 الأدوية المحددة للروشتة الحالية ({medications.length}):</strong> {medications.join(' ، ')}
            </div>
          )}

          <div className="form-group" style={{ marginTop: '15px' }}>
            <label>نوع الإجراء:</label>
            <input type="text" value={procedure} onChange={(e) => setProcedure(e.target.value)} required placeholder="نوع الإجراء الطبي , فحص عام, اجراء جراحي..الخ" />
          </div>

          <button type="submit" className="btn-submit">حفظ سجل المريض</button>
        </form>
      </div>

      {/* جدول عرض واستعلام السجلات الرئيسي */}
      <div className="medical-card">
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ color: '#2980b9' }}>🔍 ابحث عن مريض بالاسم أو استعرض السجلات الكلية للعيادة:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="اكتب اسم المريض هنا" 
              style={{ borderColor: '#2980b9', borderWidth: '1.5px', fontSize: '15px', flex: 1, marginBottom: 0 }}
            />
            <button 
              type="button"
              onClick={() => setShowAllModal(true)}
              style={{ padding: '0 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}
            >
               📂 عرض كل السجلات أونلاين ({uniquePatientsList.length})
            </button>
          </div>
        </div>

        {/* الحاوية المضافة لعمل سكرول داخلي للجدول عند كثرة الأسماء */}
        <div style={{ 
          maxHeight: '400px',
          overflowY: 'auto',
          overflowX: 'auto',
          border: '1px solid #1e3d63',
          borderRadius: '6px'
        }}>
          <table className="medical-table" style={{ margin: 0, width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#102a4a' }}>
              <tr>
                <th>المعرف (ID)</th>
                <th>بيانات المريض الأساسية</th>
                <th>آخر علامات حيوية</th>
                <th>آخر تشخيص</th>
                <th>آخر أدوية موصوفة</th>
                <th>نوع الإجراء</th>
                <th>الملف الطبي</th>
              </tr>
            </thead>
            <tbody>
              {searchTerm.trim() === "" ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#34495e', padding: '30px', backgroundColor: '#102a4a', fontStyle: 'italic' }}>
                    يرجى البحث بالاسم أو الضغط على زر استعراض السجلات الكلية.
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#e74c3c', padding: '20px' }}>
                     ❌ لا يوجد مريض مسجل يطابق هذا الاسم.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  if (!patient) return null;
                  const pName = patient.name || patient.Name || "";
                  const pInfo = patient.info || patient.Info || "";
                  const pMed = patient.medications || patient.Medications || "";
                  const pProc = patient.procedure || patient.Procedure || "";
                  
                  const pBirthDate = patient.birthDate || patient.BirthDate || "-";
                  const pAddress = patient.address || patient.Address || "-";
                  const pPhone = patient.phone || patient.Phone || "-";

                  const pPulse = patient.pulse || patient.Pulse || "-";
                  const pBp = patient.bp || patient.Bp || "-";
                  const pBg = patient.bg || patient.Bg || "-";
                  const pO2 = patient.o2 || patient.O2 || "-";
                  
                  const pAddedBy = patient.addedBy || patient.AddedBy || "غير مسجل";
                  const cleanKey = `${pName.trim().toLowerCase()}_${pBirthDate.trim()}`;
                  
                  return (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td style={{ textAlign: 'right', lineHeight: '1.7', padding: '10px', minWidth: '180px' }}>
                           <strong style={{ color: '#afc995', fontSize: '15px', display: 'block', marginBottom: '4px' }}> {pName}</strong>
                           <div style={{ fontSize: '13px', color: '#ccc', whiteSpace: 'nowrap' }}> <strong>تاريخ الميلاد:</strong> {pBirthDate}</div>
                           <div style={{ fontSize: '13px', color: '#ccc', whiteSpace: 'nowrap' }}> <strong>السكن:</strong> {pAddress}</div>
                           <div style={{ fontSize: '13px', color: '#ccc', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right' }}>
                             <strong>الهاتف:</strong> <span style={{ display: 'inline-block', direction: 'ltr' }}>{pPhone}</span>
                           </div>
                           <div style={{ fontSize: '12px', color: '#f1e68d', marginTop: '4px' }}> <strong>بواسطة:</strong> {pAddedBy}</div>
                      </td>
                      <td style={{ fontSize: '12px', textAlign: 'right', lineHeight: '1.4', whiteSpace: 'nowrap' }}>
                         نبض: {pPulse}<br/>
                         ضغط: {pBp}<br/>
                         سكر: {pBg}<br/>
                         أكسجين: {pO2}
                      </td>
                      <td>{pInfo}</td>
                      <td>{pMed}</td>
                      <td>
                        <span className="badge badge-general">{pProc}</span>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          onClick={() => handleViewHistory(patient)}
                          style={{ padding: '6px 12px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                           📜 عرض السجل ({historyMap[cleanKey]?.length || 1})
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* بوب آب 1: نافذة عرض كافة سجلات العيادة الكلية */}
      {showAllModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(31, 45, 61, 0.35)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
          <div style={{ backgroundColor: '#0b1f3a', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '8px', width: '85%', maxHeight: '85%', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ecf0f1', paddingBottom: '15px', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#ccc' }}>📁 الأرشيف الكامل للمرضى ({uniquePatientsList.length})</h2>
              <button onClick={() => setShowAllModal(false)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                إغلاق النافذة ✖
              </button>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1, border: '1px solid #e2e8f0', borderRadius: '4px' }}>
              <table className="medical-table" style={{ margin: 0, width: '100%' }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#2c3e50' }}>
                  <tr>
                    <th>المعرف (ID)</th>
                    <th>بيانات المريض الأساسية</th>
                    <th>العلامات الحيوية</th>
                    <th>آخر تشخيص</th>
                    <th>آخر أدوية موصوفة</th>
                    <th>نوع الإجراء</th>
                    <th>الملف الطبي</th>
                  </tr>
                </thead>
                <tbody>
                  {uniquePatientsList.map((patient) => {
                    if (!patient) return null;
                    const pName = patient.name || patient.Name || "";
                    const pInfo = patient.info || patient.Info || "";
                    const pMed = patient.medications || patient.Medications || "";
                    const pProc = patient.procedure || patient.Procedure || "";
                    
                    const pBirthDate = patient.birthDate || patient.BirthDate || "-";
                    const pAddress = patient.address || patient.Address || "-";
                    const pPhone = patient.phone || patient.Phone || "-";

                    const pPulse = patient.pulse || patient.Pulse || "-";
                    const pBp = patient.bp || patient.Bp || "-";
                    const pBg = patient.bg || patient.Bg || "-";
                    const pO2 = patient.o2 || patient.O2 || "-";
                    
                    const pAddedBy = patient.addedBy || patient.AddedBy || "غير مسجل";
                    const cleanKey = `${pName.trim().toLowerCase()}_${pBirthDate.trim()}`;
                    
                    return (
                      <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td style={{ textAlign: 'right', lineHeight: '1.7', padding: '10px', minWidth: '180px' }}>
                             <strong style={{ color: '#afc995', fontSize: '15px', display: 'block', marginBottom: '4px' }}> {pName}</strong>
                             <div style={{ fontSize: '13px', color: '#ccc', whiteSpace: 'nowrap' }}> <strong>تاريخ الميلاد:</strong> {pBirthDate}</div>
                             <div style={{ fontSize: '13px', color: '#ccc', whiteSpace: 'nowrap' }}> <strong>السكن:</strong> {pAddress}</div>
                             <div style={{ fontSize: '13px', color: '#ccc', whiteSpace: 'nowrap', direction: 'ltr', textAlign: 'right' }}>
                                <strong>الهاتف:</strong> <span style={{ display: 'inline-block', direction: 'ltr' }}>{pPhone}</span>
                             </div>
                             <div style={{ fontSize: '12px', color: '#f1e68d', marginTop: '4px' }}> <strong>بواسطة:</strong> {pAddedBy}</div>
                        </td>
                        <td style={{ fontSize: '12px', textAlign: 'right', lineHeight: '1.4', whiteSpace: 'nowrap' }}>
                           نبض: {pPulse}<br/>
                           ضغط: {pBp}<br/>
                           سكر: {pBg}<br/>
                           أكسجين: {pO2}
                        </td>
                        <td>{pInfo}</td>
                        <td>{pMed}</td>
                        <td>
                          <span className="badge badge-general">{pProc}</span>
                        </td>
                        <td>
                          <button type="button" onClick={() => handleViewHistory(patient)} style={{ padding: '6px 12px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                             📜 عرض السجل ({historyMap[cleanKey]?.length || 1})
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* بوب آب 2: التاريخ والأرشيف الطبي التفصيلي لمراجع معين */}
      {/* بوب آب 2: التاريخ والأرشيف الطبي التفصيلي لمراجع معين */}
      {selectedPatientHistory && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(11, 31, 58, 0.6)', // 🟢 تعتيم متناسق مع ألوان تطبيقك الداكنة
          backdropFilter: 'blur(6px)',               // 🟢 هنا التغبيش الاحترافي لعزل النافذة الخلفية تماماً
          WebkitBackdropFilter: 'blur(6px)',         // لضمان عمل التغبيش على متصفحات سفاري وآيفون
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 1001 
        }}>
          <div style={{ backgroundColor: '#0b1f3a', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '8px', width: '80%', maxHeight: '80%', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ecf0f1', paddingBottom: '10px', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#ccc' }}>📁 الأرشيف الطبي للمريض: {selectedPatientName}</h2>
              <button onClick={() => setSelectedPatientHistory(null)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                إغلاق ✖
              </button>
            </div>
            
            {selectedPatientHistory.length > 0 && (
              <div style={{ backgroundColor: '#0b1f3a', color: '#ccc', padding: '15px', borderRadius: '6px', marginBottom: '20px', borderRight: '4px solid #16a085', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <span> <strong>تاريخ الميلاد:</strong> {selectedPatientHistory[0].birthDate || selectedPatientHistory[0].BirthDate || "-"}</span>
                <span> <strong>العنوان الحالي:</strong> {selectedPatientHistory[0].address || selectedPatientHistory[0].Address || "-"}</span>
                <span> <strong>رقم الهاتف:</strong> {selectedPatientHistory[0].phone || selectedPatientHistory[0].Phone || "-"}</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {selectedPatientHistory.map((visit, index) => {
                if (!visit) return null;
                const vInfo = visit.info || visit.Info || "";
                const vMed = visit.medications || visit.Medications || "";
                const vProc = visit.procedure || visit.Procedure || "";
                
                const vPulse = visit.pulse || visit.Pulse || "-";
                const vBp = visit.bp || visit.Bp || "-";
                const vBg = visit.bg || visit.Bg || "-";
                const vO2 = visit.o2 || visit.O2 || "-";

                const rawDate = visit.createdAt || visit.CreatedAt;
                let formattedDate = "تاريخ غير مسجل";
                if (rawDate) {
                  formattedDate = new Date(rawDate).toLocaleString('ar-EG', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', hour12: true
                  });
                }
               
                const vAddedBy = visit.addedBy || visit.AddedBy || "غير مسجل";

                return (
                  <div key={visit.id} style={{ borderRight: '4px solid #3498db', padding: '15px', backgroundColor: '#0f2f55', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 'bold', color: '#2980b9' }}>
                        الزيارة رقم {selectedPatientHistory.length - index} (سجل ID: {visit.id})
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ fontSize: '13px', color: '#afc995', backgroundColor: '#0b1f3a', padding: '4px 12px', borderRadius: '20px', fontWeight: '500' }}>
                           المعالج: {vAddedBy}
                        </div>
                        <div style={{ fontSize: '13px', color: '#7f8c8d', backgroundColor: '#0b1f3a', padding: '4px 12px', borderRadius: '20px', fontWeight: '500' }}>
                           {formattedDate}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', color: '#ccc', gap: '15px', flexWrap: 'wrap', backgroundColor: '#0f2f55', padding: '8px', borderRadius: '4px', marginBottom: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }}>
                      <span> النبض: <strong>{vPulse}</strong></span>
                      <span> الضغط: <strong>{vBp}</strong></span>
                      <span> السكر: <strong>{vBg}</strong></span>
                      <span> الأكسجين: <strong>{vO2}</strong></span>
                    </div>

                    <p style={{ margin: '5px 0', color: '#ccc' }}><strong>التشخيص:</strong> {vInfo}</p>
                    <p style={{ margin: '5px 0' , color: '#ccc'}}><strong>الأدوية المصروفة:</strong> {vMed}</p>
                    <p style={{ margin: '5px 0', color: '#ccc' }}><strong>الإجراء الطبي:</strong> <span className="badge badge-general">{vProc}</span></p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: '#0b1f3a', padding: '30px', borderRadius: '12px', border: '1px solid #3498db', width: '350px', color: 'white', textAlign: 'center' }}>
            <h2 style={{ color: '#afc995' }}>إضافة طبيب جديد</h2>
            <input type="text" placeholder="اسم المستخدم" value={newDocUsername} onChange={(e) => setNewDocUsername(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none' }} />
            <input type="password" placeholder="كلمة المرور" value={newDocPassword} onChange={(e) => setNewDocPassword(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none' }} />

            <div style={{ marginTop: '20px', maxHeight: '150px', overflowY: 'auto', borderTop: '1px solid #1e3d63', paddingTop: '10px' }}>
  {doctors.map(d => (
    <div key={d.username} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', color: '#ccc' }}>
      <span>{d.username}</span>
      <button onClick={() => handleDeleteDoctor(d.username)} style={{ backgroundColor: '#c0392b', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}>حذف</button>
    </div>
  ))}
</div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowRegisterModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>إلغاء</button>
              <button onClick={handleRegisterDoctor} style={{ flex: 1, padding: '10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>حفظ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;