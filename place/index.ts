import { NetworkType, Provider } from '@metrixcoin/metrilib';
import { CONTRACTS } from './constants';
import { Version } from './types/Version';
import MetrixPlace from './MetrixPlace';
import { ZeroAddress } from 'ethers';

const getMetrixPlace = (
  network: NetworkType,
  provider: Provider,
  version: Version | undefined = 'latest'
) => {
  if (
    CONTRACTS[version][network].MetrixPlace === ZeroAddress.replace('0x', '')
  ) {
    throw new Error(`No deployment found for v${version} on the ${network}`);
  }
  return new MetrixPlace(CONTRACTS[version][network].MetrixPlace, provider);
};

const getMetrixPlaceAddress = (
  network: NetworkType,
  version: Version | undefined = 'latest'
) => {
  if (
    CONTRACTS[version][network].MetrixPlace === ZeroAddress.replace('0x', '')
  ) {
    throw new Error(`No deployment found for v${version} on the ${network}`);
  }
  return CONTRACTS[version][network].MetrixPlace;
};

export { MetrixPlace, getMetrixPlace, getMetrixPlaceAddress };
