export interface Establishment {
  address: string;
  email: string;
  guid: string;
  id: string;
  index: number;
  latitude: string;
  longitude: string;
  name: string;
  phone: string;
  picture: string | ArrayBuffer;
  registered: string;
  city?: string;
  bank?: string;
  accountType?: string;
  cpfOrcnpj?: string;
  agency?: number;
  agencyDigit?: number;
  accountNumber?: number;
  accountNumberDigit?: number;
  automaticWithdrawal?: string;
}

export interface EstablishmentDb {
  establishments: Establishment[];
}
