import logo from '@/assets/RestorArk.png';

export default function Header() {
    return (
        <header className="w-full bg-green-800 text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    {/* Placeholder logo circle */}
                    <img src={logo} alt="RestorArk Logo" className="h-10 w-10" />
                    <span className="text-xl font-semibold tracking-wide">
                        Resto-AI
                    </span>
                </div>

                {/* Right side can later hold user menu, settings, etc. */}
                <div className="text-sm text-slate-300">
                    prototype
                </div>
            </div>
        </header>
    );
}
