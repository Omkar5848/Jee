import { FormEvent, useState } from 'react';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ForgotEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string|undefined>(undefined);
  const [error, setError] = useState<string|undefined>(undefined);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(undefined); setMsg(undefined);
    const res = await fetch('/api/auth/send-otp', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error||'Failed to send OTP'); return; }
    setMsg('OTP sent to your email.');
    setTimeout(()=>router.push({ pathname:'/forgot/otp', query:{ email } }), 600);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="logo">Jeevak</h1>
        <form onSubmit={onSubmit}>
          <input className={styles.input} placeholder="Your registered email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <button className={styles.button} disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
        </form>
        {error && <div className="small" style={{color:'#c00', marginTop:8}}>{error}</div>}
        {msg && <div className="small" style={{color:'#090', marginTop:8}}>{msg}</div>}
        <div className={styles.linkRow} style={{justifyContent:'center'}}>
          <Link href="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
