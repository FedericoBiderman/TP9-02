import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext'; // Asegúrate de que la ruta de importación sea correcta

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <AuthProvider>
          <EventProvider>
            <main>{children}</main>
          </EventProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}