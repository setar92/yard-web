import React, { useState } from 'react';

import { Locker } from '../../common/types';

const MySelect: React.FC<{ options: Locker[] }> = ({ options }) => {
  const [selectedLocker, setSelectedLocker] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Locker[]>(options);

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedLocker(event.target.value);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const searchText = event.target.value;
    const filteredLockers = options.filter((locker) =>
      locker.address.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSelectedLocker('');
    setFilteredOptions(filteredLockers);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type to filter"
        onChange={handleInputChange}
      />
      <select value={selectedLocker} onChange={handleOptionChange}>
        {filteredOptions.map((option, index) => (
          <option key={index} value={option.address}>
            {option.address}
          </option>
        ))}
      </select>
    </div>
  );
};

export { MySelect };
