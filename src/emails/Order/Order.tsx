/* eslint-disable @next/next/no-img-element */
import { formatDateToPolishLocale } from '@/utils/formatDateToPolishLocale';
import { formatPrice } from '@/utils/price-formatter';
import { calculateDiscountAmount } from '@/utils/calculate-discount-amount';
import countryList from 'react-select-country-list';
import type { CreateOrderTypes } from './Order.types';

const TextsIterator = {
  CREATE_ORDER: {
    title: 'Dziękujemy za zakupy u nas',
    text: '',
  },
  NEW_ORDER: {
    title: 'Nowe zamówienie ma kierunekdziergania.pl',
    text: '',
  },
  ORDER_CANCELLED: {
    title: 'Twoje zamówienie zostało anulowane',
    text: '',
  },
  ORDER_COMPLETED: {
    title: 'Twoje zamówienie zostało zrealizowane',
    text: '',
  },
};

const CreateOrder = ({ data, type }: CreateOrderTypes) => {
  const totalItemsCount = data.products.array?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0;
  const totalItemsPrice =
    data.products.array?.reduce((acc, item) => acc + (item.discount ?? item.price!) * item.quantity!, 0) ?? 0;
  return (
    <div
      style={{
        width: '620px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          borderRadius: '6px 6px 0px 0px',
          backgroundColor: '#fdfbf8',
          padding: '36px 42px 48px 42px',
        }}
      >
        <img
          style={{
            display: 'block',
            margin: '0 auto',
          }}
          alt='website logo'
          src='https://kierunek-dzierganie-git-beta-kryptonum.vercel.app/logo.png'
        />
        <h1
          style={{
            color: '#332621',
            marginTop: '20px',
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          {TextsIterator[type].title}
        </h1>
        <div style={{ marginBottom: '80px' }}>
          <p style={{ color: '#332621' }}>Hej,</p>
          <p style={{ color: '#332621', marginTop: '8px' }}>
            Zakończyliśmy realizację Twojego zamówienia. Zobacz co dla Ciebie przygotowaliśmy!
          </p>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              marginTop: '48px',
            }}
          >
            <p style={{ color: '#332621' }}>Zamówienie: {data.id}</p>
            <p style={{ color: '#332621', marginLeft: 'auto' }}>{formatDateToPolishLocale(data.created_at)}</p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div
              style={{
                display: 'flex',
              }}
            >
              <p
                style={{
                  width: '176px',
                  marginRight: '4px',
                  backgroundColor: '#faf4f0',
                  padding: '6px 12px 8px 12px',
                  color: '#332621',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                  margin: '0',
                }}
              >
                Produkt
              </p>
              <p
                style={{
                  width: '176px',
                  marginRight: '4px',
                  backgroundColor: '#faf4f0',
                  padding: '6px 12px 8px 12px',
                  color: '#332621',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                  margin: '0',
                }}
              >
                Ilość
              </p>
              <p
                style={{
                  width: '176px',
                  backgroundColor: '#faf4f0',
                  padding: '6px 12px 8px 12px',
                  color: '#332621',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                  margin: '0',
                }}
              >
                Cena
              </p>
            </div>
            {data.products.array.map((product) => (
              <div
                style={{
                  display: 'flex',
                }}
                key={product.id}
              >
                <p
                  style={{
                    width: '176px',
                    marginRight: '4px',
                    padding: '12px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                    borderRight: '1px solid #faf4f0',
                    borderBottom: '1px solid #faf4f0',
                    borderLeft: '1px solid #faf4f0',
                    margin: '0',
                  }}
                >
                  {product.name}
                </p>
                <p
                  style={{
                    width: '176px',
                    marginRight: '4px',
                    padding: '12px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                    borderRight: '1px solid #faf4f0',
                    borderBottom: '1px solid #faf4f0',
                    borderLeft: '1px solid #faf4f0',
                    margin: '0',
                  }}
                >
                  {product.quantity}
                </p>
                <p
                  style={{
                    width: '176px',
                    padding: '12px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                    borderRight: '1px solid #faf4f0',
                    borderBottom: '1px solid #faf4f0',
                    borderLeft: '1px solid #faf4f0',
                    margin: '0',
                  }}
                >
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: '32px',
              width: '220px',
            }}
          >
            <p
              style={{
                display: 'flex',
              }}
            >
              <span
                style={{
                  color: '#766965',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                }}
              >
                {totalItemsCount} {totalItemsCount === 1 ? 'produkt' : totalItemsCount < 5 ? 'produkty' : 'produktów'}
              </span>
              <span
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  color: '#332621',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                }}
              >
                {formatPrice(totalItemsPrice)}
              </span>
            </p>
            {data.discount && (
              <p
                style={{
                  display: 'flex',
                  marginTop: '8px',
                }}
              >
                <span
                  style={{
                    color: '#766965',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  Kupon: {data.discount.code}
                </span>
                <span
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {formatPrice(calculateDiscountAmount(totalItemsPrice, data.discount))}
                </span>
              </p>
            )}
            {data.shippingMethod && (
              <p
                style={{
                  display: 'flex',
                  marginTop: '8px',
                }}
              >
                <span
                  style={{
                    color: '#766965',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  Dostawa
                </span>
                <span
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {formatPrice(data.shippingMethod.price)}
                </span>
              </p>
            )}
            <p
              style={{
                display: 'flex',
                marginTop: '8px',
              }}
            >
              <span
                style={{
                  color: '#766965',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                }}
              >
                Metoda płatności
              </span>
              <span
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  color: '#332621',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                }}
              >
                {data.payment_method}
              </span>
            </p>
            {data.virtualMoney && data.virtualMoney > 0 && (
              <p
                style={{
                  display: 'flex',
                  marginTop: '8px',
                }}
              >
                <span
                  style={{
                    color: '#766965',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  Wykorzystane WZ
                </span>
                <span
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  -{formatPrice(data.virtualMoney * 100)}
                </span>
              </p>
            )}
            <p
              style={{
                display: 'flex',
                marginTop: '8px',
              }}
            >
              <span
                style={{
                  color: '#766965',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                }}
              >
                Razem
              </span>
              <span
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  color: '#332621',
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: '150%',
                }}
              >
                {formatPrice(
                  totalItemsPrice +
                  (data.discount ? calculateDiscountAmount(totalItemsPrice, data.discount) : 0) -
                  (data.virtualMoney ? data.virtualMoney * 100 : 0) +
                  (data.shippingMethod ? data.shippingMethod.price : 0)
                )}
              </span>
            </p>
          </div>
          <div>
            <h2
              style={{
                marginTop: '48px',
                marginBottom: '16px',
                color: '#332621',
                fontSize: '18px',
                fontWeight: '300',
                lineHeight: '150%',
              }}
            >
              Adres rozliczeniowy
            </h2>
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: '261px',
                  marginRight: '16px',
                }}
              >
                <p
                  style={{
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  Dane dostawy:
                </p>
                <p
                  style={{
                    marginTop: '4px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {data.shipping.firstName}
                </p>
                <p
                  style={{
                    marginTop: '4px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {data.shipping.address1}
                </p>
                <p
                  style={{
                    marginTop: '4px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {data.shipping.postcode}, {countryList().getLabel(data.shipping.country)}
                </p>
                {data.shipping.phone && (
                  <p
                    style={{
                      marginTop: '4px',
                      color: '#332621',
                      fontSize: '14px',
                      fontWeight: '300',
                      lineHeight: '150%',
                    }}
                  >
                    {data.shipping.phone}
                  </p>
                )}
              </div>
              <div
                style={{
                  width: '261px',
                  marginRight: '16px',
                }}
              >
                <p
                  style={{
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  Dane faktury:
                </p>
                {data.billing.invoiceType === 'Osoba prywatna' ? (
                  <p
                    style={{
                      marginTop: '4px',
                      color: '#332621',
                      fontSize: '14px',
                      fontWeight: '300',
                      lineHeight: '150%',
                    }}
                  >
                    {data.billing.firstName}
                  </p>
                ) : (
                  <>
                    <p
                      style={{
                        marginTop: '4px',
                        color: '#332621',
                        fontSize: '14px',
                        fontWeight: '300',
                        lineHeight: '150%',
                      }}
                    >
                      {data.billing.company}
                    </p>
                    <p
                      style={{
                        marginTop: '4px',
                        color: '#332621',
                        fontSize: '14px',
                        fontWeight: '300',
                        lineHeight: '150%',
                      }}
                    >
                      {data.billing.nip}
                    </p>
                  </>
                )}
                <p
                  style={{
                    marginTop: '4px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {data.billing.address1}
                </p>
                <p
                  style={{
                    marginTop: '4px',
                    color: '#332621',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '150%',
                  }}
                >
                  {data.billing.postcode}, {countryList().getLabel(data.billing.country)}
                </p>
                {data.billing.phone && (
                  <p
                    style={{
                      marginTop: '4px',
                      color: '#332621',
                      fontSize: '14px',
                      fontWeight: '300',
                      lineHeight: '150%',
                    }}
                  >
                    {data.billing.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: '18px',
          fontWeight: '300',
          lineHeight: '150%',
          textAlign: 'center',
          color: '#332621',
          borderRadius: '0px 0px 6px 6px',
          background: '#FAF4F0',
          padding: '24px 12px 20px 12px',
        }}
      >
        <p style={{ marginBottom: '12px', color: '#332621' }}>Zostań z nami na dłużej! Sprawdź moje social media ;)</p>
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            width: 'fit-content',
          }}
        >
          <a
            href='https://www.facebook.com/kierunekdzierganie'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'block',
              padding: '12px',
              marginRight: '12px',
            }}
          >
            <img
              alt='Facebook'
              src='https://kierunek-dzierganie-git-beta-kryptonum.vercel.app/facebook.png'
            />
          </a>
          <a
            href='https://www.instagram.com/kierunekdzierganie/'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'block',
              padding: '12px',
            }}
          >
            <img
              alt='Instagram'
              src='https://kierunek-dzierganie-git-beta-kryptonum.vercel.app/instagram.png'
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
