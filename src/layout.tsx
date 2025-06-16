import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import NavBar from "./components/nav-bar"

const Layout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Layout
