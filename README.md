# SistemaDeOrdenesOnline-Back
Backend de sistema de órdenes en linea en nodeJs con express, usando redis y otras herramientas.

## Enunciado del ejercicio

Suponga que usted está trabajando en un cliente que se conecta a un sistema para hacer órdenes en línea. Usted quiere restringir acceso al sistema para que solo los usuarios autenticados puedan crear órdenes. Además, los usuarios que tienen permisos administrativos deben tener acceso total al sistema.

Después de un rato de planeación, usted se da cuenta de que estas verificaciones se deben realizar de forma secuencial. La aplicación intenta autenticar un usuario cuando recibe una solicitud que contiene las credenciales del usuario, sin embargo, si dichas credenciales no son correctas y la autenticación falla, no hay razón para proceder con otras verificaciones.

Durante las siguientes semanas, usted implementa algunas verificaciones adicionales:

1. Alguien le sugiere que no es seguro pasar datos crudos directo al sistema de solicitudes. Así que usted adiciona una validación extra para sanear los datos en la solicitud.
2. Después, alguien nota que el sistema es vulnerable a ataques de ‘fuerza bruta’. Para evitar esto, usted adiciona una verificación que filtra solicitudes fallidas repetidas que vienen de la misma dirección IP.
3. Alguien más sugiere que se podría incrementar la velocidad de respuesta del sistema si se retornan resultados ‘cacheados’ para solicitudes repetidas que contienen los mismos datos. Por lo tanto, usted adiciona otra verificación que deja pasar la solicitud por el sistema solo si no hay una respuesta adecuada cacheada.

Usted debe diseñar el cliente siguiendo los pasos descritos en el enunciado y considerando que es muy probable que a futuro le pidan adicionar nuevas verificaciones o que dichas verificaciones se puedan reutilizar en otros clientes que requieran usar el sistema de órdenes en línea.
