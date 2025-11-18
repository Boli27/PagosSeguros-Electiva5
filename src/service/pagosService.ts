export type Pago = {
  id: string;
  nombre: string;
  estado: string;
  prioridad: "Alta" | "Media" | "Baja";
  valor: number;
  fechaVencimiento: string;
};

let pagos: Pago[] = [
  { id: '1', nombre: 'Pago de luz', estado: 'Pendiente', prioridad: 'Alta', valor: 50000, fechaVencimiento: '2025-09-15' },
  { id: '2', nombre: 'Pago de agua',  estado: 'Pagado',     prioridad: 'Media', valor: 30000, fechaVencimiento: '2025-09-10' },
  { id: '3', nombre: 'Pago de internet', estado: 'Pendiente', prioridad: 'Baja', valor: 80000, fechaVencimiento: '2025-09-20' },
  { id: '4', nombre: 'Pago de internet', estado: 'Pendiente', prioridad: 'Alta', valor: 80000, fechaVencimiento: '2025-09-20' },
];


export const getPagos = () => pagos;

export const addPago = (pago: Pago) => {
  pagos.push(pago);
};

export const getPagoById = (id: string) => {
  return pagos.find(p => p.id === id);
};

export const marcarComoPagado = (id: string) => {
  const pago = pagos.find(p => p.id === id);
  if (pago) {
    pago.estado = "Pagado";
  }
};
