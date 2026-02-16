import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NewcomerContext } from '../App';
import { BookOpen, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
    { to: '/', label: 'หน้าหลัก' },
    { to: '/haze-101', label: 'ทำไมฝุ่นไม่หายไป' },
    { to: '/tracker', label: 'กระดานติดตาม' },
    { to: '/survival', label: 'คู่มือเอาตัวรอด' },
    { to: '/action', label: 'ลงมือทำ' },
];

export const Header: React.FC = () => {
    const { isNewcomer, setIsNewcomer } = useContext(NewcomerContext);
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <img src="/logo/logo.svg" alt="Tan Fun Tan Fai Logo" className="h-10 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActive(item.to)
                                    ? 'text-brand-orange bg-brand-alert font-bold'
                                    : 'text-brand-grey hover:text-brand-orange hover:bg-brand-alert/50'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Toggle + Mobile Menu Button */}
                <div className="flex items-center gap-3">
                    {/* Newcomer Toggle */}
                    <div className="flex items-center gap-2 mr-1">
                        <BookOpen size={16} className={isNewcomer ? "text-brand-orange" : "text-brand-grey"} />
                        <span className={`text-sm hidden sm:block ${isNewcomer ? "text-brand-orange font-bold" : "text-brand-grey"}`}>
                            โหมดมือใหม่
                        </span>
                    </div>
                    <button
                        onClick={() => setIsNewcomer(!isNewcomer)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 ${isNewcomer ? 'bg-brand-orange' : 'bg-gray-200'}`}
                    >
                        <span className="sr-only">Toggle Newcomer Mode</span>
                        <span
                            className={`${isNewcomer ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
                        />
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-brand-grey hover:text-brand-orange hover:bg-brand-alert/50 transition-colors"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
                    <nav className="flex flex-col p-4 gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(item.to)
                                        ? 'text-brand-orange bg-brand-alert font-bold'
                                        : 'text-brand-black hover:bg-brand-alert/50 hover:text-brand-orange'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};