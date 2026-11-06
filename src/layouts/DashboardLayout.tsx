import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout