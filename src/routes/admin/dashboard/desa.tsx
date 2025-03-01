import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/dashboard/desa')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/dashboard/desa"!</div>
}
