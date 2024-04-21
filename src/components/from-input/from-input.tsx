import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { AccountType } from '../../common/enums';
import { Locker } from '../../common/types';
import { useGetLockersQuery } from '../../store/market-api/market-api';

interface FromInputProps {
  setFromLocation: Dispatch<SetStateAction<Locker | undefined>>;
}

const FromInput: FC<FromInputProps> = ({ setFromLocation }) => {
  const { data: lockers, isSuccess, isError } = useGetLockersQuery();
  const [bussinessLocations, setBussinessLocations] = useState(['']);

  useEffect(() => {
    if (isSuccess && lockers) {
      const myLocations = lockers.filter(
        (loc) => loc.type === AccountType.Business,
      );
      setBussinessLocations(myLocations.map((loc) => loc.address));
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
  if (isError) alert("Can't dowload lockers");
  if (!isSuccess || !lockers) return <CircularProgress color="primary" />;

  return (
    <Autocomplete
      id="fromPoint"
      options={bussinessLocations}
      sx={{ width: 300, marginTop: 2, marginBottom: 2 }}
      renderInput={(params) => <TextField {...params} label="From location" />}
      onChange={(
        event: React.SyntheticEvent<Element, Event | null>,
        newValue: string | null,
      ) => handleChooseFromLocation(newValue)}
    />
  );
};

export { FromInput };
