import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kelompok')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/kelompok"!</div>
}
