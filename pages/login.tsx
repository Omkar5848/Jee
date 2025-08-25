import { FormEvent, useState } from 'react';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>(undefined);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(undefined);
    const res = await fetch('/api/auth/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error||'Login failed'); return; }
    router.push('/dashboard');
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="logo">Jeevak</h1>
        <form onSubmit={onSubmit}>
          <input className={styles.input} placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className={styles.input} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          <button className={styles.button} disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>
        <div className={styles.linkRow}>
          <Link href="/register">Register</Link>
          <Link href="/forgot">Forgot password?</Link>
        </div>
        <Link href="/" className={styles.backHome}>← Back to Home</Link>
      </div>
    </div>
  );
}
