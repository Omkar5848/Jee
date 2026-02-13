import { ProtectedRoleDashboardPage } from '@/components/ProtectedRoleDashboardPage';

export default function DoctorDashboardPage() {
  return <ProtectedRoleDashboardPage expectedRole="doctor" />;
}
