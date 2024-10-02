export interface Allocation {
  id: number;
  deliveryNumber: string;
  materialName: string;
  giDate: string;
  bpeNumber: string;
  period: string;
  alocatedQty: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
}

export type SignInValues = {
  username: string;
  password: string;
};
