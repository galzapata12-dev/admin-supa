import { NextResponse } from 'next/server';

// CAMBIA ESTO por la contraseña que quieras
const CLAVE_SECRETA = 'tallerpro2025segura';
const NOMBRE_COOKIE = 'tp_auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Si va a la página de contraseña, dejarlo pasar
  if (pathname === '/pass') {
    // Si ya está autenticado, mandarlo al inicio
    const cookie = request.cookies.get(NOMBRE_COOKIE);
    if (cookie && cookie.value === CLAVE_SECRETA) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Para cualquier otra ruta, verificar cookie
  const cookie = request.cookies.get(NOMBRE_COOKIE);
  
  if (!cookie || cookie.value !== CLAVE_SECRETA) {
    // No tiene cookie válida → enviar a contraseña
    return NextResponse.redirect(new URL('/pass', request.url));
  }

  // Cookie válida → dejar pasar
  return NextResponse.next();
}

// Ejecutar en todas las rutas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
