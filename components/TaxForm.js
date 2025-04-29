import React, { useState } from 'react';

const TaxForm = ({ onSubmit, initialAmount = '' }) => {
  const [taxAmount, setTaxAmount] = useState(initialAmount);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taxAmount || taxAmount <= 0) {
      setError('請輸入有效的稅額');
      return;
    }
    
    setError('');
    onSubmit(Number(taxAmount));
  };

  const handleInput = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setTaxAmount(value ? parseInt(value, 10) : '');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            請輸入您的稅額
          </label>
          <div className="relative">
            <input
              type="text"
              value={taxAmount}
              onChange={handleInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="輸入稅額"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full btn btn-primary"
        >
          查找最佳信用卡
        </button>
      </form>
    </div>
  );
};

export default TaxForm;