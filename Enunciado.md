# Final

Un club necesita generar la cuota del mes corriente para todos sus socios.

Los socios se registran en base a los siguientes campos:
- Nombre.
- Apellido.
- Tipo de Documento(Dni/Cuit).
- Numero de Documento/Cuit.
- Telefono.
- Email.

La cuota debera registrar:
- monto a pagar
- fecha de vencimiento
- fecha de cuando se realizó el pago
- el nombre del deudor (socio) 
- el estado el cual puede ser paga o impaga.


Luego de generar la cuota, la misma podra ser abonada, por lo tanto es necesario un endpoint que marque dicha cuota como paga/impaga con su respectivo monto.

Pasada la fecha de vencimiento, se agregara un 10% extra a la misma.
Ademas, es esencial poder ver una lista filtrada de socios que pagaron la cuota y cuales no.

## Requisitos

- Utilizar Typescript.
- Tipar cada modelo.
- Realizar el ejercicio en base a la estructura propuesta en clase, utilizando API Rest.
- Utilizar query params para filtrar por estado de cuota.
- Codigo prolijo.

