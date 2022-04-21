export interface SourceFormInfo {
  token: string;
  amount: string;
  sourceAddress: string;
}

export interface DestinationFormInfo {
  destinationAddress: string;
  destinationNetwork: string; // TODO enum this
}
