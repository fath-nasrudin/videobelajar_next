export type PaymentMethod = {
  name: string;
  code: string;
  type: "bank_transfer" | "ewallet" | "credit_debit_card";
  image: {
    url: string;
  };
};

export type PaymentCategory = {
  category: string;
  methods: PaymentMethod[];
};

export const paymentOptionList: PaymentMethod[] = [
  {
    name: "Bank BCA",
    code: "bca",
    type: "bank_transfer",
    image: { url: "/img/payments/bca.png" },
  },
  {
    name: "Bank BNI",
    code: "bni",
    type: "bank_transfer",
    image: { url: "/img/payments/bni.png" },
  },
  {
    name: "Bank BRI",
    code: "bri",
    type: "bank_transfer",
    image: { url: "/img/payments/bri.png" },
  },
  {
    name: "Bank Mandiri",
    code: "mandiri",
    type: "bank_transfer",
    image: { url: "/img/payments/mandiri.png" },
  },
  {
    name: "Dana",
    code: "dana",
    type: "ewallet",
    image: { url: "/img/payments/mandiri.png" },
  },
  {
    name: "OVO",
    code: "ovo",
    type: "ewallet",
    image: { url: "/img/payments/ovo.png" },
  },
  {
    name: "LinkAja",
    code: "linkaja",
    type: "ewallet",
    image: { url: "/img/payments/linkaja.png" },
  },
  {
    name: "ShopeePay",
    code: "shopeepay",
    type: "ewallet",
    image: { url: "/img/payments/shopeepay.png" },
  },
  {
    name: "Visa",
    code: "visa",
    type: "credit_debit_card",
    image: { url: "/img/payments/visa.png" },
  },
  {
    name: "MasterCard",
    code: "mastercard",
    type: "credit_debit_card",
    image: { url: "/img/payments/mastercard.png" },
  },
  {
    name: "JCB",
    code: "jcb",
    type: "credit_debit_card",
    image: { url: "/img/payments/jcb.png" },
  },
];

const paymentOptions: PaymentCategory[] = [
  {
    category: "Transfer Bank",
    methods: paymentOptionList.filter((p) => (p.type = "bank_transfer")),
  },
  {
    category: "E-Wallet",
    methods: paymentOptionList.filter((p) => (p.type = "ewallet")),
  },
  {
    category: "Kartu Kredit/Debit",
    methods: paymentOptionList.filter((p) => (p.type = "credit_debit_card")),
  },
];

export const getPaymentOptions = () => paymentOptions;
