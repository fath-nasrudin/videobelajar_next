import {
  isClient,
  randId,
  readStorage,
  writeStorage,
} from "@/lib/localstorage.helper";
import { CreateOrderInput, Order, UpdateOrderInput } from "@/types";
import { useState } from "react";
import { getOrdersWithCourse } from "./order";

const ORDERS_KEY = "__dummy_orders";

function getOrders(): Order[] {
  return readStorage<Order[]>(ORDERS_KEY) ?? [];
}

function saveOrders(orders: Order[]) {
  writeStorage(ORDERS_KEY, orders);
}

export function createOrder(data: CreateOrderInput): void {
  const orders = getOrders();
  const order: Order = {
    id: randId("o_"),
    courseId: data.courseId,
    userId: data.userId,
    invoice: `HEL/VI/${Date.now()}`,
    status: "waiting_payment",
    totalPayment: data.totalPayment,
  };
  orders.push(order);
  saveOrders(orders);
}

export function updateOrder(orderId: string, data: UpdateOrderInput): void {
  const orders = getOrders();
  const exists = orders.find((u) => u.id === orderId);
  if (!exists) {
    throw new Error("Order not found");
  }

  orders.forEach((o) => {
    if (o.id === orderId) {
      o = { ...o, ...data };
    }
  });

  //   ambil semua data
  // cari exist
  // update exist
  // simpan lagi

  saveOrders(orders);
}

export function useOrder() {
  const [orders, setOrders] = useState<Order[] | []>(() =>
    isClient() ? getOrdersWithCourse() : []
  );

  const doCreateOrder = (data: CreateOrderInput) => {
    createOrder(data);
    setOrders(getOrdersWithCourse());
  };

  const doUpdateOrder = (id: string, data: UpdateOrderInput) => {
    updateOrder(id, data);
    setOrders(getOrdersWithCourse());
  };

  return {
    orders,
    createOrder: doCreateOrder,
    updateOrder: doUpdateOrder,
  };
}
