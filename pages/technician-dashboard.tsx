import { ProtectedRoleDashboardPage } from '@/components/ProtectedRoleDashboardPage';

export default function TechnicianDashboardPage() {
  return <ProtectedRoleDashboardPage expectedRole="technician" />;
}
