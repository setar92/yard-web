import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { AccountType } from '../../common/enums';
import { theme } from '../../common/theme/theme';
import { Locker } from '../../common/types';
import { useGetLockersQuery } from '../../store/market-api/market-api';

interface FromInputProps {
  setFromLocation: Dispatch<SetStateAction<Locker | undefined>>;
  fromLocation: Locker | undefined;
}

const FromInput: FC<FromInputProps> = ({ setFromLocation, fromLocation }) => {
  const { data: lockers, isSuccess, isError } = useGetLockersQuery();
  const [bussinessLocations, setBussinessLocations] = useState(['']);

  useEffect(() => {
    if (isSuccess && lockers) {
      const myLocations = lockers.filter(
        (loc) => loc.type === AccountType.Business,
      );
      setBussinessLocations(myLocations.map((loc) => loc.address));
      setFromLocation(lockers[0]);
      localStorage.setItem('fromLocation', JSON.stringify(lockers[0]));
    }
  }, [isSuccess, lockers]);

  const handleChooseFromLocation = (locationAdress: string | null): void => {
    if (lockers && locationAdress) {
      const fromLocation = lockers.find(
        (loc) => loc.address === locationAdress,
      );
      setFromLocation(fromLocation as Locker);
      localStorage.setItem('fromLocation', JSON.stringify(fromLocation));
    }
  };

  if (isError) alert("Can't dowload locations");
  if (!isSuccess || !lockers) return <CircularProgress color="primary" />;

  return (
    <Autocomplete
      id="fromPoint"
      options={bussinessLocations}
      value={fromLocation ? fromLocation.address : bussinessLocations[0]}
      sx={{
        width: '100%',
        background: theme.palette.background.paper,
      }}
      renderInput={(params) => <TextField {...params} label="From location" />}
      onChange={(
        event: React.SyntheticEvent<Element, Event | null>,
        newValue: string | null,
      ) => handleChooseFromLocation(newValue)}
    />
  );
};

export { FromInput };
