import Head from 'next/head'
import Link from 'next/link'
import { Car, ClipboardList, Monitor, ArrowRight, Settings } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <Head>
                <title>Sistema de Gestión de Taller | Plataforma Empresarial</title>
                <meta name="description" content="Sistema de gestión de taller mecánico profesional" />
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Settings className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Sistema de Gestión</h1>
                                <p className="text-sm text-gray-600">Taller Mecánico Profesional</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Plataforma Empresarial</p>
                            <p className="text-xs text-gray-600">v1.0.0</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        Sistema Operativo
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Gestión Integral de Taller
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Plataforma completa para el control de vehículos, asignación de trabajos y monitoreo en tiempo real
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Sala 1 Card */}
                    <Link href="/room1">
                        <a className="group bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        <Car className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        ETAPA 1
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    Recepción de Vehículos
                                </h3>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Registro inicial de vehículos con descripción detallada del problema reportado
                                </p>

                                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    <span>Acceder al módulo</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </a>
                    </Link>

                    {/* Sala 2 Card */}
                    <Link href="/room2">
                        <a className="group bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 transition-colors">
                                        <ClipboardList className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        ETAPA 2
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                    Asignación de Trabajos
                                </h3>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Distribución de tareas a mecánicos y asignación a estaciones de trabajo
                                </p>

                                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    <span>Acceder al módulo</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                            <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </a>
                    </Link>

                    {/* Sala 3 Card */}
                    <Link href="/room3">
                        <a className="group bg-white rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                                        <Monitor className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        ETAPA 3
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                    Monitoreo en Tiempo Real
                                </h3>

                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    Panel de control y visualización de trabajos en pantallas individuales
                                </p>

                                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                                    <span>Acceder al módulo</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                            <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </a>
                    </Link>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Características del Sistema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                            <p className="text-sm text-gray-700">Actualización en Tiempo Real</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                            <p className="text-sm text-gray-700">Estaciones de Trabajo</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                            <p className="text-sm text-gray-700">Disponibilidad Continua</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-gray-600">
                        © 2024 Sistema de Gestión de Taller Mecánico. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}
