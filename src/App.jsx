import { useState } from 'react';
import MD5 from 'crypto-js/md5';

const MERCHANT_LOGIN = 'demo';
const PASSWORD_1 = 'password_1';
const PAYMENT_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx';

function buildSignature(outSum, invId) {
  return MD5(`${MERCHANT_LOGIN}:${outSum}:${invId}:${PASSWORD_1}`).toString();
}

function buildPaymentUrl({ outSum, invId, description }) {
  const signature = buildSignature(outSum, invId);
  const params = new URLSearchParams({
    MerchantLogin: MERCHANT_LOGIN,
    OutSum: outSum,
    InvId: invId,
    Description: description,
    SignatureValue: signature,
    IsTest: '1',
    Culture: 'ru',
    Encoding: 'utf-8',
  });
  return `${PAYMENT_URL}?${params.toString()}`;
}

export default function App() {
  const [amount, setAmount] = useState('100.00');
  const [invId, setInvId] = useState('1');
  const [description, setDescription] = useState('Оплата услуг (тест)');
  const [link, setLink] = useState('');

  function handleGenerate() {
    const url = buildPaymentUrl({ outSum: amount, invId, description });
    setLink(url);
  }

  function handlePay() {
    const url = buildPaymentUrl({ outSum: amount, invId, description });
    window.location.href = url;
  }

  return (
    <div className="card">
      <h1>Оплата через Robokassa</h1>
      <p className="subtitle">
        Тестовый режим демо-магазина (<code>IsTest=1</code>). Реальные средства
        не списываются.
      </p>

      <label>
        Сумма, ₽
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label>
        Номер заказа (InvId)
        <input
          type="text"
          value={invId}
          onChange={(e) => setInvId(e.target.value)}
        />
      </label>

      <label>
        Описание
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="buttons">
        <button onClick={handlePay}>Оплатить</button>
        <button className="ghost" onClick={handleGenerate}>
          Показать ссылку
        </button>
      </div>

      {link && (
        <div className="result">
          <p>Платёжная ссылка с подписью:</p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
