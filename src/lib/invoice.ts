import { db } from "@/lib/db";

function generateInvoiceNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `INV-${year}${month}${day}-${random}`;
}

export async function createInvoiceForOrder(orderId: string) {
  const existing = await db.invoice.findUnique({
    where: { orderId },
  });

  if (existing) return existing;

  let invoiceNumber = generateInvoiceNumber();

  let collision = await db.invoice.findUnique({
    where: { invoiceNumber },
  });

  while (collision) {
    invoiceNumber = generateInvoiceNumber();
    collision = await db.invoice.findUnique({
      where: { invoiceNumber },
    });
  }

  return db.invoice.create({
    data: {
      orderId,
      invoiceNumber,
      status: "PENDING",
    },
  });
}