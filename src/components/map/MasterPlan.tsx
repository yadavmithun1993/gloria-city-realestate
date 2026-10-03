'use client';

import React, { useState, useEffect } from 'react';
import { Plot } from '../../types';
import BookingModal from '../booking/BookingModal';

export default function MasterPlan() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/plots/');
      if (response.ok) {
        const data: Plot[] = await response.json();
        // Sort plots sequentially by their plotNumber
        const sortedData = data.sort((a, b) => parseInt(a.plotNumber) - parseInt(b.plotNumber));
        setPlots(sortedData);
      } else {
        throw new Error('Failed to fetch plots');
      }
    } catch (err: any) {
      console.error('Error fetching plots:', err);
      setError('Could not load plots data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlotClick = (plot: Plot) => {
    if (plot.status === 'available') {
      setSelectedPlot(plot);
      setIsModalOpen(true);
    }
  };

  const handleBookPlot = async (plotId: string, bookingData: any) => {
    const response = await fetch('http://localhost:8000/api/bookings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plot_id: plotId,
        customer_name: bookingData.name,
        phone_number: bookingData.phone,
        email: bookingData.email || '',
        gov_id: bookingData.govId || ''
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit booking');
    }
    
    setPlots(plots.map(p => p.id === plotId ? { ...p, status: 'on_hold' } : p));
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'available': 
        return 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 shadow-[0_6px_0_0_#065f46,0_10px_10px_0_rgba(0,0,0,0.2)] hover:shadow-[0_2px_0_0_#065f46,0_4px_5px_0_rgba(0,0,0,0.3)] hover:translate-y-1 cursor-pointer text-white';
      case 'on_hold': 
        return 'bg-gradient-to-br from-amber-400 to-amber-500 border-amber-300 shadow-[0_6px_0_0_#b45309,0_10px_10px_0_rgba(0,0,0,0.2)] opacity-95 cursor-not-allowed text-amber-900';
      case 'sold': 
        return 'bg-gradient-to-br from-rose-500 to-rose-700 border-rose-400 shadow-[0_4px_0_0_#881337,0_6px_6px_0_rgba(0,0,0,0.2)] opacity-80 cursor-not-allowed text-white translate-y-0.5';
      default: 
        return 'bg-slate-300 shadow-[0_6px_0_0_#94a3b8]';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto py-20 flex justify-center items-center min-h-[400px]">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 text-center shadow-xl">
          <p className="font-bold text-2xl mb-3">Oops!</p>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      
      {/* Header Actions & Legend */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100/50">
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_4px_0_0_#065f46]"></div>
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_4px_0_0_#b45309]"></div>
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">On Hold</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 shadow-[0_4px_0_0_#881337]"></div>
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sold</span>
          </div>
        </div>

        {/* Download PDF Button */}
        <a 
          href="/master-plan.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Master Plan PDF
        </a>
      </div>

      {/* Sequential 3D Grid */}
      <div className="bg-slate-100 p-8 sm:p-12 rounded-[2rem] shadow-inner border border-slate-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-4 gap-y-10">
          {plots.map((plot) => (
            <div 
              key={plot.id}
              onClick={() => handlePlotClick(plot)}
              className={`
                group relative aspect-square rounded-2xl border-t border-l transition-all duration-300 ease-out
                flex flex-col items-center justify-center transform
                ${getStatusStyle(plot.status)}
              `}
            >
              <span className="font-extrabold text-2xl sm:text-3xl tracking-wide drop-shadow-md z-10">
                {plot.plotNumber}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold opacity-90 uppercase tracking-widest mt-1">
                Plot
              </span>

              {/* Custom Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-56 p-4 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-2xl scale-90 group-hover:scale-100 border border-slate-700/50">
                <div className="font-bold text-lg mb-2 text-emerald-400 text-center border-b border-slate-700/50 pb-2">Plot {plot.plotNumber}</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Size</span>
                  <span className="font-bold bg-slate-800 px-2 py-1 rounded-md">{plot.sizeSqYards} sq.yd</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Rate</span>
                  <span className="font-medium text-slate-300">₹{(plot.price / plot.sizeSqYards).toLocaleString('en-IN')}/yd</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Total</span>
                  <span className="font-bold text-amber-400">₹{plot.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-700/50 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    plot.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' : 
                    plot.status === 'sold' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {plot.status.replace('_', ' ')}
                  </span>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-slate-900/95"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal 
        plot={selectedPlot} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onBook={handleBookPlot} 
      />
    </div>
  );
}

