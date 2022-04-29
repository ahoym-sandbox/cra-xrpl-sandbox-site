export interface SourceFormInfo {
  token: string;
  amount: string;
  sourceAddress: string;
  sourceNetwork: string; // TODO enum this
}

export interface DestinationFormInfo {
  destinationAddress: string;
  destinationNetwork: string; // TODO enum this
}
