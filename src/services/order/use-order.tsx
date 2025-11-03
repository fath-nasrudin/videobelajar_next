"use client";

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

export function createOrder(data: CreateOrderInput) {
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
  return order;
}

export function updateOrder(orderId: string, data: UpdateOrderInput): void {
  const orders = getOrders();
  const exists = orders.find((u) => u.id === orderId);
  if (!exists) {
    throw new Error("Order not found");
  }

  const newOrders = orders.map((o) => {
    if (o.id === orderId) {
      o = { ...o, ...data };
    }
    return o;
  });

  saveOrders(newOrders);
}

export function useOrder() {
  const [orders, setOrders] = useState<Order[] | []>(() =>
    isClient() ? getOrdersWithCourse() : []
  );

  const doCreateOrder = (data: CreateOrderInput) => {
    const order = createOrder(data);
    setOrders(getOrdersWithCourse());
    return order;
  };

  const doUpdateOrder = (id: string, data: UpdateOrderInput) => {
    updateOrder(id, data);
    setOrders(getOrdersWithCourse());
  };

  const doGetOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  const payOrder = (orderId: string) => {
    // should validate that the order is not already paid or cancelled.

    doUpdateOrder(orderId, {
      status: "success",
      paidAt: new Date().toISOString(),
    });
  };

  const cancelOrder = (orderId: string) => {
    // should validate that the order is not already paid or cancelled.

    doUpdateOrder(orderId, {
      status: "cancelled",
    });
  };

  return {
    orders,
    createOrder: doCreateOrder,
    updateOrder: doUpdateOrder,
    getOrderById: doGetOrderById,
    payOrder,
    cancelOrder,
  };
}
