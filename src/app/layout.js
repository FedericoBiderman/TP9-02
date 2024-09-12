import './globals.css';
import Header from './components/Header';  // Importar el Header
import Footer from './components/Footer';  // Importar el Footer

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header /> {/* Header presente en todas las páginas */}
        <main>{children}</main> {/* Aquí se renderiza el contenido de cada página */}
        <Footer /> {/* Footer presente en todas las páginas */}
      </body>
    </html>
  );
}