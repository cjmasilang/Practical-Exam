"use client";

import { useState, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import PosLayout from './../../layouts/pos-layout';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Pos({ products }: { products: any[] }) {
    const [cart, setCart] = useState<any[]>([]);
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
    const [openModal, setOpenModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [lastReceipt, setLastReceipt] = useState<any>(null);
    const receiptRef = useRef<HTMLDivElement>(null);

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const processTransaction = () => {
        if (!selectedMethod) return;
        const transactionData = { items: cart, total_amount: total, customer, payment_method: selectedMethod };

        router.post('/pos/process', transactionData, {
            onSuccess: () => {
                setLastReceipt({ ...transactionData, date: new Date().toLocaleString() });
                setCart([]);
                setCustomer({ name: '', email: '', phone: '' });
                setOpenModal(false);
                setSelectedMethod(null);
            }
        });
    };

    const handlePrint = () => {
        const printContent = receiptRef.current?.innerHTML;
        const win = window.open('', '', 'width=400,height=600');
        win?.document.write(`<html><body>${printContent}</body></html>`);
        win?.print();
        win?.close();
    };

    return (
        <PosLayout>
            <Head title="POS Terminal" />
            <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
                <main className="flex flex-1 overflow-hidden">
                    <section className="flex-1 p-6 overflow-y-auto">
                        <div className="grid grid-cols-4 gap-4">
                            {products.map((product) => (
                                <button key={product.id} onClick={() => addToCart(product)} className="flex flex-col justify-between h-32 p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-500 transition-all">
                                    <span className="text-sm font-medium">{product.name}</span>
                                    <span className="text-lg font-bold text-emerald-500">₱{Number(product.price).toFixed(2)}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <aside className="w-96 border-l border-zinc-800 bg-zinc-950 flex flex-col">
                        {lastReceipt ? (
                            <div className="p-6 space-y-4">
                                <div ref={receiptRef} className="p-4 bg-white text-black rounded text-xs space-y-2">
                                    <h3 className="font-bold text-center border-b pb-2">OFFICIAL RECEIPT</h3>
                                    <p>Date: {lastReceipt.date}</p>
                                    <p>Customer: {lastReceipt.customer.name}</p>
                                    <div className="border-t pt-2">
                                        {lastReceipt.items.map((i: any, idx: number) => (
                                            <div key={idx} className="flex justify-between">
                                                <span>{i.name} x{i.quantity}</span>
                                                <span>₱{(i.price * i.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-2 font-bold flex justify-between">
                                        <span>TOTAL</span>
                                        <span>₱{lastReceipt.total_amount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button className="w-full" onClick={handlePrint}>Print Receipt</Button>
                                <Button variant="ghost" className="w-full" onClick={() => setLastReceipt(null)}>New Transaction</Button>
                            </div>
                        ) : (
                            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Customer Info</h2>
                                <input type="text" placeholder="Name" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-sm" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} />
                                <input type="email" placeholder="Email" className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-sm" value={customer.email} onChange={(e) => setCustomer({...customer, email: e.target.value})} />
                                <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pt-4">Active Order</h2>
                                {cart.map((item) => (
                                    <div key={item.id} className="p-4 bg-zinc-900 rounded border border-zinc-800 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm">{item.name}</p>
                                            <p className="text-xs text-zinc-400">{item.quantity} x ₱{Number(item.price).toFixed(2)}</p>
                                        </div>
                                        <span className="font-bold">₱{(item.quantity * Number(item.price)).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!lastReceipt && (
                            <div className="p-6 border-t border-zinc-800 bg-zinc-900">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-zinc-400 uppercase text-xs">Total</span>
                                    <span className="text-3xl font-light">₱{total.toFixed(2)}</span>
                                </div>
                                <Button className="w-full py-6 font-bold" onClick={() => setOpenModal(true)} disabled={cart.length === 0}>
                                    Process Transaction
                                </Button>
                            </div>
                        )}
                    </aside>
                </main>
            </div>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="bg-zinc-900 text-white border-zinc-800">
                    <DialogHeader><DialogTitle>Select Payment Method</DialogTitle></DialogHeader>
                    <div className="grid grid-cols-3 gap-4 py-4">
                        {['Cash', 'Bank', 'GCash'].map((method) => (
                            <Button key={method} variant={selectedMethod === method ? "default" : "outline"} className="h-20" onClick={() => setSelectedMethod(method)}>
                                {method}
                            </Button>
                        ))}
                    </div>
                    {selectedMethod && (
                        <Button className="w-full py-6 bg-emerald-600 hover:bg-emerald-700" onClick={processTransaction}>
                            Confirm Checkout: {selectedMethod}
                        </Button>
                    )}
                </DialogContent>
            </Dialog>
        </PosLayout>
    );
}
