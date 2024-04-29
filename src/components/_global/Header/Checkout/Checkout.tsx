import type { InputState, Props, MappingProps } from './Checkout.types';
import styles from './Checkout.module.scss';
import SummaryAside from './_SummaryAside';
import PersonalData from './_PersonalData';
import { useEffect, useState } from 'react';
import Authorization from './_Authorization';
import { calculateDiscountAmount } from '@/utils/calculate-discount-amount';
import type { Billing, Shipping } from '@/global/types';
import { toast } from 'react-toastify';

const createInputState = (billing?: Billing, shipping?: Shipping, userEmail?: string) => ({
  firmOrder: false,
  shippingSameAsBilling: true,
  amount: 0,
  totalAmount: 0,
  needDelivery: false,
  shipping: {
    firstName: shipping?.firstName ?? '',
    address1: shipping?.address1 ?? '',
    city: shipping?.city ?? '',
    country: shipping?.country ?? '',
    postcode: shipping?.postcode ?? '',
    phone: shipping?.phone ?? '',
  },
  billing: {
    nip: billing?.nip ?? '',
    firstName: billing?.firstName ?? '',
    address1: billing?.address1 ?? '',
    city: billing?.city ?? '',
    country: billing?.country ?? '',
    postcode: billing?.postcode ?? '',
    email: userEmail ?? '',
    phone: billing?.phone ?? '',
    company: billing?.company ?? '',
    invoiceType: billing?.invoiceType ?? 'Osoba prywatna',
  },
});

const stepContent = (props: MappingProps) => ({
  1: <Authorization {...props} />,
  2: <PersonalData {...props} />,
});

export default function Checkout({
  goToCart,
  fetchedItems,
  showCheckout,
  setShowCheckout,
  CrossIcon,
  userEmail,
  billing,
  shipping,
  usedDiscount,
  usedVirtualMoney,
  userId,
  setUsedDiscount,
  // virtualWallet,
}: Props) {
  const [step, setStep] = useState(1);

  const [input, setInput] = useState<InputState>(createInputState(billing, shipping, userEmail));

  useEffect(() => {
    if (userEmail) setStep(2);
  }, []);

  useEffect(() => {
    if (!fetchedItems?.length) {
      if (input.amount > 0)
        setInput((prev) => ({
          ...prev,
          products: undefined,
          amount: 0,
        }));

      return;
    }

    if (usedDiscount && usedDiscount.affiliatedBy === userId) {
      setUsedDiscount(null);
      toast('Nie możesz użyć własnego kodu afiliacyjnego');
    }

    //TODO: revalidate coupon after login,
    // can be problem with per_user_limit if coupon code entered before loginx

    setInput((prev) => ({
      ...prev,
      amount: fetchedItems.reduce((acc, item) => acc + (item.discount ?? item.price! * item.quantity!), 0),
      totalAmount:
        fetchedItems.reduce((acc, item) => acc + (item.discount ?? item.price! * item.quantity!), 0) +
        (usedDiscount ? calculateDiscountAmount(input.amount, usedDiscount) : 0) -
        (usedVirtualMoney ? usedVirtualMoney * 100 : 0),
      needDelivery: fetchedItems.some((item) => item._type === 'product'),
      discount: usedDiscount?.affiliatedBy === userId ? null : usedDiscount,
      virtualMoney: usedVirtualMoney,
      user_id: userId,
      products: {
        array: fetchedItems.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price!,
          discount: item.discount!,
          quantity: item.quantity!,
          image: item.variants?.[0]?.gallery ? item.variants[0].gallery : item.gallery!,
          complexity: item.complexity || null,
          courses: item._type === 'course' ? [{ _id: item._id }] : item.courses ?? null,
          variantId: item.variant?._id ?? null,
          type: item._type,
        })),
      },
    }));
  }, [fetchedItems, input.amount, setInput, usedDiscount, usedVirtualMoney, userId, setUsedDiscount]);

  useEffect(() => {
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setShowCheckout();
    });

    return () => removeEventListener('keydown', () => setShowCheckout());
  }, [setShowCheckout]);

  return (
    <>
      <div
        className={styles['checkout']}
        data-visible={!!showCheckout}
      >
        <button
          className={styles['CloseButton']}
          onClick={setShowCheckout}
        >
          {CrossIcon}
        </button>
        <div className={styles['content']}>
          {stepContent({ goToCart, setStep, input, setInput })[step as keyof typeof stepContent]}
          <SummaryAside input={input} />
        </div>
      </div>
    </>
  );
}
