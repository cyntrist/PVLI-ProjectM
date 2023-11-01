## **DECISIONES SOBRE LA ARQUITECTURA:**

> - cuatro escenas, una por parte del dia que interpreten cada dia diferente
> - lista de escenarios para moverse
> - sistema de texto independiente
> - player manager
> - móvil como objeto
> - misiones en el player manager

# **ARQUITECTURA DEL JUEGO**

Varias opciones sobre cómo manejar cada día de juego.

Una escena por cada periodo del día, internamente cada una de estas escenas maneja en qué día estás y todo el estado del juego para saber qué mostrar.
Una escena por día, esta escena irá cambiando a lo largo del día para adaptarse al periodo en el que te encuentras.
Nos volvemos locos y hacemos una escena por cada periodo de día y para cada día (no creo que sea una buena idea la verdad pero es una posibilidad).

-	-	-	-	-	-	-	-	-	-	-	-	-

Tenemos mapa modo profesor layton o nos movemos mediante flechitas que se ven en el escenario?
En el primer caso: hacer una escena que sea específicamente el mapa. Varias posibilidades:
Una única escena de mapa para todo el juego, en base a las banderas que utilicemos en el juego para medir el progreso del jugador se cargará el mapa de una manera u otra para mandar al jugador a las escenas que correspondan (por ejemplo un contador del dia en el que estás y saber si mandarte a cafetería del dia 1 o a la del dia 3 p ej).
Una escena de mapa por día (quizás es un poco pochillo aunque sea más fácil).
En ambos casos la escena de mapa con condiciones internas que se encargan de dejarte ir a unos sitios u otros dependiendo del momento del día en el que te encuentres (básicamente el mismo sistema que la división por días del primer caso pero para los momentos del día).	
En el caso de las flechitas quizás esto se podría complicar por tener que estar mucho más pendientes para acordarse de donde va cada flecha (por ejemplo acordarse de que en el escenario “x” la flecha que va a la derecha lleva al escenario “y” y asegurarse de que durante todo el juego eso se cumple, básicamente asegurarse de que el espacio del juego es coherente), pero por otra parte sería más fácil de implementar en el sentido de que no hay escribir en código condiciones que establecen a qué escena mandarte como en el caso del mapa.

-	-	-	-	-	-	-	-	-	-	-	-	-

El sistema de diálogo debe ser completamente independiente de la arquitectura de las escenas. Se puede hacer algo que simplemente le pasas todo el texto que quieres que tenga el diálogo y te lo muestre. Puede también manejar las expresiones de los personajes.

-	-	-	-	-	-	-	-	-	-	-	-	-

Es necesario un player manager que te almacene todo el estado del jugador, su relación con cada personaje, día y hora en la que está, inventario, estado de cada flag, etc. Interactúa directamente con el sistema de diálogo ya que este cambiará parámetros del player manager dependiendo de las decisiones que tomes. 

Si se quiere hacer un sistema de guardado de partida esto podría escribir en un txt todos los datos que almacena y si montamos bien el juego, al iniciarse y cargar datos de guardado se leería del txt y el juego se pondría en el estado correcto.

-	-	-	-	-	-	-	-	-	-	-	-	-

Quizás un mission manager o que su función esté implementada en el player manager. Lleva la cuenta de que misiones están completadas o no, cuales están disponibles, otorgar las recompensas. 

(Yo diría de meterlo dentro del player manager para tener todas las flags juntas y ordenadas pero como veais)

-	-	-	-	-	-	-	-	-	-	-	-	-

Tema móvil: dependiendo de lo que elijas hacer con el móvil se te lleva a una escena u otra.

-	-	-	-	-	-	-	-	-	-	-	-	-

Los minijuegos cada uno a su bola en su escena, sólo interactuando con todo lo demás para las recompensas de xp.

-	-	-	-	-	-	-	-	-	-	-	-	-


>>> delilah brujita; matthew esqueleto; richard cientifico loco; camille vampiresa


no tengo ni idea de si se me está olvidando algún sistema del juego, es posible
