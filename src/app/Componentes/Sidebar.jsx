"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Mi App</div>
      <nav className="sidebar-nav">
        <Link
          href="/dashboard"
          className={`sidebar-link ${pathname === "/dashboard" ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          href="/registro"
          className={`sidebar-link ${pathname === "/registro" ? "active" : ""}`}
        >
          Registro de marca
        </Link>
      </nav>
    </aside>
  )
}
