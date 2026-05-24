import { Head } from '@inertiajs/react';
import PosLayout from './../../layouts/pos-layout';

export default function Pos() {
    return (
        <PosLayout>
            <Head title="POS Terminal" />
            <div className="flex h-screen w-full flex-col overflow-hidden">
                <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <h1 className="text-lg font-bold tracking-widest text-slate-200">POINT OF SALE</h1>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        System Active | {new Date().toLocaleTimeString()}
                    </div>
                </header>

                <main className="flex flex-1 overflow-hidden">
                    <section className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <button key={i} className="group flex flex-col justify-between h-32 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-600 hover:bg-slate-800 transition-all duration-200 shadow-lg">
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">Product {i + 1}</span>
                                    <span className="text-lg font-bold text-blue-500">₱150.00</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <aside className="w-96 border-l border-slate-800 bg-slate-900/30 flex flex-col backdrop-blur-md">
                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Active Order</div>
                            <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 flex justify-between items-center group">
                                <div>
                                    <p className="text-sm font-medium">Product 1</p>
                                    <p className="text-xs text-slate-500">1 x ₱150.00</p>
                                </div>
                                <span className="font-bold text-slate-200">₱150.00</span>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-slate-500 uppercase text-xs tracking-widest">Total Amount</span>
                                <span className="text-3xl font-light text-white">₱150.00</span>
                            </div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg font-bold text-sm tracking-widest transition-all duration-200 shadow-blue-900/20 shadow-lg">
                                PROCESS TRANSACTION
                            </button>
                        </div>
                    </aside>
                </main>
            </div>
        </PosLayout>
    );
}
