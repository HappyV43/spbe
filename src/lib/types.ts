export interface Allocation {
  id: number;
  deliveryNumber: string;
  shipTo: number;
  agentName: string;
  materialName: string;
  bpeNumber?: string | null;
  period?: string | null;
  allocatedQty: number;
  status: string;
  giDate?: Date | null;
  plannedGiDate: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Agents {
  id: number;
  name: string;
  addresses: string;
  city: string;
  phone: string;
  fax?: string | null;
  associatedCompanyId: number;
  createdBy: String;
  updatedBy: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface LpgDistributions { 
  id: number;
  allocationId: number;
  deliveryNumber: string;
  bpeNumber: string;
  giDate: string;  // Assuming giDate is a string in 'YYYY-MM-DD' format
  shipTo: string;
  agentName: string;
  licensePlate: string;
  allocatedQty: number;
  distributionQty: number;
  volume: number; // decimal can be represented as a number in TypeScript
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface Companies {
  id: number,
  company: string,
  addresses: string;
  telephone: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: Date;
  createdAt: Date;
} 

export type SignInValues = {
  username: string;
  password: string;
  role: string;
};

export type RawData = {
  no: number;
  plant: number;
  shipTo: string;
  shipToName: string;
  doNumber: string;
  quantity: number;
  uom: string;
  doStatus: string;
  material: string;
  materialName: string;
  plannedGiDate: string; // if it's stored as a string, otherwise Date
  giDate: Date; // assuming it's a Date object
  bpe: string;
  updatedAt: Date;
  createdAt: Date;
};
