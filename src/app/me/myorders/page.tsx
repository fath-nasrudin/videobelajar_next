"use client";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SectionShell } from "@/components/section-shell";
import { MeNav } from "../me-nav";
import { useOrder } from "@/services/order/use-order";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const orderStatusLabel: Record<Order["status"], { label: string }> = {
  cancelled: { label: "Gagal" },
  waiting_payment: { label: "Belum Bayar" },
  pending: { label: "Pending" },
  success: { label: "Berhasil" },
};

function OrderCard({ order }: { order: Order }) {
  return (
    <div key={order.id} className="border-[1px] rounded-card text-body-lg">
      {/* first section */}
      <div className="px-5 py-4 bg-light-secondary/10 flex items-center">
        <span className="text-dark-secondary">
          No Invoice: <span className="text-blue-500">{order.invoice}</span>
        </span>
        <span
          className={`ml-auto px-2.5 py-1 rounded-card text-body-base
            ${order.status === "success" && "text-primary bg-primary/10 "}
            ${
              order.status === "waiting_payment" &&
              "text-secondary bg-secondary/10 "
            }
            ${order.status === "cancelled" && "text-error bg-error/10 "}
            ${order.status === "pending" && "text-accent bg-accent/10 "}
            `}
        >
          {orderStatusLabel[order.status].label}
        </span>
      </div>
      {/* second section */}
      <div className="px-5 py-4 ">
        {order.course && (
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className=" flex-1 flex gap-4 items-center">
              <img
                className="size-[52px] rounded-card"
                src={order.course.image.url}
                alt={order.course.image.alt}
              />
              <h4 className="text-body-lg font-medium flex-1">
                {order.course.title}
              </h4>
            </div>
            <div>
              <div className="text-body-base font-medium text-dark-secondary">
                Harga
              </div>
              <div className="text-heading-6 font-semibold text-dark-primary">
                {formatPrice(order.course.price.discounted, true)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* thrid section */}
      <div className="px-5 py-4 bg-light-secondary/10 flex items-center justify-between">
        <span className="text-dark-secondary text-body-base">
          Total Pembayaran:
        </span>
        <span className="text-primary text-heading-6 font-semibold">
          {formatPrice(order.totalPayment, true)}
        </span>
      </div>
    </div>
  );
}

export default function MyOrdersPage() {
  const { orders } = useOrder();
  return (
    <div className="space-y-10">
      <Header />
      <Container className="flex flex-col sm:flex-row gap-5 items-start">
        {/* left side */}
        <div className="sm:w-[292px] w-full space-y-5">
          <div>
            <h5 className="text-heading-5"> Daftar Pesanan </h5>
            <p className="text-body-base text-dark-secondary">
              Informasi terperinci mengenai pembelian
            </p>
          </div>
          <MeNav />
        </div>

        {/* right side */}
        <SectionShell className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {orders.length ? (
              orders.map((order) => {
                if (order.status === "waiting_payment") {
                  return (
                    <Link
                      key={order.id}
                      href={ROUTES.payment.methods.getPath(order.id)}
                    >
                      <OrderCard order={order} />
                    </Link>
                  );
                }
                return <OrderCard key={order.id} order={order} />;
              })
            ) : (
              <p className="text-dark-secondary text-center">
                No Order Found. Create Order First
              </p>
            )}
          </div>
        </SectionShell>
      </Container>

      <Footer />
    </div>
  );
}
