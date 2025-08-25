import { FormEvent, useState } from 'react';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [profession, setProfession] = useState<'doctor'|'nurse'|'technician'|'receptionist'>('doctor');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string|undefined>(undefined);
  const [error, setError] = useState<string|undefined>(undefined);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(undefined); setMsg(undefined);
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password, profession })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error||'Registration failed'); return; }
    setMsg('Registered! You can now login.');
    setTimeout(()=>router.push('/login'), 800);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="logo">Jeevak</h1>
        <form onSubmit={onSubmit}>
          <input className={styles.input} placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
          <input className={styles.input} placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className={styles.input} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          <input className={styles.input} placeholder="Confirm Password" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required/>
          <select className={styles.input} value={profession} onChange={e=>setProfession(e.target.value as any)}>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="technician">Technician</option>
            <option value="receptionist">Receptionist</option>
          </select>
          <button className={styles.button} disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </form>
        {error && <div className="small" style={{color:'#c00', marginTop:8}}>{error}</div>}
        {msg && <div className="small" style={{color:'#090', marginTop:8}}>{msg}</div>}
        <div className={styles.linkRow} style={{justifyContent:'center'}}>
          <Link href="/login">Already registered? Login</Link>
        </div>
      </div>
    </div>
  );
}
