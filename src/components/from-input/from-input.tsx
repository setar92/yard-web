import React, { FC, useState, useEffect } from 'react';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { AccountType } from '../../common/enums';
import { useGetLockersQuery } from '../../store/market-api/market-api';

const FromInput: FC = () => {
  const { data: lockers, isSuccess } = useGetLockersQuery();
  const [bussinessLocations, setBussinessLocations] = useState(['']);

  useEffect(() => {
    if (isSuccess && lockers) {
      const myLocations = lockers.filter(
        (loc) => loc.type === AccountType.Business,
      );
      setBussinessLocations(myLocations.map((loc) => loc.address));
    }
  }, [isSuccess, lockers]);

  if (!isSuccess || !lockers) return <CircularProgress color="primary" />;

  return (
    <Autocomplete
      disablePortal
      id="fromPoint"
      options={bussinessLocations}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="From location" />}
    />
  );
};

export { FromInput };
