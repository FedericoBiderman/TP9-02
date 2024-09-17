import './styles/globals.css';
import Header from './components/Header';  // Importar el Header
import Footer from './components/Footer';  // Importar el Footer
import { AuthProvider } from './context/AuthContext'; // Ajusta la ruta según la estructura de tu proyecto

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header /> {/* Header presente en todas las páginas */}
        <AuthProvider>
          <main>{children}</main> {/* Aquí se renderiza el contenido de cada página */}
        </AuthProvider>
        <Footer /> {/* Footer presente en todas las páginas */}
      </body>
    </html>
  );
}
