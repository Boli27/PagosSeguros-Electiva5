Este sera el codigo para el proyecto Pagos Seguros, en react native para aplicaciones moviles. Con funcionalidades como:

    - **Registro de pago recurrentes**
    - **Visualizacion de calendario de pagos proximos**
    - **Dashboard de los gastos mensuales, con graficas para identificar los gastos mas grandes**

**Actualizacion 1**

Realizacion de login/register e implementacion de navegacion

**Actualizacion 2**

Realizacion de la screen de home utilizando el service de pagos y componente tales como PagoCard para cada 
item de los pagos, el PagoDetailModal que es la ventana emergente cuando se quiere ver los detalles de un pago, el navbar para reutilizar la navegacion por la app y el TotalBox para el texto informativo de los pagos

**Actualizacion 3**

Se realizo el screen de agregar pago, reutilizando los componentes de input y buttom, el componente de input
fue mejorado para que sea mas adaptable a distintos tipos como ingreo de frechas, numeros y seleccionables.

Tambien se realizo la distribucion de diferentes componentes como la barra de navegacion inferior, el modal de los
detalles de un pago con la capacidad de asignar un pago como "Pagado", las cards de los items de los pagos y un
pago deatils para ubicar diferentes mensajes compuestos por un titulo y un valor

**Actualizacion 4**

Realizacion de historial con una funcion dentro del service para solo consultar pagos ya pagados y reutilizando los componentes de PagoCard, PagoDetailModal y BottomNavBar