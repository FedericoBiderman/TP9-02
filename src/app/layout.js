import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>        
        <AuthProvider>
          <Header />
          <EventProvider>
            <main>{children}</main>
          </EventProvider>
          <Footer />
        </AuthProvider>        
      </body>
    </html>
  );
}