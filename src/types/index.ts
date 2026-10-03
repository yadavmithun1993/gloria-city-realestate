export type PlotStatus = 'available' | 'on_hold' | 'sold';

export interface Plot {
  id: string;
  plotNumber: string;
  sizeSqYards: number;
  price: number;
  status: PlotStatus;
}

export interface Booking {
  id?: string;
  plotId: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  govId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
