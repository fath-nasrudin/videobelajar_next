import { getCourses } from "@/data/courses";
import { randId, readStorage, writeStorage } from "@/lib/localstorage.helper";
import { CreateOrderInput, Order, UpdateOrderInput } from "@/types";

const ORDERS_KEY = "__dummy_orders";

function getOrders(props?: { include?: { course?: boolean } }): Order[] {
  const orders = readStorage<Order[]>(ORDERS_KEY) ?? [];
  const courses = getCourses();

  if (props?.include?.course) {
    orders.forEach((order) => {
      order.course = courses.find((course) => course.id === order.courseId);
      return order;
    });
  }

  return orders;
}

export function getOrdersWithCourse() {
  return getOrders({ include: { course: true } });
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
