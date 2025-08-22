import "./globals.css"
import Providers from "../lib/provider.jsx"
import Sidebar from "./Componentes/Sidebar"  // asegúrate de que la ruta sea correcta

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="layout">
        <Providers> 
          <Sidebar />
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
