import { ProtectedRoleDashboardPage } from '@/components/ProtectedRoleDashboardPage';

export default function PatientDashboardPage() {
  return <ProtectedRoleDashboardPage expectedRole="patient" />;
}
