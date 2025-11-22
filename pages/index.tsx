import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            <Head>
                <title>Sistema de Taller Mecánico | Gestión Profesional</title>
                <meta name="description" content="Sistema de gestión de taller mecánico profesional" />
            </Head>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
                {/* Header Section */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-block mb-4">
                        <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                            <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Sistema Profesional</span>
                        </div>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
                        Taller Mecánico
                        <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Gestión Inteligente
                        </span>
                    </h1>

                    <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                        Sistema completo para gestionar vehículos, asignar trabajos y monitorear el progreso en tiempo real
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl w-full mb-8">
                    {/* Sala 1 Card */}
                    <Link href="/room1">
                        <a className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 block">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-end mb-4">
                                    <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                        Paso 1
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                    Sala 1: Llegada
                                </h2>

                                <p className="text-blue-200 mb-4 leading-relaxed">
                                    Registro de vehículos entrantes con descripción detallada del problema inicial
                                </p>

                                <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                                    Acceder
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </Link>

                    {/* Sala 2 Card */}
                    <Link href="/room2">
                        <a className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 block">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-end mb-4">
                                    <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                        Paso 2
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                                    Sala 2: Recepción
                                </h2>

                                <p className="text-blue-200 mb-4 leading-relaxed">
                                    Asignación de trabajos a mecánicos y distribución en pantallas de trabajo
                                </p>

                                <div className="flex items-center text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                                    Acceder
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </Link>

                    {/* Sala 3 Card */}
                    <Link href="/room3">
                        <a className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 block">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-end mb-4">
                                    <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                        Paso 3
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                    Sala 3: Monitores
                                </h2>

                                <p className="text-blue-200 mb-4 leading-relaxed">
                                    Panel de control y acceso a monitores individuales para seguimiento en tiempo real
                                </p>

                                <div className="flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                                    Acceder
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>


                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-blue-300/60 text-sm">
                        Sistema de Gestión de Taller Mecánico v1.0
                    </p>
                </div>
            </main>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}
