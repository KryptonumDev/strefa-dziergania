'use server';
import { NextResponse } from 'next/server';
import { verifyTransaction } from './verify-transaction';
import { updateOrder } from './update-order';
import { checkUsedModifications } from './check-used-modifications';
import { updateItemsQuantity } from './update-items-quantity';
import { sendEmails } from './send-emails';
import { generateBill } from './generate-bill';
import { purchaseEvent } from './purchaseEvent';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { sessionId, amount, currency, orderId } = requestData;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'No order id provided' }, { status: 400 });

    await verifyTransaction(amount, currency, orderId, sessionId);

    const { data, error } = await updateOrder(
      {
        paid_at: new Date(),
        payment_data: requestData,
        status: 2,
      },
      id
    );

    if (error) throw new Error(error.message);
    await checkUsedModifications(data);
    console.log('przed wysłaniem emaili');
    await sendEmails(data);
    console.log('przed generowaniem rachunku');
    await generateBill(data, id);
    console.log('przed zmianą ilości');
    await updateItemsQuantity(data);

    await purchaseEvent({
      user_id: data.user_id,
      value: amount / 100,
      transaction_id: orderId,
      items: data.products.array.map(({ id, name, quantity, discount, price }: { id: string; name: string; quantity: number; discount: number; price: number; }) => ({
        item_id: id,
        item_name: name,
        quantity: quantity,
        price: discount ? discount / 100 : price / 100
      })),
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
