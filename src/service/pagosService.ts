export type Pago = {
  id: string;
  nombre: string;
  estado: string; // "Pagado" | "Pendiente"
  prioridad: "Alta" | "Media" | "Baja";
  valor: number;
  fechaVencimiento: string; // yyyy-mm-dd
};

let pagos: Pago[] = [
  { id: "1", nombre: "Pago de luz", estado: "Pendiente", prioridad: "Alta", valor: 50000, fechaVencimiento: "2025-09-15" },
  { id: "2", nombre: "Pago de agua", estado: "Pagado", prioridad: "Media", valor: 30000, fechaVencimiento: "2025-09-10" },
  { id: "3", nombre: "Pago de internet", estado: "Pendiente", prioridad: "Baja", valor: 80000, fechaVencimiento: "2025-09-20" },
  { id: "4", nombre: "Pago de internet", estado: "Pendiente", prioridad: "Alta", valor: 80000, fechaVencimiento: "2025-09-20" },
];

export const getPagos = (): Pago[] => {
  return [...pagos];
};

export const addPago = (pago: Pago) => {
  pagos.push(pago);
};

export const getPagoById = (id: string) => {
  return pagos.find((p) => p.id === id) ?? null;
};

export const marcarComoPagado = (id: string) => {
  const pago = pagos.find((p) => p.id === id);
  if (pago) {
    pago.estado = "Pagado";
  }
};

export const getPagosPagados = (): Pago[] => {
  return getPagos().filter((p) => p.estado === "Pagado");
};

export const getPagosPendientes = (): Pago[] => {
  return getPagos().filter((p) => p.estado !== "Pagado");
};

export const calcularTotal = (lista: Pago[]): number => {
  return lista.reduce((acc, p) => acc + (p.valor ?? 0), 0);
};

export const resumenPorCategoria = (): { labels: string[]; values: number[] } => {
  const map: Record<string, number> = {};
  getPagos().forEach((p) => {
    const key = p.nombre ?? "Otros";
    map[key] = (map[key] ?? 0) + (p.valor ?? 0);
  });
  const labels = Object.keys(map);
  const values = Object.values(map);
  return { labels, values };
};

export const categoriaMayorGasto = (): string | null => {
  const { labels, values } = resumenPorCategoria();
  if (!labels.length) return null;
  const max = Math.max(...values);
  const idx = values.indexOf(max);
  return labels[idx] ?? null;
};

export const setAllPagos = (nuevos: Pago[]) => {
  pagos = [...nuevos];
};
