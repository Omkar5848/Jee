import { FormEvent, useState } from 'react';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { roleToPath } from '@/components/ProtectedRoleDashboardPage';
import { Role } from '@/components/RoleDashboard';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const router = useRouter();

  async function gotoRoleDashboard() {
    const meRes = await fetch('/api/auth/me');
    if (!meRes.ok) {
      router.push('/dashboard');
      return;
    }
    const meData = await meRes.json();
    const role = (meData?.user?.profession || 'technician') as Role;
    router.push(roleToPath[role] || '/dashboard');
  }

  async function onPasswordLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setMsg(undefined);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }
    gotoRoleDashboard();
  }

  async function onSendOtp() {
    if (!email) {
      setError('Please enter your email first');
      return;
    }
    setSendingOtp(true);
    setError(undefined);
    setMsg(undefined);

    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setSendingOtp(false);

    if (!res.ok) {
      setError(data.error || 'Failed to send OTP');
      return;
    }

    setOtpSent(true);
    setMsg('OTP sent to your email. It expires in 5 minutes.');
  }

  async function onOtpLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setMsg(undefined);

    const res = await fetch('/api/auth/login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'OTP login failed');
      return;
    }

    gotoRoleDashboard();
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className="logo">Jeevak</h1>

        <h3 className={styles.sectionTitle}>Login with Password</h3>
        <form onSubmit={onPasswordLogin}>
          <input className={styles.input} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className={styles.input} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className={styles.button} disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>

        <div className={styles.divider}>OR</div>

        <h3 className={styles.sectionTitle}>Login with OTP</h3>
        <form onSubmit={onOtpLogin}>
          <input className={styles.input} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <div className={styles.otpRow}>
            <input
              className={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required={otpSent}
            />
            <button type="button" className={`${styles.button} ${styles.secondaryButton}`} onClick={onSendOtp} disabled={sendingOtp}>
              {sendingOtp ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
            </button>
          </div>
          <button className={styles.button} disabled={loading || !otpSent}>{loading ? 'Verifying...' : 'Login with OTP'}</button>
        </form>

        {error && <div className="small" style={{ color: '#c00', marginTop: 8 }}>{error}</div>}
        {msg && <div className="small" style={{ color: '#090', marginTop: 8 }}>{msg}</div>}

        <div className={styles.linkRow}>
          <Link href="/register">Register</Link>
          <Link href="/forgot">Forgot password?</Link>
        </div>

        <div className={styles.dashboardLinks}>
          <div className={styles.dashboardLinksTitle}>Available dashboards</div>
          <div className={styles.dashboardLinkGrid}>
            <Link href="/doctor-dashboard">Doctor</Link>
            <Link href="/patient-dashboard">Patient</Link>
            <Link href="/technician-dashboard">Technician</Link>
            <Link href="/nurse-dashboard">Nurse</Link>
          </div>
        </div>

        <Link href="/" className={styles.backHome}>← Back to Home</Link>
      </div>
    </div>
  );
}
