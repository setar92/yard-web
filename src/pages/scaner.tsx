import React, { FC, useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const Scanner: FC = () => {
  const [data, setData] = useState('Not Found');
  const [torchOn, setTorchOn] = useState(false);

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        torch={torchOn}
        onUpdate={(err, result) => {
          if (result) setData(result.getText());
          else setData('Not Found');
        }}
      />
      <p>{data}</p>
      <button onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? 'Off' : 'On'}
      </button>
    </>
  );
};

export { Scanner };
