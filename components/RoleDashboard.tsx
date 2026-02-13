import { useMemo } from 'react';
import styles from '@/styles/temp.module.css';

export type Role = 'doctor' | 'patient' | 'technician' | 'nurse' | 'admin' | 'receptionist';
export type User = { name: string; email: string; profession: Role };

type ScheduleItem = { title: string; time: string; unit: string; status: string };

const roleTheme: Record<Role, { title: string; subtitle: string; color: string }> = {
  doctor: { title: 'Doctor Dashboard', subtitle: 'Manage visits and treatment workflow.', color: '#365fb5' },
  patient: { title: 'Patient Dashboard', subtitle: 'Track appointments, updates and care plan.', color: '#0f7f74' },
  technician: { title: 'Technician Dashboard', subtitle: 'Monitor lab and diagnostic requests.', color: '#7844b8' },
  nurse: { title: 'Nurse Dashboard', subtitle: 'Coordinate rounds and patient support tasks.', color: '#b35c25' },
  admin: { title: 'Admin Dashboard', subtitle: 'Hospital-wide operational control center.', color: '#1e304d' },
  receptionist: { title: 'Reception Dashboard', subtitle: 'Handle front desk and patient intake.', color: '#5a6777' }
};

const scheduleByRole: Partial<Record<Role, ScheduleItem[]>> = {
  doctor: [
    { title: 'Morning OPD Consultation', time: '09:00 AM', unit: 'OPD A', status: 'On track' },
    { title: 'Cardiology Follow-up', time: '11:30 AM', unit: 'Room 204', status: 'Upcoming' },
    { title: 'Clinical Review Round', time: '04:00 PM', unit: 'Ward 2', status: 'Pending' }
  ],
  patient: [
    { title: 'Blood Pressure Check', time: '10:00 AM', unit: 'Nursing Desk', status: 'Scheduled' },
    { title: 'Specialist Consultation', time: '01:00 PM', unit: 'Clinic C', status: 'Confirmed' },
    { title: 'Dietician Session', time: '05:00 PM', unit: 'Tele-Consult', status: 'Scheduled' }
  ],
  nurse: [
    { title: 'Ward 1 Round', time: '08:30 AM', unit: 'Ward 1', status: 'In progress' },
    { title: 'Medication Window', time: '12:00 PM', unit: 'Nursing Station', status: 'Upcoming' },
    { title: 'Discharge Briefing', time: '06:00 PM', unit: 'Ward 3', status: 'Pending' }
  ]
};

const adminOverview = [
  { department: 'Emergency', occupancy: '87%', waitTime: '11 min', status: 'Stable' },
  { department: 'Radiology', occupancy: '64%', waitTime: '8 min', status: 'Optimal' },
  { department: 'Pathology', occupancy: '72%', waitTime: '14 min', status: 'Moderate' },
  { department: 'ICU', occupancy: '91%', waitTime: '4 min', status: 'Critical Watch' }
];

export function RoleDashboard({ user, onLogout }: { user: User; onLogout: () => Promise<void> }) {
  const theme = useMemo(() => roleTheme[user.profession] || roleTheme.technician, [user.profession]);
  const schedule = scheduleByRole[user.profession] || [];

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.dashboardCard}`}>
        <h1 className={styles.logo}>Jeevak</h1>
        <h2 className={styles.dashboardTitle} style={{ color: theme.color }}>{theme.title}</h2>
        <p className={styles.subtitle}>{theme.subtitle}</p>

        <section className={styles.dashboardSection}>
          <h3>Overview</h3>
          <div className={styles.overviewStats}>
            <div className={styles.statTile}><span>Name</span><strong>{user.name}</strong></div>
            <div className={styles.statTile}><span>Email</span><strong>{user.email}</strong></div>
            <div className={styles.statTile}><span>Role</span><strong style={{ textTransform: 'capitalize' }}>{user.profession}</strong></div>
          </div>
        </section>

        {(user.profession === 'doctor' || user.profession === 'patient' || user.profession === 'nurse') && (
          <section className={styles.dashboardSection}>
            <h3>Schedule</h3>
            <div className={styles.scheduleStack}>
              {schedule.map(item => (
                <article key={`${item.title}-${item.time}`} className={styles.scheduleCard}>
                  <h4>{item.title}</h4>
                  <p>{item.time} • {item.unit}</p>
                  <span>{item.status}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {user.profession === 'admin' && (
          <section className={styles.dashboardSection}>
            <h3>Admin Overview</h3>
            <div className={styles.tableWrap}>
              <table className={styles.themeTable}>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Occupancy</th>
                    <th>Avg Wait Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOverview.map(row => (
                    <tr key={row.department}>
                      <td>{row.department}</td>
                      <td>{row.occupancy}</td>
                      <td>{row.waitTime}</td>
                      <td><span className={styles.statusPill}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className={styles.dashboardSection}>
          <h3>Quick Updates</h3>
          <ul className={styles.updatesList}>
            <li>Daily system sync completed successfully.</li>
            <li>Priority notifications are available in your activity center.</li>
            <li>Review pending items before end of day for better handoff.</li>
          </ul>
        </section>

        <button className={styles.button} onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
