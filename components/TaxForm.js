import React, { useState } from 'react';

const TaxForm = ({ onSubmit, initialAmount = 0 }) => {
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

  // 预设的税额选项
  const presetAmounts = [10000, 30000, 50000, 100000, 200000, 500000, 1000000];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">輸入您的所得稅額</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taxAmount" className="block text-sm font-medium text-gray-700 mb-1">
            所得稅金額 (NT$)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
              NT$
            </span>
            <input
              type="text"
              id="taxAmount"
              value={taxAmount}
              onChange={handleInput}
              className="pl-12 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="例如：50000"
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">快速選擇:</p>
          <div className="flex flex-wrap gap-3" data-component-name="TaxForm">
            {presetAmounts.map(amount => (
              <button
                key={amount}
                type="button"
                onClick={() => setTaxAmount(amount)}
                className="text-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg min-w-[100px]"
              >
                NT$ {amount.toLocaleString()}
              </button>
            ))}
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