import { ParcelObject } from '../common/types';
import { parcelsApi } from '../store/parcels-api/parcels-api';
import { store } from '../store/store';

const fetchParcelDetails = async (ids: string[]): Promise<ParcelObject[]> => {
  // Get the endpoint from the API
  const { getParcelInfo } = parcelsApi.endpoints;

  // Create an array of promises for each ID
  const promises = ids.map((id) =>
    store.dispatch(getParcelInfo.initiate(id)).unwrap(),
  );

  // Wait for all promises to resolve
  const results = await Promise.all(promises);

  // Return the combined results
  return results;
};

export { fetchParcelDetails };
