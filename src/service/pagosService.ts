export type Pago = {
  id: string;
  nombre: string;
  estado: string;
  prioridad: "Alta" | "Media" | "Baja";
  valor: number;
  fechaVencimiento: string;
};

let pagos: Pago[] = [
  { id: '1', nombre: 'Pago de luz', estado: 'Pendiente', prioridad: 'Alta', valor: 50000, fechaVencimiento: '2025-11-15' },
  { id: '2', nombre: 'Pago de agua',  estado: 'Pagado',     prioridad: 'Media', valor: 30000, fechaVencimiento: '2025-11-10' },
  { id: '3', nombre: 'Pago de internet', estado: 'Pendiente', prioridad: 'Baja', valor: 80000, fechaVencimiento: '2025-11-20' },
  { id: '4', nombre: 'Pago del gas', estado: 'Pendiente', prioridad: 'Alta', valor: 80000, fechaVencimiento: '2025-11-20' },
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

//Contenido del historial
export const getPagosPagados = () => {
  return pagos.filter(p => p.estado === "Pagado");
};


//Contenido de las graficas

// obtener mes en formato 1-12
const getMes = (fecha: string) => {
  return new Date(fecha).getMonth() + 1;
};

//Obtener los pagos de cierto mes
export const getPagosPorMes = (mes: number) => {
  return pagos.filter(p => getMes(p.fechaVencimiento) === mes);
};

// Pendientes del mes
export const getPendientesDelMes = (mes: number) => {
  return pagos.filter(p => p.estado === "Pendiente" && getMes(p.fechaVencimiento) === mes);
};

// Pagados del mes
export const getPagosPagadosDelMes = (mes: number) => {
  return pagos.filter(p => p.estado === "Pagado" && getMes(p.fechaVencimiento) === mes);
};

// Totales del mes (pendientes + pagados)
export const getTotalDelMes = (mes: number) => {
  return getPagosPorMes(mes);
};

export const getResumenDelMes = (mes: number) => {
  const pagosMes = pagos.filter(p => getMes(p.fechaVencimiento) === mes);

  const pagados = pagosMes.filter(p => p.estado === "Pagado");
  const pendientes = pagosMes.filter(p => p.estado === "Pendiente");

  return {
    totalPagado: pagados.reduce((acc, p) => acc + p.valor, 0),
    totalPendiente: pendientes.reduce((acc, p) => acc + p.valor, 0),
    cantidadPagados: pagados.length,
    cantidadTotal: pagosMes.length,
  };
};
