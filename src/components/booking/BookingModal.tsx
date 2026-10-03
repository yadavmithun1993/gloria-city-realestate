'use client';

import React, { useState } from 'react';
import { Plot } from '../../types';

interface BookingModalProps {
  plot: Plot | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (plotId: string, bookingData: any) => Promise<void>;
}

export default function BookingModal({ plot, isOpen, onClose, onBook }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    govId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !plot) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      await onBook(plot.id, formData);
      setIsSuccess(true);
      
      // Close modal after showing success message briefly
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', phone: '', email: '', govId: '' });
      }, 2500);
    } catch (err: any) {
      console.error('Failed to book:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 p-6 md:p-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Booking Confirmed!</h2>
            <p className="text-slate-500 text-center">
              Plot {plot.plotNumber} is now reserved for you. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Book Plot {plot.plotNumber}</h2>
              <p className="text-slate-500 text-sm">Fill in your details to secure this plot.</p>
            </div>

            <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Size</p>
                <p className="text-lg font-bold text-slate-700">{plot.sizeSqYards} sq.yd</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Price</p>
                <p className="text-xl font-bold text-emerald-600">₹{plot.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Government ID (Aadhar/PAN) <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input 
                  type="text" 
                  name="govId"
                  value={formData.govId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="XXXX-XXXX-XXXX"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {errorMsg}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-lg text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
