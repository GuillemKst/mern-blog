import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQRValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGenerateQR = () => {
    setQRValue(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Paste link here..."
      />
      <button onClick={handleGenerateQR}>Generate QR Code</button>
      {qrValue && (
        <div style={{ marginTop: '20px' }}>
          <QRCode value={qrValue} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
