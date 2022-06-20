import type { User, Bill } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Bill } from "@prisma/client";

export function getBill({
  id,
  userId,
}: Pick<Bill, "id"> & {
  userId: User["id"];
}) {
  return prisma.bill.findFirst({
    where: { id, userId },
  });
}

export function getBillListItems({ userId }: { userId: User["id"] }) {
  const res = prisma.bill.findMany({
    where: { userId },
    // select: {
    //   id: true,
    //   title: true,
    //   payment: true,
    //   balance: true,
    //   limit: true,
    //   interestRate: true,
    // },
    orderBy: { title: "desc" },
  });
  console.log({ billsMaybe: res });
  return res;
}

type BillField =
  | "balance"
  | "dayDue"
  | "interestRate"
  | "limit"
  | "payment"
  | "title";

export function createBill({
  balance,
  dayDue,
  interestRate,
  limit,
  payment,
  title,
  userId,
}: Pick<Bill, BillField> & {
  userId: User["id"];
}) {
  return prisma.bill.create({
    data: {
      balance,
      dayDue,
      interestRate,
      limit,
      payment,
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteBill({
  id,
  userId,
}: Pick<Bill, "id"> & { userId: User["id"] }) {
  return prisma.bill.deleteMany({
    where: { id, userId },
  });
}

type BillUpdate = {
  balance: number;
  dayDue: number;
  interestRate: number;
  payment: number;
  title: string;
};

export function updateBill({
  id,
  userId,
  payload,
}: {
  id: string;
  userId: string;
  payload: BillUpdate;
}) {
  return prisma.bill.update({
    where: {
      id,
    },
    data: {
      ...payload,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
