Este sera el codigo para el proyecto Pagos Seguros, en react native para aplicaciones moviles. Con funcionalidades como:

    - **Registro de pago recurrentes**
    - **Visualizacion de calendario de pagos proximos**
    - **Dashboard de los gastos mensuales, con graficas para identificar los gastos mas grandes**

**Actualizacion 1**

Realizacion de login/register e implementacion de navegacion

**Actualizacion 3**

Se realizo el screen de agregar pago, reutilizando los componentes de input y buttom, el componente de input
fue mejorado para que sea mas adaptable a distintos tipos como ingreo de frechas, numeros y seleccionables.

Tambien se realizo la distribucion de diferentes componentes como la barra de navegacion inferior, el modal de los
detalles de un pago con la capacidad de asignar un pago como "Pagado", las cards de los items de los pagos y un
pago deatils para ubicar diferentes mensajes compuestos por un titulo y un valor

Cambios por Angie Minota (Historial de Pagos)
### 🟩 Historial de Pagos
- Creación completa de **HistorialPagosScreen**  
- Implementación de lista dinámica con datos del servicio  
- Modal de detalles con opción de marcar como pagado  
- Ajustes en la navegación  
- Integración completa con `pagosService.ts`  

---

## 🧑‍💻 Autores
- **Juan Diego Eraso Muñoz**  
- **Jaime Santiago Salazar Gil**  
- **Angie Nicol Hurtado Minota (Angie Minota)**  

---

## 📂 Estructura del Proyecto

/components
BottomNavBar.tsx
CustomInput.tsx
PagoCard.tsx
PagoDetailsModal.tsx
PrimaryButton.tsx
TotalBox.tsx

/navigation
AppNavigator.tsx
types.ts

/screens
AddPagoScreen.tsx
LoginScreen.tsx
RegisterScreen.tsx
MisPagosScreen.tsx
HistorialPagosScreen.tsx
ResumenPagosScreen.tsx
PerfilUsuarioScreen.tsx

/service
authService.ts
pagosService.ts


---

## 🛠️ Tecnologías Utilizadas
- React Native (Expo)
- TypeScript
- React Navigation
- react-native-chart-kit
- Expo Icons
- Servicios y componentes reutilizables


