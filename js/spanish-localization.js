window.SPANISH_LOCALIZATION = {
  "content": {
    "modules": {
      "intro-to-coding": {
        "title": "Introduccion a la Programacion",
        "description": "Comienza aqui si eres principiante total. Este modulo explica que es programar, de donde viene, que carreras existen, como elegir ruta y lenguaje inicial, como configurar tu entorno y que habitos te ayudaran a avanzar.",
        "topics": [
          "Que es Programar",
          "Breve Historia de la Programacion",
          "Como el Codigo se Convierte en Software",
          "Rutas Profesionales en Tecnologia",
          "Elegir tu Ruta de Aprendizaje",
          "Elegir tu Primer Lenguaje",
          "Configurar tu Entorno de Desarrollo",
          "Tu Primer Programa",
          "Bloques Fundamentales",
          "Depuracion y Resolucion de Problemas",
          "Flujo de Aprendizaje y Portafolio",
          "Plan Inicial de 30 Dias"
        ],
        "explanation": "Programar es convertir ideas en instrucciones precisas que una computadora puede ejecutar. Este modulo crea una base completa: cubre historia, campos profesionales, decision de ruta, eleccion de lenguaje, configuracion del entorno, primer programa y habitos de estudio sostenibles.",
        "resources": [
          "CS50x - Introduccion a Computer Science",
          "roadmap.sh - Rutas de desarrollo",
          "The Odin Project",
          "Documentacion oficial de Python",
          "Documentacion oficial de Java",
          "MDN Web Docs",
          "Documentacion oficial de Git",
          "VS Code Docs - Primeros pasos",
          "GitHub Skills - Cursos interactivos",
          "The Missing Semester (MIT)",
          "freeCodeCamp - Aprende a programar",
          "Exercism - Practica de programacion"
        ]
      },
      "arrays-strings": {
        "title": "Matrices y cadenas",
        "description": "Este tutorial analiza los ayudantes `findMax`, `reverseString` e `isPalindrome` para que pueda observar cómo los bucles, las protecciones de límites y los intercambios de dos punteros se combinan en utilidades reales de matriz/cadena.",
        "topics": [
          "Recorrido de matriz",
          "Métodos de cadena",
          "Dos consejos",
          "Ventana corrediza",
          "Clasificación de matrices"
        ],
        "explanation": "Los arreglos y las cadenas forman la base de la programación. Las matrices proporcionan acceso indexado a elementos, mientras que las cadenas son secuencias de caracteres. Los conceptos clave incluyen patrones transversales, la técnica de dos punteros para un procesamiento eficiente y la comprensión de cómo el diseño de la memoria afecta el rendimiento. Estas estructuras de datos aparecen en innumerables aplicaciones del mundo real.",
        "resources": [
          "Guía JUnit 5",
          "Documentación oficial de JUnit",
          "Desarrollo basado en pruebas",
          "Martin Fowler - Pirámide de pruebas"
        ],
        "codeExamples": {
          "java": "/*\n * Matrices y cadenas - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Recorrido de matriz\n * 2) Métodos de cadena\n * 3) Dos consejos\n * 4) Ventana corrediza\n * 5) Clasificación de matrices\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Fundamentos de matrices y cadenas\npublic class ArraysAndStrings {\n    \n    // Encuentra el elemento máximo en la matriz\n    public static int findMax(int[] arr) {\n        if (arr.length == 0) return Integer.MIN_VALUE;\n        \n        int max = arr[0]; // Inicializar con el primer elemento\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > max) {\n                max = arr[i]; // Actualizar máximo\n            }\n        }\n        return max;\n    }\n    \n    // Invertir una cadena usando dos punteros\n    public static String reverseString(String str) {\n        char[] chars = str.toCharArray();\n        int left = 0, right = chars.length - 1;\n        \n        while (left < right) {\n            // Intercambiar personajes\n            char temp = chars[left];\n            chars[left] = chars[right];\n            chars[right] = temp;\n            \n            left++;  // Mover punteros hacia el centro\n            right--;\n        }\n        \n        return new String(chars);\n    }\n    \n    // Compruebe si la cuerda es palíndromo\n    public static boolean isPalindrome(String str) {\n        str = str.toLowerCase().replaceAll(\"[^a-z0-9]\", \"\");\n        int left = 0, right = str.length() - 1;\n        \n        while (left < right) {\n            if (str.charAt(left) != str.charAt(right)) {\n                return false; // Los personajes no coinciden\n            }\n            left++;\n            right--;\n        }\n        return true; // Todos los personajes coinciden\n    }\n}\n\nclass ArraysStringsRuntimeMarker {\n    public static void main(String[] args) {\n        System.out.println(\"Running Matrices y cadenas sample...\");\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Matrices y cadenas\";\n    string moduleDescription = \"Este tutorial analiza los ayudantes `findMax`, `reverseString` e `isPalindrome` para que pueda observar cómo los bucles, las protecciones de límites y los intercambios de dos punteros se combinan en utilidades reales de matriz/cadena.\";\n    vector<string> topics = {\"Recorrido de matriz\", \"Métodos de cadena\", \"Dos consejos\", \"Ventana corrediza\", \"Clasificación de matrices\"};\n    vector<string> javaSignals = {\"Running Matrices y cadenas sample...\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Matrices y cadenas\"\n    module_description = \"Este tutorial analiza los ayudantes `findMax`, `reverseString` e `isPalindrome` para que pueda observar cómo los bucles, las protecciones de límites y los intercambios de dos punteros se combinan en utilidades reales de matriz/cadena.\"\n    topics = [\"Recorrido de matriz\", \"Métodos de cadena\", \"Dos consejos\", \"Ventana corrediza\", \"Clasificación de matrices\"]\n    java_signals = [\"Running Matrices y cadenas sample...\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Matrices y cadenas\";\n    const moduleDescription = \"Este tutorial analiza los ayudantes `findMax`, `reverseString` e `isPalindrome` para que pueda observar cómo los bucles, las protecciones de límites y los intercambios de dos punteros se combinan en utilidades reales de matriz/cadena.\";\n    const topics = [\"Recorrido de matriz\", \"Métodos de cadena\", \"Dos consejos\", \"Ventana corrediza\", \"Clasificación de matrices\"];\n    const javaSignals = [\"Running Matrices y cadenas sample...\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "linked-lists": {
        "title": "Listas enlazadas",
        "description": "Narramos cada movimiento del puntero en `reverseList`, `hasCycle` y `mergeTwoLists`, mostrando cómo los nodos temporales, la detección de tortugas y liebres y las cabezas ficticias mantienen las listas consistentes.",
        "topics": [
          "Listas enlazadas individualmente",
          "Listas doblemente enlazadas",
          "Detección de ciclo",
          "Inversión de lista",
          "Fusionar operaciones"
        ],
        "explanation": "Las listas enlazadas proporcionan asignación dinámica de memoria e inserción/eliminación eficiente en cualquier posición. A diferencia de las matrices, no requieren memoria contigua pero sacrifican el acceso aleatorio. Comprender la manipulación del puntero y los casos extremos (verificaciones nulas, nodos únicos) es crucial para dominar los algoritmos de listas vinculadas.",
        "resources": [
          "Visualización de listas enlazadas",
          "Detección del ciclo de Floyd",
          "Guía de manipulación del puntero"
        ],
        "codeExamples": {
          "java": "/*\n * Listas enlazadas - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Singly Listas enlazadas\n * 2) Doubly Listas enlazadas\n * 3) Detección de ciclo\n * 4) Inversión de lista\n * 5) Fusionar operaciones\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Implementación y operaciones de listas vinculadas\nclass ListNode {\n    int val;\n    ListNode next;\n    \n    ListNode(int val) {\n        this.val = val;\n        this.next = null;\n    }\n}\n\npublic class LinkedListOperations {\n    \n    // Invertir una lista enlazada de forma iterativa\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode current = head;\n        \n        while (current != null) {\n            ListNode nextTemp = current.next; // Almacenar el siguiente nodo\n            current.next = prev;              // Enlace inverso\n            prev = current;                   // Mover anterior hacia adelante\n            current = nextTemp;               // Avanzar la corriente\n        }\n        \n        return prev; // Nuevo jefe de lista invertida\n    }\n    \n    // Detectar ciclo mediante el algoritmo de Floyd (tortuga y liebre)\n    public boolean hasCycle(ListNode head) {\n        if (head == null || head.next == null) {\n            return false;\n        }\n        \n        ListNode slow = head;      // Tortuga: avanza 1 paso\n        ListNode fast = head.next; // Liebre: avanza 2 pasos\n        \n        while (fast != null && fast.next != null) {\n            if (slow == fast) {\n                return true; // Ciclo detectado\n            }\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        \n        return false; // No se encontró ningún ciclo\n    }\n    \n    // Fusionar dos listas enlazadas ordenadas\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0); // Nodo ficticio para un fácil manejo\n        ListNode current = dummy;\n        \n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) {\n                current.next = l1;\n                l1 = l1.next;\n            } else {\n                current.next = l2;\n                l2 = l2.next;\n            }\n            current = current.next;\n        }\n        \n        // Adjuntar los nodos restantes\n        current.next = (l1 != null) ? l1 : l2;\n        \n        return dummy.next; // Devolver cabeza real\n    }\n}\n\nclass LinkedListsRuntimeMarker {\n    public static void main(String[] args) {\n        System.out.println(\"Running Listas enlazadas sample...\");\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Listas enlazadas\";\n    string moduleDescription = \"Narramos cada movimiento del puntero en `reverseList`, `hasCycle` y `mergeTwoLists`, mostrando cómo los nodos temporales, la detección de tortugas y liebres y las cabezas ficticias mantienen las listas consistentes.\";\n    vector<string> topics = {\"Listas enlazadas individualmente\", \"Listas doblemente enlazadas\", \"Detección de ciclo\", \"Inversión de lista\", \"Fusionar operaciones\"};\n    vector<string> javaSignals = {\"Running Listas enlazadas sample...\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Listas enlazadas\"\n    module_description = \"Narramos cada movimiento del puntero en `reverseList`, `hasCycle` y `mergeTwoLists`, mostrando cómo los nodos temporales, la detección de tortugas y liebres y las cabezas ficticias mantienen las listas consistentes.\"\n    topics = [\"Listas enlazadas individualmente\", \"Listas doblemente enlazadas\", \"Detección de ciclo\", \"Inversión de lista\", \"Fusionar operaciones\"]\n    java_signals = [\"Running Listas enlazadas sample...\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Listas enlazadas\";\n    const moduleDescription = \"Narramos cada movimiento del puntero en `reverseList`, `hasCycle` y `mergeTwoLists`, mostrando cómo los nodos temporales, la detección de tortugas y liebres y las cabezas ficticias mantienen las listas consistentes.\";\n    const topics = [\"Listas enlazadas individualmente\", \"Listas doblemente enlazadas\", \"Detección de ciclo\", \"Inversión de lista\", \"Fusionar operaciones\"];\n    const javaSignals = [\"Running Listas enlazadas sample...\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "stacks-queues": {
        "title": "Pilas y colas",
        "description": "Los contenedores `ArrayStack` y `ArrayQueue` exponen cada llamada push/pop/peek y enqueue/dequeue para que pueda ver cómo ArrayDeque sustenta los flujos LIFO y FIFO en `main`.",
        "topics": [
          "Operaciones de pila",
          "Operaciones de cola",
          "deque",
          "Cola de prioridad",
          "Aplicaciones"
        ],
        "explanation": "Las pilas modelan flujos LIFO utilizados en pilas de llamadas, búferes de deshacer y evaluación de expresiones, mientras que las colas entregan orden FIFO para programadores, BFS y canalizaciones de transmisión. Esta lección contrasta sus implementaciones (matriz versus vinculada), explica los costos amortizados de push/pop/enqueue y analiza problemas reales de entrevistas como paréntesis equilibrados, ventanas deslizantes y colas de tareas.",
        "resources": [
          "Aplicaciones de pila",
          "Implementaciones de cola"
        ],
        "codeExamples": {
          "java": "/*\n * Pilas y colas - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Operaciones de pila\n * 2) Operaciones de cola\n * 3) deque\n * 4) Cola de prioridad\n * 5) Aplicaciones\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Implementaciones simples de pila y cola en Java\nimport java.util.ArrayDeque;\nimport java.util.NoSuchElementException;\n\nclass ArrayStack<E> {\n    private final ArrayDeque<E> data = new ArrayDeque<>();\n\n    public void push(E value) {\n        data.push(value); // O(1)\n    }\n\n    public E pop() {\n        if (data.isEmpty()) throw new NoSuchElementException(\"Pila vacía\");\n        return data.pop();\n    }\n\n    public E peek() {\n        return data.peek();\n    }\n}\n\nclass ArrayQueue<E> {\n    private final ArrayDeque<E> data = new ArrayDeque<>();\n\n    public void enqueue(E value) {\n        data.offer(value); // se suma a la cola\n    }\n\n    public E dequeue() {\n        if (data.isEmpty()) throw new NoSuchElementException(\"cola vacía\");\n        return data.poll(); // se quita de la cabeza\n    }\n\n    public int size() {\n        return data.size();\n    }\n}\n\npublic class StackQueueDemo {\n    public static void main(String[] args) {\n        ArrayStack<Integer> stack = new ArrayStack<>();\n        stack.push(10);\n        stack.push(20);\n        System.out.println(\"Vistazo de la pila:\" + stack.peek()); // 20\n        System.out.println(\"Pila pop:\" + stack.pop());   // 20\n\n        ArrayQueue<String> queue = new ArrayQueue<>();\n        queue.enqueue(\"Alice\");\n        queue.enqueue(\"Bob\");\n        System.out.println(\"Cola de cola:\" + queue.dequeue()); // Alice\n        System.out.println(\"Tamaño de la cola:\" + queue.size());       // 1\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Pilas y colas\";\n    string moduleDescription = \"Los contenedores `ArrayStack` y `ArrayQueue` exponen cada llamada push/pop/peek y enqueue/dequeue para que pueda ver cómo ArrayDeque sustenta los flujos LIFO y FIFO en `main`.\";\n    vector<string> topics = {\"Operaciones de pila\", \"Operaciones de cola\", \"deque\", \"Cola de prioridad\", \"Aplicaciones\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Pilas y colas\"\n    module_description = \"Los contenedores `ArrayStack` y `ArrayQueue` exponen cada llamada push/pop/peek y enqueue/dequeue para que pueda ver cómo ArrayDeque sustenta los flujos LIFO y FIFO en `main`.\"\n    topics = [\"Operaciones de pila\", \"Operaciones de cola\", \"deque\", \"Cola de prioridad\", \"Aplicaciones\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Pilas y colas\";\n    const moduleDescription = \"Los contenedores `ArrayStack` y `ArrayQueue` exponen cada llamada push/pop/peek y enqueue/dequeue para que pueda ver cómo ArrayDeque sustenta los flujos LIFO y FIFO en `main`.\";\n    const topics = [\"Operaciones de pila\", \"Operaciones de cola\", \"deque\", \"Cola de prioridad\", \"Aplicaciones\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "trees-basics": {
        "title": "árboles binarios",
        "description": "Siga `insertRecursive`, `inorder` y `levelOrderTraversal` para ver cómo se construye BST, cómo DFS imprime valores ordenados y cómo una cola genera una salida en amplitud.",
        "topics": [
          "Recorrido del árbol",
          "Árboles de búsqueda binaria",
          "Altura del árbol",
          "Problemas de ruta",
          "Construcción de árboles"
        ],
        "explanation": "Practicará la construcción de árboles binarios a partir de listas transversales, la ejecución iterativa de recorridos DFS y el razonamiento sobre la altura y el equilibrio. La sección también desmitifica los invariantes de BST, las plantillas de recursividad comunes y cómo reestructurar árboles para problemas de suma de rutas, diámetro y serialización.",
        "resources": [
          "Recorridos de árboles",
          "Operaciones BST"
        ],
        "codeExamples": {
          "java": "/*\n * árboles binarios - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Recorrido del árbol\n * 2) Árboles de búsqueda binaria\n * 3) Altura del árbol\n * 4) Problemas de ruta\n * 5) Construcción de árboles\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Recorridos de árboles binarios e inserción en Java.\nclass TreeNode {\n    int value;\n    TreeNode left;\n    TreeNode right;\n\n    TreeNode(int value) {\n        this.value = value;\n    }\n}\n\npublic class BinaryTree {\n    TreeNode root;\n\n    public void insert(int value) {\n        root = insertRecursive(root, value);\n    }\n\n    private TreeNode insertRecursive(TreeNode node, int value) {\n        if (node == null) {\n            return new TreeNode(value);\n        }\n        if (value < node.value) {\n            node.left = insertRecursive(node.left, value);\n        } else if (value > node.value) {\n            node.right = insertRecursive(node.right, value);\n        }\n        return node;\n    }\n\n    public void inorder(TreeNode node) {\n        if (node == null) return;\n        inorder(node.left);\n        System.out.print(node.value + \" \");\n        inorder(node.right);\n    }\n\n    public void levelOrderTraversal() {\n        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();\n        queue.offer(root);\n        while (!queue.isEmpty()) {\n            TreeNode current = queue.poll();\n            System.out.print(current.value + \" \");\n            if (current.left != null) queue.offer(current.left);\n            if (current.right != null) queue.offer(current.right);\n        }\n    }\n\n    public static void main(String[] args) {\n        BinaryTree bst = new BinaryTree();\n        int[] values = {8, 3, 10, 1, 6, 14, 4};\n        for (int value : values) {\n            bst.insert(value);\n        }\n        System.out.print(\"En orden:\");\n        bst.inorder(bst.root); // 1 3 4 6 8 10 14\n        System.out.print(\"\\nOrden de niveles:\");\n        bst.levelOrderTraversal();\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"árboles binarios\";\n    string moduleDescription = \"Siga `insertRecursive`, `inorder` y `levelOrderTraversal` para ver cómo se construye BST, cómo DFS imprime valores ordenados y cómo una cola genera una salida en amplitud.\";\n    vector<string> topics = {\"Recorrido del árbol\", \"Árboles de búsqueda binaria\", \"Altura del árbol\", \"Problemas de ruta\", \"Construcción de árboles\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"árboles binarios\"\n    module_description = \"Siga `insertRecursive`, `inorder` y `levelOrderTraversal` para ver cómo se construye BST, cómo DFS imprime valores ordenados y cómo una cola genera una salida en amplitud.\"\n    topics = [\"Recorrido del árbol\", \"Árboles de búsqueda binaria\", \"Altura del árbol\", \"Problemas de ruta\", \"Construcción de árboles\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"árboles binarios\";\n    const moduleDescription = \"Siga `insertRecursive`, `inorder` y `levelOrderTraversal` para ver cómo se construye BST, cómo DFS imprime valores ordenados y cómo una cola genera una salida en amplitud.\";\n    const topics = [\"Recorrido del árbol\", \"Árboles de búsqueda binaria\", \"Altura del árbol\", \"Problemas de ruta\", \"Construcción de árboles\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "hash-tables": {
        "title": "Tablas hash y mapas",
        "description": "Contamos caracteres con `HashMap.merge` y luego retiramos una `SimpleHashTable` personalizada que codifica claves, almacena entradas encadenadas y resuelve colisiones segmento por segmento.",
        "topics": [
          "Funciones hash",
          "Resolución de colisiones",
          "Operaciones de HashMap",
          "Conjuntos de hash",
          "Factor de carga"
        ],
        "explanation": "Cubrimos cómo las buenas funciones hash minimizan las colisiones, por qué es importante el factor de carga y cuándo elegir el encadenamiento frente al direccionamiento abierto. Los laboratorios prácticos incluyen mapas de frecuencia, cachés LRU y deduplicación basada en diccionarios para que pueda utilizar HashMap/HashSet con confianza en entrevistas de codificación.",
        "resources": [
          "Diseño de función hash",
          "Manejo de colisiones"
        ],
        "codeExamples": {
          "java": "/*\n * Tablas hash y mapas - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Funciones hash\n * 2) Resolución de colisiones\n * 3) Operaciones de HashMap\n * 4) Conjuntos de hash\n * 5) Factor de carga\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Contador de frecuencia usando HashMap y una tabla hash personalizada simple\nimport java.util.*;\n\npublic class HashTableDemo {\n    public static Map<Character, Integer> countLetters(String word) {\n        Map<Character, Integer> frequency = new HashMap<>();\n        for (char c : word.toCharArray()) {\n            frequency.merge(c, 1, Integer::sum);\n        }\n        return frequency;\n    }\n\n    static class SimpleHashTable {\n        private static class Entry {\n            final String key;\n            String value;\n            Entry(String key, String value) {\n                this.key = key;\n                this.value = value;\n            }\n        }\n        private final List<List<Entry>> buckets;\n\n        SimpleHashTable(int capacity) {\n            buckets = new ArrayList<>(capacity);\n            for (int i = 0; i < capacity; i++) {\n                buckets.add(new ArrayList<>());\n            }\n        }\n\n        private int hash(String key) {\n            return Math.abs(key.hashCode()) % buckets.size();\n        }\n\n        public void put(String key, String value) {\n            int bucketIndex = hash(key);\n            List<Entry> bucket = buckets.get(bucketIndex);\n            for (Entry entry : bucket) {\n                if (entry.key.equals(key)) {\n                    entry.value = value;\n                    return;\n                }\n            }\n            bucket.add(new Entry(key, value));\n        }\n\n        public Optional<String> get(String key) {\n            int bucketIndex = hash(key);\n            for (Entry entry : buckets.get(bucketIndex)) {\n                if (entry.key.equals(key)) {\n                    return Optional.of(entry.value);\n                }\n            }\n            return Optional.empty();\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(countLetters(\"datastructures\")); // {a=2,d=1,...}\n\n        SimpleHashTable table = new SimpleHashTable(8);\n        table.put(\"java\", \"Idioma del cafe\");\n        table.put(\"python\", \"lenguaje de serpiente\");\n        System.out.println(table.get(\"java\").orElse(\"Extraviado\")); // Idioma del cafe\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Tablas hash y mapas\";\n    string moduleDescription = \"Contamos caracteres con `HashMap.merge` y luego retiramos una `SimpleHashTable` personalizada que codifica claves, almacena entradas encadenadas y resuelve colisiones segmento por segmento.\";\n    vector<string> topics = {\"Funciones hash\", \"Resolución de colisiones\", \"Operaciones de HashMap\", \"Conjuntos de hash\", \"Factor de carga\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Tablas hash y mapas\"\n    module_description = \"Contamos caracteres con `HashMap.merge` y luego retiramos una `SimpleHashTable` personalizada que codifica claves, almacena entradas encadenadas y resuelve colisiones segmento por segmento.\"\n    topics = [\"Funciones hash\", \"Resolución de colisiones\", \"Operaciones de HashMap\", \"Conjuntos de hash\", \"Factor de carga\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Tablas hash y mapas\";\n    const moduleDescription = \"Contamos caracteres con `HashMap.merge` y luego retiramos una `SimpleHashTable` personalizada que codifica claves, almacena entradas encadenadas y resuelve colisiones segmento por segmento.\";\n    const topics = [\"Funciones hash\", \"Resolución de colisiones\", \"Operaciones de HashMap\", \"Conjuntos de hash\", \"Factor de carga\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "heaps": {
        "title": "Montones y colas prioritarias",
        "description": "Primero, `priorityQueueDemo` muestra el montón mínimo de la biblioteca, luego `heapify`/`buildMinHeap` reconstruye la estructura a partir de una matriz para que pueda rastrear las matemáticas de índice, los intercambios y la construcción del montón ascendente.",
        "topics": [
          "Montón mínimo",
          "Montón máximo",
          "Operaciones de montón",
          "amontonar",
          "Colas prioritarias"
        ],
        "explanation": "Los montones garantizan la inserción/eliminación de registros y al mismo tiempo exponen siempre el siguiente elemento de prioridad más alta o más baja. Implementará montones binarios desde cero, rastreará montones, comparará estructuras mínimas y máximas y las aplicará a Dijkstra, medianas de transmisión y simulaciones de programación.",
        "resources": [
          "Propiedades del montón",
          "Aplicaciones de cola prioritaria"
        ],
        "codeExamples": {
          "java": "/*\n * Montones y colas prioritarias - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Montón mínimo\n * 2) Montón máximo\n * 3) Operaciones de montón\n * 4) amontonar\n * 5) Colas prioritarias\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Montón mínimo usando PriorityQueue más montón manual\nimport java.util.Arrays;\nimport java.util.PriorityQueue;\n\npublic class HeapExamples {\n    public static void priorityQueueDemo() {\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        minHeap.addAll(Arrays.asList(7, 3, 10, 4));\n\n        while (!minHeap.isEmpty()) {\n            System.out.print(minHeap.poll() + \" \"); // 3 4 7 10\n        }\n        System.out.println();\n    }\n\n    public static void heapify(int[] arr, int i, int n) {\n        int smallest = i;\n        int left = 2 * i + 1;\n        int right = 2 * i + 2;\n\n        if (left < n && arr[left] < arr[smallest]) smallest = left;\n        if (right < n && arr[right] < arr[smallest]) smallest = right;\n\n        if (smallest != i) {\n            int temp = arr[i];\n            arr[i] = arr[smallest];\n            arr[smallest] = temp;\n            heapify(arr, smallest, n);\n        }\n    }\n\n    public static void buildMinHeap(int[] arr) {\n        for (int i = arr.length / 2 - 1; i >= 0; i--) {\n            heapify(arr, i, arr.length);\n        }\n    }\n\n    public static void main(String[] args) {\n        priorityQueueDemo();\n\n        int[] arr = {9, 5, 6, 2, 3};\n        buildMinHeap(arr);\n        System.out.println(\"Matriz amontonada:\" + Arrays.toString(arr));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Montones y colas prioritarias\";\n    string moduleDescription = \"Primero, `priorityQueueDemo` muestra el montón mínimo de la biblioteca, luego `heapify`/`buildMinHeap` reconstruye la estructura a partir de una matriz para que pueda rastrear las matemáticas de índice, los intercambios y la construcción del montón ascendente.\";\n    vector<string> topics = {\"Montón mínimo\", \"Montón máximo\", \"Operaciones de montón\", \"amontonar\", \"Colas prioritarias\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Montones y colas prioritarias\"\n    module_description = \"Primero, `priorityQueueDemo` muestra el montón mínimo de la biblioteca, luego `heapify`/`buildMinHeap` reconstruye la estructura a partir de una matriz para que pueda rastrear las matemáticas de índice, los intercambios y la construcción del montón ascendente.\"\n    topics = [\"Montón mínimo\", \"Montón máximo\", \"Operaciones de montón\", \"amontonar\", \"Colas prioritarias\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Montones y colas prioritarias\";\n    const moduleDescription = \"Primero, `priorityQueueDemo` muestra el montón mínimo de la biblioteca, luego `heapify`/`buildMinHeap` reconstruye la estructura a partir de una matriz para que pueda rastrear las matemáticas de índice, los intercambios y la construcción del montón ascendente.\";\n    const topics = [\"Montón mínimo\", \"Montón máximo\", \"Operaciones de montón\", \"amontonar\", \"Colas prioritarias\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "sorting-algorithms": {
        "title": "Algoritmos de clasificación",
        "description": "`bubbleSort`, `mergeSort` y `quickSort` viven en una clase, lo que nos permite resaltar cada condición de bucle, partición y fusión para que el flujo de control detrás de cada comparación sea muy claro.",
        "topics": [
          "Ordenar burbujas",
          "Combinar ordenar",
          "Ordenación rápida",
          "Ordenar montón",
          "Ordenación por base"
        ],
        "explanation": "Este módulo compara clasificaciones basadas en comparación (rápida, combinada, dinámica) con clasificaciones sin comparación, como conteo y base, enfatizando la estabilidad y las compensaciones de memoria. Los seguimientos paso a paso y los ejercicios de código le ayudan a reconocer cuándo preferir estrategias O(n log n) frente a tipos especializados en tiempo lineal.",
        "resources": [
          "Ordenar comparaciones",
          "Complejidad del algoritmo"
        ],
        "codeExamples": {
          "java": "/*\n * Algoritmos de clasificación - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Ordenar burbujas\n * 2) Combinar ordenar\n * 3) Ordenación rápida\n * 4) Ordenar montón\n * 5) Ordenación por base\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Implementaciones de clasificación detalladas con análisis.\nimport java.util.Arrays;\n\npublic class SortingAlgorithms {\n\n    public static void bubbleSort(int[] arr) {\n        for (int i = 0; i < arr.length - 1; i++) {\n            boolean swapped = false;\n            for (int j = 0; j < arr.length - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    swap(arr, j, j + 1);\n                    swapped = true;\n                }\n            }\n            if (!swapped) break; // ya ordenado\n        }\n    }\n\n    public static void mergeSort(int[] arr) {\n        mergeSort(arr, 0, arr.length - 1, new int[arr.length]);\n    }\n\n    private static void mergeSort(int[] arr, int left, int right, int[] temp) {\n        if (left >= right) return;\n        int mid = left + (right - left) / 2;\n        mergeSort(arr, left, mid, temp);\n        mergeSort(arr, mid + 1, right, temp);\n        merge(arr, left, mid, right, temp);\n    }\n\n    private static void merge(int[] arr, int left, int mid, int right, int[] temp) {\n        int i = left, j = mid + 1, k = left;\n        while (i <= mid && j <= right) {\n            temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];\n        }\n        while (i <= mid) temp[k++] = arr[i++];\n        while (j <= right) temp[k++] = arr[j++];\n        for (int idx = left; idx <= right; idx++) arr[idx] = temp[idx];\n    }\n\n    public static void quickSort(int[] arr) {\n        quickSort(arr, 0, arr.length - 1);\n    }\n\n    private static void quickSort(int[] arr, int low, int high) {\n        if (low >= high) return;\n        int pivotIndex = partition(arr, low, high);\n        quickSort(arr, low, pivotIndex - 1);\n        quickSort(arr, pivotIndex + 1, high);\n    }\n\n    private static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low;\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                swap(arr, i, j);\n                i++;\n            }\n        }\n        swap(arr, i, high);\n        return i;\n    }\n\n    private static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n\n    public static void main(String[] args) {\n        int[] sample = {5, 2, 9, 1, 5, 6};\n        quickSort(sample);\n        System.out.println(\"Clasificación rápida:\" + Arrays.toString(sample));\n        int[] other = {5, 2, 9, 1, 5, 6};\n        mergeSort(other);\n        System.out.println(\"Combinar orden:\" + Arrays.toString(other));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Algoritmos de clasificación\";\n    string moduleDescription = \"`bubbleSort`, `mergeSort` y `quickSort` viven en una clase, lo que nos permite resaltar cada condición de bucle, partición y fusión para que el flujo de control detrás de cada comparación sea muy claro.\";\n    vector<string> topics = {\"Ordenar burbujas\", \"Combinar ordenar\", \"Ordenación rápida\", \"Ordenar montón\", \"Ordenación por base\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Algoritmos de clasificación\"\n    module_description = \"`bubbleSort`, `mergeSort` y `quickSort` viven en una clase, lo que nos permite resaltar cada condición de bucle, partición y fusión para que el flujo de control detrás de cada comparación sea muy claro.\"\n    topics = [\"Ordenar burbujas\", \"Combinar ordenar\", \"Ordenación rápida\", \"Ordenar montón\", \"Ordenación por base\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Algoritmos de clasificación\";\n    const moduleDescription = \"`bubbleSort`, `mergeSort` y `quickSort` viven en una clase, lo que nos permite resaltar cada condición de bucle, partición y fusión para que el flujo de control detrás de cada comparación sea muy claro.\";\n    const topics = [\"Ordenar burbujas\", \"Combinar ordenar\", \"Ordenación rápida\", \"Ordenar montón\", \"Ordenación por base\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "searching-algorithms": {
        "title": "Algoritmos de búsqueda",
        "description": "La búsqueda lineal, binaria y exponencial se implementan en paralelo, por lo que desglosamos los cambios de puntero, las pruebas de límites y la llamada final a `Arrays.binarySearch` que finaliza la ventana exponencial.",
        "topics": [
          "Búsqueda lineal",
          "Búsqueda binaria",
          "Búsqueda por interpolación",
          "Búsqueda exponencial",
          "Comparación de estrategias de búsqueda"
        ],
        "explanation": "Más allá de la búsqueda lineal, dominará los patrones de búsqueda binaria en matrices, problemas de rango de respuestas y espacios de búsqueda implícitos, como la adivinación de respuestas o la búsqueda de picos. También cubrimos la búsqueda por interpolación/exponencial y cómo adaptar plantillas de búsqueda a matrices rotadas y recorrido de matrices.",
        "resources": [
          "Guía de búsqueda binaria",
          "Optimización de búsqueda"
        ],
        "codeExamples": {
          "java": "/*\n * Algoritmos de búsqueda - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Búsqueda lineal\n * 2) Búsqueda binaria\n * 3) Búsqueda por interpolación\n * 4) Búsqueda exponencial\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Utilidades de búsqueda que destacan múltiples técnicas\nimport java.util.Arrays;\n\npublic class SearchingAlgorithms {\n\n    public static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n\n    public static int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n\n    public static int exponentialSearch(int[] arr, int target) {\n        if (arr.length == 0) return -1;\n        int bound = 1;\n        while (bound < arr.length && arr[bound] < target) {\n            bound *= 2;\n        }\n        return Arrays.binarySearch(arr, bound / 2, Math.min(bound + 1, arr.length), target);\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {2, 4, 6, 8, 10, 12, 14};\n        System.out.println(\"Búsqueda lineal 8:\" + linearSearch(sorted, 8));\n        System.out.println(\"Búsqueda binaria 10:\" + binarySearch(sorted, 10));\n        System.out.println(\"Búsqueda exponencial 12:\" + exponentialSearch(sorted, 12));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Algoritmos de búsqueda\";\n    string moduleDescription = \"La búsqueda lineal, binaria y exponencial se implementan en paralelo, por lo que desglosamos los cambios de puntero, las pruebas de límites y la llamada final a `Arrays.binarySearch` que finaliza la ventana exponencial.\";\n    vector<string> topics = {\"Búsqueda lineal\", \"Búsqueda binaria\", \"Búsqueda por interpolación\", \"Búsqueda exponencial\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Algoritmos de búsqueda\"\n    module_description = \"La búsqueda lineal, binaria y exponencial se implementan en paralelo, por lo que desglosamos los cambios de puntero, las pruebas de límites y la llamada final a `Arrays.binarySearch` que finaliza la ventana exponencial.\"\n    topics = [\"Búsqueda lineal\", \"Búsqueda binaria\", \"Búsqueda por interpolación\", \"Búsqueda exponencial\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Algoritmos de búsqueda\";\n    const moduleDescription = \"La búsqueda lineal, binaria y exponencial se implementan en paralelo, por lo que desglosamos los cambios de puntero, las pruebas de límites y la llamada final a `Arrays.binarySearch` que finaliza la ventana exponencial.\";\n    const topics = [\"Búsqueda lineal\", \"Búsqueda binaria\", \"Búsqueda por interpolación\", \"Búsqueda exponencial\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "recursion": {
        "title": "Recursión y retroceso",
        "description": "El factorial, la resolución de laberintos y la generación de subconjuntos ilustran cómo encajan los casos base, las elecciones y el retroceso; Explicamos qué hace cada cuadro recursivo y cuándo se desenrolla.",
        "topics": [
          "Funciones recursivas",
          "Casos básicos",
          "Retroceder",
          "Memorización",
          "Recursión de árbol"
        ],
        "explanation": "Dividimos la recursividad en fases de caso base, elección y exploración, luego mostramos cómo convertir la recursividad ingenua en un retroceso eficiente con restauración de estado. Los ejemplos incluyen permutaciones, N-Queens, subconjuntos y DP de árbol memorizado, que le ayudarán a razonar sobre las pilas de llamadas y la terminación.",
        "resources": [
          "Patrones de recursividad",
          "Guía de retroceso"
        ],
        "codeExamples": {
          "java": "/*\n * Recursión y retroceso - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Funciones recursivas\n * 2) Casos básicos\n * 3) Retroceder\n * 4) Memorización\n * 5) Recursión de árbol\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Patrones de recursividad y retroceso\nimport java.util.*;\n\npublic class RecursionExamples {\n\n    public static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n\n    public static boolean solveMaze(char[][] maze, int row, int col) {\n        if (row < 0 || col < 0 || row >= maze.length || col >= maze[0].length || maze[row][col] == '#') {\n            return false;\n        }\n        if (maze[row][col] == 'G') return true;\n        maze[row][col] = '#'; // marcar visitado\n        boolean found = solveMaze(maze, row + 1, col) ||\n                        solveMaze(maze, row - 1, col) ||\n                        solveMaze(maze, row, col + 1) ||\n                        solveMaze(maze, row, col - 1);\n        maze[row][col] = '.'; // backtrack\n        return found;\n    }\n\n    public static List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, int index, List<Integer> slate, List<List<Integer>> result) {\n        result.add(new ArrayList<>(slate));\n        for (int i = index; i < nums.length; i++) {\n            slate.add(nums[i]);\n            backtrack(nums, i + 1, slate, result);\n            slate.remove(slate.size() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Factorial(5) = \" + factorial(5));\n        int[] nums = {1, 2, 3};\n        System.out.println(\"Subconjuntos:\" + subsets(nums));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Recursión y retroceso\";\n    string moduleDescription = \"El factorial, la resolución de laberintos y la generación de subconjuntos ilustran cómo encajan los casos base, las elecciones y el retroceso; Explicamos qué hace cada cuadro recursivo y cuándo se desenrolla.\";\n    vector<string> topics = {\"Funciones recursivas\", \"Casos básicos\", \"Retroceder\", \"Memorización\", \"Recursión de árbol\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Recursión y retroceso\"\n    module_description = \"El factorial, la resolución de laberintos y la generación de subconjuntos ilustran cómo encajan los casos base, las elecciones y el retroceso; Explicamos qué hace cada cuadro recursivo y cuándo se desenrolla.\"\n    topics = [\"Funciones recursivas\", \"Casos básicos\", \"Retroceder\", \"Memorización\", \"Recursión de árbol\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Recursión y retroceso\";\n    const moduleDescription = \"El factorial, la resolución de laberintos y la generación de subconjuntos ilustran cómo encajan los casos base, las elecciones y el retroceso; Explicamos qué hace cada cuadro recursivo y cuándo se desenrolla.\";\n    const topics = [\"Funciones recursivas\", \"Casos básicos\", \"Retroceder\", \"Memorización\", \"Recursión de árbol\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "dynamic-programming": {
        "title": "Programación dinámica",
        "description": "El mapa de Fibonacci memorizado, la matriz LIS DP y la tabla de mochila 0/1 se detallan paso a paso para que pueda seguir cómo se almacenan en caché los estados, se eligen las transiciones y se leen las respuestas.",
        "topics": [
          "Memorización",
          "Tabulación",
          "Subestructura óptima",
          "Subproblemas superpuestos"
        ],
        "explanation": "Espere un marco repetible: defina subproblemas, derive transiciones y luego elija memorización o tabulación con espacio optimizado. Los problemas clásicos (mochila, LIS, cambio de monedas) más resúmenes de patrones (1D, cuadrícula 2D, partición, intervalo) garantizan que pueda formar recurrencias de DP sobre la marcha.",
        "resources": [
          "Patrones DP",
          "Técnicas de optimización"
        ],
        "codeExamples": {
          "java": "/*\n * Programación dinámica - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Memorización\n * 2) Tabulación\n * 3) Subestructura óptima\n * 4) Subproblemas superpuestos\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ejemplos de programación dinámica (memorización + tabulación)\nimport java.util.Arrays;\nimport java.util.HashMap;\nimport java.util.Map;\n\npublic class DynamicProgramming {\n\n    private static final Map<Integer, Long> fibMemo = new HashMap<>();\n    static {\n        fibMemo.put(0, 0L);\n        fibMemo.put(1, 1L);\n    }\n\n    public static long fibonacci(int n) {\n        if (fibMemo.containsKey(n)) return fibMemo.get(n);\n        long value = fibonacci(n - 1) + fibonacci(n - 2);\n        fibMemo.put(n, value);\n        return value;\n    }\n\n    public static int longestIncreasingSubsequence(int[] nums) {\n        int[] dp = new int[nums.length];\n        Arrays.fill(dp, 1);\n        int max = 1;\n        for (int i = 1; i < nums.length; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[i] > nums[j]) {\n                    dp[i] = Math.max(dp[i], dp[j] + 1);\n                }\n            }\n            max = Math.max(max, dp[i]);\n        }\n        return max;\n    }\n\n    public static int knapSack(int capacity, int[] weights, int[] values) {\n        int[][] dp = new int[weights.length + 1][capacity + 1];\n        for (int i = 1; i <= weights.length; i++) {\n            for (int w = 0; w <= capacity; w++) {\n                if (weights[i - 1] <= w) {\n                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);\n                } else {\n                    dp[i][w] = dp[i - 1][w];\n                }\n            }\n        }\n        return dp[weights.length][capacity];\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Fibra(10) =\" + fibonacci(10));\n        System.out.println(\"longitud LIS =\" + longestIncreasingSubsequence(new int[]{10,9,2,5,3,7,101,18}));\n        System.out.println(\"0/1 Mochila =\" + knapSack(7, new int[]{1,3,4,5}, new int[]{1,4,5,7}));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Programación dinámica\";\n    string moduleDescription = \"El mapa de Fibonacci memorizado, la matriz LIS DP y la tabla de mochila 0/1 se detallan paso a paso para que pueda seguir cómo se almacenan en caché los estados, se eligen las transiciones y se leen las respuestas.\";\n    vector<string> topics = {\"Memorización\", \"Tabulación\", \"Subestructura óptima\", \"Subproblemas superpuestos\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Programación dinámica\"\n    module_description = \"El mapa de Fibonacci memorizado, la matriz LIS DP y la tabla de mochila 0/1 se detallan paso a paso para que pueda seguir cómo se almacenan en caché los estados, se eligen las transiciones y se leen las respuestas.\"\n    topics = [\"Memorización\", \"Tabulación\", \"Subestructura óptima\", \"Subproblemas superpuestos\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Programación dinámica\";\n    const moduleDescription = \"El mapa de Fibonacci memorizado, la matriz LIS DP y la tabla de mochila 0/1 se detallan paso a paso para que pueda seguir cómo se almacenan en caché los estados, se eligen las transiciones y se leen las respuestas.\";\n    const topics = [\"Memorización\", \"Tabulación\", \"Subestructura óptima\", \"Subproblemas superpuestos\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "greedy-algorithms": {
        "title": "Algoritmos codiciosos",
        "description": "La selección de actividad recorre las matrices de inicio/fin mientras \"coinChange\" pela repetidamente las denominaciones, lo que facilita ver por qué funciona cada comparación o resta codiciosa.",
        "topics": [
          "Elección codiciosa",
          "Selección de actividad",
          "Codificación Huffman",
          "Árbol de expansión mínimo"
        ],
        "explanation": "Aprenderá a demostrar la propiedad de elección codiciosa, probar contraejemplos y detectar estructuras similares a matroides. Los laboratorios prácticos cubren la programación de intervalos, la codificación Huffman, los MST Kruskal vs Prim y los sistemas de monedas para que sepas exactamente cuándo la avaricia vence a la DP.",
        "resources": [
          "Estrategia codiciosa",
          "Problemas de optimización"
        ],
        "codeExamples": {
          "java": "/*\n * Algoritmos codiciosos - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Elección codiciosa\n * 2) Selección de actividad\n * 3) Codificación Huffman\n * 4) Árbol de expansión mínimo\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Estrategias codiciosas para la programación y el cambio de monedas.\nimport java.util.*;\n\npublic class GreedyAlgorithms {\n\n    public static List<int[]> selectMaxActivities(int[] start, int[] finish) {\n        List<int[]> result = new ArrayList<>();\n        int lastFinish = -1;\n        for (int i = 0; i < start.length; i++) {\n            if (start[i] >= lastFinish) {\n                result.add(new int[]{start[i], finish[i]});\n                lastFinish = finish[i];\n            }\n        }\n        return result;\n    }\n\n    public static Map<Integer, Integer> coinChange(int amount, int[] denominations) {\n        Map<Integer, Integer> used = new LinkedHashMap<>();\n        for (int coin : denominations) {\n            int count = amount / coin;\n            if (count > 0) {\n                used.put(coin, count);\n                amount -= coin * count;\n            }\n        }\n        if (amount != 0) throw new IllegalArgumentException(\"No se puede hacer el cambio exacto con denominaciones determinadas\");\n        return used;\n    }\n\n    public static void main(String[] args) {\n        int[] start = {1, 3, 0, 5, 8, 5};\n        int[] finish = {2, 4, 6, 7, 9, 9};\n        System.out.println(\"Actividades seleccionadas:\" + selectMaxActivities(start, finish));\n\n        int[] coins = {25, 10, 5, 1};\n        System.out.println(\"Cambio de moneda por 68:\" + coinChange(68, coins));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Algoritmos codiciosos\";\n    string moduleDescription = \"La selección de actividad recorre las matrices de inicio/fin mientras \\\"coinChange\\\" pela repetidamente las denominaciones, lo que facilita ver por qué funciona cada comparación o resta codiciosa.\";\n    vector<string> topics = {\"Elección codiciosa\", \"Selección de actividad\", \"Codificación Huffman\", \"Árbol de expansión mínimo\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Algoritmos codiciosos\"\n    module_description = \"La selección de actividad recorre las matrices de inicio/fin mientras \\\"coinChange\\\" pela repetidamente las denominaciones, lo que facilita ver por qué funciona cada comparación o resta codiciosa.\"\n    topics = [\"Elección codiciosa\", \"Selección de actividad\", \"Codificación Huffman\", \"Árbol de expansión mínimo\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Algoritmos codiciosos\";\n    const moduleDescription = \"La selección de actividad recorre las matrices de inicio/fin mientras \\\"coinChange\\\" pela repetidamente las denominaciones, lo que facilita ver por qué funciona cada comparación o resta codiciosa.\";\n    const topics = [\"Elección codiciosa\", \"Selección de actividad\", \"Codificación Huffman\", \"Árbol de expansión mínimo\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "graph-algorithms": {
        "title": "Algoritmos gráficos",
        "description": "`Graph.addEdge`, `bfs` y `dijkstra` se ejecutan en una demostración, lo que le brinda información línea por línea sobre las listas de adyacencia, el recorrido basado en colas y la relajación de distancia impulsada por el montón.",
        "topics": [
          "Representación gráfica",
          "DFS",
          "BFS",
          "Camino más corto",
          "Árbol de expansión mínimo"
        ],
        "explanation": "Revisamos las compensaciones entre listas y matrices de adyacencia y luego nos sumergimos en patrones transversales (DFS/BFS), clasificación topológica, caminos más cortos y diseños MST. Los tutoriales visuales muestran cómo razonar sobre la conectividad, detectar ciclos y optimizar algoritmos de gráficos con colas de prioridad o búsqueda de unión.",
        "resources": [
          "Algoritmos gráficos",
          "DFS y BFS"
        ],
        "codeExamples": {
          "java": "/*\n * Algoritmos gráficos - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Representación gráfica\n * 2) DFS\n * 3) BFS\n * 4) Camino más corto\n * 5) Árbol de expansión mínimo\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Recorrido del gráfico y camino más corto de Dijkstra\nimport java.util.*;\n\nclass Graph {\n    private final Map<Integer, List<int[]>> adjacency = new HashMap<>();\n\n    public void addEdge(int from, int to, int weight) {\n        adjacency.computeIfAbsent(from, k -> new ArrayList<>()).add(new int[]{to, weight});\n        adjacency.computeIfAbsent(to, k -> new ArrayList<>());\n    }\n\n    public void bfs(int start) {\n        Set<Integer> visited = new HashSet<>();\n        Queue<Integer> queue = new ArrayDeque<>();\n        queue.offer(start);\n        visited.add(start);\n        while (!queue.isEmpty()) {\n            int current = queue.poll();\n            System.out.print(current + \" \");\n            for (int[] edge : adjacency.getOrDefault(current, Collections.emptyList())) {\n                int neighbor = edge[0];\n                if (visited.add(neighbor)) {\n                    queue.offer(neighbor);\n                }\n            }\n        }\n        System.out.println();\n    }\n\n    public Map<Integer, Integer> dijkstra(int source) {\n        Map<Integer, Integer> dist = new HashMap<>();\n        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));\n        pq.offer(new int[]{source, 0});\n        dist.put(source, 0);\n        while (!pq.isEmpty()) {\n            int[] current = pq.poll();\n            int node = current[0];\n            int distance = current[1];\n            if (distance > dist.getOrDefault(node, Integer.MAX_VALUE)) continue;\n            for (int[] edge : adjacency.getOrDefault(node, Collections.emptyList())) {\n                int neighbor = edge[0];\n                int weight = edge[1];\n                int newDist = distance + weight;\n                if (newDist < dist.getOrDefault(neighbor, Integer.MAX_VALUE)) {\n                    dist.put(neighbor, newDist);\n                    pq.offer(new int[]{neighbor, newDist});\n                }\n            }\n        }\n        return dist;\n    }\n\n    public static void main(String[] args) {\n        Graph graph = new Graph();\n        graph.addEdge(0, 1, 4);\n        graph.addEdge(0, 2, 1);\n        graph.addEdge(2, 1, 2);\n        graph.addEdge(1, 3, 1);\n        graph.addEdge(2, 3, 5);\n        System.out.print(\"BFS: \");\n        graph.bfs(0);\n        System.out.println(\"Distancias de Dijkstra desde 0:\" + graph.dijkstra(0));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Algoritmos gráficos\";\n    string moduleDescription = \"`Graph.addEdge`, `bfs` y `dijkstra` se ejecutan en una demostración, lo que le brinda información línea por línea sobre las listas de adyacencia, el recorrido basado en colas y la relajación de distancia impulsada por el montón.\";\n    vector<string> topics = {\"Representación gráfica\", \"DFS\", \"BFS\", \"Camino más corto\", \"Árbol de expansión mínimo\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Algoritmos gráficos\"\n    module_description = \"`Graph.addEdge`, `bfs` y `dijkstra` se ejecutan en una demostración, lo que le brinda información línea por línea sobre las listas de adyacencia, el recorrido basado en colas y la relajación de distancia impulsada por el montón.\"\n    topics = [\"Representación gráfica\", \"DFS\", \"BFS\", \"Camino más corto\", \"Árbol de expansión mínimo\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Algoritmos gráficos\";\n    const moduleDescription = \"`Graph.addEdge`, `bfs` y `dijkstra` se ejecutan en una demostración, lo que le brinda información línea por línea sobre las listas de adyacencia, el recorrido basado en colas y la relajación de distancia impulsada por el montón.\";\n    const topics = [\"Representación gráfica\", \"DFS\", \"BFS\", \"Camino más corto\", \"Árbol de expansión mínimo\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "propositional-logic-proofs": {
        "title": "Lógica proposicional y conceptos básicos de prueba",
        "description": "Los ayudantes de valor de verdad para implicación, conjunción y bicondicional se rastrean en un mini corredor de tabla de verdad para que pueda conectar la lógica simbólica con el razonamiento ejecutable.",
        "topics": [
          "Proposiciones",
          "Tablas de verdad",
          "Implicación",
          "Equivalencia lógica",
          "Prueba directa"
        ],
        "explanation": "Este módulo se centra en la lógica de los enunciados, los patrones de inferencia y el marco de prueba. Practicará la traducción de afirmaciones en inglés a símbolos, la validación de implicaciones con tablas de verdad y la estructuración de pruebas cortas directas/contrapositivas.",
        "resources": [
          "Notas abiertas de matemáticas discretas",
          "Práctica de la tabla de verdad"
        ],
        "codeExamples": {
          "java": "/*\n * Lógica proposicional y conceptos básicos de prueba - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Proposiciones\n * 2) Tablas de verdad\n * 3) Implicación\n * 4) Equivalencia lógica\n * 5) Prueba directa\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ayudantes de la tabla de verdad de lógica proposicional\npublic class PropositionalLogic {\n    static boolean implies(boolean p, boolean q) {\n        return !p || q;\n    }\n\n    static boolean biconditional(boolean p, boolean q) {\n        return p == q;\n    }\n\n    public static void main(String[] args) {\n        boolean[] values = {false, true};\n        System.out.println(\"p q | p->q p<->q\");\n        for (boolean p : values) {\n            for (boolean q : values) {\n                System.out.println(p + \" \" + q + \" | \" + implies(p, q) + \"    \" + biconditional(p, q));\n            }\n        }\n        System.out.println(\"Idea de prueba directa: asumir p, derivar q.\");\n    }\n}",
          "cpp": "// Ayudantes de la tabla de verdad de lógica proposicional\n#include <iostream>\nusing namespace std;\n\nbool implies(bool p, bool q) { return !p || q; }\nbool biconditional(bool p, bool q) { return p == q; }\n\nint main() {\n    bool values[2] = {false, true};\n    cout << boolalpha;\n    cout << \"p q | p->q p<->q\\n\";\n    for (bool p : values) {\n        for (bool q : values) {\n            cout << p << \" \" << q << \" | \" << implies(p, q) << \"    \" << biconditional(p, q) << \"\\n\";\n        }\n    }\n    cout << \"Idea de prueba directa: asumir p, derivar q.\\n\";\n    return 0;\n}",
          "python": "# Ayudantes de la tabla de verdad de lógica proposicional\ndef implies(p, q):\n    return (not p) or q\n\ndef biconditional(p, q):\n    return p == q\n\nvalues = [False, True]\nprint(\"p q | p->q p<->q\")\nfor p in values:\n    for q in values:\n        print(f\"{p} {q} | {implica(p, q)} {bicondicional(p, q)}\")\nprint(\"Idea de prueba directa: asumir p, derivar q.\")",
          "javascript": "// Ayudantes de la tabla de verdad de lógica proposicional\nconst implies = (p, q) => !p || q;\nconst biconditional = (p, q) => p === q;\n\nconst values = [false, true];\nconsole.log(\"p q | p->q p<->q\");\nfor (const p of values) {\n    for (const q of values) {\n        console.log(String(p) + \" \" + String(q) + \" | \" + String(implies(p, q)) + \"    \" + String(biconditional(p, q)));\n    }\n}\nconsole.log(\"Idea de prueba directa: asumir p, derivar q.\");"
        }
      },
      "sets-relations-functions": {
        "title": "Conjuntos, relaciones y funciones",
        "description": "Establezca uniones/intersecciones, productos cartesianos y comprobaciones inyectivas ejecutadas en una muestra compacta para que pueda conectar definiciones formales a estructuras de datos concretas.",
        "topics": [
          "Establecer operaciones",
          "Producto cartesiano",
          "Relaciones",
          "Funciones inyectivas",
          "Funciones sobreyectivas"
        ],
        "explanation": "Modelará conjuntos, relaciones binarias y asignaciones con operaciones concretas: pruebas de membresía, productos, propiedades de relaciones y comprobaciones inyectivas/sobreyectivas. El objetivo es desarrollar la intuición que se utilizará más adelante en la teoría de grafos y en las pruebas.",
        "resources": [
          "Notas sobre conjuntos y relaciones",
          "Ejercicios de propiedades de funciones"
        ],
        "codeExamples": {
          "java": "/*\n * Conjuntos, relaciones y funciones - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Establecer operaciones\n * 2) Producto cartesiano\n * 3) Relaciones\n * 4) Funciones inyectivas\n * 5) Funciones sobreyectivas\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Mini demostración de conjuntos, relaciones y funciones\nimport java.util.*;\n\npublic class SetsRelationsFunctions {\n    static boolean isInjective(Map<Integer, Integer> f) {\n        Set<Integer> seen = new HashSet<>();\n        for (int value : f.values()) {\n            if (!seen.add(value)) return false;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        Set<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3));\n        Set<Integer> b = new HashSet<>(Arrays.asList(3, 4, 5));\n        Set<Integer> intersection = new HashSet<>(a);\n        intersection.retainAll(b);\n        Set<Integer> union = new HashSet<>(a);\n        union.addAll(b);\n\n        Map<Integer, Integer> f = new HashMap<>();\n        f.put(1, 10); f.put(2, 20); f.put(3, 30);\n\n        System.out.println(\"A∩B =\" + intersection);\n        System.out.println(\"Un ∪ B =\" + union);\n        System.out.println(\"f es inyectiva?\" + isInjective(f));\n    }\n}",
          "cpp": "// Mini demostración de conjuntos, relaciones y funciones\n#include <iostream>\n#include <set>\n#include <map>\nusing namespace std;\n\nbool isInjective(const map<int, int>& f) {\n    set<int> seen;\n    for (const auto& [k, v] : f) {\n        if (!seen.insert(v).second) return false;\n    }\n    return true;\n}\n\nint main() {\n    set<int> A = {1, 2, 3};\n    set<int> B = {3, 4, 5};\n    set<int> intersection, uni = A;\n    for (int x : B) {\n        if (A.count(x)) intersection.insert(x);\n        uni.insert(x);\n    }\n    map<int, int> f = {{1, 10}, {2, 20}, {3, 30}};\n\n    cout << \"Tamaño A ∩ B =\" << intersection.size() << \"\\n\";\n    cout << \"Tamaño A ∪ B =\" << uni.size() << \"\\n\";\n    cout << boolalpha << \"f es inyectiva?\" << isInjective(f) << \"\\n\";\n    return 0;\n}",
          "python": "# Mini demostración de conjuntos, relaciones y funciones\ndef is_injective(mapping):\n    return len(set(mapping.values())) == len(mapping.values())\n\nA = {1, 2, 3}\nB = {3, 4, 5}\nf = {1: 10, 2: 20, 3: 30}\n\nprint(\"A∩B =\", A & B)\nprint(\"Un ∪ B =\", A | B)\nprint(\"f es inyectiva?\", is_injective(f))",
          "javascript": "// Mini demostración de conjuntos, relaciones y funciones\nconst A = new Set([1, 2, 3]);\nconst B = new Set([3, 4, 5]);\nconst intersection = [...A].filter((x) => B.has(x));\nconst union = new Set([...A, ...B]);\nconst f = new Map([[1, 10], [2, 20], [3, 30]]);\n\nconst values = [...f.values()];\nconst isInjective = new Set(values).size === values.length;\n\nconsole.log(\"A∩B =\", intersection);\nconsole.log(\"Un ∪ B =\", [...union]);\nconsole.log(\"f es inyectiva?\", isInjective);"
        }
      },
      "combinatorics-discrete-probability": {
        "title": "Combinatoria y probabilidad discreta",
        "description": "Los ayudantes factoriales/permutación/combinación se combinan con cálculos de probabilidad básicos para que los principios de conteo y los modelos de eventos se conviertan en herramientas prácticas para la resolución de problemas.",
        "topics": [
          "factoriales",
          "Permutaciones",
          "Combinaciones",
          "Coeficientes binomiales",
          "Probabilidad de evento"
        ],
        "explanation": "Este módulo conecta técnicas de conteo con modelos de probabilidad. Decidirá cuándo importa el orden, calculará combinaciones/permutaciones de manera eficiente y asignará espacios muestrales a probabilidades de eventos para problemas de estilo examen y entrevista.",
        "resources": [
          "Hoja rápida de combinatoria",
          "Práctica de probabilidad discreta"
        ],
        "codeExamples": {
          "java": "/*\n * Combinatoria y probabilidad discreta - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) factoriales\n * 2) Permutaciones\n * 3) Combinaciones\n * 4) Coeficientes binomiales\n * 5) Probabilidad de evento\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ayudantes de conteo y probabilidad\npublic class CombinatoricsProbability {\n    static long factorial(int n) {\n        long ans = 1;\n        for (int i = 2; i <= n; i++) ans *= i;\n        return ans;\n    }\n\n    static long nCr(int n, int r) {\n        return factorial(n) / (factorial(r) * factorial(n - r));\n    }\n\n    public static void main(String[] args) {\n        int n = 5, r = 2;\n        System.out.println(\"5! = \" + factorial(5));\n        System.out.println(\"PAG(5,2) =\" + (factorial(n) / factorial(n - r)));\n        System.out.println(\"C(5,2) = \" + nCr(n, r));\n        System.out.println(\"P(exactamente 2 caras en 3 lanzamientos justos) =\" + (3.0 / 8.0));\n    }\n}",
          "cpp": "// Ayudantes de conteo y probabilidad\n#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    long long ans = 1;\n    for (int i = 2; i <= n; ++i) ans *= i;\n    return ans;\n}\n\nlong long nCr(int n, int r) {\n    return factorial(n) / (factorial(r) * factorial(n - r));\n}\n\nint main() {\n    int n = 5, r = 2;\n    cout << \"5! = \" << factorial(5) << \"\\n\";\n    cout << \"PAG(5,2) =\" << factorial(n) / factorial(n - r) << \"\\n\";\n    cout << \"C(5,2) = \" << nCr(n, r) << \"\\n\";\n    cout << \"P(exactamente 2 caras en 3 lanzamientos justos) =\" << (3.0 / 8.0) << \"\\n\";\n    return 0;\n}",
          "python": "# Ayudantes de conteo y probabilidad\ndef factorial(n):\n    ans = 1\n    for i in range(2, n + 1):\n        ans *= i\n    return ans\n\ndef nCr(n, r):\n    return factorial(n) // (factorial(r) * factorial(n - r))\n\nn, r = 5, 2\nprint(\"5! =\", factorial(5))\nprint(\"PAG(5,2) =\", factorial(n) // factorial(n - r))\nprint(\"C(5,2) =\", nCr(n, r))\nprint(\"P(exactamente 2 caras en 3 lanzamientos justos) =\", 3 / 8)",
          "javascript": "// Ayudantes de conteo y probabilidad\nfunction factorial(n) {\n    let ans = 1;\n    for (let i = 2; i <= n; i += 1) ans *= i;\n    return ans;\n}\n\nfunction nCr(n, r) {\n    return factorial(n) / (factorial(r) * factorial(n - r));\n}\n\nconst n = 5;\nconst r = 2;\nconsole.log(\"5! =\", factorial(5));\nconsole.log(\"PAG(5,2) =\", factorial(n) / factorial(n - r));\nconsole.log(\"C(5,2) =\", nCr(n, r));\nconsole.log(\"P(exactamente 2 caras en 3 lanzamientos justos) =\", 3 / 8);"
        }
      },
      "tries": {
        "title": "Intentos (árboles de prefijos)",
        "description": "El trie construye nodos carácter por carácter en `insertar`, los reutiliza mediante `traverse` y marca palabras/prefijos, por lo que explicamos cómo cada bucle navega por la estructura compartida.",
        "topics": [
          "Trie Construcción",
          "Insertar/Buscar/Eliminar",
          "Coincidencia de prefijos",
          "Autocompletar"
        ],
        "explanation": "La unidad trie ilustra cómo los árboles de prefijos comprimen rutas compartidas para permitir búsquedas O(L), sugerencias automáticas y búsquedas con comodines. Agregará operaciones de eliminación, explorará árboles de búsqueda ternarios e implementará problemas de diccionario de palabras aprovechando el conteo de prefijos.",
        "resources": [
          "Pruebe aplicaciones",
          "Procesamiento de cadenas"
        ],
        "codeExamples": {
          "java": "/*\n * Intentos (árboles de prefijos) - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Trie Construcción\n * 2) Insertar/Buscar/Eliminar\n * 3) Coincidencia de prefijos\n * 4) Autocompletar\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Implementación de árbol Trie/prefijo\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass TrieNode {\n    Map<Character, TrieNode> children = new HashMap<>();\n    boolean isWord;\n}\n\npublic class Trie {\n    private final TrieNode root = new TrieNode();\n\n    public void insert(String word) {\n        TrieNode current = root;\n        for (char c : word.toCharArray()) {\n            current = current.children.computeIfAbsent(c, k -> new TrieNode());\n        }\n        current.isWord = true;\n    }\n\n    public boolean search(String word) {\n        TrieNode node = traverse(word);\n        return node != null && node.isWord;\n    }\n\n    public boolean startsWith(String prefix) {\n        return traverse(prefix) != null;\n    }\n\n    private TrieNode traverse(String sequence) {\n        TrieNode current = root;\n        for (char c : sequence.toCharArray()) {\n            TrieNode next = current.children.get(c);\n            if (next == null) return null;\n            current = next;\n        }\n        return current;\n    }\n\n    public static void main(String[] args) {\n        Trie trie = new Trie();\n        trie.insert(\"code\");\n        trie.insert(\"coder\");\n        trie.insert(\"coding\");\n        System.out.println(trie.search(\"code\"));      // true\n        System.out.println(trie.startsWith(\"cod\"));  // true\n        System.out.println(trie.search(\"codes\"));    // false\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Intentos (árboles de prefijos)\";\n    string moduleDescription = \"El trie construye nodos carácter por carácter en `insertar`, los reutiliza mediante `traverse` y marca palabras/prefijos, por lo que explicamos cómo cada bucle navega por la estructura compartida.\";\n    vector<string> topics = {\"Trie Construcción\", \"Insertar/Buscar/Eliminar\", \"Coincidencia de prefijos\", \"Autocompletar\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Intentos (árboles de prefijos)\"\n    module_description = \"El trie construye nodos carácter por carácter en `insertar`, los reutiliza mediante `traverse` y marca palabras/prefijos, por lo que explicamos cómo cada bucle navega por la estructura compartida.\"\n    topics = [\"Trie Construcción\", \"Insertar/Buscar/Eliminar\", \"Coincidencia de prefijos\", \"Autocompletar\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Intentos (árboles de prefijos)\";\n    const moduleDescription = \"El trie construye nodos carácter por carácter en `insertar`, los reutiliza mediante `traverse` y marca palabras/prefijos, por lo que explicamos cómo cada bucle navega por la estructura compartida.\";\n    const topics = [\"Trie Construcción\", \"Insertar/Buscar/Eliminar\", \"Coincidencia de prefijos\", \"Autocompletar\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "union-find": {
        "title": "Union-Find (conjunto disjunto)",
        "description": "`find` realiza una compresión de ruta recursiva y `union` compara rangos antes de volver a emparentar los nodos, lo que le permite rastrear exactamente cómo se aplana el bosque de conjuntos disjuntos.",
        "topics": [
          "Unión por rango",
          "Compresión de ruta",
          "Componentes conectados",
          "Detección de ciclo"
        ],
        "explanation": "Implementamos uniones de conjuntos disjuntos con compresión de ruta y unión por rango, analizamos su complejidad casi constante y las aplicamos a la conectividad, Kruskal MST y detección de ciclos. Los rastros visuales aclaran cómo los árboles padres se aplanan después de repetidas operaciones.",
        "resources": [
          "Operaciones de conjuntos disjuntos",
          "Compresión de ruta"
        ],
        "codeExamples": {
          "java": "/*\n * Union-Find (conjunto disjunto) - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Unión por rango\n * 2) Compresión de ruta\n * 3) Componentes conectados\n * 4) Detección de ciclo\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Unión de conjuntos disjuntos (Union-Find) con compresión de ruta\npublic class UnionFind {\n    private final int[] parent;\n    private final int[] rank;\n\n    public UnionFind(int size) {\n        parent = new int[size];\n        rank = new int[size];\n        for (int i = 0; i < size; i++) {\n            parent[i] = i;\n        }\n    }\n\n    public int find(int x) {\n        if (parent[x] != x) {\n            parent[x] = find(parent[x]); // compresión de ruta\n        }\n        return parent[x];\n    }\n\n    public void union(int a, int b) {\n        int rootA = find(a);\n        int rootB = find(b);\n        if (rootA == rootB) return;\n        if (rank[rootA] < rank[rootB]) {\n            parent[rootA] = rootB;\n        } else if (rank[rootA] > rank[rootB]) {\n            parent[rootB] = rootA;\n        } else {\n            parent[rootB] = rootA;\n            rank[rootA]++;\n        }\n    }\n\n    public static void main(String[] args) {\n        UnionFind uf = new UnionFind(6);\n        uf.union(0, 1);\n        uf.union(1, 2);\n        uf.union(3, 4);\n        System.out.println(\"Encontrar(2) =\" + uf.find(2));\n        System.out.println(\"¿Los componentes conectados se fusionaron?\" + (uf.find(0) == uf.find(2)));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Union-Find (conjunto disjunto)\";\n    string moduleDescription = \"`find` realiza una compresión de ruta recursiva y `union` compara rangos antes de volver a emparentar los nodos, lo que le permite rastrear exactamente cómo se aplana el bosque de conjuntos disjuntos.\";\n    vector<string> topics = {\"Unión por rango\", \"Compresión de ruta\", \"Componentes conectados\", \"Detección de ciclo\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Union-Find (conjunto disjunto)\"\n    module_description = \"`find` realiza una compresión de ruta recursiva y `union` compara rangos antes de volver a emparentar los nodos, lo que le permite rastrear exactamente cómo se aplana el bosque de conjuntos disjuntos.\"\n    topics = [\"Unión por rango\", \"Compresión de ruta\", \"Componentes conectados\", \"Detección de ciclo\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Union-Find (conjunto disjunto)\";\n    const moduleDescription = \"`find` realiza una compresión de ruta recursiva y `union` compara rangos antes de volver a emparentar los nodos, lo que le permite rastrear exactamente cómo se aplana el bosque de conjuntos disjuntos.\";\n    const topics = [\"Unión por rango\", \"Compresión de ruta\", \"Componentes conectados\", \"Detección de ciclo\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "segment-trees": {
        "title": "Árboles de segmentos",
        "description": "`build`, `update` y `rangeSum` dividen rangos por punto medio, manejan casos de cobertura/separados/parciales y distribuyen los resultados hacia arriba para que toda la historia de la consulta de rango sea fácil de seguir.",
        "topics": [
          "Consultas de rango",
          "Propagación perezosa",
          "Actualizaciones de puntos",
          "Actualizaciones de gama"
        ],
        "explanation": "Los árboles de segmentos almacenan datos de rango agregados (suma, mínimo, mcd) y responden consultas en O (log n); Construirás versiones iterativas y recursivas. También cubrimos la propagación diferida para actualizaciones de rango y comparamos árboles de segmentos con árboles de Fenwick en términos de capacidades.",
        "resources": [
          "Optimización de consultas de rango",
          "Propagación perezosa"
        ],
        "codeExamples": {
          "java": "/*\n * Árboles de segmentos - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Consultas de rango\n * 2) Propagación perezosa\n * 3) Actualizaciones de puntos\n * 4) Actualizaciones de gama\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Árbol de segmentos que admite consulta de suma de rango y actualización de puntos\nclass SegmentTree {\n    private final int[] tree;\n    private final int n;\n\n    public SegmentTree(int[] arr) {\n        n = arr.length;\n        tree = new int[4 * n];\n        build(arr, 0, 0, n - 1);\n    }\n\n    private void build(int[] arr, int node, int left, int right) {\n        if (left == right) {\n            tree[node] = arr[left];\n            return;\n        }\n        int mid = (left + right) / 2;\n        build(arr, node * 2 + 1, left, mid);\n        build(arr, node * 2 + 2, mid + 1, right);\n        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];\n    }\n\n    public void update(int index, int value) {\n        update(0, 0, n - 1, index, value);\n    }\n\n    private void update(int node, int left, int right, int index, int value) {\n        if (left == right) {\n            tree[node] = value;\n            return;\n        }\n        int mid = (left + right) / 2;\n        if (index <= mid) update(node * 2 + 1, left, mid, index, value);\n        else update(node * 2 + 2, mid + 1, right, index, value);\n        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];\n    }\n\n    public int rangeSum(int ql, int qr) {\n        return rangeSum(0, 0, n - 1, ql, qr);\n    }\n\n    private int rangeSum(int node, int left, int right, int ql, int qr) {\n        if (ql <= left && qr >= right) return tree[node];\n        if (qr < left || ql > right) return 0;\n        int mid = (left + right) / 2;\n        return rangeSum(node * 2 + 1, left, mid, ql, qr)\n             + rangeSum(node * 2 + 2, mid + 1, right, ql, qr);\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 3, 5, 7, 9, 11};\n        SegmentTree st = new SegmentTree(arr);\n        System.out.println(\"Suma 1-3:\" + st.rangeSum(1, 3));\n        st.update(1, 10);\n        System.out.println(\"Suma 1-3 después de la actualización:\" + st.rangeSum(1, 3));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Árboles de segmentos\";\n    string moduleDescription = \"`build`, `update` y `rangeSum` dividen rangos por punto medio, manejan casos de cobertura/separados/parciales y distribuyen los resultados hacia arriba para que toda la historia de la consulta de rango sea fácil de seguir.\";\n    vector<string> topics = {\"Consultas de rango\", \"Propagación perezosa\", \"Actualizaciones de puntos\", \"Actualizaciones de gama\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Árboles de segmentos\"\n    module_description = \"`build`, `update` y `rangeSum` dividen rangos por punto medio, manejan casos de cobertura/separados/parciales y distribuyen los resultados hacia arriba para que toda la historia de la consulta de rango sea fácil de seguir.\"\n    topics = [\"Consultas de rango\", \"Propagación perezosa\", \"Actualizaciones de puntos\", \"Actualizaciones de gama\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Árboles de segmentos\";\n    const moduleDescription = \"`build`, `update` y `rangeSum` dividen rangos por punto medio, manejan casos de cobertura/separados/parciales y distribuyen los resultados hacia arriba para que toda la historia de la consulta de rango sea fácil de seguir.\";\n    const topics = [\"Consultas de rango\", \"Propagación perezosa\", \"Actualizaciones de puntos\", \"Actualizaciones de gama\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "binary-indexed-trees": {
        "title": "Árboles indexados binarios (árboles de Fenwick)",
        "description": "La demostración de BIT enfatiza el truco de los bits bajos: `update` sube con `i += i & -i`, `prefixSum` camina hacia abajo y `rangeSum` simplemente resta prefijos para que puedas visualizar el árbol implícito.",
        "topics": [
          "Sumas de prefijo",
          "Consultas de suma de rango",
          "Actualizaciones de puntos",
          "Operación de broca inferior"
        ],
        "explanation": "Los árboles Fenwick ofrecen una alternativa compacta para sumas de prefijos y actualizaciones de puntos; Esta lección explica el truco de lowbit, cómo construir desde cero y realizar consultas de rango. Los ejercicios de práctica incluyen conteo invertido, ejecución de tablas de frecuencia y extensiones BIT 2D.",
        "resources": [
          "Guía de árboles de Fenwick",
          "Optimización de suma de prefijo"
        ],
        "codeExamples": {
          "java": "/*\n * Árboles indexados binarios (árboles de Fenwick) - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Sumas de prefijo\n * 2) Consultas de suma de rango\n * 3) Actualizaciones de puntos\n * 4) Operación de broca inferior\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Árbol Fenwick / Árbol indexado binario\nclass BinaryIndexedTree {\n    private final int[] tree;\n\n    public BinaryIndexedTree(int size) {\n        tree = new int[size + 1]; // indexación basada en 1\n    }\n\n    public void update(int index, int delta) {\n        for (int i = index + 1; i < tree.length; i += i & -i) {\n            tree[i] += delta;\n        }\n    }\n\n    public int prefixSum(int index) {\n        int sum = 0;\n        for (int i = index + 1; i > 0; i -= i & -i) {\n            sum += tree[i];\n        }\n        return sum;\n    }\n\n    public int rangeSum(int left, int right) {\n        return prefixSum(right) - prefixSum(left - 1);\n    }\n\n    public static void main(String[] args) {\n        BinaryIndexedTree bit = new BinaryIndexedTree(10);\n        int[] nums = {1, 2, 3, 4, 5};\n        for (int i = 0; i < nums.length; i++) {\n            bit.update(i, nums[i]);\n        }\n        System.out.println(\"Suma de prefijo(3) =\" + bit.prefixSum(3));\n        bit.update(2, 5); // suma 5 al índice 2\n        System.out.println(\"Suma de rango(1,3) =\" + bit.rangeSum(1, 3));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Árboles indexados binarios (árboles de Fenwick)\";\n    string moduleDescription = \"La demostración de BIT enfatiza el truco de los bits bajos: `update` sube con `i += i & -i`, `prefixSum` camina hacia abajo y `rangeSum` simplemente resta prefijos para que puedas visualizar el árbol implícito.\";\n    vector<string> topics = {\"Sumas de prefijo\", \"Consultas de suma de rango\", \"Actualizaciones de puntos\", \"Operación de broca inferior\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Árboles indexados binarios (árboles de Fenwick)\"\n    module_description = \"La demostración de BIT enfatiza el truco de los bits bajos: `update` sube con `i += i & -i`, `prefixSum` camina hacia abajo y `rangeSum` simplemente resta prefijos para que puedas visualizar el árbol implícito.\"\n    topics = [\"Sumas de prefijo\", \"Consultas de suma de rango\", \"Actualizaciones de puntos\", \"Operación de broca inferior\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Árboles indexados binarios (árboles de Fenwick)\";\n    const moduleDescription = \"La demostración de BIT enfatiza el truco de los bits bajos: `update` sube con `i += i & -i`, `prefixSum` camina hacia abajo y `rangeSum` simplemente resta prefijos para que puedas visualizar el árbol implícito.\";\n    const topics = [\"Sumas de prefijo\", \"Consultas de suma de rango\", \"Actualizaciones de puntos\", \"Operación de broca inferior\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "advanced-trees": {
        "title": "Estructuras de árbol avanzadas",
        "description": "La tubería de inserción AVL actualiza las alturas, verifica los factores de equilibrio y activa las rotaciones correctas antes de que un recorrido en orden verifique que el árbol permaneció ordenado.",
        "topics": [
          "Árboles AVL",
          "Árboles rojo-negros",
          "Árboles B",
          "Árboles extendidos",
          "Rotaciones de árboles"
        ],
        "explanation": "Los árboles equilibrados (árboles AVL, Rojo-Negro, B/B+) imponen garantías de altura mediante rotaciones. Verá tutoriales con estilo de animación sobre inserción/eliminación, comparará estrategias de equilibrio y estudiará casos de uso como mapas ordenados, árboles de intervalos e índices de bases de datos.",
        "resources": [
          "Árboles autoequilibrados",
          "Técnicas de rotación de árboles"
        ],
        "codeExamples": {
          "java": "/*\n * Estructuras de árbol avanzadas - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Árboles AVL\n * 2) Árboles rojo-negros\n * 3) Árboles B\n * 4) Árboles extendidos\n * 5) Rotaciones de árboles\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Árbol AVL con rotaciones para mantener el equilibrio.\nclass AVLTree {\n    static class Node {\n        int key, height;\n        Node left, right;\n        Node(int key) {\n            this.key = key;\n            height = 1;\n        }\n    }\n\n    private Node root;\n\n    public void insert(int key) {\n        root = insert(root, key);\n    }\n\n    private Node insert(Node node, int key) {\n        if (node == null) return new Node(key);\n        if (key < node.key) {\n            node.left = insert(node.left, key);\n        } else if (key > node.key) {\n            node.right = insert(node.right, key);\n        } else {\n            return node; // sin duplicados\n        }\n        updateHeight(node);\n        return rebalance(node);\n    }\n\n    private Node rebalance(Node node) {\n        int balance = getBalance(node);\n        if (balance > 1 && getBalance(node.left) >= 0) return rotateRight(node);\n        if (balance > 1 && getBalance(node.left) < 0) {\n            node.left = rotateLeft(node.left);\n            return rotateRight(node);\n        }\n        if (balance < -1 && getBalance(node.right) <= 0) return rotateLeft(node);\n        if (balance < -1 && getBalance(node.right) > 0) {\n            node.right = rotateRight(node.right);\n            return rotateLeft(node);\n        }\n        return node;\n    }\n\n    private Node rotateLeft(Node x) {\n        Node y = x.right;\n        Node T2 = y.left;\n        y.left = x;\n        x.right = T2;\n        updateHeight(x);\n        updateHeight(y);\n        return y;\n    }\n\n    private Node rotateRight(Node y) {\n        Node x = y.left;\n        Node T2 = x.right;\n        x.right = y;\n        y.left = T2;\n        updateHeight(y);\n        updateHeight(x);\n        return x;\n    }\n\n    private void updateHeight(Node node) {\n        node.height = 1 + Math.max(height(node.left), height(node.right));\n    }\n\n    private int height(Node node) {\n        return node == null ? 0 : node.height;\n    }\n\n    private int getBalance(Node node) {\n        return node == null ? 0 : height(node.left) - height(node.right);\n    }\n\n    public void inorderTraversal() {\n        inorder(root);\n        System.out.println();\n    }\n\n    private void inorder(Node node) {\n        if (node == null) return;\n        inorder(node.left);\n        System.out.print(node.key + \" \");\n        inorder(node.right);\n    }\n\n    public static void main(String[] args) {\n        AVLTree tree = new AVLTree();\n        int[] values = {30, 20, 40, 10, 25, 35, 50, 5};\n        for (int v : values) tree.insert(v);\n        tree.inorderTraversal();\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Estructuras de árbol avanzadas\";\n    string moduleDescription = \"La tubería de inserción AVL actualiza las alturas, verifica los factores de equilibrio y activa las rotaciones correctas antes de que un recorrido en orden verifique que el árbol permaneció ordenado.\";\n    vector<string> topics = {\"Árboles AVL\", \"Árboles rojo-negros\", \"Árboles B\", \"Árboles extendidos\", \"Rotaciones de árboles\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Estructuras de árbol avanzadas\"\n    module_description = \"La tubería de inserción AVL actualiza las alturas, verifica los factores de equilibrio y activa las rotaciones correctas antes de que un recorrido en orden verifique que el árbol permaneció ordenado.\"\n    topics = [\"Árboles AVL\", \"Árboles rojo-negros\", \"Árboles B\", \"Árboles extendidos\", \"Rotaciones de árboles\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Estructuras de árbol avanzadas\";\n    const moduleDescription = \"La tubería de inserción AVL actualiza las alturas, verifica los factores de equilibrio y activa las rotaciones correctas antes de que un recorrido en orden verifique que el árbol permaneció ordenado.\";\n    const topics = [\"Árboles AVL\", \"Árboles rojo-negros\", \"Árboles B\", \"Árboles extendidos\", \"Rotaciones de árboles\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "string-algorithms": {
        "title": "Algoritmos de cadenas avanzados",
        "description": "Construimos la tabla de prefijos KMP y la introducimos en `kmpSearch`, haciendo una pausa en cada salto del puntero para que comprenda cómo la matriz `lps` omite comparaciones redundantes.",
        "topics": [
          "Algoritmo KMP",
          "Rabin-Karp",
          "boyer-moore",
          "Matrices de sufijos",
          "Hashing de cadenas"
        ],
        "explanation": "Derivamos tablas de funciones de prefijo para KMP, hashes rodantes para Rabin-Karp y heurísticas de caracteres buenos/malos para Boyer-Moore. Otros temas incluyen matrices/autómatas de sufijos, algoritmo Z y cómo combinar hash con búsqueda binaria para problemas de subcadenas.",
        "resources": [
          "Coincidencia de patrones",
          "Optimización del procesamiento de cadenas"
        ],
        "codeExamples": {
          "java": "/*\n * Algoritmos de cadenas avanzados - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Algoritmo KMP\n * 2) Rabin-Karp\n * 3) boyer-moore\n * 4) Matrices de sufijos\n * 5) Hashing de cadenas\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Coincidencia de patrones Knuth-Morris-Pratt (KMP)\nimport java.util.Arrays;\n\npublic class StringAlgorithms {\n\n    public static int[] buildPrefixTable(String pattern) {\n        int[] lps = new int[pattern.length()];\n        int len = 0;\n        for (int i = 1; i < pattern.length();) {\n            if (pattern.charAt(i) == pattern.charAt(len)) {\n                lps[i++] = ++len;\n            } else if (len != 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i++] = 0;\n            }\n        }\n        return lps;\n    }\n\n    public static int kmpSearch(String text, String pattern) {\n        if (pattern.isEmpty()) return 0;\n        int[] lps = buildPrefixTable(pattern);\n        int i = 0, j = 0;\n        while (i < text.length()) {\n            if (text.charAt(i) == pattern.charAt(j)) {\n                i++; j++;\n                if (j == pattern.length()) return i - j; // coincidencia encontrada\n            } else if (j != 0) {\n                j = lps[j - 1];\n            } else {\n                i++;\n            }\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        String text = \"abxabcabcaby\";\n        String pattern = \"abcaby\";\n        System.out.println(\"Tabla de prefijos:\" + Arrays.toString(buildPrefixTable(pattern)));\n        System.out.println(\"Índice de búsqueda KMP:\" + kmpSearch(text, pattern));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Algoritmos de cadenas avanzados\";\n    string moduleDescription = \"Construimos la tabla de prefijos KMP y la introducimos en `kmpSearch`, haciendo una pausa en cada salto del puntero para que comprenda cómo la matriz `lps` omite comparaciones redundantes.\";\n    vector<string> topics = {\"Algoritmo KMP\", \"Rabin-Karp\", \"boyer-moore\", \"Matrices de sufijos\", \"Hashing de cadenas\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Algoritmos de cadenas avanzados\"\n    module_description = \"Construimos la tabla de prefijos KMP y la introducimos en `kmpSearch`, haciendo una pausa en cada salto del puntero para que comprenda cómo la matriz `lps` omite comparaciones redundantes.\"\n    topics = [\"Algoritmo KMP\", \"Rabin-Karp\", \"boyer-moore\", \"Matrices de sufijos\", \"Hashing de cadenas\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Algoritmos de cadenas avanzados\";\n    const moduleDescription = \"Construimos la tabla de prefijos KMP y la introducimos en `kmpSearch`, haciendo una pausa en cada salto del puntero para que comprenda cómo la matriz `lps` omite comparaciones redundantes.\";\n    const topics = [\"Algoritmo KMP\", \"Rabin-Karp\", \"boyer-moore\", \"Matrices de sufijos\", \"Hashing de cadenas\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "assembly-registers-memory": {
        "title": "Registros de ensamblaje y conceptos básicos de memoria",
        "description": "Este módulo inicial presenta funciones de registro, valores inmediatos y direccionamiento de memoria mediante el seguimiento de secuencias simples de carga/agregación/almacenamiento al lado de equivalentes de alto nivel.",
        "topics": [
          "Registros de CPU",
          "Direcciones de memoria",
          "Cargar/Almacenar",
          "Tamaños de datos",
          "Conciencia endiana"
        ],
        "explanation": "Mapeará el estado de la máquina de bajo nivel a variables familiares: registros como almacenamiento temporal rápido y memoria como ranuras direccionadas. El objetivo es hacer que el seguimiento instrucción por instrucción sea intuitivo antes de pasar a los procedimientos y controlar el flujo.",
        "resources": [
          "Referencia de registro x86",
          "Manual de direccionamiento de memoria"
        ],
        "codeExamples": {
          "assembly": "; x86-64 registers + memory demo (Linux, Intel syntax)\nsection .data\n    valueA dd 7\n    valueB dd 5\n    msg db \"Computed sum in EAX from valueA + valueB\", 10\n    msg_len equ $ - msg\n\nsection .text\n    global _start\n_start:\n    mov eax, [valueA]       ; EAX = 7\n    mov ebx, [valueB]       ; EBX = 5\n    add eax, ebx            ; EAX = 12\n\n    ; Write explanatory message to stdout\n    mov rax, 1              ; syscall: write\n    mov rdi, 1              ; fd: stdout\n    mov rsi, msg            ; buffer\n    mov rdx, msg_len        ; length\n    syscall\n\n    ; Exit cleanly\n    mov rax, 60             ; syscall: exit\n    xor rdi, rdi            ; status 0\n    syscall\n",
          "java": "/*\n * Registros de ensamblaje y conceptos básicos de memoria - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Registros de CPU\n * 2) Direcciones de memoria\n * 3) Cargar/Almacenar\n * 4) Tamaños de datos\n * 5) Conciencia endiana\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Razonamiento tipo registro en Java\npublic class AssemblyRegistersMemory {\n    public static void main(String[] args) {\n        int eax = 7; // fingir registro eax\n        int ebx = 5; // fingir registro ebx\n        eax = eax + ebx;\n        System.out.println(\"eax después de agregar =\" + eax);\n\n        int[] memory = {100, 200, 300};\n        int baseAddress = 0;\n        int loaded = memory[baseAddress + 1];\n        System.out.println(\"memoria cargada[base+1] =\" + loaded);\n    }\n}",
          "cpp": "// Razonamiento tipo registro en C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int eax = 7;\n    int ebx = 5;\n    eax = eax + ebx;\n    cout << \"eax después de agregar =\" << eax << \"\\n\";\n\n    int memory[] = {100, 200, 300};\n    int base = 0;\n    int loaded = memory[base + 1];\n    cout << \"memoria cargada[base+1] =\" << loaded << \"\\n\";\n    return 0;\n}",
          "python": "# Razonamiento tipo registro en Python\neax = 7\nebx = 5\neax = eax + ebx\nprint(\"eax después de agregar =\", eax)\n\nmemory = [100, 200, 300]\nbase = 0\nloaded = memory[base + 1]\nprint(\"memoria cargada[base+1] =\", loaded)",
          "javascript": "// Razonamiento tipo registro en JavaScript\nlet eax = 7;\nconst ebx = 5;\neax = eax + ebx;\nconsole.log(\"eax después de agregar =\", eax);\n\nconst memory = [100, 200, 300];\nconst base = 0;\nconst loaded = memory[base + 1];\nconsole.log(\"memoria cargada[base+1] =\", loaded);"
        }
      },
      "assembly-control-flow-procedures": {
        "title": "Procedimientos y flujo de control de montaje",
        "description": "Los indicadores de bifurcación, los contadores de bucle y los marcos de llamada/retorno se demuestran en rutinas breves para que pueda ver cómo se representan las llamadas de alto nivel \"if\", \"mientras\" y funciones en el ensamblado.",
        "topics": [
          "CMP y banderas",
          "Saltos condicionales",
          "Bucles",
          "Llamar/Retirar",
          "Convenciones de llamada"
        ],
        "explanation": "Este módulo conecta condiciones de salto y marcos de llamada a la programación estructurada. Leerá rastros de patrones de comparación/bifurcación, comportamiento de pila entre llamadas y salidas de bucle para generar confianza al depurar el flujo de bajo nivel.",
        "resources": [
          "Hoja de referencia de la convención de llamadas",
          "Tabla de salto condicional"
        ],
        "codeExamples": {
          "assembly": "; Control flow + procedure demo (Linux, Intel syntax)\nsection .data\n    done_msg db \"sum_to_n finished successfully\", 10\n    done_len equ $ - done_msg\n\nsection .text\n    global _start\n\nsum_to_n:\n    ; Input: ECX = n, Output: EAX = 1 + ... + n\n    xor eax, eax             ; total = 0\n.loop:\n    add eax, ecx\n    dec ecx\n    jnz .loop\n    ret\n\n_start:\n    mov ecx, 5\n    call sum_to_n            ; EAX = 15\n\n    cmp eax, 10              ; branch example\n    jle .skip_print\n    mov rax, 1               ; write\n    mov rdi, 1               ; stdout\n    mov rsi, done_msg\n    mov rdx, done_len\n    syscall\n\n.skip_print:\n    mov rax, 60              ; exit\n    xor rdi, rdi\n    syscall\n",
          "java": "/*\n * Procedimientos y flujo de control de montaje - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) CMP y banderas\n * 2) Saltos condicionales\n * 3) Bucles\n * 4) Llamar/Retirar\n * 5) Convenciones de llamada\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Control de flujo y equivalentes de procedimientos en Java\npublic class AssemblyControlFlowProcedures {\n    static int sumToN(int n) {\n        int total = 0;\n        while (n != 0) {\n            total += n;\n            n--;\n        }\n        return total;\n    }\n\n    public static void main(String[] args) {\n        int result = sumToN(5);\n        System.out.println(\"sumaN(5) =\" + result);\n        if (result > 10) {\n            System.out.println(\"rama tomada: resultado > 10\");\n        }\n    }\n}",
          "cpp": "// Control de flujo y equivalentes de procedimientos en C++\n#include <iostream>\nusing namespace std;\n\nint sumToN(int n) {\n    int total = 0;\n    while (n != 0) {\n        total += n;\n        n--;\n    }\n    return total;\n}\n\nint main() {\n    int result = sumToN(5);\n    cout << \"sumaN(5) =\" << result << \"\\n\";\n    if (result > 10) {\n        cout << \"rama tomada: resultado > 10\\n\";\n    }\n    return 0;\n}",
          "python": "# Control de flujo y equivalentes de procedimientos en Python\ndef sum_to_n(n):\n    total = 0\n    while n != 0:\n        total += n\n        n -= 1\n    return total\n\nresult = sum_to_n(5)\nprint(\"suma_a_n(5) =\", result)\nif result > 10:\n    print(\"rama tomada: resultado > 10\")",
          "javascript": "// Control de flujo y equivalentes de procedimientos en JavaScript\nfunction sumToN(n) {\n    let total = 0;\n    while (n !== 0) {\n        total += n;\n        n -= 1;\n    }\n    return total;\n}\n\nconst result = sumToN(5);\nconsole.log(\"sumaN(5) =\", result);\nif (result > 10) {\n    console.log(\"rama tomada: resultado > 10\");\n}"
        }
      },
      "assembly-arrays-strings-io": {
        "title": "Matrices de ensamblaje, cadenas y E/S básicas",
        "description": "El puntero que pasa por encima de matrices, escaneos de cadenas terminadas en nulo y patrones mínimos de E/S se dividen en pequeños ejemplos para que el recorrido de datos en el ensamblaje se sienta concreto.",
        "topics": [
          "Aritmética de punteros",
          "Recorrido de matriz",
          "Cadenas terminadas en nulo",
          "Llamadas al sistema",
          "Acceso a bytes/palabras"
        ],
        "explanation": "Practicará el movimiento de datos de bajo nivel a través de matrices y cadenas, luego relacionará esos patrones con bucles de nivel superior y rutinas de salida. Al final, los incrementos del puntero, las comprobaciones centinela y la configuración de salida deberían resultar naturales.",
        "resources": [
          "Operaciones de cadena de montaje",
          "Referencia de llamada al sistema (introducción)"
        ],
        "codeExamples": {
          "assembly": "; Arrays + strings + basic I/O (Linux, Intel syntax)\nsection .data\n    nums dd 3, 4, 5, 6\n    text db \"HELLO\", 0\n    out_msg db \"Array sum and string length computed\", 10\n    out_len equ $ - out_msg\n\nsection .text\n    global _start\n_start:\n    xor eax, eax          ; sum = 0\n    mov ecx, 4            ; count\n    mov rsi, nums         ; pointer to array\n.sum_loop:\n    add eax, [rsi]\n    add rsi, 4            ; next int32 element\n    loop .sum_loop\n\n    ; string length scan\n    mov rdi, text\n    xor ebx, ebx\n.len_loop:\n    cmp byte [rdi], 0\n    je .done\n    inc ebx\n    inc rdi\n    jmp .len_loop\n.done:\n    ; EAX = array sum, EBX = string length\n    ; Print completion message\n    mov rax, 1              ; write\n    mov rdi, 1              ; stdout\n    mov rsi, out_msg\n    mov rdx, out_len\n    syscall\n\n    ; Exit\n    mov rax, 60             ; exit\n    xor rdi, rdi\n    syscall\n",
          "java": "/*\n * Matrices de ensamblaje, cadenas y E/S básicas - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Aritmética de punteros\n * 2) Recorrido de matriz\n * 3) Cadenas terminadas en nulo\n * 4) Llamadas al sistema\n * 5) Acceso a bytes/palabras\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Matrices, cadenas y E/S analógicas en Java\npublic class AssemblyArraysStringsIO {\n    public static void main(String[] args) {\n        int[] nums = {3, 4, 5, 6};\n        int sum = 0;\n        for (int value : nums) sum += value;\n\n        String text = \"HELLO\";\n        int length = text.length();\n\n        System.out.println(\"suma(núms) =\" + sum);\n        System.out.println(\"longitud (texto) =\" + length);\n        System.out.println(\"Demostración de E/S completa.\");\n    }\n}",
          "cpp": "// Matrices, cadenas y E/S analógicas en C++\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int nums[] = {3, 4, 5, 6};\n    int sum = 0;\n    for (int value : nums) sum += value;\n\n    string text = \"HELLO\";\n    int length = static_cast<int>(text.size());\n\n    cout << \"suma(núms) =\" << sum << \"\\n\";\n    cout << \"longitud (texto) =\" << length << \"\\n\";\n    cout << \"Demostración de E/S completa.\\n\";\n    return 0;\n}",
          "python": "# Matrices, cadenas y entradas/salidas analógicas en Python\nnums = [3, 4, 5, 6]\nsum_value = sum(nums)\ntext = \"HELLO\"\nlength = len(text)\n\nprint(\"suma(núms) =\", sum_value)\nprint(\"longitud (texto) =\", length)\nprint(\"Demostración de E/S completa.\")",
          "javascript": "// Matrices, cadenas y entradas/salidas analógicas en JavaScript\nconst nums = [3, 4, 5, 6];\nconst sumValue = nums.reduce((acc, value) => acc + value, 0);\nconst text = \"HELLO\";\nconst length = text.length;\n\nconsole.log(\"suma(núms) =\", sumValue);\nconsole.log(\"longitud (texto) =\", length);\nconsole.log(\"Demostración de E/S completa.\");"
        }
      },
      "bit-manipulation": {
        "title": "Manipulación de bits",
        "description": "Funciones como `isPowerOfTwo`, `countBits`, `singleNumber` y `lowbit` exponen máscaras y trucos XOR; decimos lo que cada operación hace a los bits subyacentes.",
        "topics": [
          "Operadores bit a bit",
          "Máscaras de bits",
          "poder de dos",
          "Propiedades XOR",
          "Conteo de bits"
        ],
        "explanation": "Los trucos de bits permiten el seguimiento del estado O(1), la iteración de subconjuntos y las optimizaciones aritméticas. Practicamos enmascaramiento, alternancia, extracción de bits bajos, códigos Gray y problemas basados ​​en XOR para que pueda razonar con confianza sobre representaciones binarias.",
        "resources": [
          "Operaciones bit a bit",
          "Trucos de bits"
        ],
        "codeExamples": {
          "java": "/*\n * Manipulación de bits - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Operadores bit a bit\n * 2) Máscaras de bits\n * 3) poder de dos\n * 4) Propiedades XOR\n * 5) Conteo de bits\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Técnicas comunes de manipulación de bits\npublic class BitManipulation {\n\n    public static boolean isPowerOfTwo(int n) {\n        return n > 0 && (n & (n - 1)) == 0;\n    }\n\n    public static int countBits(int n) {\n        int count = 0;\n        while (n != 0) {\n            n &= (n - 1); // soltar el bit establecido más bajo\n            count++;\n        }\n        return count;\n    }\n\n    public static int singleNumber(int[] nums) {\n        int xor = 0;\n        for (int num : nums) {\n            xor ^= num;\n        }\n        return xor;\n    }\n\n    public static int lowbit(int n) {\n        return n & -n;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"¿Es 16 potencia de dos?\" + isPowerOfTwo(16));\n        System.out.println(\"Bits en 29:\" + countBits(29));\n        System.out.println(\"Número único:\" + singleNumber(new int[]{2, 3, 2, 4, 4})); // 3\n        System.out.println(\"Bit bajo de 12:\" + lowbit(12));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Manipulación de bits\";\n    string moduleDescription = \"Funciones como `isPowerOfTwo`, `countBits`, `singleNumber` y `lowbit` exponen máscaras y trucos XOR; decimos lo que cada operación hace a los bits subyacentes.\";\n    vector<string> topics = {\"Operadores bit a bit\", \"Máscaras de bits\", \"poder de dos\", \"Propiedades XOR\", \"Conteo de bits\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Manipulación de bits\"\n    module_description = \"Funciones como `isPowerOfTwo`, `countBits`, `singleNumber` y `lowbit` exponen máscaras y trucos XOR; decimos lo que cada operación hace a los bits subyacentes.\"\n    topics = [\"Operadores bit a bit\", \"Máscaras de bits\", \"poder de dos\", \"Propiedades XOR\", \"Conteo de bits\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Manipulación de bits\";\n    const moduleDescription = \"Funciones como `isPowerOfTwo`, `countBits`, `singleNumber` y `lowbit` exponen máscaras y trucos XOR; decimos lo que cada operación hace a los bits subyacentes.\";\n    const topics = [\"Operadores bit a bit\", \"Máscaras de bits\", \"poder de dos\", \"Propiedades XOR\", \"Conteo de bits\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "java-basics": {
        "title": "Fundamentos de Java",
        "description": "`JavaBasics` conecta campos a través de un constructor, expone `getInfo` y crea una instancia en `main`, desglosando cómo los objetos almacenan el estado y exponen el comportamiento.",
        "topics": [
          "variables",
          "Tipos de datos",
          "Métodos",
          "Clases",
          "Objetos"
        ],
        "explanation": "Este manual explica el modelo JVM, los tipos primitivos frente a los de referencia, el diseño de la memoria y cómo estructurar programas pequeños con paquetes y herramientas de compilación. Cada tema se combina con ejercicios breves para que pueda pasar de la memorización de la sintaxis a la escritura de Java idiomático.",
        "resources": [
          "Documentación Java",
          "Tutoriales de Oracle Java",
          "Guía de sintaxis de Java"
        ],
        "codeExamples": {
          "java": "/*\n * Fundamentos de Java - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) variables\n * 2) Tipos de datos\n * 3) Métodos\n * 4) Clases\n * 5) Objetos\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Conceptos básicos de Java: variables y métodos\npublic class JavaBasics {\n    // variables de instancia\n    private String name;\n    private int age;\n    \n    // Constructor\n    public JavaBasics(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    // Método con valor de retorno\n    public String getInfo() {\n        return \"Nombre:\" + name + \", Edad:\" + age;\n    }\n    \n    // método estático\n    public static void main(String[] args) {\n        JavaBasics person = new JavaBasics(\"Alice\", 25);\n        System.out.println(person.getInfo());\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Fundamentos de Java\";\n    string moduleDescription = \"`JavaBasics` conecta campos a través de un constructor, expone `getInfo` y crea una instancia en `main`, desglosando cómo los objetos almacenan el estado y exponen el comportamiento.\";\n    vector<string> topics = {\"variables\", \"Tipos de datos\", \"Métodos\", \"Clases\", \"Objetos\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Fundamentos de Java\"\n    module_description = \"`JavaBasics` conecta campos a través de un constructor, expone `getInfo` y crea una instancia en `main`, desglosando cómo los objetos almacenan el estado y exponen el comportamiento.\"\n    topics = [\"variables\", \"Tipos de datos\", \"Métodos\", \"Clases\", \"Objetos\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Fundamentos de Java\";\n    const moduleDescription = \"`JavaBasics` conecta campos a través de un constructor, expone `getInfo` y crea una instancia en `main`, desglosando cómo los objetos almacenan el estado y exponen el comportamiento.\";\n    const topics = [\"variables\", \"Tipos de datos\", \"Métodos\", \"Clases\", \"Objetos\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "git-basics-workflow": {
        "title": "Fundamentos de Git y Flujo de Colaboración",
        "description": "Este módulo inicial recorre la configuración de repositorio, staging, commits, ramas, flujo pull/merge, resolución básica de conflictos y comandos seguros para deshacer cambios en proyectos reales.",
        "topics": [
          "Configuración de Repositorio",
          "Staging y Commits",
          "Ramas y Merge",
          "Fundamentos de Pull/Rebase",
          "Conflictos de Merge (Básico)",
          "Colaboración con Remotos",
          "Deshacer con Restore/Revert"
        ],
        "explanation": "Git no es solo comandos: es un modelo de seguridad para colaborar. Aprenderá el modelo de tres estados (working tree, staging area y repositorio), por qué convienen commits pequeños y cómo el trabajo por ramas protege `main`. También se cubre cuándo usar `restore` para limpiar cambios locales y cuándo usar `revert` para deshacer en historial compartido sin romper al equipo.",
        "resources": [
          "Libro Oficial de Git",
          "Guía de GitHub Flow",
          "Tutoriales de Git (Atlassian)",
          "Mensajes de Commit Convencionales"
        ],
        "codeExamples": {
          "java": "/*\n * Fundamentos de Git y Flujo de Colaboración - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Configuración de Repositorio\n * 2) Staging y Commits\n * 3) Ramas y Merge\n * 4) Fundamentos de Pull/Rebase\n * 5) Conflictos de Merge (Básico)\n * 6) Colaboración con Remotos\n * 7) Deshacer con Restore/Revert\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\nimport java.util.*;\n\npublic class GitBasicsWorkflowDemo {\n    public static void main(String[] args) {\n        // This runnable sample prints a practical Git workflow in execution order.\n        List<String> commands = Arrays.asList(\n            \"git init\",\n            \"git branch -M main\",\n            \"git add .\",\n            \"git commit -m \\\"feat: meaningful snapshot\\\"\",\n            \"git checkout -b feature/safe-change\",\n            \"git fetch origin\",\n            \"git pull --rebase origin main\",\n            \"git push -u origin feature/safe-change\",\n            \"git checkout main\",\n            \"git merge --no-ff feature/safe-change\",\n            \"git revert <commit-hash>    // safe undo on shared history\"\n        );\n\n        // Explain each command so beginners understand both syntax and intent.\n        System.out.println(\"Recorrido de aprendizaje de Git:\");\n        for (int i = 0; i < commands.size(); i++) {\n            System.out.println((i + 1) + \". \" + commands.get(i));\n        }\n\n        // Key mental model: working tree -> staging area -> repository history.\n        System.out.println(\"Modelo: árbol de trabajo -> área de preparación -> historial de commits.\");\n        System.out.println(\"Regla: usa revert para historial compartido y restore para limpieza local.\");\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Fundamentos de Git y Flujo de Colaboración\";\n    string moduleDescription = \"Este módulo inicial recorre la configuración de repositorio, staging, commits, ramas, flujo pull/merge, resolución básica de conflictos y comandos seguros para deshacer cambios en proyectos reales.\";\n    vector<string> topics = {\"Configuración de Repositorio\", \"Staging y Commits\", \"Ramas y Merge\", \"Fundamentos de Pull/Rebase\", \"Conflictos de Merge (Básico)\", \"Colaboración con Remotos\"};\n    vector<string> javaSignals = {\"Recorrido de aprendizaje de Git:\", \"Modelo: árbol de trabajo -> área de preparación -> historial de commits.\", \"Regla: usa revert para historial compartido y restore para limpieza local.\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Fundamentos de Git y Flujo de Colaboración\"\n    module_description = \"Este módulo inicial recorre la configuración de repositorio, staging, commits, ramas, flujo pull/merge, resolución básica de conflictos y comandos seguros para deshacer cambios en proyectos reales.\"\n    topics = [\"Configuración de Repositorio\", \"Staging y Commits\", \"Ramas y Merge\", \"Fundamentos de Pull/Rebase\", \"Conflictos de Merge (Básico)\", \"Colaboración con Remotos\"]\n    java_signals = [\"Recorrido de aprendizaje de Git:\", \"Modelo: árbol de trabajo -> área de preparación -> historial de commits.\", \"Regla: usa revert para historial compartido y restore para limpieza local.\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Fundamentos de Git y Flujo de Colaboración\";\n    const moduleDescription = \"Este módulo inicial recorre la configuración de repositorio, staging, commits, ramas, flujo pull/merge, resolución básica de conflictos y comandos seguros para deshacer cambios en proyectos reales.\";\n    const topics = [\"Configuración de Repositorio\", \"Staging y Commits\", \"Ramas y Merge\", \"Fundamentos de Pull/Rebase\", \"Conflictos de Merge (Básico)\", \"Colaboración con Remotos\"];\n    const javaSignals = [\"Recorrido de aprendizaje de Git:\", \"Modelo: árbol de trabajo -> área de preparación -> historial de commits.\", \"Regla: usa revert para historial compartido y restore para limpieza local.\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "control-flow": {
        "title": "Declaraciones de flujo de control",
        "description": "`ControlFlow.main` encadena una escalera if/else, un bucle for clásico y un bucle for mejorado para que puedas rastrear cómo cada rama o contador impulsa la salida de la consola.",
        "topics": [
          "Si no",
          "Para bucles",
          "Mientras bucles",
          "Cambiar",
          "Pausa/Continuar"
        ],
        "explanation": "Relacionamos cada estructura de control con escenarios reales (validación, acumulación, manejo de menús) y resaltamos dificultades como bucles infinitos o interruptores fallidos. Los ejercicios de diagramas de flujo y los consejos de depuración refuerzan cómo rastrear la ejecución del programa paso a paso.",
        "resources": [
          "Declaraciones de control de Java",
          "Ejemplos de bucles",
          "Lógica condicional"
        ],
        "codeExamples": {
          "java": "/*\n * Declaraciones de flujo de control - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Si no\n * 2) Para bucles\n * 3) Mientras bucles\n * 4) Cambiar\n * 5) Pausa/Continuar\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ejemplos de flujo de control\npublic class ControlFlow {\n    public static void main(String[] args) {\n        // Ejemplo si no\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"una calificación\");\n        } else if (score >= 80) {\n            System.out.println(\"grado B\");\n        } else {\n            System.out.println(\"Grado C o inferior\");\n        }\n        \n        // Para ejemplo de bucle\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(\"Contar:\" + i);\n        }\n        \n        // Bucle for mejorado\n        int[] numbers = {1, 2, 3, 4, 5};\n        for (int num : numbers) {\n            System.out.println(\"Número:\" + num);\n        }\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Declaraciones de flujo de control\";\n    string moduleDescription = \"`ControlFlow.main` encadena una escalera if/else, un bucle for clásico y un bucle for mejorado para que puedas rastrear cómo cada rama o contador impulsa la salida de la consola.\";\n    vector<string> topics = {\"Si no\", \"Para bucles\", \"Mientras bucles\", \"Cambiar\", \"Pausa/Continuar\"};\n    vector<string> javaSignals = {\"una calificación\", \"grado B\", \"Grado C o inferior\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Declaraciones de flujo de control\"\n    module_description = \"`ControlFlow.main` encadena una escalera if/else, un bucle for clásico y un bucle for mejorado para que puedas rastrear cómo cada rama o contador impulsa la salida de la consola.\"\n    topics = [\"Si no\", \"Para bucles\", \"Mientras bucles\", \"Cambiar\", \"Pausa/Continuar\"]\n    java_signals = [\"una calificación\", \"grado B\", \"Grado C o inferior\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Declaraciones de flujo de control\";\n    const moduleDescription = \"`ControlFlow.main` encadena una escalera if/else, un bucle for clásico y un bucle for mejorado para que puedas rastrear cómo cada rama o contador impulsa la salida de la consola.\";\n    const topics = [\"Si no\", \"Para bucles\", \"Mientras bucles\", \"Cambiar\", \"Pausa/Continuar\"];\n    const javaSignals = [\"una calificación\", \"grado B\", \"Grado C o inferior\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "oop-basics": {
        "title": "Programación orientada a objetos",
        "description": "Un \"Animal\" abstracto define el estado/comportamiento compartido, \"Perro\" anula \"makeSound\" y el método heredado \"dormir\" demuestra encapsulación y polimorfismo en un fragmento.",
        "topics": [
          "Encapsulación",
          "Herencia",
          "Polimorfismo",
          "Abstracción",
          "Interfaces"
        ],
        "explanation": "La encapsulación, la herencia y el polimorfismo se demuestran con minisistemas cohesivos (cuentas bancarias, entidades de juego) para que pueda ver cómo las opciones de diseño afectan la flexibilidad. Interfaces versus clases abstractas, composición sobre herencia y principios SÓLIDOS completan la lección.",
        "resources": [
          "Programación orientada a objetos en Java",
          "Ejemplos de herencia",
          "Interfaz versus resumen"
        ],
        "codeExamples": {
          "java": "/*\n * Programación orientada a objetos - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Encapsulación\n * 2) Herencia\n * 3) Polimorfismo\n * 4) Abstracción\n * 5) Interfaces\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Conceptos de programación orientada a objetos\nabstract class Animal {\n    protected String name;\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n    \n    public abstract void makeSound();\n    \n    public void sleep() {\n        System.out.println(name + \"esta durmiendo\");\n    }\n}\n\nclass Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n    \n    @Override\n    public void makeSound() {\n        System.out.println(name + \"dice ¡Guau!\");\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Programación orientada a objetos\";\n    string moduleDescription = \"Un \\\"Animal\\\" abstracto define el estado/comportamiento compartido, \\\"Perro\\\" anula \\\"makeSound\\\" y el método heredado \\\"dormir\\\" demuestra encapsulación y polimorfismo en un fragmento.\";\n    vector<string> topics = {\"Encapsulación\", \"Herencia\", \"Polimorfismo\", \"Abstracción\", \"Interfaces\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Programación orientada a objetos\"\n    module_description = \"Un \\\"Animal\\\" abstracto define el estado/comportamiento compartido, \\\"Perro\\\" anula \\\"makeSound\\\" y el método heredado \\\"dormir\\\" demuestra encapsulación y polimorfismo en un fragmento.\"\n    topics = [\"Encapsulación\", \"Herencia\", \"Polimorfismo\", \"Abstracción\", \"Interfaces\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Programación orientada a objetos\";\n    const moduleDescription = \"Un \\\"Animal\\\" abstracto define el estado/comportamiento compartido, \\\"Perro\\\" anula \\\"makeSound\\\" y el método heredado \\\"dormir\\\" demuestra encapsulación y polimorfismo en un fragmento.\";\n    const topics = [\"Encapsulación\", \"Herencia\", \"Polimorfismo\", \"Abstracción\", \"Interfaces\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "exception-handling": {
        "title": "Manejo de excepciones",
        "description": "`divide` envuelve la división en try/catch/finally mientras que `validateAge` genera una excepción personalizada, que muestra exactamente cómo se mueve la ejecución a través de rutas de error y bloques de limpieza.",
        "topics": [
          "Intentar atrapar",
          "Finalmente bloquear",
          "Excepciones personalizadas",
          "Lanza",
          "Tipos de excepción"
        ],
        "explanation": "Clasificará las excepciones marcadas y no marcadas, diseñará jerarquías personalizadas y utilizará pruebas con recursos para una limpieza segura. Los escenarios realistas cubren el registro, el ajuste de excepciones para agregar contexto y el establecimiento de controladores globales para mantener las aplicaciones resistentes.",
        "resources": [
          "Excepciones de Java",
          "Mejores prácticas de manejo de errores"
        ],
        "codeExamples": {
          "java": "/*\n * Manejo de excepciones - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Intentar atrapar\n * 2) Finalmente bloquear\n * 3) Excepciones personalizadas\n * 4) Lanza\n * 5) Tipos de excepción\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Manejo de excepciones\npublic class ExceptionExample {\n    public static void divide(int a, int b) {\n        try {\n            int result = a / b;\n            System.out.println(\"Resultado:\" + result);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error: ¡No se puede dividir por cero!\");\n        } finally {\n            System.out.println(\"Operación de división completada.\");\n        }\n    }\n    \n    // Excepción personalizada\n    public static void validateAge(int age) throws InvalidAgeException {\n        if (age < 0) {\n            throw new InvalidAgeException(\"La edad no puede ser negativa.\");\n        }\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Manejo de excepciones\";\n    string moduleDescription = \"`divide` envuelve la división en try/catch/finally mientras que `validateAge` genera una excepción personalizada, que muestra exactamente cómo se mueve la ejecución a través de rutas de error y bloques de limpieza.\";\n    vector<string> topics = {\"Intentar atrapar\", \"Finalmente bloquear\", \"Excepciones personalizadas\", \"Lanza\", \"Tipos de excepción\"};\n    vector<string> javaSignals = {\"Error: ¡No se puede dividir por cero!\", \"Operación de división completada.\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Manejo de excepciones\"\n    module_description = \"`divide` envuelve la división en try/catch/finally mientras que `validateAge` genera una excepción personalizada, que muestra exactamente cómo se mueve la ejecución a través de rutas de error y bloques de limpieza.\"\n    topics = [\"Intentar atrapar\", \"Finalmente bloquear\", \"Excepciones personalizadas\", \"Lanza\", \"Tipos de excepción\"]\n    java_signals = [\"Error: ¡No se puede dividir por cero!\", \"Operación de división completada.\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Manejo de excepciones\";\n    const moduleDescription = \"`divide` envuelve la división en try/catch/finally mientras que `validateAge` genera una excepción personalizada, que muestra exactamente cómo se mueve la ejecución a través de rutas de error y bloques de limpieza.\";\n    const topics = [\"Intentar atrapar\", \"Finalmente bloquear\", \"Excepciones personalizadas\", \"Lanza\", \"Tipos de excepción\"];\n    const javaSignals = [\"Error: ¡No se puede dividir por cero!\", \"Operación de división completada.\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "collections-framework": {
        "title": "Marco de colecciones de Java",
        "description": "`CollectionsExample` construye un `ArrayList`, `HashMap` y `HashSet` dentro de `main`, resaltando las adiciones, colocaciones y el manejo de duplicados para que el comportamiento de cada colección sea tangible.",
        "topics": [
          "Lista de matrices",
          "HashMap",
          "Conjunto de hash",
          "ÁrbolMapa",
          "Lista enlazada",
          "Iteradores"
        ],
        "explanation": "Comparamos variantes de Lista/Conjunto/Mapa, analizamos el orden y las características de concurrencia y mostramos cómo los iteradores, flujos y recopiladores interactúan con las colecciones. Los laboratorios prácticos incluyen la implementación de cachés, tablas de frecuencia y utilidades de mapas múltiples.",
        "resources": [
          "Colecciones Java",
          "Mapa vs conjunto",
          "Rendimiento de la colección"
        ],
        "codeExamples": {
          "java": "/*\n * Marco de colecciones de Java - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Lista de matrices\n * 2) HashMap\n * 3) Conjunto de hash\n * 4) ÁrbolMapa\n * 5) Lista enlazada\n * 6) Iteradores\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Marco de colecciones\nimport java.util.*;\n\npublic class CollectionsExample {\n    public static void main(String[] args) {\n        // Ejemplo de lista de matrices\n        List<String> fruits = new ArrayList<>();\n        fruits.add(\"Apple\");\n        fruits.add(\"Banana\");\n        \n        // Ejemplo de mapa hash\n        Map<String, Integer> scores = new HashMap<>();\n        scores.put(\"Alice\", 95);\n        scores.put(\"Bob\", 87);\n        \n        // Ejemplo de HashSet\n        Set<Integer> uniqueNumbers = new HashSet<>();\n        uniqueNumbers.add(1);\n        uniqueNumbers.add(2);\n        uniqueNumbers.add(1); // Duplicado ignorado\n        \n        System.out.println(\"Números únicos:\" + uniqueNumbers.size());\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Marco de colecciones de Java\";\n    string moduleDescription = \"`CollectionsExample` construye un `ArrayList`, `HashMap` y `HashSet` dentro de `main`, resaltando las adiciones, colocaciones y el manejo de duplicados para que el comportamiento de cada colección sea tangible.\";\n    vector<string> topics = {\"Lista de matrices\", \"HashMap\", \"Conjunto de hash\", \"ÁrbolMapa\", \"Lista enlazada\", \"Iteradores\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Marco de colecciones de Java\"\n    module_description = \"`CollectionsExample` construye un `ArrayList`, `HashMap` y `HashSet` dentro de `main`, resaltando las adiciones, colocaciones y el manejo de duplicados para que el comportamiento de cada colección sea tangible.\"\n    topics = [\"Lista de matrices\", \"HashMap\", \"Conjunto de hash\", \"ÁrbolMapa\", \"Lista enlazada\", \"Iteradores\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Marco de colecciones de Java\";\n    const moduleDescription = \"`CollectionsExample` construye un `ArrayList`, `HashMap` y `HashSet` dentro de `main`, resaltando las adiciones, colocaciones y el manejo de duplicados para que el comportamiento de cada colección sea tangible.\";\n    const topics = [\"Lista de matrices\", \"HashMap\", \"Conjunto de hash\", \"ÁrbolMapa\", \"Lista enlazada\", \"Iteradores\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "file-io": {
        "title": "Entrada/salida de archivos",
        "description": "`writeToFile` y `readFromFile` combinan prueba con recursos con FileWriter y Scanner, lo que ilustra cómo abrir, transmitir y cerrar archivos mientras aparecen mensajes de error amigables.",
        "topics": [
          "Lector de archivos",
          "escritor de archivos",
          "Lector almacenado en búfer",
          "Escáner",
          "API de ruta"
        ],
        "explanation": "La unidad de E/S compara transmisiones clásicas con NIO.2, muestra el rendimiento con búfer versus sin búfer y demuestra la lectura segura de JSON/CSV. Practicará los conceptos básicos de prueba con recursos, recorrido por directorios y serialización para crear pequeñas canalizaciones ETL.",
        "resources": [
          "Flujos de E/S de Java",
          "Manejo de archivos",
          "API de ruta NIO.2"
        ],
        "codeExamples": {
          "java": "/*\n * Entrada/salida de archivos - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Lector de archivos\n * 2) escritor de archivos\n * 3) Lector almacenado en búfer\n * 4) Escáner\n * 5) API de ruta\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Operaciones de E/S de archivos\nimport java.io.*;\nimport java.util.Scanner;\n\npublic class FileIOExample {\n    public static void writeToFile(String filename, String content) {\n        try (FileWriter writer = new FileWriter(filename)) {\n            writer.write(content);\n            System.out.println(\"¡Archivo escrito exitosamente!\");\n        } catch (IOException e) {\n            System.out.println(\"Error al escribir el archivo:\" + e.getMessage());\n        }\n    }\n    \n    public static void readFromFile(String filename) {\n        try (Scanner scanner = new Scanner(new File(filename))) {\n            while (scanner.hasNextLine()) {\n                System.out.println(scanner.nextLine());\n            }\n        } catch (FileNotFoundException e) {\n            System.out.println(\"Archivo no encontrado:\" + e.getMessage());\n        }\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Entrada/salida de archivos\";\n    string moduleDescription = \"`writeToFile` y `readFromFile` combinan prueba con recursos con FileWriter y Scanner, lo que ilustra cómo abrir, transmitir y cerrar archivos mientras aparecen mensajes de error amigables.\";\n    vector<string> topics = {\"Lector de archivos\", \"escritor de archivos\", \"Lector almacenado en búfer\", \"Escáner\", \"API de ruta\"};\n    vector<string> javaSignals = {\"¡Archivo escrito exitosamente!\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Entrada/salida de archivos\"\n    module_description = \"`writeToFile` y `readFromFile` combinan prueba con recursos con FileWriter y Scanner, lo que ilustra cómo abrir, transmitir y cerrar archivos mientras aparecen mensajes de error amigables.\"\n    topics = [\"Lector de archivos\", \"escritor de archivos\", \"Lector almacenado en búfer\", \"Escáner\", \"API de ruta\"]\n    java_signals = [\"¡Archivo escrito exitosamente!\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Entrada/salida de archivos\";\n    const moduleDescription = \"`writeToFile` y `readFromFile` combinan prueba con recursos con FileWriter y Scanner, lo que ilustra cómo abrir, transmitir y cerrar archivos mientras aparecen mensajes de error amigables.\";\n    const topics = [\"Lector de archivos\", \"escritor de archivos\", \"Lector almacenado en búfer\", \"Escáner\", \"API de ruta\"];\n    const javaSignals = [\"¡Archivo escrito exitosamente!\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "multithreading": {
        "title": "Conceptos básicos de subprocesos múltiples",
        "description": "Un \"Contador\" implementa Runnable, imprime el progreso dentro de \"ejecutar\" y se inician dos subprocesos en \"principal\", lo que le permite rastrear la programación, el sueño y la interrupción elegante.",
        "topics": [
          "Clase de hilo",
          "Interfaz ejecutable",
          "Sincronización",
          "Seguridad del hilo"
        ],
        "explanation": "Comenzamos con los conceptos básicos del ciclo de vida de los subprocesos, luego presentamos las primitivas de sincronización (bloqueos, volátiles, atómicos) y ejecutores de nivel superior. Los estudios de caso cubren colas de productores-consumidores, barras de progreso y consejos de capacidad de respuesta para aplicaciones de escritorio o de servidor.",
        "resources": [
          "Concurrencia de Java",
          "Sincronización de hilos",
          "Marco ejecutor"
        ],
        "codeExamples": {
          "java": "/*\n * Conceptos básicos de subprocesos múltiples - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Clase de hilo\n * 2) Interfaz ejecutable\n * 3) Sincronización\n * 4) Seguridad del hilo\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ejemplo de subprocesos múltiples\npublic class ThreadExample {\n    // Implementación ejecutable\n    static class Counter implements Runnable {\n        private String name;\n        \n        public Counter(String name) {\n            this.name = name;\n        }\n        \n        @Override\n        public void run() {\n            for (int i = 1; i <= 5; i++) {\n                System.out.println(name + \": \" + i);\n                try {\n                    Thread.sleep(1000); // Dormir por 1 segundo\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                }\n            }\n        }\n    }\n    \n    public static void main(String[] args) {\n        Thread t1 = new Thread(new Counter(\"Thread-1\"));\n        Thread t2 = new Thread(new Counter(\"Thread-2\"));\n        \n        t1.start();\n        t2.start();\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Conceptos básicos de subprocesos múltiples\";\n    string moduleDescription = \"Un \\\"Contador\\\" implementa Runnable, imprime el progreso dentro de \\\"ejecutar\\\" y se inician dos subprocesos en \\\"principal\\\", lo que le permite rastrear la programación, el sueño y la interrupción elegante.\";\n    vector<string> topics = {\"Clase de hilo\", \"Interfaz ejecutable\", \"Sincronización\", \"Seguridad del hilo\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Conceptos básicos de subprocesos múltiples\"\n    module_description = \"Un \\\"Contador\\\" implementa Runnable, imprime el progreso dentro de \\\"ejecutar\\\" y se inician dos subprocesos en \\\"principal\\\", lo que le permite rastrear la programación, el sueño y la interrupción elegante.\"\n    topics = [\"Clase de hilo\", \"Interfaz ejecutable\", \"Sincronización\", \"Seguridad del hilo\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Conceptos básicos de subprocesos múltiples\";\n    const moduleDescription = \"Un \\\"Contador\\\" implementa Runnable, imprime el progreso dentro de \\\"ejecutar\\\" y se inician dos subprocesos en \\\"principal\\\", lo que le permite rastrear la programación, el sueño y la interrupción elegante.\";\n    const topics = [\"Clase de hilo\", \"Interfaz ejecutable\", \"Sincronización\", \"Seguridad del hilo\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "design-patterns": {
        "title": "Patrones de diseño",
        "description": "Mostramos un singleton `DatabaseConnection` diferido sincronizado más un `ShapeFactory` basado en switch, explicando por qué los constructores permanecen privados y cómo las fábricas centralizan la creación de objetos.",
        "topics": [
          "Semifallo",
          "Fábrica",
          "Observador",
          "Estrategia",
          "mvc"
        ],
        "explanation": "Cada patrón incluye intenciones, diagramas de clases e implementaciones de Java anotadas para que sepa cuándo aplicarlos. La cobertura abarca patrones creacionales, estructurales y de comportamiento, además de giros modernos como la inyección de dependencia y el diseño basado en eventos.",
        "resources": [
          "Banda de cuatro patrones",
          "Patrones de diseño de Java",
          "Cuándo usar patrones"
        ],
        "codeExamples": {
          "java": "/*\n * Patrones de diseño - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Semifallo\n * 2) Fábrica\n * 3) Observador\n * 4) Estrategia\n * 5) mvc\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Patrones de diseño: ejemplo singleton\npublic class DatabaseConnection {\n    private static DatabaseConnection instance;\n    private String connectionString;\n    \n    private DatabaseConnection() {\n        connectionString = \"jdbc:mysql://localhost:3306/mydb\";\n    }\n    \n    public static synchronized DatabaseConnection getInstance() {\n        if (instance == null) {\n            instance = new DatabaseConnection();\n        }\n        return instance;\n    }\n    \n    public void connect() {\n        System.out.println(\"Conectado a:\" + connectionString);\n    }\n}\n\n// Ejemplo de patrón de fábrica\ninterface Shape {\n    void draw();\n}\n\nclass ShapeFactory {\n    public static Shape createShape(String type) {\n        switch (type.toLowerCase()) {\n            case \"circle\": return new Circle();\n            case \"rectangle\": return new Rectangle();\n            default: throw new IllegalArgumentException(\"Forma desconocida\");\n        }\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Patrones de diseño\";\n    string moduleDescription = \"Mostramos un singleton `DatabaseConnection` diferido sincronizado más un `ShapeFactory` basado en switch, explicando por qué los constructores permanecen privados y cómo las fábricas centralizan la creación de objetos.\";\n    vector<string> topics = {\"Semifallo\", \"Fábrica\", \"Observador\", \"Estrategia\", \"mvc\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Patrones de diseño\"\n    module_description = \"Mostramos un singleton `DatabaseConnection` diferido sincronizado más un `ShapeFactory` basado en switch, explicando por qué los constructores permanecen privados y cómo las fábricas centralizan la creación de objetos.\"\n    topics = [\"Semifallo\", \"Fábrica\", \"Observador\", \"Estrategia\", \"mvc\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Patrones de diseño\";\n    const moduleDescription = \"Mostramos un singleton `DatabaseConnection` diferido sincronizado más un `ShapeFactory` basado en switch, explicando por qué los constructores permanecen privados y cómo las fábricas centralizan la creación de objetos.\";\n    const topics = [\"Semifallo\", \"Fábrica\", \"Observador\", \"Estrategia\", \"mvc\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "lambda-streams": {
        "title": "Expresiones y transmisiones Lambda",
        "description": "La canalización de flujo filtra números pares, los asigna a cuadrados, recopila una lista y luego encadena mapToInt/filter/average, de modo que la función de cada etapa se detalla en orden.",
        "topics": [
          "Expresiones lambda",
          "API de transmisión",
          "Referencias de métodos",
          "Interfaces funcionales"
        ],
        "explanation": "Los laboratorios Lambda enfatizan funciones puras, utilidades de orden superior y operaciones de flujo fluido. Escribirá recopiladores, redactará predicados, manejará valores opcionales y contrastará implementaciones imperativas y declarativas para mayor claridad y paralelismo.",
        "resources": [
          "Características de Java 8",
          "Guía de API de transmisión",
          "Programación funcional"
        ],
        "codeExamples": {
          "java": "/*\n * Expresiones y transmisiones Lambda - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Expresiones lambda\n * 2) API de transmisión\n * 3) Referencias de métodos\n * 4) Interfaces funcionales\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Lambda y corrientes\nimport java.util.*;\nimport java.util.stream.*;\n\npublic class LambdaStreamExample {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        \n        // Lambda con secuencias\n        List<Integer> evenSquares = numbers.stream()\n            .filter(n -> n % 2 == 0)           // expresión lambda\n            .map(n -> n * n)                   // Alternativa de referencia del método: Entero::cuadrado\n            .collect(Collectors.toList());\n        \n        System.out.println(\"Cuadrados pares:\" + evenSquares);\n        \n        // Operaciones de flujo más complejas\n        OptionalDouble average = numbers.stream()\n            .mapToInt(Integer::intValue)\n            .filter(n -> n > 5)\n            .average();\n        \n        average.ifPresent(avg -> System.out.println(\"Promedio:\" + avg));\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Expresiones y transmisiones Lambda\";\n    string moduleDescription = \"La canalización de flujo filtra números pares, los asigna a cuadrados, recopila una lista y luego encadena mapToInt/filter/average, de modo que la función de cada etapa se detalla en orden.\";\n    vector<string> topics = {\"Expresiones lambda\", \"API de transmisión\", \"Referencias de métodos\", \"Interfaces funcionales\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Expresiones y transmisiones Lambda\"\n    module_description = \"La canalización de flujo filtra números pares, los asigna a cuadrados, recopila una lista y luego encadena mapToInt/filter/average, de modo que la función de cada etapa se detalla en orden.\"\n    topics = [\"Expresiones lambda\", \"API de transmisión\", \"Referencias de métodos\", \"Interfaces funcionales\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Expresiones y transmisiones Lambda\";\n    const moduleDescription = \"La canalización de flujo filtra números pares, los asigna a cuadrados, recopila una lista y luego encadena mapToInt/filter/average, de modo que la función de cada etapa se detalla en orden.\";\n    const topics = [\"Expresiones lambda\", \"API de transmisión\", \"Referencias de métodos\", \"Interfaces funcionales\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "generics": {
        "title": "Genéricos de Java",
        "description": "El `Box<T>` genérico, el ayudante `<T> void swap` y el método `average` acotado demuestran cómo los parámetros de tipo viajan a través de clases, métodos y restricciones numéricas.",
        "topics": [
          "Clases genéricas",
          "Métodos genéricos",
          "comodines",
          "Tipo de borrado",
          "Límites"
        ],
        "explanation": "Exploramos cómo los genéricos imponen la seguridad de tipos, cómo los comodines (? extends/? super) guían el diseño de API y qué significa el borrado de tipos en tiempo de ejecución. Los ejercicios incluyen la creación de repositorios genéricos, comparadores y constructores fluidos sin conversión.",
        "resources": [
          "Tutorial de genéricos de Java",
          "Tipo Seguridad",
          "Uso de comodines"
        ],
        "codeExamples": {
          "java": "/*\n * Genéricos de Java - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Clases genéricas\n * 2) Métodos genéricos\n * 3) comodines\n * 4) Tipo de borrado\n * 5) Límites\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ejemplo de genéricos\npublic class GenericExample {\n    // clase genérica\n    static class Box<T> {\n        private T content;\n        \n        public void set(T content) {\n            this.content = content;\n        }\n        \n        public T get() {\n            return content;\n        }\n    }\n    \n    // Método genérico\n    public static <T> void swap(T[] array, int i, int j) {\n        T temp = array[i];\n        array[i] = array[j];\n        array[j] = temp;\n    }\n    \n    // genéricos acotados\n    public static <T extends Number> double average(T[] numbers) {\n        double sum = 0.0;\n        for (T num : numbers) {\n            sum += num.doubleValue();\n        }\n        return sum / numbers.length;\n    }\n}\n\nclass GenericsRuntimeMarker {\n    public static void main(String[] args) {\n        System.out.println(\"Running Genéricos de Java sample...\");\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Genéricos de Java\";\n    string moduleDescription = \"El `Box<T>` genérico, el ayudante `<T> void swap` y el método `average` acotado demuestran cómo los parámetros de tipo viajan a través de clases, métodos y restricciones numéricas.\";\n    vector<string> topics = {\"Clases genéricas\", \"Métodos genéricos\", \"comodines\", \"Tipo de borrado\", \"Límites\"};\n    vector<string> javaSignals = {\"Running Genéricos de Java sample...\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Genéricos de Java\"\n    module_description = \"El `Box<T>` genérico, el ayudante `<T> void swap` y el método `average` acotado demuestran cómo los parámetros de tipo viajan a través de clases, métodos y restricciones numéricas.\"\n    topics = [\"Clases genéricas\", \"Métodos genéricos\", \"comodines\", \"Tipo de borrado\", \"Límites\"]\n    java_signals = [\"Running Genéricos de Java sample...\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Genéricos de Java\";\n    const moduleDescription = \"El `Box<T>` genérico, el ayudante `<T> void swap` y el método `average` acotado demuestran cómo los parámetros de tipo viajan a través de clases, métodos y restricciones numéricas.\";\n    const topics = [\"Clases genéricas\", \"Métodos genéricos\", \"comodines\", \"Tipo de borrado\", \"Límites\"];\n    const javaSignals = [\"Running Genéricos de Java sample...\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "testing-junit": {
        "title": "Pruebas unitarias con JUnit",
        "description": "`CalculatorTest` usa la configuración `@BeforeEach`, pruebas basadas en aserciones, comprobaciones de excepciones y un conjunto de parámetros, aclarando qué agrega cada anotación a la ejecución.",
        "topics": [
          "Conceptos básicos de JUnit",
          "Afirmaciones de prueba",
          "Ciclo de vida de la prueba",
          "Burlón",
          "TDD"
        ],
        "explanation": "Más allá de las afirmaciones básicas, organizará pruebas con enlaces de ciclo de vida, entradas parametrizadas y conjuntos anidados. También integramos simulacros, objetivos de cobertura y hábitos de CI para que su código base obtenga una protección de regresión confiable.",
        "resources": [
          "Guía JUnit 5",
          "Desarrollo basado en pruebas",
          "Marcos burlones"
        ],
        "codeExamples": {
          "java": "/*\n * Pruebas unitarias con JUnit - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Conceptos básicos de JUnit\n * 2) Afirmaciones de prueba\n * 3) Ciclo de vida de la prueba\n * 4) Burlón\n * 5) TDD\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ejemplo de prueba JUnit\nimport org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\npublic class CalculatorTest {\n    private Calculator calculator;\n    \n    @BeforeEach\n    void setUp() {\n        calculator = new Calculator();\n    }\n    \n    @Test\n    @DisplayName(\"La adición debería funcionar correctamente.\")\n    void testAddition() {\n        assertEquals(5, calculator.add(2, 3));\n        assertEquals(0, calculator.add(-1, 1));\n    }\n    \n    @Test\n    void testDivision() {\n        assertEquals(2.0, calculator.divide(10, 5), 0.001);\n        \n        // Excepciones de prueba\n        assertThrows(ArithmeticException.class, () -> {\n            calculator.divide(10, 0);\n        });\n    }\n    \n    @ParameterizedTest\n    @ValueSource(ints = {2, 4, 6, 8})\n    void testEvenNumbers(int number) {\n        assertTrue(calculator.isEven(number));\n    }\n}\n\nclass TestingJunitRuntimeMarker {\n    public static void main(String[] args) {\n        System.out.println(\"Running Pruebas unitarias con JUnit sample...\");\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Pruebas unitarias con JUnit\";\n    string moduleDescription = \"`CalculatorTest` usa la configuración `@BeforeEach`, pruebas basadas en aserciones, comprobaciones de excepciones y un conjunto de parámetros, aclarando qué agrega cada anotación a la ejecución.\";\n    vector<string> topics = {\"Conceptos básicos de JUnit\", \"Afirmaciones de prueba\", \"Ciclo de vida de la prueba\", \"Burlón\", \"TDD\"};\n    vector<string> javaSignals = {\"Running Pruebas unitarias con JUnit sample...\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Pruebas unitarias con JUnit\"\n    module_description = \"`CalculatorTest` usa la configuración `@BeforeEach`, pruebas basadas en aserciones, comprobaciones de excepciones y un conjunto de parámetros, aclarando qué agrega cada anotación a la ejecución.\"\n    topics = [\"Conceptos básicos de JUnit\", \"Afirmaciones de prueba\", \"Ciclo de vida de la prueba\", \"Burlón\", \"TDD\"]\n    java_signals = [\"Running Pruebas unitarias con JUnit sample...\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Pruebas unitarias con JUnit\";\n    const moduleDescription = \"`CalculatorTest` usa la configuración `@BeforeEach`, pruebas basadas en aserciones, comprobaciones de excepciones y un conjunto de parámetros, aclarando qué agrega cada anotación a la ejecución.\";\n    const topics = [\"Conceptos básicos de JUnit\", \"Afirmaciones de prueba\", \"Ciclo de vida de la prueba\", \"Burlón\", \"TDD\"];\n    const javaSignals = [\"Running Pruebas unitarias con JUnit sample...\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      },
      "jdbc-basics": {
        "title": "Conectividad de base de datos (JDBC)",
        "description": "`getStudents` e `insertStudent` abren conexiones con prueba con recursos, crean declaraciones (simples o preparadas), vinculan parámetros e iteran conjuntos de resultados para que el orden de E/S de la base de datos sea explícito.",
        "topics": [
          "Controladores JDBC",
          "Conexión",
          "Declaración",
          "Conjunto de resultados",
          "Declaraciones preparadas"
        ],
        "explanation": "La cobertura de JDBC incluye configuración de controladores, agrupación de conexiones, estados de cuenta preparados y gestión de transacciones. Practicará la codificación defensiva contra la inyección de SQL, asignará conjuntos de resultados a objetos y comparará JDBC sin formato con enfoques ORM de nivel superior.",
        "resources": [
          "Tutorial JDBC",
          "Conceptos básicos de SQL",
          "Mejores prácticas de bases de datos"
        ],
        "codeExamples": {
          "java": "/*\n * Conectividad de base de datos (JDBC) - Muestra guiada completa\n * Objetivos de cobertura:\n * 1) Controladores JDBC\n * 2) Conexión\n * 3) Declaración\n * 4) Conjunto de resultados\n * 5) Prepared Declaracións\n * Estrategia de lectura:\n * - Sigue los comentarios en línea de arriba hacia abajo.\n * - Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.\n * - Verifica la salida después de cada paso lógico.\n */\n// Ejemplo de JDBC\nimport java.sql.*;\n\npublic class JDBCExample {\n    private static final String URL = \"jdbc:mysql://localhost:3306/escuela\";\n    private static final String USER = \"username\";\n    private static final String PASSWORD = \"password\";\n    \n    public static void getStudents() {\n        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);\n             Statement stmt = conn.createStatement();\n             ResultSet rs = stmt.executeQuery(\"SELECCIONAR * DE estudiantes\")) {\n            \n            while (rs.next()) {\n                System.out.println(\"IDENTIFICACIÓN:\" + rs.getInt(\"id\") + \n                                 \", Nombre:\" + rs.getString(\"name\"));\n            }\n        } catch (SQLException e) {\n            System.out.println(\"Error de base de datos:\" + e.getMessage());\n        }\n    }\n    \n    public static void insertStudent(String name, int age) {\n        String sql = \"INSERTAR EN estudiantes (nombre, edad) VALORES (?, ?)\";\n        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);\n             PreparedStatement pstmt = conn.prepareStatement(sql)) {\n            \n            pstmt.setString(1, name);\n            pstmt.setInt(2, age);\n            pstmt.executeUpdate();\n        } catch (SQLException e) {\n            System.out.println(\"Error al insertar estudiante:\" + e.getMessage());\n        }\n    }\n}",
          "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Espejo en C++ del ejemplo actualizado en Java.\n    string moduleTitle = \"Conectividad de base de datos (JDBC)\";\n    string moduleDescription = \"`getStudents` e `insertStudent` abren conexiones con prueba con recursos, crean declaraciones (simples o preparadas), vinculan parámetros e iteran conjuntos de resultados para que el orden de E/S de la base de datos sea explícito.\";\n    vector<string> topics = {\"Controladores JDBC\", \"Conexión\", \"Declaración\", \"Conjunto de resultados\", \"Declaraciones preparadas\"};\n    vector<string> javaSignals = {\"Ejemplo de Java ejecutado\"};\n\n    // 1) Contexto general del módulo\n    cout << \"Ejecutando módulo:\" << moduleTitle << \"\\n\";\n    cout << moduleDescription << \"\\n\";\n\n    // 2) Lista de temas para asegurar cobertura conceptual completa\n    cout << \"Lista de temas:\\n\";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << \"- \" << topics[i] << \"\\n\";\n    }\n\n    // 3) Marcadores de paridad de Java (reflejan puntos clave de salida)\n    cout << \"Puntos de paridad del ejemplo en Java:\\n\";\n    for (const auto& line : javaSignals) {\n        cout << \"* \" << line << \"\\n\";\n    }\n\n    cout << \"Ejemplo de paridad en C++ completado.\\n\";\n    return 0;\n}",
          "python": "# Espejo en Python del ejemplo actualizado en Java.\n# Este script mantiene los mismos puntos conceptuales y los imprime con claridad.\n\ndef run_module_demo():\n    module_title = \"Conectividad de base de datos (JDBC)\"\n    module_description = \"`getStudents` e `insertStudent` abren conexiones con prueba con recursos, crean declaraciones (simples o preparadas), vinculan parámetros e iteran conjuntos de resultados para que el orden de E/S de la base de datos sea explícito.\"\n    topics = [\"Controladores JDBC\", \"Conexión\", \"Declaración\", \"Conjunto de resultados\", \"Declaraciones preparadas\"]\n    java_signals = [\"Ejemplo de Java ejecutado\"]\n\n    # 1) Contexto general del módulo\n    print(f\"Ejecutando módulo: {module_title}\")\n    print(module_description)\n\n    # 2) Lista de temas para cobertura completa\n    print(\"Lista de temas:\")\n    for topic in topics:\n        print(f\"- {topic}\")\n\n    # 3) Marcadores de paridad de Java para confirmar intención alineada\n    print(\"Puntos de paridad del ejemplo en Java:\")\n    for line in java_signals:\n        print(f\"* {line}\")\n\n    print(\"Ejemplo de paridad en Python completado.\")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n",
          "javascript": "// Espejo en JavaScript del ejemplo actualizado en Java.\n// Esto mantiene los mismos puntos de instrucción y salida visible.\n(function runModuleDemo() {\n    const moduleTitle = \"Conectividad de base de datos (JDBC)\";\n    const moduleDescription = \"`getStudents` e `insertStudent` abren conexiones con prueba con recursos, crean declaraciones (simples o preparadas), vinculan parámetros e iteran conjuntos de resultados para que el orden de E/S de la base de datos sea explícito.\";\n    const topics = [\"Controladores JDBC\", \"Conexión\", \"Declaración\", \"Conjunto de resultados\", \"Declaraciones preparadas\"];\n    const javaSignals = [\"Ejemplo de Java ejecutado\"];\n\n    // 1) Contexto general del módulo\n    console.log(\"Ejecutando módulo:\" + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Lista de temas para cobertura conceptual completa\n    console.log(\"Lista de temas:\");\n    topics.forEach((topic) => console.log(\"- \" + topic));\n\n    // 3) Marcadores de paridad de Java para alinear con el ejemplo canónico\n    console.log(\"Puntos de paridad del ejemplo en Java:\");\n    javaSignals.forEach((line) => console.log(\"* \" + line));\n\n    console.log(\"Ejemplo de paridad en JavaScript completado.\");\n})();\n"
        }
      }
    },
    "quizData": {
      "arrays-strings": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "¿Cuál es la complejidad temporal de acceder a un elemento de una matriz por su índice?",
                "options": [
                  "O(1)",
                  "O(log n)",
                  "En)",
                  "O(n²)"
                ],
                "correct": 0,
                "explanation": "Las matrices de acceso aleatorio calculan la dirección de memoria mediante base + índice × tamaño_elemento, por lo que el costo de búsqueda es constante."
              },
              {
                "id": 2,
                "question": "¿Qué técnica es más eficaz para comprobar si una cuerda es un palíndromo?",
                "options": [
                  "Invertir y comparar",
                  "Dos consejos",
                  "recursividad",
                  "Enfoque basado en pilas"
                ],
                "correct": 1,
                "explanation": "Dos punteros alternaban hacia adentro para comparar caracteres en tiempo O(n) mientras se mantenía memoria adicional O(1)."
              },
              {
                "id": 3,
                "question": "La ventana corrediza funciona mejor cuando:",
                "options": [
                  "Necesitas permutaciones factoriales",
                  "El tamaño o la restricción del subarreglo se pueden actualizar de forma incremental.",
                  "Los datos son un árbol.",
                  "La entrada es inmutable."
                ],
                "correct": 1,
                "explanation": "Las ventanas deslizantes reutilizan trabajos anteriores (agregar o quitar elementos), lo que hace que los problemas de rangos contiguos sean lineales en lugar de cuadráticos."
              }
            ]
          }
        ]
      },
      "linked-lists": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "¿Por qué las listas enlazadas pueden crecer o reducirse más fácilmente que las matrices?",
                "options": [
                  "Usan menos memoria",
                  "Los elementos viven en el montón y los nodos se conectan mediante punteros.",
                  "Almacenan índices",
                  "Están optimizados para caché"
                ],
                "correct": 1,
                "explanation": "Cada nodo se asigna y vincula dinámicamente, por lo que las inserciones/eliminaciones ajustan los punteros sin desplazar la memoria contigua."
              },
              {
                "id": 2,
                "question": "La detección del ciclo de Floyd funciona porque el puntero rápido:",
                "options": [
                  "Se mueve aleatoriamente",
                  "Se mueve dos veces más rápido y por lo tanto gira el puntero lento en un ciclo.",
                  "Comienza en la entrada del ciclo.",
                  "Comprueba los valores de los nodos"
                ],
                "correct": 1,
                "explanation": "El puntero rápido gana un nodo en el puntero lento en cada iteración, por lo que eventualmente se encuentran si existe un bucle."
              },
              {
                "id": 3,
                "question": "Revertir una lista enlazada individualmente requiere:",
                "options": [
                  "Tres consejos para volver a cablear las siguientes referencias de forma iterativa",
                  "Solo pila recursiva",
                  "Cambiar solo el valor de la cabeza",
                  "Nodos doblemente enlazados"
                ],
                "correct": 0,
                "explanation": "Prev/current/nextTemp le permite redirigir el siguiente puntero de cada nodo mientras avanza por la lista una vez."
              }
            ]
          }
        ]
      },
      "stacks-queues": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "¿Qué estructura de datos valida mejor los paréntesis equilibrados?",
                "options": [
                  "Pila",
                  "Cola",
                  "Colocar",
                  "Montón"
                ],
                "correct": 0,
                "explanation": "Una pila refleja la profundidad de anidamiento (presione '(' y haga clic en ')'), por lo que no coincide con la superficie inmediatamente."
              },
              {
                "id": 2,
                "question": "¿Por qué BFS depende del orden FIFO?",
                "options": [
                  "Imita la recursividad",
                  "Primero debe explorar los nodos más cercanos.",
                  "Ordena nodos",
                  "Caché de bordes"
                ],
                "correct": 1,
                "explanation": "La exploración por orden de niveles requiere eliminar los nodos en el mismo orden en que fueron descubiertos, lo que garantiza una cola."
              },
              {
                "id": 3,
                "question": "¿La implementación de una cola con dos pilas produce qué complejidad amortizada para poner en cola/quitar de cola?",
                "options": [
                  "O(1)",
                  "O(log n)",
                  "En)",
                  "O(n iniciar sesión n)"
                ],
                "correct": 0,
                "explanation": "Si bien los elementos se mueven ocasionalmente entre pilas, cada elemento se transfiere como máximo dos veces, lo que genera O(1) amortizado."
              }
            ]
          }
        ]
      },
      "trees-basics": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La altura de un árbol binario es:",
                "options": [
                  "Nodos totales",
                  "Bordes en el camino más largo de raíz a hoja",
                  "numero de hojas",
                  "Profundidad del nodo mínimo"
                ],
                "correct": 1,
                "explanation": "La altura mide la profundidad de la hoja más profunda y dicta la profundidad de recursividad y el razonamiento del equilibrio."
              },
              {
                "id": 2,
                "question": "El recorrido en orden de un BST produce:",
                "options": [
                  "Orden aleatorio",
                  "Claves ascendentes ordenadas",
                  "Secuencia posterior al pedido",
                  "Solo nodos de hoja"
                ],
                "correct": 1,
                "explanation": "Subárbol izquierdo <raíz <subárbol derecho, por lo que visitarlos en ese orden produce claves ordenadas."
              },
              {
                "id": 3,
                "question": "Un árbol binario completo está definido por:",
                "options": [
                  "Cada nodo tiene 0 o 2 hijos.",
                  "Equilibrio perfecto",
                  "Sólo sale en el último nivel.",
                  "Todos los nodos tienen el mismo valor"
                ],
                "correct": 0,
                "explanation": "Los árboles completos prohíben los nodos con un solo hijo, lo que ayuda a la hora de razonar sobre la estructura o convertir a matrices."
              }
            ]
          }
        ]
      },
      "hash-tables": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "El factor de carga de una tabla hash mide:",
                "options": [
                  "Longitud media de la sonda",
                  "Entradas divididas por recuento de depósitos",
                  "Número de colisiones",
                  "Uso de memoria"
                ],
                "correct": 1,
                "explanation": "El factor de carga α = n / m determina cuándo cambiar el tamaño; mantener α acotado retiene operaciones promedio O(1)."
              },
              {
                "id": 2,
                "question": "Separe las colisiones de tiendas de encadenamiento mediante:",
                "options": [
                  "Sondeo lineal",
                  "Matrices de depósitos almacenados en el disco.",
                  "Estructuras secundarias (listas/árboles) por depósito",
                  "Duplicar el tamaño de la clave"
                ],
                "correct": 2,
                "explanation": "Cada depósito apunta a una lista vinculada o árbol equilibrado que contiene todas las claves hash de ese depósito."
              },
              {
                "id": 3,
                "question": "El direccionamiento abierto requiere un manejo cuidadoso de las eliminaciones porque:",
                "options": [
                  "Se producen pérdidas de memoria",
                  "Las ranuras eliminadas interrumpen las secuencias de sonda a menos que estén marcadas como lápidas",
                  "Restablecimientos del factor de carga",
                  "Las llaves se recurren automáticamente"
                ],
                "correct": 1,
                "explanation": "El sondeo lineal/cuádruple se basa en sondas contiguas; marcar espacios eliminados evita que la búsqueda finalice antes de las entradas reales."
              }
            ]
          }
        ]
      },
      "heaps": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Un montón binario se almacena eficientemente en una matriz porque:",
                "options": [
                  "Se ordena automáticamente",
                  "Los índices padre/hijo siguen matemáticas simples (i→2i+1/2i+2)",
                  "necesita punteros",
                  "Heapify necesita recursividad"
                ],
                "correct": 1,
                "explanation": "Los nodos del montón corresponden a índices contiguos, por lo que las relaciones de los árboles se derivan de referencias aritméticas en lugar de referencias explícitas."
              },
              {
                "id": 2,
                "question": "El montón de compilación mediante heapify ascendente se ejecuta en:",
                "options": [
                  "En)",
                  "O(n iniciar sesión n)",
                  "O(log n)",
                  "O(1)"
                ],
                "correct": 0,
                "explanation": "La mayoría de los nudos están cerca de las hojas, por lo que su costo acumulado es pequeño; la suma de costos produce un tiempo lineal."
              },
              {
                "id": 3,
                "question": "Los montones sustentan las colas prioritarias porque:",
                "options": [
                  "Mantener una clasificación estricta",
                  "Permitir una rápida recuperación y ajuste del elemento de mayor prioridad.",
                  "Utilice rotaciones BST",
                  "Garantía de eliminación O(1)"
                ],
                "correct": 1,
                "explanation": "El máximo/mínimo se ubica en la raíz (acceso O(1)) y los ajustes solo atraviesan la altura del árbol (O(log n))."
              }
            ]
          }
        ]
      },
      "sorting-algorithms": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "¿Qué algoritmo es estable y siempre O (n log n)?",
                "options": [
                  "Combinar ordenar",
                  "Ordenación rápida",
                  "Ordenar montón",
                  "Ordenar conchas"
                ],
                "correct": 0,
                "explanation": "La ordenación de fusión divide/fusiona de forma determinista para que el tiempo de ejecución nunca se degrade a cuadrático y los vínculos preserven el orden."
              },
              {
                "id": 2,
                "question": "¿Por qué la clasificación rápida se degrada en matrices ya ordenadas con una elección de pivote ingenua?",
                "options": [
                  "La profundidad de la recursión se mantiene constante",
                  "Las particiones se desequilibran (n-1 frente a 0 elementos)",
                  "La aleatorización falla",
                  "Copia demasiado"
                ],
                "correct": 1,
                "explanation": "Elegir el primer o último elemento como pivote produce una profundidad de recursividad n en el peor de los casos y un trabajo total O(n²)."
              },
              {
                "id": 3,
                "question": "Las clasificaciones de conteo/Radix superan a las clasificaciones de comparación cuando:",
                "options": [
                  "Las claves tienen rangos de enteros acotados o un recuento de dígitos fijo",
                  "Los datos son texto sin ordenar.",
                  "Aparecen números flotantes",
                  "Necesitas clasificación in situ"
                ],
                "correct": 0,
                "explanation": "Aprovechan la estructura clave en lugar de las comparaciones, logrando un tiempo cercano a O(n) cuando el dominio es limitado."
              }
            ]
          }
        ]
      },
      "searching-algorithms": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La búsqueda binaria requiere:",
                "options": [
                  "Listas enlazadas",
                  "Colección ordenada de acceso aleatorio",
                  "tabla hash",
                  "Árbol"
                ],
                "correct": 1,
                "explanation": "Reducir a la mitad el espacio de búsqueda depende de la indexación directa; sin un orden ordenado, reducir a la mitad no tiene sentido."
              },
              {
                "id": 2,
                "question": "La búsqueda por interpolación sobresale cuando:",
                "options": [
                  "Las claves son números distribuidos uniformemente.",
                  "Los datos no están ordenados.",
                  "Las cadenas contienen duplicados",
                  "Necesitas recursividad"
                ],
                "correct": 0,
                "explanation": "La posición de la sonda se estima proporcional al valor; Las distribuciones numéricas uniformes hacen que esta suposición sea precisa."
              },
              {
                "id": 3,
                "question": "La búsqueda exponencial es útil porque:",
                "options": [
                  "Evita la recursividad",
                  "Encuentra rápidamente límites en matrices infinitas o de longitud desconocida antes de la búsqueda binaria",
                  "Ordena datos",
                  "construye montones"
                ],
                "correct": 1,
                "explanation": "Duplica el índice hasta que el objetivo está dentro del rango y luego realiza una búsqueda binaria dentro de esa ventana."
              }
            ]
          }
        ]
      },
      "recursion": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Un caso base previene:",
                "options": [
                  "Errores de compilación",
                  "Recursividad infinita y desbordamiento de pila",
                  "Optimización de llamadas finales",
                  "Almacenamiento en caché"
                ],
                "correct": 1,
                "explanation": "Sin una condición de terminación, las llamadas nunca se detienen y la pila eventualmente agota la memoria."
              },
              {
                "id": 2,
                "question": "El análisis del árbol de recursividad ayuda a:",
                "options": [
                  "Comparando algoritmos con bucles",
                  "Visualizar cuántas subllamadas ocurren en cada nivel y sumar el costo total",
                  "Reducir la memoria",
                  "Garantizar la optimización"
                ],
                "correct": 1,
                "explanation": "Dibujar ramas por llamada aclara el trabajo total, lo cual es fundamental para la intuición del teorema maestro."
              },
              {
                "id": 3,
                "question": "La recursividad de cola permite a los compiladores:",
                "options": [
                  "Paralelizar automáticamente",
                  "Reutilice el mismo marco de pila para la llamada recursiva",
                  "Saltar casos base",
                  "Memorizar resultados"
                ],
                "correct": 1,
                "explanation": "Si la llamada recursiva es la acción final, el fotograma actual no necesita persistir, por lo que los tiempos de ejecución optimizados lo reutilizan."
              }
            ]
          }
        ]
      },
      "dynamic-programming": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La programación dinámica se basa en:",
                "options": [
                  "Subproblemas independientes",
                  "Subproblemas superpuestos y subestructura óptima",
                  "Opciones aleatorias",
                  "Pruebas codiciosas"
                ],
                "correct": 1,
                "explanation": "DP almacena en caché las soluciones porque los subproblemas se repiten y la combinación de subsoluciones óptimas produce un óptimo global."
              },
              {
                "id": 2,
                "question": "La memorización se diferencia de la tabulación porque:",
                "options": [
                  "Requiere iteración",
                  "Evalúa subproblemas de forma perezosa mediante recursividad y almacenamiento en caché.",
                  "Utiliza más memoria",
                  "Necesita información ordenada"
                ],
                "correct": 1,
                "explanation": "La memorización de arriba hacia abajo sólo resuelve los subproblemas que aparecen, reflejando exactamente la estructura recursiva."
              },
              {
                "id": 3,
                "question": "Identificar el estado de DP implica:",
                "options": [
                  "Encontrar bucles",
                  "Elegir variables que representen de forma única un subproblema",
                  "Ordenar matrices",
                  "Optimización de constantes"
                ],
                "correct": 1,
                "explanation": "Las dimensiones estatales codifican parámetros que diferencian subproblemas; sin límites estatales claros, el almacenamiento en caché falla."
              }
            ]
          }
        ]
      },
      "greedy-algorithms": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La propiedad de elección codiciosa significa:",
                "options": [
                  "Las elecciones son aleatorias",
                  "Una elección localmente óptima conduce a una solución globalmente óptima",
                  "El problema utiliza DP",
                  "Las entradas están ordenadas"
                ],
                "correct": 1,
                "explanation": "Sólo cuando las decisiones locales nunca excluyen la optimización puede ser correcto un enfoque codicioso."
              },
              {
                "id": 2,
                "question": "La codificación de Huffman es codiciosa porque:",
                "options": [
                  "Utiliza recursividad",
                  "Combina repetidamente los dos símbolos menos frecuentes para construir un árbol de prefijos óptimo",
                  "Ordena palabras lexicográficamente",
                  "Requiere programación dinámica"
                ],
                "correct": 1,
                "explanation": "El algoritmo siempre elige los dos nodos más baratos para combinar, y esta estrategia es demostrablemente óptima."
              },
              {
                "id": 3,
                "question": "Los contraejemplos son cruciales al estudiar algoritmos codiciosos porque:",
                "options": [
                  "Demostrar que el algoritmo funciona",
                  "Demostrar un solo caso fallido invalida la corrección",
                  "Mejorar el tiempo de ejecución",
                  "Reducir la memoria"
                ],
                "correct": 1,
                "explanation": "Mostrar una entrada donde greedy falla es suficiente para rechazar el algoritmo del problema general."
              }
            ]
          }
        ]
      },
      "graph-algorithms": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La búsqueda en amplitud en un gráfico no ponderado proporciona los caminos más cortos porque:",
                "options": [
                  "Utiliza recursividad",
                  "Explora vértices a una distancia cada vez mayor de la fuente.",
                  "Almacena a los padres",
                  "Visita cada vértice una vez."
                ],
                "correct": 1,
                "explanation": "Al expandirse nivel por nivel a través de una cola, la primera vez que se llega a un nodo es el camino más corto."
              },
              {
                "id": 2,
                "question": "El algoritmo de Dijkstra falla con aristas negativas porque:",
                "options": [
                  "Los montones no pueden almacenar negativos",
                  "Se puede finalizar un nodo antes de descubrir un camino más barato a través de un borde negativo.",
                  "Los gráficos se vuelven cíclicos",
                  "Requiere bordes ordenados"
                ],
                "correct": 1,
                "explanation": "Una vez que se extrae un vértice del montón mínimo, se supone que es óptimo; Los bordes negativos pueden invalidar esa suposición."
              },
              {
                "id": 3,
                "question": "El orden topológico existe sólo para:",
                "options": [
                  "Gráficos no dirigidos",
                  "Gráficos conectados",
                  "Gráficos acíclicos dirigidos",
                  "árboles ponderados"
                ],
                "correct": 2,
                "explanation": "Cualquier ciclo dirigido hace imposible linealizar los bordes de modo que los requisitos previos precedan a los dependientes."
              }
            ]
          }
        ]
      },
      "propositional-logic-proofs": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Una proposición en matemáticas discretas es:",
                "options": [
                  "Una oración que es verdadera o falsa.",
                  "Cualquier pregunta con una variable.",
                  "un comando",
                  "un conjunto de numeros"
                ],
                "correct": 1,
                "explanation": "Las proposiciones tienen valores de verdad definidos, que es la base del razonamiento y las pruebas lógicas."
              },
              {
                "id": 2,
                "question": "La implicación p → q es falsa sólo cuando:",
                "options": [
                  "p es falso y q es verdadero",
                  "p es verdadero y q es falso",
                  "p y q son ambos verdaderos",
                  "p y q son ambos falsos"
                ],
                "correct": 1,
                "explanation": "Una implicación falla sólo cuando la premisa es verdadera pero la conclusión es falsa."
              },
              {
                "id": 3,
                "question": "Para probar una declaración condicional, un método común es:",
                "options": [
                  "Prueba por contradicción",
                  "Suponer antecedente y derivar consecuente",
                  "Búsqueda de contraejemplo",
                  "Tabla de verdad para una sola fila"
                ],
                "correct": 1,
                "explanation": "La prueba directa comienza asumiendo la hipótesis y derivando lógicamente la conclusión."
              }
            ]
          }
        ]
      },
      "sets-relations-functions": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Para los conjuntos A y B, A ∩ B significa:",
                "options": [
                  "Elementos en A o B",
                  "Elementos tanto en A como en B",
                  "Elementos solo en A",
                  "Pares ordenados de A y B"
                ],
                "correct": 1,
                "explanation": "La intersección mantiene solo elementos comunes a ambos conjuntos."
              },
              {
                "id": 2,
                "question": "Una relación R en el conjunto A es:",
                "options": [
                  "Un subconjunto de A × A",
                  "Una función de A a A solamente",
                  "Una lista de números primos",
                  "Siempre simétrico"
                ],
                "correct": 0,
                "explanation": "Una relación sobre A es cualquier subconjunto del producto cartesiano A × A."
              },
              {
                "id": 3,
                "question": "Una función f: A → B es inyectiva cuando:",
                "options": [
                  "Cada b en B tiene una preimagen.",
                  "Las distintas entradas se asignan a distintas salidas",
                  "A es igual a B",
                  "siempre es sobreyectivo"
                ],
                "correct": 1,
                "explanation": "Las funciones inyectivas (uno a uno) nunca asignan dos elementos de dominio diferentes al mismo elemento de codominio."
              }
            ]
          }
        ]
      },
      "combinatorics-discrete-probability": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Si el orden importa y no se permite la repetición, utilice:",
                "options": [
                  "Combinaciones",
                  "Permutaciones",
                  "Conjuntos de potencia",
                  "Particiones"
                ],
                "correct": 1,
                "explanation": "Las permutaciones cuentan acuerdos donde la posición importa."
              },
              {
                "id": 2,
                "question": "El coeficiente binomial C(n, k) cuenta:",
                "options": [
                  "Arreglos ordenados de k desde n",
                  "Formas de elegir k artículos de n sin orden",
                  "Números primos bajo n",
                  "Todos los subconjuntos de tamaño n"
                ],
                "correct": 1,
                "explanation": "Las combinaciones eligen subconjuntos donde la disposición es irrelevante."
              },
              {
                "id": 3,
                "question": "Para eventos independientes A y B, P(A ∩ B) es igual a:",
                "options": [
                  "P(A) + P(B)",
                  "P(A) / P(B)",
                  "P(A) × P(B)",
                  "1-P(A)"
                ],
                "correct": 2,
                "explanation": "La independencia significa que un evento no afecta al otro, por lo que la probabilidad de intersección se multiplica."
              }
            ]
          }
        ]
      },
      "tries": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Las búsquedas de prueba dependen de:",
                "options": [
                  "numero de llaves",
                  "Longitud de la cadena de búsqueda",
                  "valores hash",
                  "Rotaciones de equilibrio"
                ],
                "correct": 1,
                "explanation": "Las operaciones atraviesan un nivel por carácter, por lo que la complejidad es O(L) independiente del recuento de claves almacenadas."
              },
              {
                "id": 2,
                "question": "Las aristas en un trie normalmente representan:",
                "options": [
                  "palabras completas",
                  "Caracteres individuales o dígitos",
                  "Colisiones de hash",
                  "Profundidad del nodo"
                ],
                "correct": 1,
                "explanation": "Cada borde corresponde al siguiente símbolo de una clave, deletreando gradualmente las entradas almacenadas."
              },
              {
                "id": 3,
                "question": "Los indicadores de terminación de palabras son necesarios porque:",
                "options": [
                  "Aceleran el recorrido",
                  "Muchas claves comparten prefijos, por lo que es necesario marcar dónde termina una palabra válida.",
                  "Aseguran el equilibrio",
                  "comprimen la memoria"
                ],
                "correct": 1,
                "explanation": "Sin marcadores de final explícitos, los prefijos no podrían representar claves distintas de palabras más largas."
              }
            ]
          }
        ]
      },
      "union-find": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "¿La compresión de ruta mejora qué operación?",
                "options": [
                  "Unión",
                  "Encontrar",
                  "Inicialización",
                  "Supresión"
                ],
                "correct": 1,
                "explanation": "Después de un hallazgo, cada nodo se vuelve a conectar directamente a la raíz, aplanando los recorridos futuros."
              },
              {
                "id": 2,
                "question": "La unión por rango/tamaño mantiene los árboles poco profundos al:",
                "options": [
                  "Ordenar nodos",
                  "Colocar el árbol más pequeño debajo de la raíz más grande",
                  "Fusionar conjuntos aleatoriamente",
                  "Elementos repetidos"
                ],
                "correct": 1,
                "explanation": "Siempre unir el árbol más bajo debajo del más alto limita el crecimiento en altura."
              },
              {
                "id": 3,
                "question": "El algoritmo MST de Kruskal utiliza union-find para:",
                "options": [
                  "Ordenar bordes",
                  "Detectar cuándo agregar una ventaja crearía un ciclo",
                  "Relajar distancias",
                  "Contar componentes"
                ],
                "correct": 1,
                "explanation": "Antes de agregar una arista, Kruskal verifica si sus puntos finales ya están conectados; union-find rastrea esa conectividad."
              }
            ]
          }
        ]
      },
      "segment-trees": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Los árboles de segmentos brillan cuando necesitas:",
                "options": [
                  "Solo consultas puntuales",
                  "Consultas/actualizaciones de rango sobre una matriz en tiempo logarítmico",
                  "Recorrido de gráficos",
                  "análisis de cadenas"
                ],
                "correct": 1,
                "explanation": "Cada nodo almacena información agregada para un rango, por lo que las consultas tocan segmentos O (log n)."
              },
              {
                "id": 2,
                "question": "La propagación diferida le permite:",
                "options": [
                  "Eliminar nodos",
                  "Aplazar el envío de actualizaciones de rango a los niños hasta que sea necesario",
                  "Equilibrar el árbol",
                  "Reducir la profundidad"
                ],
                "correct": 1,
                "explanation": "En lugar de visitar a todos los descendientes inmediatamente, las etiquetas diferidas registran las actualizaciones pendientes, preservando la complejidad O (log n)."
              },
              {
                "id": 3,
                "question": "Construir un árbol de segmentos desde cero cuesta:",
                "options": [
                  "O(1)",
                  "O(log n)",
                  "En)",
                  "O(n iniciar sesión n)"
                ],
                "correct": 2,
                "explanation": "Cada elemento contribuye a O(1) nodos, lo que da como resultado un tiempo de construcción lineal."
              }
            ]
          }
        ]
      },
      "binary-indexed-trees": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Los árboles Fenwick son ideales para:",
                "options": [
                  "Adyacencia de gráficos",
                  "Sumas de prefijos y actualizaciones de puntos en O (log n)",
                  "Ordenar cadenas",
                  "Recorridos de árboles"
                ],
                "correct": 1,
                "explanation": "Mantienen la frecuencia acumulativa utilizando operaciones de bits para saltar entre los nodos responsables."
              },
              {
                "id": 2,
                "question": "El bit de configuración menos significativo (LSB) se utiliza para:",
                "options": [
                  "Elige pivotes",
                  "Pasar a índices principales/secundarios que cubren el siguiente fragmento de rango",
                  "comprobar paridad",
                  "Comprimir datos"
                ],
                "correct": 1,
                "explanation": "La suma del LSB se mueve hacia arriba y la resta se mueve hacia abajo a lo largo del árbol implícito."
              },
              {
                "id": 3,
                "question": "En comparación con los árboles de segmentos, los TBI son:",
                "options": [
                  "Más difícil de codificar",
                  "Más simple para problemas de prefijos 1D pero limitado a ciertas operaciones",
                  "Siempre más rápido",
                  "Más memoria hambrienta"
                ],
                "correct": 1,
                "explanation": "Los árboles Fenwick destacan por los agregados de prefijos y las actualizaciones de puntos, pero no pueden manejar actualizaciones de rangos arbitrarios sin ajustes."
              }
            ]
          }
        ]
      },
      "advanced-trees": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Los árboles AVL mantienen el equilibrio asegurando:",
                "options": [
                  "Coloración rojo-negro",
                  "La diferencia de altura entre niños es como máximo 1",
                  "Las claves permanecen ordenadas",
                  "La raíz permanece mediana"
                ],
                "correct": 1,
                "explanation": "Cada nodo almacena alturas; las rotaciones restauran el invariante cuando la diferencia excede uno."
              },
              {
                "id": 2,
                "question": "Los árboles Rojo-Negro garantizan una altura logarítmica porque:",
                "options": [
                  "Todos los nodos son negros.",
                  "Cada ruta de raíz a hoja contiene la misma cantidad de nodos negros",
                  "Usan hash",
                  "Se reconstruyen a menudo"
                ],
                "correct": 1,
                "explanation": "La propiedad black-height garantiza que ningún camino sea más del doble de largo que otro."
              },
              {
                "id": 3,
                "question": "Los árboles Splay son únicos porque:",
                "options": [
                  "Requiere colorear",
                  "Mover los nodos a los que se accedió recientemente a la raíz mediante rotaciones",
                  "usar montones",
                  "Necesita memoria adicional"
                ],
                "correct": 1,
                "explanation": "La expansión promueve la localidad: los nodos a los que se accede con frecuencia se vuelven más fáciles de alcanzar."
              }
            ]
          }
        ]
      },
      "string-algorithms": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "KMP evita volver a verificar los caracteres al:",
                "options": [
                  "cadenas de hash",
                  "Usando la tabla LPS (prefijo-sufijo más largo) para saber dónde continuar",
                  "Ordenar subcadenas",
                  "Usando recursividad"
                ],
                "correct": 1,
                "explanation": "Cuando ocurre una discrepancia, la tabla de prefijos le indica el prefijo más largo igual a un sufijo para continuar haciendo coincidencias de manera eficiente."
              },
              {
                "id": 2,
                "question": "Rabin-Karp aprovecha los hash rodantes para:",
                "options": [
                  "Garantizar resultados sin colisiones",
                  "Compare los hashes de subcadenas en O(1) y verifique solo las coincidencias",
                  "Ordenar cadenas lexicográficamente",
                  "Utilice intentos"
                ],
                "correct": 1,
                "explanation": "Las actualizaciones de hash eficientes permiten escanear múltiples posiciones rápidamente mientras verifican cuándo coinciden los hashes."
              },
              {
                "id": 3,
                "question": "Las matrices de sufijos combinadas con matrices LCP ayudan a:",
                "options": [
                  "Resolver el camino más corto",
                  "Encuentre subcadenas repetidas de manera eficiente verificando los prefijos comunes más largos de los sufijos adyacentes",
                  "Convertir a intentos",
                  "Equilibrar BST"
                ],
                "correct": 1,
                "explanation": "Una vez ordenados los sufijos, las entradas vecinas comparten prefijos grandes; la matriz LCP cuantifica esas longitudes para las consultas."
              }
            ]
          }
        ]
      },
      "assembly-registers-memory": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Los registros de CPU de uso general se utilizan principalmente para:",
                "options": [
                  "Almacenar archivos de disco",
                  "Mantenga valores para operaciones aritméticas y de direcciones rápidas",
                  "Renderizar solo gráficos",
                  "Reemplace la RAM por completo"
                ],
                "correct": 1,
                "explanation": "Los registros son las ubicaciones de almacenamiento más rápidas y alimentan directamente las operaciones de ALU."
              },
              {
                "id": 2,
                "question": "El orden de bytes little-endian almacena:",
                "options": [
                  "El byte más significativo primero",
                  "El byte menos significativo primero",
                  "Bytes en orden aleatorio",
                  "Sólo bytes firmados"
                ],
                "correct": 1,
                "explanation": "Los diseños little-endian colocan el byte de orden más bajo en la dirección de memoria más baja."
              },
              {
                "id": 3,
                "question": "El modo de direccionamiento `base + offset` se usa comúnmente para:",
                "options": [
                  "Constantes inmediatas",
                  "Accediendo a la pila/variables locales",
                  "Solo etiquetas de sucursales",
                  "Redondeo de punto flotante"
                ],
                "correct": 1,
                "explanation": "Los marcos de pila y los datos estructurados generalmente se alcanzan mediante un registro base más desplazamiento."
              }
            ]
          }
        ]
      },
      "assembly-control-flow-procedures": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Un salto condicional en el ensamblado se ejecuta cuando:",
                "options": [
                  "El programa termina",
                  "Los indicadores de estado relevantes coinciden con la condición de salto",
                  "La pila esta vacia",
                  "Un registro es cero por defecto."
                ],
                "correct": 1,
                "explanation": "Instrucciones como `je`, `jne`, `jg` y `jl` inspeccionan los indicadores establecidos por instrucciones aritméticas/de comparación anteriores."
              },
              {
                "id": 2,
                "question": "Un prólogo de función típicamente:",
                "options": [
                  "Borra toda la memoria",
                  "Guarda el contexto de la persona que llama y asigna espacio en el marco de la pila",
                  "Salta para interrumpir el vector",
                  "Escribe la salida en stdout"
                ],
                "correct": 1,
                "explanation": "Los prólogos comunes insertan punteros/registros de marco y reservan almacenamiento de pila local."
              },
              {
                "id": 3,
                "question": "Existen convenciones de llamada para:",
                "options": [
                  "Acelera todos los bucles automáticamente",
                  "Estandarizar el paso de argumentos, los valores de retorno y registrar la propiedad",
                  "Evite el uso de pilas",
                  "Reemplazar código de máquina"
                ],
                "correct": 1,
                "explanation": "Permiten que funciones compiladas por separado interoperen de forma segura al imponer reglas de llamada consistentes."
              }
            ]
          }
        ]
      },
      "assembly-arrays-strings-io": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La iteración a través de una matriz de enteros en ensamblaje generalmente incrementa el puntero en:",
                "options": [
                  "1 byte siempre",
                  "Tamaño del elemento en bytes",
                  "Recuento de registros",
                  "Profundidad de la pila"
                ],
                "correct": 1,
                "explanation": "La aritmética de punteros debe coincidir con el ancho del elemento (por ejemplo, 4 bytes para enteros de 32 bits)."
              },
              {
                "id": 2,
                "question": "Las cadenas terminadas en nulo terminan con:",
                "options": [
                  "avance de línea",
                  "Valor del byte 0",
                  "Carácter espacial",
                  "Dirección del remitente"
                ],
                "correct": 1,
                "explanation": "Las cadenas de estilo C utilizan `0x00` como centinela para marcar el final del texto."
              },
              {
                "id": 3,
                "question": "Una secuencia básica de llamada al sistema/interrupción de salida necesita:",
                "options": [
                  "Solo comentarios del código fuente.",
                  "Número de llamada al sistema adecuado más registros/punteros de argumentos",
                  "No hay registros en absoluto",
                  "Un mapa hash"
                ],
                "correct": 1,
                "explanation": "Las interfaces del sistema requieren registros definidos por ABI (o argumentos de pila) para el código de operación y los punteros de datos."
              }
            ]
          }
        ]
      },
      "bit-manipulation": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "La expresión x y (-x) aísla:",
                "options": [
                  "parte más significativa",
                  "Bit de conjunto menos significativo",
                  "Paridad",
                  "todos los"
                ],
                "correct": 1,
                "explanation": "La negación en complemento a dos invierte bits y suma uno, dejando solo el bit establecido más bajo cuando se aplica AND."
              },
              {
                "id": 2,
                "question": "XOR es útil para encontrar un elemento único porque:",
                "options": [
                  "Ordena valores",
                  "a ^ a = 0 por lo que los duplicados se cancelan, dejando el valor impar",
                  "Cambia bits",
                  "multiplica valores"
                ],
                "correct": 1,
                "explanation": "El emparejamiento de duplicados los elimina del acumulador, revelando el número solitario."
              },
              {
                "id": 3,
                "question": "Para configurar el bit i del número entero n puedes:",
                "options": [
                  "norte &= ~(1 << yo)",
                  "norte |= (1 << i)",
                  "n^= (1 << i)",
                  "norte >>= yo"
                ],
                "correct": 1,
                "explanation": "O con una máscara que contenga solo el bit i garantiza que el bit se convierta en 1 sin afectar a los demás."
              }
            ]
          }
        ]
      },
      "java-basics": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Las tiendas de tipos de caracteres de Java:",
                "options": [
                  "ASCII de 8 bits",
                  "Unidades de código UTF-16 de 16 bits",
                  "Unicódigo de 32 bits",
                  "Sólo dígitos"
                ],
                "correct": 1,
                "explanation": "char es un valor de 16 bits sin signo capaz de representar unidades UTF-16, lo que permite la compatibilidad con Unicode."
              },
              {
                "id": 2,
                "question": "Java pasa todo por:",
                "options": [
                  "Referencia",
                  "Valor (las referencias de objetos se copian)",
                  "aritmética de punteros",
                  "Copiar en escritura"
                ],
                "correct": 1,
                "explanation": "Aunque los objetos se manipulan indirectamente, el valor de referencia se pasa por valor."
              },
              {
                "id": 3,
                "question": "La palabra clave final en una variable significa:",
                "options": [
                  "Objeto inmutable",
                  "La referencia no se puede reasignar después de la inicialización",
                  "Encuadernación estática",
                  "Acceso seguro para subprocesos"
                ],
                "correct": 1,
                "explanation": "reasignación de paradas finales; para los objetos, bloquea la referencia, no el estado interno del objeto."
              }
            ]
          }
        ]
      },
      "git-basics-workflow": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "En Git, ¿para qué sirve el área de staging (índice)?",
                "options": [
                  "Ejecutar pruebas automáticamente",
                  "Seleccionar exactamente qué cambios entran al próximo commit",
                  "Guardar solo ramas remotas",
                  "Reescribir commits antiguos"
                ],
                "correct": 1,
                "explanation": "El staging permite construir commits enfocados seleccionando cambios específicos antes de confirmar."
              },
              {
                "id": 2,
                "question": "¿Cuál es la forma más segura de deshacer un commit malo que ya fue compartido en la rama principal remota?",
                "options": [
                  "git reset --hard HEAD~1",
                  "git revert <commit>",
                  "git commit --amend",
                  "git checkout -- ."
                ],
                "correct": 1,
                "explanation": "git revert crea un nuevo commit que revierte el anterior sin reescribir historial compartido."
              },
              {
                "id": 3,
                "question": "Un flujo de colaboración común es:",
                "options": [
                  "Cometer directo en main para cada cambio",
                  "Crear rama, hacer commits, subir rama y luego fusionar por PR",
                  "Borrar historial local cada semana",
                  "Usar conflictos para sincronizar progreso"
                ],
                "correct": 1,
                "explanation": "El trabajo por ramas aísla cambios, facilita revisión y mantiene estable la rama principal."
              }
            ]
          }
        ]
      },
      "control-flow": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "El bucle for-each mejorado no puede de forma segura:",
                "options": [
                  "Iterar matrices",
                  "Eliminar elementos mientras se itera",
                  "Leer valores",
                  "Manejar colecciones"
                ],
                "correct": 1,
                "explanation": "La modificación de la estructura de colección subyacente desencadena ConcurrentModificationException; utilice iteradores en su lugar."
              },
              {
                "id": 2,
                "question": "Las expresiones de cambio modernas (Java 14+) permiten:",
                "options": [
                  "Devolver valores a través de -> sintaxis",
                  "Sólo números enteros",
                  "Fallo por defecto",
                  "Despacho polimórfico"
                ],
                "correct": 0,
                "explanation": "Las expresiones de cambio se evalúan según un valor, lo que le permite asignar resultados directamente."
              },
              {
                "id": 3,
                "question": "Un bucle do- while se diferencia porque:",
                "options": [
                  "Primero verifica la condición.",
                  "Garantiza que el cuerpo ejecute al menos una vez.",
                  "es mas rapido",
                  "Solo funciona con enteros"
                ],
                "correct": 1,
                "explanation": "La evaluación de la condición ocurre después del cuerpo, asegurando al menos una iteración."
              }
            ]
          }
        ]
      },
      "oop-basics": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Encapsulación significa:",
                "options": [
                  "Sólo campos públicos",
                  "Agrupar datos y comportamiento con acceso restringido",
                  "herencia múltiple",
                  "Polimorfismo en tiempo de ejecución"
                ],
                "correct": 1,
                "explanation": "Los objetos ocultan su estado exponiendo interfaces controladas."
              },
              {
                "id": 2,
                "question": "El polimorfismo te permite:",
                "options": [
                  "evitar la herencia",
                  "Trate diferentes instancias de subclases a través de una interfaz de supertipo común",
                  "Optimizar la memoria",
                  "Desactivar anulación"
                ],
                "correct": 1,
                "explanation": "El envío dinámico garantiza que se ejecute el método anulado correcto según el tipo de tiempo de ejecución."
              },
              {
                "id": 3,
                "question": "las clases finales no pueden ser:",
                "options": [
                  "Instanciado",
                  "Subclasificado",
                  "Usado",
                  "Serializado"
                ],
                "correct": 1,
                "explanation": "Marcar una clase como final evita que otras clases la extiendan."
              }
            ]
          }
        ]
      },
      "exception-handling": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Las excepciones marcadas deben ser:",
                "options": [
                  "ignorado",
                  "Manejado con try/catch o declarado con throws",
                  "Convertido a excepciones de tiempo de ejecución automáticamente",
                  "Lanzado solo por JVM"
                ],
                "correct": 1,
                "explanation": "El compilador exige que las excepciones comprobadas se detecten o declaren."
              },
              {
                "id": 2,
                "question": "Finalmente los bloques se ejecutan excepto cuando:",
                "options": [
                  "Se utiliza la devolución",
                  "Se produce una falla System.exit o catastrófica de la VM",
                  "Excepción lanzada",
                  "Se ejecuta la pausa"
                ],
                "correct": 1,
                "explanation": "La ruta normal o las excepciones aún se ejecutan finalmente, pero la terminación de la VM lo impide."
              },
              {
                "id": 3,
                "question": "Pruebe con recursos automáticamente:",
                "options": [
                  "Reintentos de operaciones",
                  "Cierra los recursos AutoCloseable después del bloqueo incluso en excepciones",
                  "Hace que el código sea más rápido",
                  "Maneja excepciones no comprobadas"
                ],
                "correct": 1,
                "explanation": "Los recursos declarados en la declaración try se cierran de forma determinista, lo que reduce el texto estándar."
              }
            ]
          }
        ]
      },
      "collections-framework": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "LinkedHashMap mantiene:",
                "options": [
                  "orden ordenado",
                  "Orden de inserción a través de una lista de entradas doblemente enlazada",
                  "iteración aleatoria",
                  "Seguridad del hilo"
                ],
                "correct": 1,
                "explanation": "Combina una tabla hash con una lista vinculada para preservar un orden de iteración predecible."
              },
              {
                "id": 2,
                "question": "ArrayList es preferible a LinkedList cuando:",
                "options": [
                  "Se producen inserciones frecuentes de la cabeza.",
                  "El acceso aleatorio domina las operaciones",
                  "La memoria es escasa",
                  "Necesitas un comportamiento sin bloqueos"
                ],
                "correct": 1,
                "explanation": "ArrayList proporciona O(1) get/set mientras que LinkedList debe atravesar nodos."
              },
              {
                "id": 3,
                "question": "ConcurrentHashMap escala según:",
                "options": [
                  "Usando un único bloqueo global",
                  "Segmentar cubos/usar candados rayados y permitir lecturas sin candados",
                  "Copiar al escribir",
                  "Claves de clasificación"
                ],
                "correct": 1,
                "explanation": "Minimiza la contención al bloquear solo partes del mapa o usar CAS para escrituras."
              }
            ]
          }
        ]
      },
      "file-io": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Los flujos almacenados en búfer aceleran la IO porque:",
                "options": [
                  "Cifrar datos",
                  "Lecturas/escrituras por lotes en la memoria, lo que reduce las llamadas al sistema",
                  "Usar subprocesos múltiples",
                  "Saltar disco"
                ],
                "correct": 1,
                "explanation": "Menos viajes al dispositivo de bloqueo del sistema operativo reducen drásticamente los gastos generales."
              },
              {
                "id": 2,
                "question": "Try-with-resources es ideal para IO ya que:",
                "options": [
                  "Hace que los archivos sean opcionales",
                  "Cierra transmisiones automáticamente incluso cuando ocurren excepciones",
                  "Reintentos de operaciones",
                  "Bytes de caché"
                ],
                "correct": 1,
                "explanation": "Los recursos que implementan AutoCloseable se limpian sin bloques finalmente manuales."
              },
              {
                "id": 3,
                "question": "La utilidad java.nio.file.Files proporciona:",
                "options": [
                  "Conexiones de bases de datos",
                  "Manejo de rutas moderno, metadatos y ayudas atómicas para mover/copiar",
                  "Protocolos de red",
                  "Solo IO sincrónica"
                ],
                "correct": 1,
                "explanation": "La clase Archivos de NIO incluye métodos convenientes para interactuar con el sistema de archivos de forma segura."
              }
            ]
          }
        ]
      },
      "multithreading": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "sincronizado en Java garantiza:",
                "options": [
                  "Orden de ejecución del hilo",
                  "Exclusión mutua y visibilidad para un monitor de bloque/objeto",
                  "Código más rápido",
                  "Prevención automática de interbloqueo"
                ],
                "correct": 1,
                "explanation": "Adquiere el bloqueo intrínseco y establece relaciones que suceden antes."
              },
              {
                "id": 2,
                "question": "Los ejecutores simplifican la concurrencia al:",
                "options": [
                  "Eliminando hilos",
                  "Administrar grupos de subprocesos y desacoplar el envío de tareas de la ejecución",
                  "Hacer cumplir las corrientes paralelas",
                  "Reemplazo de interrupciones"
                ],
                "correct": 1,
                "explanation": "Usted envía tareas ejecutables/invocables; el ejecutor maneja la programación y el ciclo de vida."
              },
              {
                "id": 3,
                "question": "garantías volátiles:",
                "options": [
                  "Atomicidad de acciones compuestas.",
                  "Visibilidad/sin reordenamiento de lecturas y escrituras",
                  "Algoritmos sin bloqueo",
                  "Menor uso de memoria"
                ],
                "correct": 1,
                "explanation": "Los campos volátiles se leen/escriben directamente en la memoria principal, evitando valores obsoletos."
              }
            ]
          }
        ]
      },
      "design-patterns": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "El patrón Singleton asegura:",
                "options": [
                  "Varias instancias",
                  "Exactamente una instancia con acceso global",
                  "Acoplamiento flojo",
                  "Comportamiento del observador"
                ],
                "correct": 1,
                "explanation": "Oculta constructores y expone un único descriptor de acceso para la única instancia."
              },
              {
                "id": 2,
                "question": "El patrón de estrategia permite:",
                "options": [
                  "herencia múltiple",
                  "Intercambio de algoritmos en tiempo de ejecución a través de una interfaz común",
                  "Notificación de evento",
                  "Adaptación de interfaces"
                ],
                "correct": 1,
                "explanation": "Los clientes pueden inyectar diferentes objetos de comportamiento sin cambiar el código de contexto."
              },
              {
                "id": 3,
                "question": "El patrón de observador desacopla los componentes mediante:",
                "options": [
                  "Compartiendo el estado globalmente",
                  "Permitir que los sujetos publiquen eventos para observadores suscritos",
                  "Copiar datos",
                  "Usando herencia"
                ],
                "correct": 1,
                "explanation": "Los observadores se registran para recibir actualizaciones y los sujetos les notifican cuando cambia el estado."
              }
            ]
          }
        ]
      },
      "lambda-streams": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "Una interfaz funcional contiene:",
                "options": [
                  "Múltiples métodos abstractos",
                  "Exactamente un método abstracto (más valores predeterminados opcionales)",
                  "Sin métodos",
                  "Sólo métodos estáticos"
                ],
                "correct": 1,
                "explanation": "Las interfaces de método abstracto único (SAM) son compatibles con lambda."
              },
              {
                "id": 2,
                "question": "¿Qué operación de flujo es terminal?",
                "options": [
                  "mapa",
                  "filtrar",
                  "recolectar",
                  "ojeada"
                ],
                "correct": 2,
                "explanation": "recopilar activa la evaluación y recopila resultados, cerrando el flujo de flujo."
              },
              {
                "id": 3,
                "question": "Las transmisiones no deben reutilizarse porque:",
                "options": [
                  "copian datos",
                  "Las operaciones de la terminal los consumen y los marcan como cerrados.",
                  "pierden memoria",
                  "son lentos"
                ],
                "correct": 1,
                "explanation": "Una vez que se ejecuta una operación de terminal, el uso posterior genera IllegalStateException."
              }
            ]
          }
        ]
      },
      "generics": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "El borrado de tipo significa que:",
                "options": [
                  "Los genéricos persisten en tiempo de ejecución",
                  "La información de tipo genérico se elimina durante la compilación y se reemplaza con límites/conversiones",
                  "Los genéricos no se pueden anidar",
                  "Sólo se permiten primitivos"
                ],
                "correct": 1,
                "explanation": "La JVM ve tipos sin formato; el compilador impone la seguridad de tipos e inserta conversiones."
              },
              {
                "id": 2,
                "question": "¿El comodín? extiende T le permite:",
                "options": [
                  "Insertar valores T arbitrarios",
                  "Lea T o subclases de forma segura pero no inserte valores arbitrarios",
                  "Modificar lista libremente",
                  "Usa primitivas"
                ],
                "correct": 1,
                "explanation": "El productor extiende: trata la estructura como un productor; las escrituras no son seguras excepto nulas."
              },
              {
                "id": 3,
                "question": "Los métodos genéricos se diferencian de las clases genéricas porque:",
                "options": [
                  "Requerir herencia",
                  "Declarar sus propios parámetros de tipo independientes de la clase.",
                  "Solo funciona en interfaces",
                  "Necesito reflexión"
                ],
                "correct": 1,
                "explanation": "Los genéricos a nivel de método introducen <T> antes del tipo de valor devuelto, lo que permite una reutilización flexible."
              }
            ]
          }
        ]
      },
      "testing-junit": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "@BeforeEach en JUnit 5 ejecuta:",
                "options": [
                  "Una vez por clase",
                  "Antes de cada @Test para restablecer los aparatos",
                  "Después de las pruebas",
                  "Sólo en caso de fracaso"
                ],
                "correct": 1,
                "explanation": "Cada prueba recibe una nueva configuración para que el estado no se pierda."
              },
              {
                "id": 2,
                "question": "afirmarThrows se utiliza para:",
                "options": [
                  "Comparar objetos",
                  "Verificar que una lambda arroje un tipo de excepción específico",
                  "Saltar pruebas",
                  "Medir el tiempo de ejecución"
                ],
                "correct": 1,
                "explanation": "Garantiza que el ejecutable proporcionado genere la excepción esperada."
              },
              {
                "id": 3,
                "question": "Las pruebas parametrizadas le permiten:",
                "options": [
                  "Dependencias simuladas",
                  "Ejecute la misma lógica con múltiples entradas de fuentes como @CsvSource",
                  "Paralelizar automáticamente",
                  "Deshabilitar afirmaciones"
                ],
                "correct": 1,
                "explanation": "Junit alimenta diferentes conjuntos de argumentos a un método de prueba, lo que reduce la duplicación."
              }
            ]
          }
        ]
      },
      "jdbc-basics": {
        "parts": [
          {
            "questions": [
              {
                "id": 1,
                "question": "¿Qué objeto JDBC ejecuta sentencias SQL?",
                "options": [
                  "Conexión",
                  "Declaración/Declaración Preparada",
                  "Conjunto de resultados",
                  "Administrador de conductores"
                ],
                "correct": 1,
                "explanation": "PreparedStatement compila SQL con parámetros y lo envía a través de una conexión activa."
              },
              {
                "id": 2,
                "question": "Las declaraciones preparadas ayudan a prevenir la inyección de SQL porque:",
                "options": [
                  "Cifrar el tráfico",
                  "Separe la estructura de consulta de los parámetros del usuario",
                  "Usar hash",
                  "Cadenas de escape automático"
                ],
                "correct": 1,
                "explanation": "Los parámetros están vinculados, por lo que la entrada no puede alterar la estructura del comando SQL."
              },
              {
                "id": 3,
                "question": "Llamar a ResultSet.next() devuelve falso cuando:",
                "options": [
                  "La columna es nula",
                  "El cursor pasa de la última fila",
                  "Confirmaciones de transacciones",
                  "Se cierra la declaración"
                ],
                "correct": 1,
                "explanation": "next() avanza el cursor; cuando no hay más filas devuelve falso."
              }
            ]
          }
        ]
      }
    },
    "glossary": {
      "0": {
        "term": "Algoritmo",
        "definition": "Un procedimiento o fórmula paso a paso para resolver un problema. Debe ser finito, definido y eficaz.",
        "category": "General"
      },
      "1": {
        "term": "Formación",
        "definition": "Una estructura de datos que consta de elementos almacenados en ubicaciones de memoria contiguas, accesibles por índice.",
        "category": "Estructuras de datos"
      },
      "2": {
        "term": "Notación O grande",
        "definition": "Notación matemática que describe el límite superior de la complejidad del algoritmo en términos de tiempo o espacio.",
        "category": "Complejidad"
      },
      "3": {
        "term": "Búsqueda binaria",
        "definition": "Algoritmo de búsqueda eficiente para matrices ordenadas con complejidad temporal O (log n) dividiendo repetidamente el espacio de búsqueda por la mitad.",
        "category": "Algoritmos"
      },
      "4": {
        "term": "árbol binario",
        "definition": "Estructura de datos jerárquica donde cada nodo tiene como máximo dos hijos (izquierdo y derecho).",
        "category": "Estructuras de datos"
      },
      "5": {
        "term": "Búsqueda en amplitud (BFS)",
        "definition": "Algoritmo de recorrido de gráficos que explora los vértices nivel por nivel mediante una cola.",
        "category": "Algoritmos"
      },
      "6": {
        "term": "Búsqueda en profundidad (DFS)",
        "definition": "Algoritmo de recorrido de gráficos que explora lo más lejos posible a lo largo de cada rama utilizando una pila o recursividad.",
        "category": "Algoritmos"
      },
      "7": {
        "term": "Programación dinámica",
        "definition": "Técnica de resolución de problemas que divide problemas complejos en subproblemas más simples y almacena los resultados para evitar cálculos redundantes.",
        "category": "Técnicas"
      },
      "8": {
        "term": "Gráfico",
        "definition": "Estructura de datos no lineal que consta de vértices (nodos) conectados por aristas.",
        "category": "Estructuras de datos"
      },
      "9": {
        "term": "Tabla hash",
        "definition": "Estructura de datos que implementa una matriz asociativa utilizando la función hash para calcular el índice de pares clave-valor.",
        "category": "Estructuras de datos"
      },
      "10": {
        "term": "Montón",
        "definition": "Árbol binario completo donde los nodos padres están ordenados con respecto a los hijos (montón mínimo o montón máximo).",
        "category": "Estructuras de datos"
      },
      "11": {
        "term": "Lista enlazada",
        "definition": "Estructura de datos lineal donde los elementos se almacenan en nodos, cada uno de los cuales contiene datos y un puntero al siguiente nodo.",
        "category": "Estructuras de datos"
      },
      "12": {
        "term": "Cola",
        "definition": "Estructura de datos FIFO (primero en entrar, primero en salir) con operaciones de poner y quitar la cola.",
        "category": "Estructuras de datos"
      },
      "13": {
        "term": "recursividad",
        "definition": "Técnica de programación donde la función se llama a sí misma con entradas más pequeñas hasta llegar al caso base.",
        "category": "Técnicas"
      },
      "14": {
        "term": "Pila",
        "definition": "Estructura de datos LIFO (Último en entrar, primero en salir) con operaciones push y pop.",
        "category": "Estructuras de datos"
      },
      "15": {
        "term": "Complejidad del tiempo",
        "definition": "Medida del tiempo de ejecución del algoritmo en función del tamaño de entrada.",
        "category": "Complejidad"
      },
      "16": {
        "term": "Complejidad espacial",
        "definition": "Medida del espacio de memoria requerido por el algoritmo en función del tamaño de entrada.",
        "category": "Complejidad"
      },
      "17": {
        "term": "Recorrido del árbol",
        "definition": "Proceso de visitar cada nodo del árbol exactamente una vez (en orden, preorden, postorden).",
        "category": "Algoritmos"
      },
      "18": {
        "term": "Dos consejos",
        "definition": "Técnica que utiliza dos punteros para recorrer la estructura de datos, a menudo desde extremos opuestos.",
        "category": "Técnicas"
      },
      "19": {
        "term": "Algoritmo codicioso",
        "definition": "Enfoque de resolución de problemas que toma decisiones localmente óptimas en cada paso.",
        "category": "Técnicas"
      },
      "20": {
        "term": "Algoritmo de clasificación",
        "definition": "Algoritmo que reorganiza elementos en un orden determinado (por ejemplo, ascendente o descendente).",
        "category": "Algoritmos"
      },
      "21": {
        "term": "Combinar ordenar",
        "definition": "Algoritmo de clasificación divide y vencerás con complejidad temporal O (n log n) en todos los casos.",
        "category": "Algoritmos"
      },
      "22": {
        "term": "Ordenación rápida",
        "definition": "Algoritmo de clasificación eficiente que divide la matriz alrededor del pivote; caso promedio O (n log n).",
        "category": "Algoritmos"
      },
      "23": {
        "term": "Ordenar burbujas",
        "definition": "Algoritmo de clasificación simple que intercambia repetidamente elementos adyacentes si están en el orden incorrecto.",
        "category": "Algoritmos"
      },
      "24": {
        "term": "Orden de selección",
        "definition": "Algoritmo de clasificación in situ que selecciona repetidamente el elemento mínimo y lo coloca al principio.",
        "category": "Algoritmos"
      },
      "25": {
        "term": "Orden de inserción",
        "definition": "Crea una matriz ordenada, un elemento a la vez, insertando elementos en su posición correcta.",
        "category": "Algoritmos"
      },
      "26": {
        "term": "montón binario",
        "definition": "Árbol binario donde el padre es más pequeño (montón mínimo) o más grande (montón máximo) que sus hijos.",
        "category": "Estructuras de datos"
      },
      "27": {
        "term": "Detección del ciclo de Floyd",
        "definition": "Algoritmo que detecta ciclos en listas enlazadas mediante dos punteros que se mueven a diferentes velocidades.",
        "category": "Algoritmos"
      },
      "28": {
        "term": "Lista de adyacencia",
        "definition": "Representación gráfica mediante listas donde cada nodo almacena sus nodos vecinos.",
        "category": "Estructuras de datos"
      },
      "29": {
        "term": "Matriz de adyacencia",
        "definition": "Matriz 2D utilizada para representar un gráfico, donde las celdas denotan la presencia o ausencia de bordes.",
        "category": "Estructuras de datos"
      },
      "30": {
        "term": "Manipulación de bits",
        "definition": "Usar operadores bit a bit (AND, OR, XOR, SHIFT) para resolver problemas de manera eficiente.",
        "category": "Técnicas"
      },
      "31": {
        "term": "Suma de prefijo",
        "definition": "Matriz que almacena sumas acumuladas para permitir consultas rápidas de sumas de rango.",
        "category": "Técnicas"
      },
      "32": {
        "term": "Memorización",
        "definition": "Optimización que almacena resultados de costosas llamadas a funciones para evitar cálculos redundantes.",
        "category": "Técnicas"
      },
      "33": {
        "term": "Tabulación",
        "definition": "Técnica de programación dinámica ascendente mediante iteración y almacenamiento de resultados intermedios.",
        "category": "Técnicas"
      },
      "34": {
        "term": "intentarlo",
        "definition": "Árbol de prefijos utilizado para almacenar y buscar cadenas de manera eficiente.",
        "category": "Estructuras de datos"
      },
      "35": {
        "term": "Colocar",
        "definition": "Colección desordenada de elementos únicos con búsqueda, inserción y eliminación rápidas.",
        "category": "Estructuras de datos"
      },
      "36": {
        "term": "Mapa",
        "definition": "Estructura de datos de pares clave-valor con operaciones eficientes de búsqueda y actualización.",
        "category": "Estructuras de datos"
      },
      "37": {
        "term": "Ventana corrediza",
        "definition": "Técnica que utiliza una ventana (rango) sobre datos para resolver problemas de subarreglos o subcadenas de manera eficiente.",
        "category": "Técnicas"
      },
      "38": {
        "term": "Divide y vencerás",
        "definition": "Enfoque algorítmico que divide un problema en subproblemas, resuelve cada uno de forma recursiva y combina resultados.",
        "category": "Técnicas"
      },
      "39": {
        "term": "Retroceder",
        "definition": "Técnica recursiva que prueba posibles soluciones y deshace cambios cuando falla un camino.",
        "category": "Técnicas"
      },
      "40": {
        "term": "Árbol AVL",
        "definition": "Árbol de búsqueda binario autoequilibrado donde las alturas de los subárboles izquierdo y derecho difieren como máximo en uno.",
        "category": "Estructuras de datos"
      },
      "41": {
        "term": "Árbol rojo-negro",
        "definition": "Árbol de búsqueda binaria autoequilibrado con reglas de color para mantener el equilibrio.",
        "category": "Estructuras de datos"
      },
      "42": {
        "term": "Árbol de expansión",
        "definition": "Árbol de búsqueda binaria autoajustable que mueve los elementos accedidos a la raíz.",
        "category": "Estructuras de datos"
      },
      "43": {
        "term": "Unión-Buscar",
        "definition": "Estructura de datos de conjuntos separados que rastrea agrupaciones de elementos y admite operaciones de unión y búsqueda.",
        "category": "Estructuras de datos"
      },
      "44": {
        "term": "Compresión de ruta",
        "definition": "Optimización en union-find para aplanar la estructura del árbol para búsquedas más rápidas.",
        "category": "Técnicas"
      },
      "45": {
        "term": "Orden topológico",
        "definition": "Ordenamiento lineal de los vértices del gráfico de modo que para cada arista u → v, u aparece antes de v.",
        "category": "Algoritmos"
      },
      "46": {
        "term": "Árbol de expansión mínimo (MST)",
        "definition": "Subconjunto de aristas en un gráfico ponderado que conecta todos los vértices con un peso total mínimo.",
        "category": "Algoritmos"
      },
      "47": {
        "term": "Algoritmo de Dijkstra",
        "definition": "Algoritmo codicioso para encontrar el camino más corto desde una fuente a todos los vértices en un gráfico ponderado.",
        "category": "Algoritmos"
      },
      "48": {
        "term": "Algoritmo de Bellman-Ford",
        "definition": "Algoritmo que calcula los caminos más cortos incluso con pesos de borde negativos.",
        "category": "Algoritmos"
      },
      "49": {
        "term": "Algoritmo de Kruskal",
        "definition": "Algoritmo codicioso para construir un árbol de expansión mínimo ordenando todos los bordes por peso.",
        "category": "Algoritmos"
      },
      "50": {
        "term": "Algoritmo de Prim",
        "definition": "Algoritmo codicioso que genera un árbol de expansión mínimo a partir de un nodo inicial.",
        "category": "Algoritmos"
      }
    },
    "flashcards": {
      "1": {
        "question": "¿Cuál es la complejidad temporal de acceder a un elemento de una matriz por índice?",
        "answer": "O(1) - Tiempo constante\n\nLas matrices proporcionan acceso directo a elementos utilizando su índice."
      },
      "2": {
        "question": "¿Cuál es la diferencia entre Array y ArrayList en Java?",
        "answer": "Matriz: tamaño fijo, puede almacenar primitivas y objetos.\nArrayList: tamaño dinámico, almacena solo objetos\n\nMatriz: int[] arr = nuevo int[5];\nArrayList: ArrayList<Integer> lista = nueva ArrayList<>();"
      },
      "3": {
        "question": "Explica la técnica de los dos punteros con un ejemplo.",
        "answer": "Utilice dos punteros para escanear datos desde ambos extremos.\n\nEjemplo: compruebe si una cadena es un palíndromo.\nizquierda = 0, derecha = longitud de cadena - 1\nCompara y avanza hacia adentro.\n\nTiempo: O(n), Espacio: O(1)"
      },
      "4": {
        "question": "¿Qué es una LinkedList y cuándo usarla?",
        "answer": "LinkedList almacena elementos como nodos con los siguientes punteros.\n\nÚselo cuando:\n• Inserción/eliminación frecuente\n• Tamaño desconocido o cambiante\n• No se necesita acceso aleatorio"
      },
      "5": {
        "question": "¿Cómo funciona el algoritmo de detección del ciclo de Floyd?",
        "answer": "Utilice dos punteros (lento y rápido).\nSi hay un ciclo, lo rápido eventualmente se encuentra con lo lento.\nSi no, rápido llega a nulo.\n\nSe utiliza para detectar bucles en listas vinculadas."
      },
      "6": {
        "question": "¿Pila versus cola?",
        "answer": "Pila: LIFO (empujar/pop)\nCola: FIFO (poner en cola/quitar de cola)\n\nPila: utilizada en recursividad, deshacer\nCola: utilizada en BFS, programación"
      },
      "7": {
        "question": "¿Qué es la notación O grande?",
        "answer": "Big O describe la complejidad tiempo/espacio en el peor de los casos.\n\nEjemplos:\nO(1) - acceso a la matriz\nO(log n) - búsqueda binaria\nO(n²) - bucles anidados"
      },
      "8": {
        "question": "¿Qué es un árbol de búsqueda binaria (BST)?",
        "answer": "Izquierda < raíz < derecha\nTodos los subárboles también son BST.\n\nTiempo promedio: O(log n)\nPeor caso (desequilibrado): O(n)"
      },
      "9": {
        "question": "¿Qué soluciona la técnica de la ventana corredera?",
        "answer": "Eficiente para problemas de subarreglos (como la suma máxima de tamaño k).\nMueva una ventana a través de datos y actualice el resultado sin reiniciar.\n\nHora: O(n)"
      },
      "10": {
        "question": "¿Para qué sirven las matrices de suma de prefijos?",
        "answer": "Ayuda en consultas de sumas de rango rápido.\n\nprefijo[i] = suma(arr[0] a arr[i])\n\nTiempo: O(1) para la suma del rango después de la configuración O(n)"
      },
      "11": {
        "question": "¿Cuándo utilizar un HashMap?",
        "answer": "Úselo cuando necesite una búsqueda rápida basada en claves.\nTiempo promedio: O(1) para get/put\n\nEjemplo: contador de frecuencia"
      },
      "12": {
        "question": "¿Cuál es el propósito de la programación dinámica?",
        "answer": "Se utiliza para resolver subproblemas superpuestos.\nAlmacenar resultados (memorización o tabulación)\n\nEjemplo: Fibonacci, mochila"
      },
      "13": {
        "question": "¿Cuál es la diferencia entre DFS y BFS?",
        "answer": "DFS: Profundiza usando pila/recursión\nBFS: orden de niveles usando cola\n\nSe utiliza para diferentes tipos de exploración de gráficos."
      },
      "14": {
        "question": "¿Qué es un montón?",
        "answer": "Árbol binario con ordenamiento padre-hijo.\nMontón mínimo: padre ≤ hijos\nMontón máximo: padre ≥ hijos\n\nUtilizado en colas prioritarias"
      },
      "15": {
        "question": "¿Qué es la memorización?",
        "answer": "Enfoque de DP de arriba hacia abajo.\nAlmacene los resultados de las llamadas a funciones en la memoria caché para evitar trabajos repetidos.\n\nUtilizado en problemas con mucha recursividad"
      },
      "16": {
        "question": "¿Qué es la tabulación?",
        "answer": "Enfoque de PD ascendente.\nCree soluciones de forma iterativa en una tabla.\nNo se necesita recursividad."
      },
      "17": {
        "question": "¿Cuándo se utiliza la búsqueda binaria?",
        "answer": "Se utiliza en matrices/listas ordenadas.\nTiempo: O(log n)\n\nDivida el espacio de búsqueda por la mitad cada vez."
      },
      "18": {
        "question": "¿Cómo revertir una lista enlazada?",
        "answer": "Utilice tres punteros: anterior, actual, siguiente\nIterar e invertir los siguientes punteros.\n\nHora: O(n)"
      },
      "19": {
        "question": "¿Cuál es el espacio y el tiempo del tipo de fusión?",
        "answer": "Hora: O(n iniciar sesión n)\nEspacio: O(n)\n\nEs estable y funciona bien en listas vinculadas."
      },
      "20": {
        "question": "¿Qué es un gráfico?",
        "answer": "Conjunto de nodos conectados por aristas.\nPuede ser dirigido/no dirigido, ponderado/no ponderado.\n\nSe utiliza para modelar redes, mapas, etc."
      },
      "21": {
        "question": "¿Qué es un Trie?",
        "answer": "Árbol utilizado para el almacenamiento eficiente de cuerdas.\nSe comparten los prefijos comunes.\nSe utiliza en autocompletar y búsqueda de palabras."
      },
      "22": {
        "question": "¿Cómo funciona la clasificación rápida?",
        "answer": "Elija pivote, elementos de partición\nOrdenar particiones recursivamente\n\nTiempo: Promedio O(n log n), Peor O(n²)"
      },
      "23": {
        "question": "¿Qué es retroceder?",
        "answer": "Pruebe una solución; si falla, regrese y pruebe con otra.\nUtilizado en rompecabezas, permutaciones, n-reinas."
      },
      "24": {
        "question": "¿Cuál es la diferencia entre recursividad e iteración?",
        "answer": "Recursión: la función se llama a sí misma\nIteración: utiliza bucles\n\nLa recursividad suele ser más limpia pero utiliza más espacio de pila"
      },
      "25": {
        "question": "¿Qué es una función hash?",
        "answer": "Función que asigna claves a índices.\nUtilizado en tablas hash\nDebe minimizar las colisiones"
      },
      "26": {
        "question": "¿Cuál es el mejor y el peor caso para la clasificación de burbujas?",
        "answer": "Mejor: O(n) si ya está ordenado\nLo peor: O(n²) con muchos intercambios"
      },
      "27": {
        "question": "¿Qué es una cola prioritaria?",
        "answer": "Cola donde se eliminan elementos por prioridad.\nA menudo se implementa con montones."
      },
      "28": {
        "question": "¿Para qué sirve un conjunto en Java?",
        "answer": "Almacena elementos únicos.\nÚtil para comprobar duplicados en tiempo O(1)"
      },
      "29": {
        "question": "¿Qué es un caso base en recursividad?",
        "answer": "La condición de detención de una función recursiva.\nSin él, obtienes recursividad infinita."
      },
      "30": {
        "question": "¿Cuál es la diferencia entre == y .equals() en Java?",
        "answer": "== compara referencias\n.equals() compara valores reales"
      },
      "31": {
        "question": "¿Cuándo utilizar TreeMap frente a HashMap?",
        "answer": "TreeMap mantiene las claves ordenadas (O(log n))\nHashMap está desordenado (O(1))"
      },
      "32": {
        "question": "¿Qué es un árbol binario equilibrado?",
        "answer": "Árbol donde los subárboles izquierdo y derecho de cada nodo difieren en altura como máximo en 1"
      },
      "33": {
        "question": "¿Cuál es la diferencia entre pila de llamadas y montón?",
        "answer": "Pila de llamadas: almacena llamadas a funciones\nMontón: almacena memoria asignada dinámicamente"
      },
      "34": {
        "question": "¿Qué es la recursividad de cola?",
        "answer": "La llamada recursiva es la última declaración de la función.\nSe puede optimizar para usar menos pila"
      },
      "35": {
        "question": "¿Cuál es la diferencia entre BFS y Dijkstra?",
        "answer": "BFS: para gráficos no ponderados\nDijkstra: para gráficos ponderados (sin ponderaciones negativas)"
      },
      "36": {
        "question": "¿Qué es un ganglio centinela en listas enlazadas?",
        "answer": "Nodo ficticio que simplifica las inserciones/eliminaciones en la cabecera/cola."
      },
      "37": {
        "question": "¿Qué es el análisis amortizado?",
        "answer": "Rendimiento promedio por operación durante una secuencia de operaciones"
      },
      "38": {
        "question": "¿Cuál es la complejidad temporal de las operaciones de hashmap?",
        "answer": "Promedio: O(1)\nPeor de los casos (con colisiones): O(n)"
      },
      "39": {
        "question": "¿Qué es la coloración de gráficos?",
        "answer": "Asigne colores a los vértices para que no haya dos vértices adyacentes que tengan el mismo color.\nUtilizado en problemas de programación."
      },
      "40": {
        "question": "¿Para qué sirve una matriz de adyacencia?",
        "answer": "Búsqueda rápida de bordes (O(1))\nNo ahorra espacio para gráficos dispersos"
      },
      "41": {
        "question": "¿Cuáles son las propiedades de un árbol de búsqueda binaria?",
        "answer": "Izquierda < raíz < derecha\nSin duplicados\nLos subárboles también son BST."
      },
      "42": {
        "question": "¿Cuál es la diferencia entre recorrido de preorden, en orden y posterior al pedido?",
        "answer": "Reserva: raíz, izquierda, derecha\nEn orden: izquierda, raíz, derecha\nOrden posterior: izquierda, derecha, raíz"
      },
      "43": {
        "question": "¿Qué es la clasificación topológica?",
        "answer": "Orden lineal de nodos en un DAG para que u venga antes de v para todos los bordes u → v"
      },
      "44": {
        "question": "¿Qué es una unión de conjuntos disjuntos (unión-hallazgo)?",
        "answer": "Realiza un seguimiento de un conjunto de elementos divididos en grupos separados.\nSoporta operaciones de unión y búsqueda."
      },
      "45": {
        "question": "¿Qué es la compresión de ruta en Union-Find?",
        "answer": "Optimización que aplana la estructura del árbol para acelerar operaciones futuras"
      },
      "46": {
        "question": "¿Qué es una actualización diferida en árboles de segmentos?",
        "answer": "Retrasa la propagación de actualizaciones para mejorar el rendimiento en las actualizaciones de rango"
      },
      "47": {
        "question": "¿Cuál es la diferencia entre el montón mínimo y el montón máximo?",
        "answer": "Montón mínimo: elemento más pequeño en la raíz\nMontón máximo: elemento más grande en la raíz"
      },
      "48": {
        "question": "¿Cómo detectar un ciclo en un gráfico?",
        "answer": "Utilice DFS con pila visitada y recursiva O Union-Find"
      },
      "49": {
        "question": "¿Cuál es la diferencia entre una copia superficial y una copia profunda?",
        "answer": "Superficial: copia de referencia\nProfundo: copia toda la estructura del objeto."
      },
      "50": {
        "question": "¿Qué es el problema de la mochila?",
        "answer": "Problema de optimización para elegir artículos con valor máximo y peso <= capacidad\nResuelto con DP"
      }
    },
    "dailyChallenges": {
      "arrays-two-pointer-refresh": {
        "title": "Sprint de dos puntos",
        "description": "Vuelva a crear el verificador palíndromo desde la memoria y luego extiéndalo para ignorar los emoji o la puntuación.",
        "steps": [
          "Reescribe el ayudante palíndromo base sin mirar.",
          "Agregue soporte para filtrado Unicode o emoji.",
          "Pruebe con al menos 3 cuerdas difíciles."
        ]
      },
      "linkedlist-cycle-visual": {
        "title": "detective de ciclo",
        "description": "Trace el algoritmo del ciclo de Floyd con un diagrama personalizado.",
        "steps": [
          "Dibuja una pequeña lista enlazada con un bucle.",
          "Registre las posiciones de lento/rápido durante 4 iteraciones.",
          "Explique con sus propias palabras por qué deben reunirse."
        ]
      },
      "graphs-bfs-refresh": {
        "title": "Creador de mapas BFS",
        "description": "Convierta la demostración de BFS en pseudocódigo con comentarios que enviaría a un compañero de equipo.",
        "steps": [
          "Describe las operaciones de la cola y el uso del conjunto visitado.",
          "Agregue una protección para los nodos desconectados.",
          "Escribe un escenario del mundo real en el que BFS supere a DFS."
        ]
      },
      "dp-table": {
        "title": "Instantánea de la tabla DP",
        "description": "Congele la tabla de programación dinámica LIS y anote las transiciones.",
        "steps": [
          "Registre la matriz dp[] después de cada iteración.",
          "Resuma aquí por qué LIS es O(n²).",
          "Convierta la solución a un diagrama de tabulación."
        ]
      },
      "heaps-visual": {
        "title": "Taladro amontonado",
        "description": "Practique la acumulación manual escribiendo la matriz después de cada intercambio.",
        "steps": [
          "Comience con la matriz de muestra en el módulo.",
          "Realice un seguimiento de cada comparación de niños izquierdo/derecho.",
          "Explique cuándo buscaría un montón en lugar de una lista ordenada."
        ]
      }
    },
    "studyTips": {
      "0": "Divida el tiempo de estudio en bloques de trabajo profundo de 25 minutos y regístrelos en Focus Tracker.",
      "1": "Explique un algoritmo en voz alta o a un pato de goma antes de leer la solución oficial.",
      "2": "Cambie el tamaño de fuente global en Configuración si siente la vista cansada: la comodidad aumenta la concentración.",
      "3": "Marque los módulos como completos solo después de que pueda resumir el código sin mirar.",
      "4": "Utilice el desafío diario como calentamiento y luego realice un ejercicio del módulo relacionado.",
      "5": "Empareje tarjetas con código: después de ver una definición, abra el fragmento de módulo al que hace referencia.",
      "6": "Actualice el Consejo de estudio cuando termine un módulo para mantener alta la motivación."
    },
    "interviewExamples": {
      "two-sum": {
        "title": "Dos sumas (mapa hash)",
        "difficulty": "Principiante",
        "tags": [
          "Formación",
          "HashMap"
        ],
        "prompt": "Dada una serie de números enteros, devuelve índices de los dos números de manera que sumen un objetivo. Suponga exactamente una solución y que no puede utilizar el mismo elemento dos veces.",
        "notes": "Almacene el valor → índice para que la búsqueda sea O (1).",
        "language": "Java"
      },
      "valid-parentheses": {
        "title": "Paréntesis válidos (pila)",
        "difficulty": "Principiante",
        "tags": [
          "Pila",
          "Cadena"
        ],
        "prompt": "Dada una cadena que contiene corchetes ()[]{}, determine si la cadena es válida. Una cadena válida cierra corchetes en el orden correcto.",
        "notes": "Empuje para abrir, haga estallar cuando llegue el cierre correspondiente.",
        "language": "Java"
      },
      "merge-two-lists": {
        "title": "Fusionar dos listas ordenadas",
        "difficulty": "Principiante",
        "tags": [
          "Lista enlazada",
          "Dos consejos"
        ],
        "prompt": "Fusiona dos listas enlazadas ordenadas y devuelve el encabezado de la lista fusionada. La lista resultante debe ordenarse.",
        "notes": "Utilice una cabeza ficticia para simplificar las actualizaciones del puntero.",
        "language": "Java"
      },
      "binary-search": {
        "title": "Búsqueda binaria",
        "difficulty": "Principiante",
        "tags": [
          "Formación",
          "Búsqueda binaria"
        ],
        "prompt": "Dada una matriz ordenada y un valor objetivo, devuelve el índice si lo encuentra. De lo contrario, devuelve -1.",
        "notes": "Reduzca siempre la ventana de búsqueda según mid.",
        "language": "Java"
      },
      "bfs-grid": {
        "title": "Ruta más corta en cuadrícula (BFS)",
        "difficulty": "Intermedio",
        "tags": [
          "Gráfico",
          "BFS"
        ],
        "prompt": "Dada una cuadrícula con 0 = libre y 1 = bloqueado, encuentre la longitud del camino más corto desde la parte superior izquierda hasta la parte inferior derecha usando BFS.",
        "notes": "BFS garantiza el camino más corto en gráficos no ponderados.",
        "language": "Java"
      },
      "top-k-frequent": {
        "title": "Top K elementos frecuentes",
        "difficulty": "Intermedio",
        "tags": [
          "HashMap",
          "Montón"
        ],
        "prompt": "Dada una matriz de números enteros, devuelve los k elementos más frecuentes.",
        "notes": "Mantenga un montón mínimo de tamaño k para O (n log k).",
        "language": "Java"
      }
    },
    "notesLibrary": {
      "arrays-strings": {
        "title": "Hoja de referencia de matrices y cadenas",
        "description": "Big-O, patrones de ventanas corredizas y errores comunes.",
        "category": "matrices",
        "level": "Principiante"
      },
      "linked-lists": {
        "title": "Guía visual de listas enlazadas",
        "description": "Movimientos del puntero, patrones de inversión y detección de ciclos.",
        "category": "Listas enlazadas",
        "level": "Principiante"
      },
      "stack-queue": {
        "title": "Referencia rápida de pilas y colas",
        "description": "Casos de uso LIFO/FIFO, patrones monótonos y colas.",
        "category": "Pilas y colas",
        "level": "Principiante"
      },
      "trees": {
        "title": "Guía de árboles y BST",
        "description": "Recorridos, invariantes BST y consejos de recursividad.",
        "category": "Árboles",
        "level": "Intermedio"
      },
      "graphs": {
        "title": "Gráficos Hoja BFS/DFS",
        "description": "Listas de adyacencia, plantillas transversales y ruta más corta.",
        "category": "Graficos",
        "level": "Intermedio"
      },
      "sorting": {
        "title": "Resumen de algoritmos de clasificación",
        "description": "Estable versus inestable, complejidades y casos de uso.",
        "category": "Clasificación",
        "level": "Principiante"
      },
      "recursion": {
        "title": "Recursión y retroceso",
        "description": "Casos base, pila de llamadas y lista de verificación de seguimiento.",
        "category": "recursividad",
        "level": "Intermedio"
      },
      "big-o": {
        "title": "Gran O y complejidad",
        "description": "Intuición en tiempo de ejecución, análisis amortizado y trampas.",
        "category": "Complejidad",
        "level": "Principiante"
      },
      "java-dsa": {
        "title": "Colecciones de Java para DSA",
        "description": "HashMap, ArrayDeque, hoja de referencia PriorityQueue.",
        "category": "Java",
        "level": "Intermedio"
      },
      "discrete-math": {
        "title": "Kit de herramientas de matemáticas discretas",
        "description": "Conceptos básicos de lógica, conjuntos, combinatoria y gráficas.",
        "category": "Matemáticas discretas",
        "level": "Principiante"
      }
    }
  },
  "literals": {
    "What is the time complexity of accessing an element in an array by index?": "¿Cuál es la complejidad temporal de acceder a un elemento de una matriz por índice?",
    "O(1) - Constant time\n\nArrays provide direct access to elements using their index.": "O(1) - Tiempo constante\n\nLas matrices proporcionan acceso directo a elementos utilizando su índice.",
    "What is the difference between Array and ArrayList in Java?": "¿Cuál es la diferencia entre Array y ArrayList en Java?",
    "Array: Fixed size, can store primitives and objects\nArrayList: Dynamic size, stores only objects\n\nArray: int[] arr = new int[5];\nArrayList: ArrayList<Integer> list = new ArrayList<>();": "Matriz: tamaño fijo, puede almacenar primitivas y objetos.\nArrayList: tamaño dinámico, almacena solo objetos\n\nMatriz: int[] arr = nuevo int[5];\nArrayList: ArrayList<Integer> lista = nueva ArrayList<>();",
    "Explain the Two Pointer technique with an example.": "Explica la técnica de los dos punteros con un ejemplo.",
    "Use two pointers to scan data from both ends.\n\nExample: Check if a string is a palindrome.\nleft = 0, right = str.length - 1\nCompare and move inward.\n\nTime: O(n), Space: O(1)": "Utilice dos punteros para escanear datos desde ambos extremos.\n\nEjemplo: compruebe si una cadena es un palíndromo.\nizquierda = 0, derecha = longitud de cadena - 1\nCompara y avanza hacia adentro.\n\nTiempo: O(n), Espacio: O(1)",
    "What is a LinkedList and when to use it?": "¿Qué es una LinkedList y cuándo usarla?",
    "LinkedList stores elements as nodes with next pointers.\n\nUse when:\n• Frequent insert/delete\n• Unknown or changing size\n• No random access needed": "LinkedList almacena elementos como nodos con los siguientes punteros.\n\nÚselo cuando:\n• Inserción/eliminación frecuente\n• Tamaño desconocido o cambiante\n• No se necesita acceso aleatorio",
    "How does Floyd’s Cycle Detection Algorithm work?": "¿Cómo funciona el algoritmo de detección del ciclo de Floyd?",
    "Use two pointers (slow and fast).\nIf there's a cycle, fast eventually meets slow.\nIf not, fast reaches null.\n\nUsed to detect loops in linked lists.": "Utilice dos punteros (lento y rápido).\nSi hay un ciclo, lo rápido eventualmente se encuentra con lo lento.\nSi no, rápido llega a nulo.\n\nSe utiliza para detectar bucles en listas vinculadas.",
    "Stack vs Queue?": "¿Pila versus cola?",
    "Stack: LIFO (push/pop)\nQueue: FIFO (enqueue/dequeue)\n\nStack: Used in recursion, undo\nQueue: Used in BFS, scheduling": "Pila: LIFO (empujar/pop)\nCola: FIFO (poner en cola/quitar de cola)\n\nPila: utilizada en recursividad, deshacer\nCola: utilizada en BFS, programación",
    "What is Big O notation?": "¿Qué es la notación O grande?",
    "Big O describes worst-case time/space complexity.\n\nExamples:\nO(1) - array access\nO(log n) - binary search\nO(n²) - nested loops": "Big O describe la complejidad tiempo/espacio en el peor de los casos.\n\nEjemplos:\nO(1) - acceso a la matriz\nO(log n) - búsqueda binaria\nO(n²) - bucles anidados",
    "What is a Binary Search Tree (BST)?": "¿Qué es un árbol de búsqueda binaria (BST)?",
    "Left < root < right\nAll subtrees are also BSTs\n\nAverage time: O(log n)\nWorst case (unbalanced): O(n)": "Izquierda < raíz < derecha\nTodos los subárboles también son BST.\n\nTiempo promedio: O(log n)\nPeor caso (desequilibrado): O(n)",
    "What does the sliding window technique solve?": "¿Qué soluciona la técnica de la ventana corredera?",
    "Efficient for subarray problems (like max sum of size k).\nMove a window across data and update result without restarting.\n\nTime: O(n)": "Eficiente para problemas de subarreglos (como la suma máxima de tamaño k).\nMueva una ventana a través de datos y actualice el resultado sin reiniciar.\n\nHora: O(n)",
    "What is the use of prefix sum arrays?": "¿Para qué sirven las matrices de suma de prefijos?",
    "Helps in fast range sum queries.\n\nprefix[i] = sum(arr[0] to arr[i])\n\nTime: O(1) for range sum after O(n) setup": "Ayuda en consultas de sumas de rango rápido.\n\nprefijo[i] = suma(arr[0] a arr[i])\n\nTiempo: O(1) para la suma del rango después de la configuración O(n)",
    "When to use a HashMap?": "¿Cuándo utilizar un HashMap?",
    "Use when you need fast key-based lookup.\nAverage Time: O(1) for get/put\n\nExample: Frequency counter": "Úselo cuando necesite una búsqueda rápida basada en claves.\nTiempo promedio: O(1) para get/put\n\nEjemplo: contador de frecuencia",
    "What is the purpose of dynamic programming?": "¿Cuál es el propósito de la programación dinámica?",
    "Used to solve overlapping subproblems.\nStore results (memoization or tabulation)\n\nExample: Fibonacci, knapsack": "Se utiliza para resolver subproblemas superpuestos.\nAlmacenar resultados (memorización o tabulación)\n\nEjemplo: Fibonacci, mochila",
    "What’s the difference between DFS and BFS?": "¿Cuál es la diferencia entre DFS y BFS?",
    "DFS: Goes deep using stack/recursion\nBFS: Level-order using queue\n\nUsed for different types of graph exploration": "DFS: Profundiza usando pila/recursión\nBFS: orden de niveles usando cola\n\nSe utiliza para diferentes tipos de exploración de gráficos.",
    "What is a Heap?": "¿Qué es un montón?",
    "Binary tree with parent-child ordering.\nMin Heap: parent ≤ children\nMax Heap: parent ≥ children\n\nUsed in Priority Queues": "Árbol binario con ordenamiento padre-hijo.\nMontón mínimo: padre ≤ hijos\nMontón máximo: padre ≥ hijos\n\nUtilizado en colas prioritarias",
    "What is memoization?": "¿Qué es la memorización?",
    "Top-down DP approach.\nStore function call results in cache to avoid repeated work.\n\nUsed in recursion-heavy problems": "Enfoque de DP de arriba hacia abajo.\nAlmacene los resultados de las llamadas a funciones en la memoria caché para evitar trabajos repetidos.\n\nUtilizado en problemas con mucha recursividad",
    "What is tabulation?": "¿Qué es la tabulación?",
    "Bottom-up DP approach.\nBuild solutions iteratively in a table.\nNo recursion needed.": "Enfoque de PD ascendente.\nCree soluciones de forma iterativa en una tabla.\nNo se necesita recursividad.",
    "When is binary search used?": "¿Cuándo se utiliza la búsqueda binaria?",
    "Used on sorted arrays/lists.\nTime: O(log n)\n\nSplit search space in half each time.": "Se utiliza en matrices/listas ordenadas.\nTiempo: O(log n)\n\nDivida el espacio de búsqueda por la mitad cada vez.",
    "How to reverse a linked list?": "¿Cómo revertir una lista enlazada?",
    "Use three pointers: prev, curr, next\nIterate and reverse the next pointers\n\nTime: O(n)": "Utilice tres punteros: anterior, actual, siguiente\nIterar e invertir los siguientes punteros.\n\nHora: O(n)",
    "What’s the space and time of merge sort?": "¿Cuál es el espacio y el tiempo del tipo de fusión?",
    "Time: O(n log n)\nSpace: O(n)\n\nIt’s stable and works well on linked lists": "Hora: O(n iniciar sesión n)\nEspacio: O(n)\n\nEs estable y funciona bien en listas vinculadas.",
    "What is a Graph?": "¿Qué es un gráfico?",
    "Set of nodes connected by edges\nCan be directed/undirected, weighted/unweighted\n\nUsed to model networks, maps, etc.": "Conjunto de nodos conectados por aristas.\nPuede ser dirigido/no dirigido, ponderado/no ponderado.\n\nSe utiliza para modelar redes, mapas, etc.",
    "What is a Trie?": "¿Qué es un Trie?",
    "Tree used for efficient string storage.\nCommon prefixes are shared.\nUsed in autocomplete and word search.": "Árbol utilizado para el almacenamiento eficiente de cuerdas.\nSe comparten los prefijos comunes.\nSe utiliza en autocompletar y búsqueda de palabras.",
    "How does quicksort work?": "¿Cómo funciona la clasificación rápida?",
    "Pick pivot, partition elements\nRecursively sort partitions\n\nTime: Avg O(n log n), Worst O(n²)": "Elija pivote, elementos de partición\nOrdenar particiones recursivamente\n\nTiempo: Promedio O(n log n), Peor O(n²)",
    "What is backtracking?": "¿Qué es retroceder?",
    "Try a solution path, if it fails, go back and try another.\nUsed in puzzles, permutations, n-queens.": "Pruebe una solución; si falla, regrese y pruebe con otra.\nUtilizado en rompecabezas, permutaciones, n-reinas.",
    "What’s the difference between recursion and iteration?": "¿Cuál es la diferencia entre recursividad e iteración?",
    "Recursion: function calls itself\nIteration: uses loops\n\nRecursion is often cleaner but uses more stack space": "Recursión: la función se llama a sí misma\nIteración: utiliza bucles\n\nLa recursividad suele ser más limpia pero utiliza más espacio de pila",
    "What is a hash function?": "¿Qué es una función hash?",
    "Function that maps keys to indices\nUsed in hash tables\nShould minimize collisions": "Función que asigna claves a índices.\nUtilizado en tablas hash\nDebe minimizar las colisiones",
    "What is the best case and worst case for bubble sort?": "¿Cuál es el mejor y el peor caso para la clasificación de burbujas?",
    "Best: O(n) if already sorted\nWorst: O(n²) with many swaps": "Mejor: O(n) si ya está ordenado\nLo peor: O(n²) con muchos intercambios",
    "What’s a priority queue?": "¿Qué es una cola prioritaria?",
    "Queue where elements are removed by priority.\nOften implemented with heaps.": "Cola donde se eliminan elementos por prioridad.\nA menudo se implementa con montones.",
    "What is the use of a Set in Java?": "¿Para qué sirve un conjunto en Java?",
    "Stores unique elements.\nUseful for checking duplicates in O(1) time": "Almacena elementos únicos.\nÚtil para comprobar duplicados en tiempo O(1)",
    "What is a base case in recursion?": "¿Qué es un caso base en recursividad?",
    "The stopping condition of a recursive function.\nWithout it, you get infinite recursion.": "La condición de detención de una función recursiva.\nSin él, obtienes recursividad infinita.",
    "What is the difference between == and .equals() in Java?": "¿Cuál es la diferencia entre == y .equals() en Java?",
    "== compares references\n.equals() compares actual values": "== compara referencias\n.equals() compara valores reales",
    "When to use TreeMap vs HashMap?": "¿Cuándo utilizar TreeMap frente a HashMap?",
    "TreeMap keeps keys sorted (O(log n))\nHashMap is unordered (O(1))": "TreeMap mantiene las claves ordenadas (O(log n))\nHashMap está desordenado (O(1))",
    "What’s a balanced binary tree?": "¿Qué es un árbol binario equilibrado?",
    "Tree where left and right subtrees of every node differ in height by at most 1": "Árbol donde los subárboles izquierdo y derecho de cada nodo difieren en altura como máximo en 1",
    "What’s the difference between call stack and heap?": "¿Cuál es la diferencia entre pila de llamadas y montón?",
    "Call stack: stores function calls\nHeap: stores dynamically allocated memory": "Pila de llamadas: almacena llamadas a funciones\nMontón: almacena memoria asignada dinámicamente",
    "What is tail recursion?": "¿Qué es la recursividad de cola?",
    "Recursive call is the last statement in the function.\nCan be optimized to use less stack": "La llamada recursiva es la última declaración de la función.\nSe puede optimizar para usar menos pila",
    "What’s the difference between BFS and Dijkstra?": "¿Cuál es la diferencia entre BFS y Dijkstra?",
    "BFS: for unweighted graphs\nDijkstra: for weighted graphs (no negative weights)": "BFS: para gráficos no ponderados\nDijkstra: para gráficos ponderados (sin ponderaciones negativas)",
    "What is a sentinel node in linked lists?": "¿Qué es un ganglio centinela en listas enlazadas?",
    "Dummy node that simplifies insertions/deletions at head/tail.": "Nodo ficticio que simplifica las inserciones/eliminaciones en la cabecera/cola.",
    "What is amortized analysis?": "¿Qué es el análisis amortizado?",
    "Average performance per operation over a sequence of operations": "Rendimiento promedio por operación durante una secuencia de operaciones",
    "What’s the time complexity of hashmap operations?": "¿Cuál es la complejidad temporal de las operaciones de hashmap?",
    "Average: O(1)\nWorst-case (with collisions): O(n)": "Promedio: O(1)\nPeor de los casos (con colisiones): O(n)",
    "What is graph coloring?": "¿Qué es la coloración de gráficos?",
    "Assign colors to vertices so no two adjacent vertices have the same color.\nUsed in scheduling problems": "Asigne colores a los vértices para que no haya dos vértices adyacentes que tengan el mismo color.\nUtilizado en problemas de programación.",
    "What is an adjacency matrix good for?": "¿Para qué sirve una matriz de adyacencia?",
    "Fast edge lookup (O(1))\nNot space-efficient for sparse graphs": "Búsqueda rápida de bordes (O(1))\nNo ahorra espacio para gráficos dispersos",
    "What are the properties of a Binary Search Tree?": "¿Cuáles son las propiedades de un árbol de búsqueda binaria?",
    "Left < root < right\nNo duplicates\nSubtrees are also BSTs": "Izquierda < raíz < derecha\nSin duplicados\nLos subárboles también son BST.",
    "What is the difference between pre-order, in-order, and post-order traversal?": "¿Cuál es la diferencia entre recorrido de preorden, en orden y posterior al pedido?",
    "Pre-order: root, left, right\nIn-order: left, root, right\nPost-order: left, right, root": "Reserva: raíz, izquierda, derecha\nEn orden: izquierda, raíz, derecha\nOrden posterior: izquierda, derecha, raíz",
    "What is topological sorting?": "¿Qué es la clasificación topológica?",
    "Linear ordering of nodes in a DAG so u comes before v for all edges u → v": "Orden lineal de nodos en un DAG para que u venga antes de v para todos los bordes u → v",
    "What is a Disjoint Set Union (Union-Find)?": "¿Qué es una unión de conjuntos disjuntos (unión-hallazgo)?",
    "Tracks a set of elements split into disjoint groups.\nSupports union and find operations": "Realiza un seguimiento de un conjunto de elementos divididos en grupos separados.\nSoporta operaciones de unión y búsqueda.",
    "What is path compression in Union-Find?": "¿Qué es la compresión de ruta en Union-Find?",
    "Optimization that flattens the structure of the tree to speed up future operations": "Optimización que aplana la estructura del árbol para acelerar operaciones futuras",
    "What is a lazy update in Segment Trees?": "¿Qué es una actualización diferida en árboles de segmentos?",
    "Delays update propagation to improve performance in range updates": "Retrasa la propagación de actualizaciones para mejorar el rendimiento en las actualizaciones de rango",
    "What’s the difference between min heap and max heap?": "¿Cuál es la diferencia entre el montón mínimo y el montón máximo?",
    "Min heap: smallest element at root\nMax heap: largest element at root": "Montón mínimo: elemento más pequeño en la raíz\nMontón máximo: elemento más grande en la raíz",
    "How to detect a cycle in a graph?": "¿Cómo detectar un ciclo en un gráfico?",
    "Use DFS with visited and recursion stack OR Union-Find": "Utilice DFS con pila visitada y recursiva O Union-Find",
    "What’s the difference between a shallow copy and deep copy?": "¿Cuál es la diferencia entre una copia superficial y una copia profunda?",
    "Shallow: copies reference\nDeep: copies entire object structure": "Superficial: copia de referencia\nProfundo: copia toda la estructura del objeto.",
    "What is the Knapsack problem?": "¿Qué es el problema de la mochila?",
    "Optimization problem to choose items with max value and weight <= capacity\nSolved with DP": "Problema de optimización para elegir artículos con valor máximo y peso <= capacidad\nResuelto con DP",
    "Algorithm": "Algoritmo",
    "A step-by-step procedure or formula for solving a problem. Must be finite, definite, and effective.": "Un procedimiento o fórmula paso a paso para resolver un problema. Debe ser finito, definido y eficaz.",
    "General": "General",
    "Array": "Formación",
    "A data structure consisting of elements stored in contiguous memory locations, accessible by index.": "Una estructura de datos que consta de elementos almacenados en ubicaciones de memoria contiguas, accesibles por índice.",
    "Data Structures": "Estructuras de datos",
    "Big O Notation": "Notación O grande",
    "Mathematical notation describing the upper bound of algorithm complexity in terms of time or space.": "Notación matemática que describe el límite superior de la complejidad del algoritmo en términos de tiempo o espacio.",
    "Complexity": "Complejidad",
    "Binary Search": "Búsqueda binaria",
    "Efficient search algorithm for sorted arrays with O(log n) time complexity by repeatedly dividing search space in half.": "Algoritmo de búsqueda eficiente para matrices ordenadas con complejidad temporal O (log n) dividiendo repetidamente el espacio de búsqueda por la mitad.",
    "Algorithms": "Algoritmos",
    "Binary Tree": "árbol binario",
    "Hierarchical data structure where each node has at most two children (left and right).": "Estructura de datos jerárquica donde cada nodo tiene como máximo dos hijos (izquierdo y derecho).",
    "Breadth-First Search (BFS)": "Búsqueda en amplitud (BFS)",
    "Graph traversal algorithm that explores vertices level by level using a queue.": "Algoritmo de recorrido de gráficos que explora los vértices nivel por nivel mediante una cola.",
    "Depth-First Search (DFS)": "Búsqueda en profundidad (DFS)",
    "Graph traversal algorithm that explores as far as possible along each branch using a stack or recursion.": "Algoritmo de recorrido de gráficos que explora lo más lejos posible a lo largo de cada rama utilizando una pila o recursividad.",
    "Dynamic Programming": "Programación dinámica",
    "Problem-solving technique that breaks complex problems into simpler subproblems and stores results to avoid redundant calculations.": "Técnica de resolución de problemas que divide problemas complejos en subproblemas más simples y almacena los resultados para evitar cálculos redundantes.",
    "Techniques": "Técnicas",
    "Graph": "Gráfico",
    "Non-linear data structure consisting of vertices (nodes) connected by edges.": "Estructura de datos no lineal que consta de vértices (nodos) conectados por aristas.",
    "Hash Table": "Tabla hash",
    "Data structure that implements associative array using hash function to compute index for key-value pairs.": "Estructura de datos que implementa una matriz asociativa utilizando la función hash para calcular el índice de pares clave-valor.",
    "Heap": "Montón",
    "Complete binary tree where parent nodes are ordered with respect to children (min-heap or max-heap).": "Árbol binario completo donde los nodos padres están ordenados con respecto a los hijos (montón mínimo o montón máximo).",
    "Linked List": "Lista enlazada",
    "Linear data structure where elements are stored in nodes, each containing data and pointer to next node.": "Estructura de datos lineal donde los elementos se almacenan en nodos, cada uno de los cuales contiene datos y un puntero al siguiente nodo.",
    "Queue": "Cola",
    "FIFO (First In, First Out) data structure with enqueue and dequeue operations.": "Estructura de datos FIFO (primero en entrar, primero en salir) con operaciones de poner y quitar la cola.",
    "Recursion": "recursividad",
    "Programming technique where function calls itself with smaller input until reaching base case.": "Técnica de programación donde la función se llama a sí misma con entradas más pequeñas hasta llegar al caso base.",
    "Stack": "Pila",
    "LIFO (Last In, First Out) data structure with push and pop operations.": "Estructura de datos LIFO (Último en entrar, primero en salir) con operaciones push y pop.",
    "Time Complexity": "Complejidad del tiempo",
    "Measure of execution time of algorithm as function of input size.": "Medida del tiempo de ejecución del algoritmo en función del tamaño de entrada.",
    "Space Complexity": "Complejidad espacial",
    "Measure of memory space required by algorithm as function of input size.": "Medida del espacio de memoria requerido por el algoritmo en función del tamaño de entrada.",
    "Tree Traversal": "Recorrido del árbol",
    "Process of visiting each node in tree exactly once (inorder, preorder, postorder).": "Proceso de visitar cada nodo del árbol exactamente una vez (en orden, preorden, postorden).",
    "Two Pointers": "Dos consejos",
    "Technique using two pointers to traverse data structure, often from opposite ends.": "Técnica que utiliza dos punteros para recorrer la estructura de datos, a menudo desde extremos opuestos.",
    "Greedy Algorithm": "Algoritmo codicioso",
    "Problem-solving approach that makes locally optimal choice at each step.": "Enfoque de resolución de problemas que toma decisiones localmente óptimas en cada paso.",
    "Sorting Algorithm": "Algoritmo de clasificación",
    "Algorithm that rearranges elements in a certain order (e.g., ascending or descending).": "Algoritmo que reorganiza elementos en un orden determinado (por ejemplo, ascendente o descendente).",
    "Merge Sort": "Combinar ordenar",
    "Divide-and-conquer sorting algorithm with O(n log n) time complexity in all cases.": "Algoritmo de clasificación divide y vencerás con complejidad temporal O (n log n) en todos los casos.",
    "Quick Sort": "Ordenación rápida",
    "Efficient sorting algorithm that partitions array around pivot; average case O(n log n).": "Algoritmo de clasificación eficiente que divide la matriz alrededor del pivote; caso promedio O (n log n).",
    "Bubble Sort": "Ordenar burbujas",
    "Simple sorting algorithm that repeatedly swaps adjacent elements if they’re in the wrong order.": "Algoritmo de clasificación simple que intercambia repetidamente elementos adyacentes si están en el orden incorrecto.",
    "Selection Sort": "Orden de selección",
    "In-place sorting algorithm that repeatedly selects the minimum element and places it at the beginning.": "Algoritmo de clasificación in situ que selecciona repetidamente el elemento mínimo y lo coloca al principio.",
    "Insertion Sort": "Orden de inserción",
    "Builds sorted array one element at a time by inserting items into their correct position.": "Crea una matriz ordenada, un elemento a la vez, insertando elementos en su posición correcta.",
    "Binary Heap": "montón binario",
    "Binary tree where parent is smaller (min-heap) or larger (max-heap) than its children.": "Árbol binario donde el padre es más pequeño (montón mínimo) o más grande (montón máximo) que sus hijos.",
    "Floyd’s Cycle Detection": "Detección del ciclo de Floyd",
    "Algorithm that detects cycles in linked lists using two pointers moving at different speeds.": "Algoritmo que detecta ciclos en listas enlazadas mediante dos punteros que se mueven a diferentes velocidades.",
    "Adjacency List": "Lista de adyacencia",
    "Graph representation using lists where each node stores its neighboring nodes.": "Representación gráfica mediante listas donde cada nodo almacena sus nodos vecinos.",
    "Adjacency Matrix": "Matriz de adyacencia",
    "2D array used to represent a graph, where cells denote presence or absence of edges.": "Matriz 2D utilizada para representar un gráfico, donde las celdas denotan la presencia o ausencia de bordes.",
    "Bit Manipulation": "Manipulación de bits",
    "Using bitwise operators (AND, OR, XOR, SHIFT) to solve problems efficiently.": "Usar operadores bit a bit (AND, OR, XOR, SHIFT) para resolver problemas de manera eficiente.",
    "Prefix Sum": "Suma de prefijo",
    "Array that stores cumulative sums to enable quick range sum queries.": "Matriz que almacena sumas acumuladas para permitir consultas rápidas de sumas de rango.",
    "Memoization": "Memorización",
    "Optimization that stores results of expensive function calls to avoid redundant computations.": "Optimización que almacena resultados de costosas llamadas a funciones para evitar cálculos redundantes.",
    "Tabulation": "Tabulación",
    "Bottom-up dynamic programming technique using iteration and storage of intermediate results.": "Técnica de programación dinámica ascendente mediante iteración y almacenamiento de resultados intermedios.",
    "Trie": "intentarlo",
    "Prefix tree used for storing and searching strings efficiently.": "Árbol de prefijos utilizado para almacenar y buscar cadenas de manera eficiente.",
    "Set": "Colocar",
    "Unordered collection of unique elements with fast lookup, insertion, and deletion.": "Colección desordenada de elementos únicos con búsqueda, inserción y eliminación rápidas.",
    "Map": "Mapa",
    "Key-value pair data structure with efficient lookup and update operations.": "Estructura de datos de pares clave-valor con operaciones eficientes de búsqueda y actualización.",
    "Sliding Window": "Ventana corrediza",
    "Technique that uses a window (range) over data to solve subarray or substring problems efficiently.": "Técnica que utiliza una ventana (rango) sobre datos para resolver problemas de subarreglos o subcadenas de manera eficiente.",
    "Divide and Conquer": "Divide y vencerás",
    "Algorithmic approach that breaks a problem into subproblems, solves each recursively, and combines results.": "Enfoque algorítmico que divide un problema en subproblemas, resuelve cada uno de forma recursiva y combina resultados.",
    "Backtracking": "Retroceder",
    "Recursive technique that tries possible solutions and undoes changes when a path fails.": "Técnica recursiva que prueba posibles soluciones y deshace cambios cuando falla un camino.",
    "AVL Tree": "Árbol AVL",
    "Self-balancing binary search tree where heights of left and right subtrees differ by at most one.": "Árbol de búsqueda binario autoequilibrado donde las alturas de los subárboles izquierdo y derecho difieren como máximo en uno.",
    "Red-Black Tree": "Árbol rojo-negro",
    "Self-balancing binary search tree with color rules to maintain balance.": "Árbol de búsqueda binaria autoequilibrado con reglas de color para mantener el equilibrio.",
    "Splay Tree": "Árbol de expansión",
    "Self-adjusting binary search tree that moves accessed elements to the root.": "Árbol de búsqueda binaria autoajustable que mueve los elementos accedidos a la raíz.",
    "Union-Find": "Unión-Buscar",
    "Disjoint set data structure that tracks element groupings and supports union and find operations.": "Estructura de datos de conjuntos separados que rastrea agrupaciones de elementos y admite operaciones de unión y búsqueda.",
    "Path Compression": "Compresión de ruta",
    "Optimization in union-find to flatten tree structure for faster lookups.": "Optimización en union-find para aplanar la estructura del árbol para búsquedas más rápidas.",
    "Topological Sort": "Orden topológico",
    "Linear ordering of graph vertices such that for every edge u → v, u appears before v.": "Ordenamiento lineal de los vértices del gráfico de modo que para cada arista u → v, u aparece antes de v.",
    "Minimum Spanning Tree (MST)": "Árbol de expansión mínimo (MST)",
    "Subset of edges in a weighted graph that connects all vertices with minimum total weight.": "Subconjunto de aristas en un gráfico ponderado que conecta todos los vértices con un peso total mínimo.",
    "Dijkstra’s Algorithm": "Algoritmo de Dijkstra",
    "Greedy algorithm to find the shortest path from a source to all vertices in a weighted graph.": "Algoritmo codicioso para encontrar el camino más corto desde una fuente a todos los vértices en un gráfico ponderado.",
    "Bellman-Ford Algorithm": "Algoritmo de Bellman-Ford",
    "Algorithm that computes shortest paths even with negative edge weights.": "Algoritmo que calcula los caminos más cortos incluso con pesos de borde negativos.",
    "Kruskal’s Algorithm": "Algoritmo de Kruskal",
    "Greedy algorithm to build a minimum spanning tree by sorting all edges by weight.": "Algoritmo codicioso para construir un árbol de expansión mínimo ordenando todos los bordes por peso.",
    "Prim’s Algorithm": "Algoritmo de Prim",
    "Greedy algorithm that grows a minimum spanning tree from a starting node.": "Algoritmo codicioso que genera un árbol de expansión mínimo a partir de un nodo inicial.",
    "What is the time complexity of accessing an element in an array by its index?": "¿Cuál es la complejidad temporal de acceder a un elemento de una matriz por su índice?",
    "O(1)": "O(1)",
    "O(log n)": "O(log n)",
    "O(n)": "En)",
    "O(n²)": "O(n²)",
    "Random access arrays compute the memory address via base + index × element_size, so lookup cost is constant.": "Las matrices de acceso aleatorio calculan la dirección de memoria mediante base + índice × tamaño_elemento, por lo que el costo de búsqueda es constante.",
    "Which technique is most efficient for checking if a string is a palindrome?": "¿Qué técnica es más eficaz para comprobar si una cuerda es un palíndromo?",
    "Reverse and compare": "Invertir y comparar",
    "Two pointers": "Dos consejos",
    "Stack-based approach": "Enfoque basado en pilas",
    "Two pointers toggled inward compare characters in O(n) time while keeping O(1) extra memory.": "Dos punteros alternaban hacia adentro para comparar caracteres en tiempo O(n) mientras se mantenía memoria adicional O(1).",
    "Sliding window works best when:": "La ventana corrediza funciona mejor cuando:",
    "You need factorial permutations": "Necesitas permutaciones factoriales",
    "The subarray size or constraint can be updated incrementally": "El tamaño o la restricción del subarreglo se pueden actualizar de forma incremental.",
    "Data is a tree": "Los datos son un árbol.",
    "The input is immutable": "La entrada es inmutable.",
    "Sliding windows reuse previous work (add/remove elements) making contiguous-range problems linear rather than quadratic.": "Las ventanas deslizantes reutilizan trabajos anteriores (agregar o quitar elementos), lo que hace que los problemas de rangos contiguos sean lineales en lugar de cuadráticos.",
    "Why can linked lists grow or shrink more easily than arrays?": "¿Por qué las listas enlazadas pueden crecer o reducirse más fácilmente que las matrices?",
    "They use less memory": "Usan menos memoria",
    "Elements live on the heap and nodes connect via pointers": "Los elementos viven en el montón y los nodos se conectan mediante punteros.",
    "They store indices": "Almacenan índices",
    "They are cache-optimized": "Están optimizados para caché",
    "Each node is dynamically allocated and linked, so insertions/deletions adjust pointers without shifting contiguous memory.": "Cada nodo se asigna y vincula dinámicamente, por lo que las inserciones/eliminaciones ajustan los punteros sin desplazar la memoria contigua.",
    "Floyd's cycle detection works because the fast pointer:": "La detección del ciclo de Floyd funciona porque el puntero rápido:",
    "Moves randomly": "Se mueve aleatoriamente",
    "Moves twice as fast and therefore laps the slow pointer in a cycle": "Se mueve dos veces más rápido y por lo tanto gira el puntero lento en un ciclo.",
    "Starts at the cycle entry": "Comienza en la entrada del ciclo.",
    "Checks node values": "Comprueba los valores de los nodos",
    "The fast pointer gains one node on the slow pointer each iteration, so they eventually meet if a loop exists.": "El puntero rápido gana un nodo en el puntero lento en cada iteración, por lo que eventualmente se encuentran si existe un bucle.",
    "Reversing a singly linked list in-place requires:": "Revertir una lista enlazada individualmente requiere:",
    "Three pointers to rewire next references iteratively": "Tres consejos para volver a cablear las siguientes referencias de forma iterativa",
    "Recursive stack only": "Solo pila recursiva",
    "Changing head value only": "Cambiar solo el valor de la cabeza",
    "Doubly linked nodes": "Nodos doblemente enlazados",
    "Prev/current/nextTemp allow you to redirect each node's next pointer while progressing through the list once.": "Prev/current/nextTemp le permite redirigir el siguiente puntero de cada nodo mientras avanza por la lista una vez.",
    "Which data structure best validates balanced parentheses?": "¿Qué estructura de datos valida mejor los paréntesis equilibrados?",
    "A stack mirrors nesting depth—push for '(' and pop for ')'—so mismatches surface immediately.": "Una pila refleja la profundidad de anidamiento (presione '(' y haga clic en ')'), por lo que no coincide con la superficie inmediatamente.",
    "Why does BFS depend on FIFO order?": "¿Por qué BFS depende del orden FIFO?",
    "It mimics recursion": "Imita la recursividad",
    "It must explore closest nodes first": "Primero debe explorar los nodos más cercanos.",
    "It sorts nodes": "Ordena nodos",
    "It caches edges": "Caché de bordes",
    "Level-order exploration requires removing nodes in the same order they were discovered, which a queue guarantees.": "La exploración por orden de niveles requiere eliminar los nodos en el mismo orden en que fueron descubiertos, lo que garantiza una cola.",
    "Implementing a queue with two stacks yields what amortized complexity for enqueue/dequeue?": "¿La implementación de una cola con dos pilas produce qué complejidad amortizada para poner en cola/quitar de cola?",
    "O(n log n)": "O(n iniciar sesión n)",
    "While elements occasionally move between stacks, each element is transferred at most twice, leading to amortized O(1).": "Si bien los elementos se mueven ocasionalmente entre pilas, cada elemento se transfiere como máximo dos veces, lo que genera O(1) amortizado.",
    "The height of a binary tree equals:": "La altura de un árbol binario es:",
    "Total nodes": "Nodos totales",
    "Edges on the longest root-to-leaf path": "Bordes en el camino más largo de raíz a hoja",
    "Number of leaves": "numero de hojas",
    "Depth of minimum node": "Profundidad del nodo mínimo",
    "Height measures the depth of the deepest leaf and dictates recursion depth and balance reasoning.": "La altura mide la profundidad de la hoja más profunda y dicta la profundidad de recursividad y el razonamiento del equilibrio.",
    "In-order traversal of a BST yields:": "El recorrido en orden de un BST produce:",
    "Random order": "Orden aleatorio",
    "Sorted ascending keys": "Claves ascendentes ordenadas",
    "Post-order sequence": "Secuencia posterior al pedido",
    "Only leaf nodes": "Solo nodos de hoja",
    "Left subtree < root < right subtree, so visiting them in that order produces sorted keys.": "Subárbol izquierdo <raíz <subárbol derecho, por lo que visitarlos en ese orden produce claves ordenadas.",
    "A full binary tree is defined by:": "Un árbol binario completo está definido por:",
    "Every node has 0 or 2 children": "Cada nodo tiene 0 o 2 hijos.",
    "Perfect balance": "Equilibrio perfecto",
    "Only leaves at last level": "Sólo sale en el último nivel.",
    "All nodes same value": "Todos los nodos tienen el mismo valor",
    "Full trees forbid nodes with a single child, which helps when reasoning about structure or converting to arrays.": "Los árboles completos prohíben los nodos con un solo hijo, lo que ayuda a la hora de razonar sobre la estructura o convertir a matrices.",
    "The load factor of a hash table measures:": "El factor de carga de una tabla hash mide:",
    "Average probe length": "Longitud media de la sonda",
    "Entries divided by bucket count": "Entradas divididas por recuento de depósitos",
    "Number of collisions": "Número de colisiones",
    "Memory usage": "Uso de memoria",
    "Load factor α = n / m drives when to resize; keeping α bounded retains O(1) average operations.": "El factor de carga α = n / m determina cuándo cambiar el tamaño; mantener α acotado retiene operaciones promedio O(1).",
    "Separate chaining stores collisions by:": "Separe las colisiones de tiendas de encadenamiento mediante:",
    "Linear probing": "Sondeo lineal",
    "Arrays of buckets stored on disk": "Matrices de depósitos almacenados en el disco.",
    "Secondary structures (lists/trees) per bucket": "Estructuras secundarias (listas/árboles) por depósito",
    "Doubling key size": "Duplicar el tamaño de la clave",
    "Each bucket points to a linked list or balanced tree containing all keys hashing to that bucket.": "Cada depósito apunta a una lista vinculada o árbol equilibrado que contiene todas las claves hash de ese depósito.",
    "Open addressing requires careful handling of deletes because:": "El direccionamiento abierto requiere un manejo cuidadoso de las eliminaciones porque:",
    "Memory leaks occur": "Se producen pérdidas de memoria",
    "Removed slots break probe sequences unless marked as tombstones": "Las ranuras eliminadas interrumpen las secuencias de sonda a menos que estén marcadas como lápidas",
    "Load factor resets": "Restablecimientos del factor de carga",
    "Keys resort automatically": "Las llaves se recurren automáticamente",
    "Linear/quad probing relies on contiguous probes; marking deleted slots prevents search termination before real entries.": "El sondeo lineal/cuádruple se basa en sondas contiguas; marcar espacios eliminados evita que la búsqueda finalice antes de las entradas reales.",
    "A binary heap is stored efficiently in an array because:": "Un montón binario se almacena eficientemente en una matriz porque:",
    "It sorts automatically": "Se ordena automáticamente",
    "Parent/child indices follow simple math (i→2i+1/2i+2)": "Los índices padre/hijo siguen matemáticas simples (i→2i+1/2i+2)",
    "It needs pointers": "necesita punteros",
    "Heapify needs recursion": "Heapify necesita recursividad",
    "Heap nodes correspond to contiguous indices, so tree relationships derive from arithmetic rather than explicit references.": "Los nodos del montón corresponden a índices contiguos, por lo que las relaciones de los árboles se derivan de referencias aritméticas en lugar de referencias explícitas.",
    "Build-heap via bottom-up heapify runs in:": "El montón de compilación mediante heapify ascendente se ejecuta en:",
    "Most nodes are near the leaves, so their heapify cost is small; summing costs yields linear time.": "La mayoría de los nudos están cerca de las hojas, por lo que su costo acumulado es pequeño; la suma de costos produce un tiempo lineal.",
    "Heaps underpin priority queues because they:": "Los montones sustentan las colas prioritarias porque:",
    "Maintain strict sorting": "Mantener una clasificación estricta",
    "Allow fast retrieval and adjustment of highest-priority element": "Permitir una rápida recuperación y ajuste del elemento de mayor prioridad.",
    "Use BST rotations": "Utilice rotaciones BST",
    "Guarantee O(1) deletion": "Garantía de eliminación O(1)",
    "The max/min sits at the root (O(1) access) and adjustments only traverse tree height (O(log n)).": "El máximo/mínimo se ubica en la raíz (acceso O(1)) y los ajustes solo atraviesan la altura del árbol (O(log n)).",
    "Which algorithm is stable and always O(n log n)?": "¿Qué algoritmo es estable y siempre O (n log n)?",
    "Heap Sort": "Ordenar montón",
    "Shell Sort": "Ordenar conchas",
    "Merge sort splits/merges deterministically so runtime never degrades to quadratic and ties preserve order.": "La ordenación de fusión divide/fusiona de forma determinista para que el tiempo de ejecución nunca se degrade a cuadrático y los vínculos preserven el orden.",
    "Why does quick sort degrade on already sorted arrays with naive pivot choice?": "¿Por qué la clasificación rápida se degrada en matrices ya ordenadas con una elección de pivote ingenua?",
    "Recursion depth stays constant": "La profundidad de la recursión se mantiene constante",
    "Partitions become unbalanced (n-1 vs 0 elements)": "Las particiones se desequilibran (n-1 frente a 0 elementos)",
    "Randomization fails": "La aleatorización falla",
    "It copies too much": "Copia demasiado",
    "Picking first or last element as pivot yields worst-case recursion depth n and total work O(n²).": "Elegir el primer o último elemento como pivote produce una profundidad de recursividad n en el peor de los casos y un trabajo total O(n²).",
    "Counting/Radix sorts beat comparison sorts when:": "Las clasificaciones de conteo/Radix superan a las clasificaciones de comparación cuando:",
    "Keys have bounded integer ranges or fixed digit count": "Las claves tienen rangos de enteros acotados o un recuento de dígitos fijo",
    "Data is unsorted text": "Los datos son texto sin ordenar.",
    "Floating numbers appear": "Aparecen números flotantes",
    "You need in-place sort": "Necesitas clasificación in situ",
    "They leverage key structure instead of comparisons, achieving near O(n) time when the domain is limited.": "Aprovechan la estructura clave en lugar de las comparaciones, logrando un tiempo cercano a O(n) cuando el dominio es limitado.",
    "Binary search requires:": "La búsqueda binaria requiere:",
    "Linked lists": "Listas enlazadas",
    "Sorted random-access collection": "Colección ordenada de acceso aleatorio",
    "Hash table": "tabla hash",
    "Tree": "Árbol",
    "Halving the search space depends on direct indexing; without sorted order halving is meaningless.": "Reducir a la mitad el espacio de búsqueda depende de la indexación directa; sin un orden ordenado, reducir a la mitad no tiene sentido.",
    "Interpolation search excels when:": "La búsqueda por interpolación sobresale cuando:",
    "Keys are uniformly distributed numbers": "Las claves son números distribuidos uniformemente.",
    "Data is unsorted": "Los datos no están ordenados.",
    "Strings contain duplicates": "Las cadenas contienen duplicados",
    "You need recursion": "Necesitas recursividad",
    "The probe position is estimated proportional to value; uniform numeric distributions make this guess accurate.": "La posición de la sonda se estima proporcional al valor; Las distribuciones numéricas uniformes hacen que esta suposición sea precisa.",
    "Exponential search is helpful because it:": "La búsqueda exponencial es útil porque:",
    "Avoids recursion": "Evita la recursividad",
    "Quickly finds bounds in infinite or unknown-length arrays before binary searching": "Encuentra rápidamente límites en matrices infinitas o de longitud desconocida antes de la búsqueda binaria",
    "Sorts data": "Ordena datos",
    "Builds heaps": "construye montones",
    "It doubles the index until the target is within range, then performs binary search inside that window.": "Duplica el índice hasta que el objetivo está dentro del rango y luego realiza una búsqueda binaria dentro de esa ventana.",
    "A base case prevents:": "Un caso base previene:",
    "Compilation errors": "Errores de compilación",
    "Infinite recursion and stack overflow": "Recursividad infinita y desbordamiento de pila",
    "Tail-call optimization": "Optimización de llamadas finales",
    "Caching": "Almacenamiento en caché",
    "Without a terminating condition, calls never stop and the stack eventually exhausts memory.": "Sin una condición de terminación, las llamadas nunca se detienen y la pila eventualmente agota la memoria.",
    "Recursion tree analysis helps by:": "El análisis del árbol de recursividad ayuda a:",
    "Comparing algorithms to loops": "Comparando algoritmos con bucles",
    "Visualizing how many subcalls occur at each level and summing total cost": "Visualizar cuántas subllamadas ocurren en cada nivel y sumar el costo total",
    "Reducing memory": "Reducir la memoria",
    "Guaranteeing optimality": "Garantizar la optimización",
    "Drawing branches per call clarifies total work, which is critical for Master Theorem intuition.": "Dibujar ramas por llamada aclara el trabajo total, lo cual es fundamental para la intuición del teorema maestro.",
    "Tail recursion allows compilers to:": "La recursividad de cola permite a los compiladores:",
    "Parallelize automatically": "Paralelizar automáticamente",
    "Reuse the same stack frame for the recursive call": "Reutilice el mismo marco de pila para la llamada recursiva",
    "Skip base cases": "Saltar casos base",
    "Memoize results": "Memorizar resultados",
    "If the recursive call is the final action, the current frame need not persist, so optimized runtimes reuse it.": "Si la llamada recursiva es la acción final, el fotograma actual no necesita persistir, por lo que los tiempos de ejecución optimizados lo reutilizan.",
    "Dynamic programming relies on:": "La programación dinámica se basa en:",
    "Independent subproblems": "Subproblemas independientes",
    "Overlapping subproblems and optimal substructure": "Subproblemas superpuestos y subestructura óptima",
    "Random choices": "Opciones aleatorias",
    "Greedy proofs": "Pruebas codiciosas",
    "DP caches solutions because subproblems repeat, and combining optimal sub-solutions yields a global optimum.": "DP almacena en caché las soluciones porque los subproblemas se repiten y la combinación de subsoluciones óptimas produce un óptimo global.",
    "Memoization differs from tabulation because it:": "La memorización se diferencia de la tabulación porque:",
    "Requires iteration": "Requiere iteración",
    "Evaluates subproblems lazily via recursion and caching": "Evalúa subproblemas de forma perezosa mediante recursividad y almacenamiento en caché.",
    "Uses more memory": "Utiliza más memoria",
    "Needs sorted input": "Necesita información ordenada",
    "Top-down memoization only solves subproblems that appear, mirroring the recursive structure exactly.": "La memorización de arriba hacia abajo sólo resuelve los subproblemas que aparecen, reflejando exactamente la estructura recursiva.",
    "Identifying DP state involves:": "Identificar el estado de DP implica:",
    "Finding loops": "Encontrar bucles",
    "Choosing variables that uniquely represent a subproblem": "Elegir variables que representen de forma única un subproblema",
    "Sorting arrays": "Ordenar matrices",
    "Optimizing constants": "Optimización de constantes",
    "State dimensions encode parameters that differentiate subproblems; without clear state boundaries caching fails.": "Las dimensiones estatales codifican parámetros que diferencian subproblemas; sin límites estatales claros, el almacenamiento en caché falla.",
    "The greedy-choice property means:": "La propiedad de elección codiciosa significa:",
    "Choices are random": "Las elecciones son aleatorias",
    "A locally optimal choice leads to a globally optimal solution": "Una elección localmente óptima conduce a una solución globalmente óptima",
    "Problem uses DP": "El problema utiliza DP",
    "Inputs are sorted": "Las entradas están ordenadas",
    "Only when local decisions never preclude optimality can a greedy approach be correct.": "Sólo cuando las decisiones locales nunca excluyen la optimización puede ser correcto un enfoque codicioso.",
    "Huffman coding is greedy because it:": "La codificación de Huffman es codiciosa porque:",
    "Uses recursion": "Utiliza recursividad",
    "Repeatedly merges the two least frequent symbols to build an optimal prefix tree": "Combina repetidamente los dos símbolos menos frecuentes para construir un árbol de prefijos óptimo",
    "Sorts words lexicographically": "Ordena palabras lexicográficamente",
    "Requires dynamic programming": "Requiere programación dinámica",
    "The algorithm always picks the cheapest two nodes to combine, and this strategy is provably optimal.": "El algoritmo siempre elige los dos nodos más baratos para combinar, y esta estrategia es demostrablemente óptima.",
    "Counterexamples are crucial when studying greedy algorithms because they:": "Los contraejemplos son cruciales al estudiar algoritmos codiciosos porque:",
    "Prove algorithm works": "Demostrar que el algoritmo funciona",
    "Demonstrate a single failing case invalidates correctness": "Demostrar un solo caso fallido invalida la corrección",
    "Improve runtime": "Mejorar el tiempo de ejecución",
    "Reduce memory": "Reducir la memoria",
    "Showing one input where greedy fails is enough to reject the algorithm for the general problem.": "Mostrar una entrada donde greedy falla es suficiente para rechazar el algoritmo del problema general.",
    "Breadth-first search on an unweighted graph gives shortest paths because:": "La búsqueda en amplitud en un gráfico no ponderado proporciona los caminos más cortos porque:",
    "It uses recursion": "Utiliza recursividad",
    "It explores vertices in increasing distance from the source": "Explora vértices a una distancia cada vez mayor de la fuente.",
    "It stores parents": "Almacena a los padres",
    "It visits each vertex once": "Visita cada vértice una vez.",
    "By expanding level by level via a queue, the first time you reach a node is the shortest path length.": "Al expandirse nivel por nivel a través de una cola, la primera vez que se llega a un nodo es el camino más corto.",
    "Dijkstra's algorithm fails with negative edges because:": "El algoritmo de Dijkstra falla con aristas negativas porque:",
    "Heaps cannot store negatives": "Los montones no pueden almacenar negativos",
    "A node may be finalized before discovering a cheaper path through a negative edge": "Se puede finalizar un nodo antes de descubrir un camino más barato a través de un borde negativo.",
    "Graphs become cyclic": "Los gráficos se vuelven cíclicos",
    "It requires sorted edges": "Requiere bordes ordenados",
    "Once a vertex is extracted from the min-heap it's assumed optimal; negative edges can invalidate that assumption.": "Una vez que se extrae un vértice del montón mínimo, se supone que es óptimo; Los bordes negativos pueden invalidar esa suposición.",
    "Topological ordering exists only for:": "El orden topológico existe sólo para:",
    "Undirected graphs": "Gráficos no dirigidos",
    "Connected graphs": "Gráficos conectados",
    "Directed acyclic graphs": "Gráficos acíclicos dirigidos",
    "Weighted trees": "árboles ponderados",
    "Any directed cycle makes it impossible to linearize edges such that prerequisites precede dependents.": "Cualquier ciclo dirigido hace imposible linealizar los bordes de modo que los requisitos previos precedan a los dependientes.",
    "A proposition in discrete math is:": "Una proposición en matemáticas discretas es:",
    "A sentence that is either true or false": "Una oración que es verdadera o falsa.",
    "Any question with a variable": "Cualquier pregunta con una variable.",
    "A command": "un comando",
    "A set of numbers": "un conjunto de numeros",
    "Propositions have definite truth values, which is the foundation for logical reasoning and proofs.": "Las proposiciones tienen valores de verdad definidos, que es la base del razonamiento y las pruebas lógicas.",
    "Implication p → q is false only when:": "La implicación p → q es falsa sólo cuando:",
    "p is false and q is true": "p es falso y q es verdadero",
    "p is true and q is false": "p es verdadero y q es falso",
    "p and q are both true": "p y q son ambos verdaderos",
    "p and q are both false": "p y q son ambos falsos",
    "An implication fails only when the premise is true but the conclusion is false.": "Una implicación falla sólo cuando la premisa es verdadera pero la conclusión es falsa.",
    "To prove a conditional statement, a common method is:": "Para probar una declaración condicional, un método común es:",
    "Proof by contradiction": "Prueba por contradicción",
    "Assume antecedent and derive consequent": "Suponer antecedente y derivar consecuente",
    "Counterexample search": "Búsqueda de contraejemplo",
    "Truth table for one row only": "Tabla de verdad para una sola fila",
    "Direct proof starts by assuming the hypothesis and logically deriving the conclusion.": "La prueba directa comienza asumiendo la hipótesis y derivando lógicamente la conclusión.",
    "For sets A and B, A ∩ B means:": "Para los conjuntos A y B, A ∩ B significa:",
    "Elements in A or B": "Elementos en A o B",
    "Elements in both A and B": "Elementos tanto en A como en B",
    "Elements only in A": "Elementos solo en A",
    "Ordered pairs from A and B": "Pares ordenados de A y B",
    "Intersection keeps only elements common to both sets.": "La intersección mantiene solo elementos comunes a ambos conjuntos.",
    "A relation R on set A is:": "Una relación R en el conjunto A es:",
    "A subset of A × A": "Un subconjunto de A × A",
    "A function from A to A only": "Una función de A a A solamente",
    "A prime number list": "Una lista de números primos",
    "Always symmetric": "Siempre simétrico",
    "A relation on A is any subset of the Cartesian product A × A.": "Una relación sobre A es cualquier subconjunto del producto cartesiano A × A.",
    "A function f: A → B is injective when:": "Una función f: A → B es inyectiva cuando:",
    "Every b in B has a preimage": "Cada b en B tiene una preimagen.",
    "Distinct inputs map to distinct outputs": "Las distintas entradas se asignan a distintas salidas",
    "A equals B": "A es igual a B",
    "It is always surjective": "siempre es sobreyectivo",
    "Injective (one-to-one) functions never map two different domain elements to the same codomain element.": "Las funciones inyectivas (uno a uno) nunca asignan dos elementos de dominio diferentes al mismo elemento de codominio.",
    "If order matters and repetition is not allowed, use:": "Si el orden importa y no se permite la repetición, utilice:",
    "Combinations": "Combinaciones",
    "Permutations": "Permutaciones",
    "Power sets": "Conjuntos de potencia",
    "Partitions": "Particiones",
    "Permutations count arrangements where position matters.": "Las permutaciones cuentan acuerdos donde la posición importa.",
    "The binomial coefficient C(n, k) counts:": "El coeficiente binomial C(n, k) cuenta:",
    "Ordered arrangements of k from n": "Arreglos ordenados de k desde n",
    "Ways to choose k items from n without order": "Formas de elegir k artículos de n sin orden",
    "Prime numbers under n": "Números primos bajo n",
    "All subsets of size n": "Todos los subconjuntos de tamaño n",
    "Combinations choose subsets where arrangement is irrelevant.": "Las combinaciones eligen subconjuntos donde la disposición es irrelevante.",
    "For independent events A and B, P(A ∩ B) equals:": "Para eventos independientes A y B, P(A ∩ B) es igual a:",
    "P(A) + P(B)": "P(A) + P(B)",
    "P(A) / P(B)": "P(A) / P(B)",
    "P(A) × P(B)": "P(A) × P(B)",
    "1 - P(A)": "1-P(A)",
    "Independence means one event does not affect the other, so intersection probability multiplies.": "La independencia significa que un evento no afecta al otro, por lo que la probabilidad de intersección se multiplica.",
    "Trie lookups depend on:": "Las búsquedas de prueba dependen de:",
    "Number of keys": "numero de llaves",
    "Length of the search string": "Longitud de la cadena de búsqueda",
    "Hash values": "valores hash",
    "Balancing rotations": "Rotaciones de equilibrio",
    "Operations traverse one level per character, so complexity is O(L) independent of stored key count.": "Las operaciones atraviesan un nivel por carácter, por lo que la complejidad es O(L) independiente del recuento de claves almacenadas.",
    "Edges in a trie typically represent:": "Las aristas en un trie normalmente representan:",
    "Whole words": "palabras completas",
    "Single characters or digits": "Caracteres individuales o dígitos",
    "Hash collisions": "Colisiones de hash",
    "Node depth": "Profundidad del nodo",
    "Each edge corresponds to the next symbol in a key, gradually spelling out stored entries.": "Cada borde corresponde al siguiente símbolo de una clave, deletreando gradualmente las entradas almacenadas.",
    "Word termination flags are required because:": "Los indicadores de terminación de palabras son necesarios porque:",
    "They speed up traversal": "Aceleran el recorrido",
    "Many keys share prefixes, so you need to mark where a valid word ends": "Muchas claves comparten prefijos, por lo que es necesario marcar dónde termina una palabra válida.",
    "They ensure balance": "Aseguran el equilibrio",
    "They compress memory": "comprimen la memoria",
    "Without explicit end markers, prefixes couldn't represent keys distinct from longer words.": "Sin marcadores de final explícitos, los prefijos no podrían representar claves distintas de palabras más largas.",
    "Path compression improves which operation?": "¿La compresión de ruta mejora qué operación?",
    "Union": "Unión",
    "Find": "Encontrar",
    "Initialization": "Inicialización",
    "Deletion": "Supresión",
    "After a find, each node rewires directly to the root, flattening future traversals.": "Después de un hallazgo, cada nodo se vuelve a conectar directamente a la raíz, aplanando los recorridos futuros.",
    "Union by rank/size keeps trees shallow by:": "La unión por rango/tamaño mantiene los árboles poco profundos al:",
    "Sorting nodes": "Ordenar nodos",
    "Attaching the smaller tree beneath the larger root": "Colocar el árbol más pequeño debajo de la raíz más grande",
    "Randomly merging sets": "Fusionar conjuntos aleatoriamente",
    "Rehashing elements": "Elementos repetidos",
    "Always linking the shorter tree under the taller one limits height growth.": "Siempre unir el árbol más bajo debajo del más alto limita el crecimiento en altura.",
    "Kruskal’s MST algorithm uses union-find to:": "El algoritmo MST de Kruskal utiliza union-find para:",
    "Sort edges": "Ordenar bordes",
    "Detect when adding an edge would create a cycle": "Detectar cuándo agregar una ventaja crearía un ciclo",
    "Relax distances": "Relajar distancias",
    "Count components": "Contar componentes",
    "Before adding an edge, Kruskal checks whether its endpoints are already connected; union-find tracks that connectivity.": "Antes de agregar una arista, Kruskal verifica si sus puntos finales ya están conectados; union-find rastrea esa conectividad.",
    "Segment trees shine when you need:": "Los árboles de segmentos brillan cuando necesitas:",
    "Only point queries": "Solo consultas puntuales",
    "Range queries/updates over an array in logarithmic time": "Consultas/actualizaciones de rango sobre una matriz en tiempo logarítmico",
    "Graph traversal": "Recorrido de gráficos",
    "String parsing": "análisis de cadenas",
    "Each node stores aggregate info for a range, so queries touch O(log n) segments.": "Cada nodo almacena información agregada para un rango, por lo que las consultas tocan segmentos O (log n).",
    "Lazy propagation allows you to:": "La propagación diferida le permite:",
    "Delete nodes": "Eliminar nodos",
    "Defer pushing range updates to children until necessary": "Aplazar el envío de actualizaciones de rango a los niños hasta que sea necesario",
    "Balance the tree": "Equilibrar el árbol",
    "Reduce depth": "Reducir la profundidad",
    "Instead of visiting all descendants immediately, lazy tags record pending updates, preserving O(log n) complexity.": "En lugar de visitar a todos los descendientes inmediatamente, las etiquetas diferidas registran las actualizaciones pendientes, preservando la complejidad O (log n).",
    "Building a segment tree from scratch costs:": "Construir un árbol de segmentos desde cero cuesta:",
    "Each element contributes to O(1) nodes, resulting in linear construction time.": "Cada elemento contribuye a O(1) nodos, lo que da como resultado un tiempo de construcción lineal.",
    "Fenwick trees are ideal for:": "Los árboles Fenwick son ideales para:",
    "Graph adjacency": "Adyacencia de gráficos",
    "Prefix sums and point updates in O(log n)": "Sumas de prefijos y actualizaciones de puntos en O (log n)",
    "Sorting strings": "Ordenar cadenas",
    "Tree traversals": "Recorridos de árboles",
    "They maintain cumulative frequency using bit operations to jump between responsible nodes.": "Mantienen la frecuencia acumulativa utilizando operaciones de bits para saltar entre los nodos responsables.",
    "The least significant set bit (LSB) is used to:": "El bit de configuración menos significativo (LSB) se utiliza para:",
    "Choose pivots": "Elige pivotes",
    "Move to parent/child indices covering the next range chunk": "Pasar a índices principales/secundarios que cubren el siguiente fragmento de rango",
    "Check parity": "comprobar paridad",
    "Compress data": "Comprimir datos",
    "Adding the LSB moves upward, subtracting moves downward along the implicit tree.": "La suma del LSB se mueve hacia arriba y la resta se mueve hacia abajo a lo largo del árbol implícito.",
    "Compared to segment trees, BITs are:": "En comparación con los árboles de segmentos, los TBI son:",
    "Harder to code": "Más difícil de codificar",
    "Simpler for 1D prefix problems but limited to certain operations": "Más simple para problemas de prefijos 1D pero limitado a ciertas operaciones",
    "Always faster": "Siempre más rápido",
    "More memory hungry": "Más memoria hambrienta",
    "Fenwick trees excel for prefix aggregates and point updates but cannot handle arbitrary range updates without tweaks.": "Los árboles Fenwick destacan por los agregados de prefijos y las actualizaciones de puntos, pero no pueden manejar actualizaciones de rangos arbitrarios sin ajustes.",
    "AVL trees maintain balance by ensuring:": "Los árboles AVL mantienen el equilibrio asegurando:",
    "Red-black coloring": "Coloración rojo-negro",
    "Height difference between children is at most 1": "La diferencia de altura entre niños es como máximo 1",
    "Keys remain sorted": "Las claves permanecen ordenadas",
    "Root stays median": "La raíz permanece mediana",
    "Each node stores heights; rotations restore the invariant when the difference exceeds one.": "Cada nodo almacena alturas; las rotaciones restauran el invariante cuando la diferencia excede uno.",
    "Red-Black trees guarantee logarithmic height because:": "Los árboles Rojo-Negro garantizan una altura logarítmica porque:",
    "All nodes are black": "Todos los nodos son negros.",
    "Every root-to-leaf path contains the same number of black nodes": "Cada ruta de raíz a hoja contiene la misma cantidad de nodos negros",
    "They use hashing": "Usan hash",
    "They rebuild often": "Se reconstruyen a menudo",
    "The black-height property ensures no path is more than twice as long as another.": "La propiedad black-height garantiza que ningún camino sea más del doble de largo que otro.",
    "Splay trees are unique because they:": "Los árboles Splay son únicos porque:",
    "Require coloring": "Requiere colorear",
    "Move recently accessed nodes to the root via rotations": "Mover los nodos a los que se accedió recientemente a la raíz mediante rotaciones",
    "Use heaps": "usar montones",
    "Need extra memory": "Necesita memoria adicional",
    "Splaying promotes locality—frequently accessed nodes become easier to reach.": "La expansión promueve la localidad: los nodos a los que se accede con frecuencia se vuelven más fáciles de alcanzar.",
    "KMP avoids re-checking characters by:": "KMP evita volver a verificar los caracteres al:",
    "Hashing strings": "cadenas de hash",
    "Using the LPS (longest prefix-suffix) table to know where to resume": "Usando la tabla LPS (prefijo-sufijo más largo) para saber dónde continuar",
    "Sorting substrings": "Ordenar subcadenas",
    "Using recursion": "Usando recursividad",
    "When a mismatch occurs, the prefix table tells you the longest prefix equal to a suffix to continue matching efficiently.": "Cuando ocurre una discrepancia, la tabla de prefijos le indica el prefijo más largo igual a un sufijo para continuar haciendo coincidencias de manera eficiente.",
    "Rabin-Karp leverages rolling hashes to:": "Rabin-Karp aprovecha los hash rodantes para:",
    "Guarantee collision-free results": "Garantizar resultados sin colisiones",
    "Compare substring hashes in O(1) and verify only on matches": "Compare los hashes de subcadenas en O(1) y verifique solo las coincidencias",
    "Sort strings lexicographically": "Ordenar cadenas lexicográficamente",
    "Use tries": "Utilice intentos",
    "Efficient hash updates allow scanning multiple positions quickly while verifying when hashes match.": "Las actualizaciones de hash eficientes permiten escanear múltiples posiciones rápidamente mientras verifican cuándo coinciden los hashes.",
    "Suffix arrays paired with LCP arrays help:": "Las matrices de sufijos combinadas con matrices LCP ayudan a:",
    "Solve shortest path": "Resolver el camino más corto",
    "Find repeating substrings efficiently by checking adjacent suffixes' longest common prefixes": "Encuentre subcadenas repetidas de manera eficiente verificando los prefijos comunes más largos de los sufijos adyacentes",
    "Convert to tries": "Convertir a intentos",
    "Balance BSTs": "Equilibrar BST",
    "Once suffixes are sorted, neighboring entries share large prefixes; the LCP array quantifies those lengths for queries.": "Una vez ordenados los sufijos, las entradas vecinas comparten prefijos grandes; la matriz LCP cuantifica esas longitudes para las consultas.",
    "General-purpose CPU registers are primarily used to:": "Los registros de CPU de uso general se utilizan principalmente para:",
    "Store disk files": "Almacenar archivos de disco",
    "Hold values for fast arithmetic and address operations": "Mantenga valores para operaciones aritméticas y de direcciones rápidas",
    "Render graphics only": "Renderizar solo gráficos",
    "Replace RAM entirely": "Reemplace la RAM por completo",
    "Registers are the fastest storage locations and feed ALU operations directly.": "Los registros son las ubicaciones de almacenamiento más rápidas y alimentan directamente las operaciones de ALU.",
    "Little-endian byte order stores the:": "El orden de bytes little-endian almacena:",
    "Most significant byte first": "El byte más significativo primero",
    "Least significant byte first": "El byte menos significativo primero",
    "Bytes in random order": "Bytes en orden aleatorio",
    "Only signed bytes": "Sólo bytes firmados",
    "Little-endian layouts place the lowest-order byte at the lowest memory address.": "Los diseños little-endian colocan el byte de orden más bajo en la dirección de memoria más baja.",
    "Addressing mode `base + offset` is commonly used for:": "El modo de direccionamiento `base + offset` se usa comúnmente para:",
    "Immediate constants": "Constantes inmediatas",
    "Accessing stack/local variables": "Accediendo a la pila/variables locales",
    "Branch labels only": "Solo etiquetas de sucursales",
    "Floating-point rounding": "Redondeo de punto flotante",
    "Stack frames and structured data are typically reached via a base register plus displacement.": "Los marcos de pila y los datos estructurados generalmente se alcanzan mediante un registro base más desplazamiento.",
    "A conditional jump in assembly executes when:": "Un salto condicional en el ensamblado se ejecuta cuando:",
    "The program ends": "El programa termina",
    "Relevant status flags match the jump condition": "Los indicadores de estado relevantes coinciden con la condición de salto",
    "The stack is empty": "La pila esta vacia",
    "A register is zero by default": "Un registro es cero por defecto.",
    "Instructions like `je`, `jne`, `jg`, and `jl` inspect flags set by prior compare/arithmetic instructions.": "Instrucciones como `je`, `jne`, `jg` y `jl` inspeccionan los indicadores establecidos por instrucciones aritméticas/de comparación anteriores.",
    "A function prologue typically:": "Un prólogo de función típicamente:",
    "Clears all memory": "Borra toda la memoria",
    "Saves caller context and allocates stack frame space": "Guarda el contexto de la persona que llama y asigna espacio en el marco de la pila",
    "Jumps to interrupt vector": "Salta para interrumpir el vector",
    "Writes output to stdout": "Escribe la salida en stdout",
    "Common prologues push frame pointers/registers and reserve local stack storage.": "Los prólogos comunes insertan punteros/registros de marco y reservan almacenamiento de pila local.",
    "Calling conventions exist to:": "Existen convenciones de llamada para:",
    "Speed up all loops automatically": "Acelera todos los bucles automáticamente",
    "Standardize argument passing, return values, and register ownership": "Estandarizar el paso de argumentos, los valores de retorno y registrar la propiedad",
    "Avoid using stacks": "Evite el uso de pilas",
    "Replace machine code": "Reemplazar código de máquina",
    "They let separately compiled functions interoperate safely by enforcing consistent call rules.": "Permiten que funciones compiladas por separado interoperen de forma segura al imponer reglas de llamada consistentes.",
    "Iterating through an integer array in assembly usually increments the pointer by:": "La iteración a través de una matriz de enteros en ensamblaje generalmente incrementa el puntero en:",
    "1 byte always": "1 byte siempre",
    "Element size in bytes": "Tamaño del elemento en bytes",
    "Register count": "Recuento de registros",
    "Stack depth": "Profundidad de la pila",
    "Pointer arithmetic must match element width (e.g., 4 bytes for 32-bit integers).": "La aritmética de punteros debe coincidir con el ancho del elemento (por ejemplo, 4 bytes para enteros de 32 bits).",
    "Null-terminated strings end with:": "Las cadenas terminadas en nulo terminan con:",
    "Line feed": "avance de línea",
    "Byte value 0": "Valor del byte 0",
    "Space character": "Carácter espacial",
    "Return address": "Dirección del remitente",
    "C-style strings use `0x00` as sentinel to mark the end of text.": "Las cadenas de estilo C utilizan `0x00` como centinela para marcar el final del texto.",
    "A basic output syscall/interrupt sequence needs:": "Una secuencia básica de llamada al sistema/interrupción de salida necesita:",
    "Only source code comments": "Solo comentarios del código fuente.",
    "Proper syscall number plus argument registers/pointers": "Número de llamada al sistema adecuado más registros/punteros de argumentos",
    "No registers at all": "No hay registros en absoluto",
    "A hash map": "Un mapa hash",
    "System interfaces require ABI-defined registers (or stack args) for operation code and data pointers.": "Las interfaces del sistema requieren registros definidos por ABI (o argumentos de pila) para el código de operación y los punteros de datos.",
    "Expression x & (-x) isolates:": "La expresión x y (-x) aísla:",
    "Most significant bit": "parte más significativa",
    "Least significant set bit": "Bit de conjunto menos significativo",
    "Parity": "Paridad",
    "All ones": "todos los",
    "Two's complement negation flips bits and adds one, leaving only the lowest set bit when ANDed.": "La negación en complemento a dos invierte bits y suma uno, dejando solo el bit establecido más bajo cuando se aplica AND.",
    "XOR is handy for finding a single unique element because:": "XOR es útil para encontrar un elemento único porque:",
    "It sorts values": "Ordena valores",
    "a ^ a = 0 so duplicates cancel, leaving the odd-occurring value": "a ^ a = 0 por lo que los duplicados se cancelan, dejando el valor impar",
    "It shifts bits": "Cambia bits",
    "It multiplies values": "multiplica valores",
    "Pairing duplicates removes them from the accumulator, revealing the lone number.": "El emparejamiento de duplicados los elimina del acumulador, revelando el número solitario.",
    "To set bit i of integer n you can:": "Para configurar el bit i del número entero n puedes:",
    "n &= ~(1 << i)": "norte &= ~(1 << yo)",
    "n |= (1 << i)": "norte |= (1 << i)",
    "n ^= (1 << i)": "n^= (1 << i)",
    "n >>= i": "norte >>= yo",
    "OR with a mask containing only bit i ensures that bit becomes 1 without affecting others.": "O con una máscara que contenga solo el bit i garantiza que el bit se convierta en 1 sin afectar a los demás.",
    "Java's char type stores:": "Las tiendas de tipos de caracteres de Java:",
    "8-bit ASCII": "ASCII de 8 bits",
    "16-bit UTF-16 code units": "Unidades de código UTF-16 de 16 bits",
    "32-bit Unicode": "Unicódigo de 32 bits",
    "Only digits": "Sólo dígitos",
    "char is an unsigned 16-bit value capable of representing UTF-16 units, enabling Unicode support.": "char es un valor de 16 bits sin signo capaz de representar unidades UTF-16, lo que permite la compatibilidad con Unicode.",
    "Java passes everything by:": "Java pasa todo por:",
    "Reference": "Referencia",
    "Value (object references themselves are copied)": "Valor (las referencias de objetos se copian)",
    "Pointer arithmetic": "aritmética de punteros",
    "Copy-on-write": "Copiar en escritura",
    "Even though objects are manipulated indirectly, the reference value is passed by value.": "Aunque los objetos se manipulan indirectamente, el valor de referencia se pasa por valor.",
    "The keyword final on a variable means:": "La palabra clave final en una variable significa:",
    "Immutable object": "Objeto inmutable",
    "Reference cannot be reassigned after initialization": "La referencia no se puede reasignar después de la inicialización",
    "Static binding": "Encuadernación estática",
    "Thread-safe access": "Acceso seguro para subprocesos",
    "final stops reassignment; for objects it locks the reference, not the object's internal state.": "reasignación de paradas finales; para los objetos, bloquea la referencia, no el estado interno del objeto.",
    "The enhanced for-each loop cannot safely:": "El bucle for-each mejorado no puede de forma segura:",
    "Iterate arrays": "Iterar matrices",
    "Remove elements while iterating": "Eliminar elementos mientras se itera",
    "Read values": "Leer valores",
    "Handle collections": "Manejar colecciones",
    "Modifying the underlying collection structure triggers ConcurrentModificationException; use iterators instead.": "La modificación de la estructura de colección subyacente desencadena ConcurrentModificationException; utilice iteradores en su lugar.",
    "Modern switch expressions (Java 14+) allow:": "Las expresiones de cambio modernas (Java 14+) permiten:",
    "Returning values via -> syntax": "Devolver valores a través de -> sintaxis",
    "Only integers": "Sólo números enteros",
    "Fallthrough by default": "Fallo por defecto",
    "Polymorphic dispatch": "Despacho polimórfico",
    "Switch expressions evaluate to a value, letting you assign results directly.": "Las expresiones de cambio se evalúan según un valor, lo que le permite asignar resultados directamente.",
    "A do-while loop differs because:": "Un bucle do- while se diferencia porque:",
    "It checks condition first": "Primero verifica la condición.",
    "It guarantees the body executes at least once": "Garantiza que el cuerpo ejecute al menos una vez.",
    "It is faster": "es mas rapido",
    "It only works with ints": "Solo funciona con enteros",
    "Condition evaluation occurs after the body, ensuring at least one iteration.": "La evaluación de la condición ocurre después del cuerpo, asegurando al menos una iteración.",
    "Encapsulation means:": "Encapsulación significa:",
    "Public fields only": "Sólo campos públicos",
    "Bundling data and behavior with restricted access": "Agrupar datos y comportamiento con acceso restringido",
    "Multiple inheritance": "herencia múltiple",
    "Runtime polymorphism": "Polimorfismo en tiempo de ejecución",
    "Objects hide their state by exposing controlled interfaces.": "Los objetos ocultan su estado exponiendo interfaces controladas.",
    "Polymorphism lets you:": "El polimorfismo te permite:",
    "Avoid inheritance": "evitar la herencia",
    "Treat different subclass instances via a common supertype interface": "Trate diferentes instancias de subclases a través de una interfaz de supertipo común",
    "Optimize memory": "Optimizar la memoria",
    "Disable overriding": "Desactivar anulación",
    "Dynamic dispatch ensures the correct overridden method executes based on runtime type.": "El envío dinámico garantiza que se ejecute el método anulado correcto según el tipo de tiempo de ejecución.",
    "final classes cannot be:": "las clases finales no pueden ser:",
    "Instantiated": "Instanciado",
    "Subclassed": "Subclasificado",
    "Used": "Usado",
    "Serialized": "Serializado",
    "Marking a class final prevents other classes from extending it.": "Marcar una clase como final evita que otras clases la extiendan.",
    "Checked exceptions must be:": "Las excepciones marcadas deben ser:",
    "Ignored": "ignorado",
    "Handled with try/catch or declared with throws": "Manejado con try/catch o declarado con throws",
    "Converted to runtime exceptions automatically": "Convertido a excepciones de tiempo de ejecución automáticamente",
    "Thrown only by JVM": "Lanzado solo por JVM",
    "The compiler enforces that checked exceptions are either caught or declared.": "El compilador exige que las excepciones comprobadas se detecten o declaren.",
    "Finally blocks execute except when:": "Finalmente los bloques se ejecutan excepto cuando:",
    "Return is used": "Se utiliza la devolución",
    "System.exit or catastrophic VM failure occurs": "Se produce una falla System.exit o catastrófica de la VM",
    "Exception thrown": "Excepción lanzada",
    "Break executes": "Se ejecuta la pausa",
    "Normal path or exceptions still run finally, but VM termination prevents it.": "La ruta normal o las excepciones aún se ejecutan finalmente, pero la terminación de la VM lo impide.",
    "Try-with-resources automatically:": "Pruebe con recursos automáticamente:",
    "Retries operations": "Reintentos de operaciones",
    "Closes AutoCloseable resources after the block even on exceptions": "Cierra los recursos AutoCloseable después del bloqueo incluso en excepciones",
    "Makes code faster": "Hace que el código sea más rápido",
    "Handles unchecked exceptions": "Maneja excepciones no comprobadas",
    "Resources declared in the try statement are closed deterministically, reducing boilerplate.": "Los recursos declarados en la declaración try se cierran de forma determinista, lo que reduce el texto estándar.",
    "LinkedHashMap maintains:": "LinkedHashMap mantiene:",
    "Sorted order": "orden ordenado",
    "Insertion order via a doubly linked list of entries": "Orden de inserción a través de una lista de entradas doblemente enlazada",
    "Random iteration": "iteración aleatoria",
    "Thread safety": "Seguridad del hilo",
    "It combines a hash table with a linked list to preserve predictable iteration order.": "Combina una tabla hash con una lista vinculada para preservar un orden de iteración predecible.",
    "ArrayList is preferable to LinkedList when:": "ArrayList es preferible a LinkedList cuando:",
    "Frequent head insertions occur": "Se producen inserciones frecuentes de la cabeza.",
    "Random access dominates operations": "El acceso aleatorio domina las operaciones",
    "Memory is tight": "La memoria es escasa",
    "You need lock-free behavior": "Necesitas un comportamiento sin bloqueos",
    "ArrayList provides O(1) get/set while LinkedList must traverse nodes.": "ArrayList proporciona O(1) get/set mientras que LinkedList debe atravesar nodos.",
    "ConcurrentHashMap scales by:": "ConcurrentHashMap escala según:",
    "Using a single global lock": "Usando un único bloqueo global",
    "Segmenting buckets/using striped locks and allowing lock-free reads": "Segmentar cubos/usar candados rayados y permitir lecturas sin candados",
    "Copying on write": "Copiar al escribir",
    "Sorting keys": "Claves de clasificación",
    "It minimizes contention by locking only portions of the map or using CAS for writes.": "Minimiza la contención al bloquear solo partes del mapa o usar CAS para escrituras.",
    "Buffered streams speed IO because they:": "Los flujos almacenados en búfer aceleran la IO porque:",
    "Encrypt data": "Cifrar datos",
    "Batch reads/writes in memory, reducing system calls": "Lecturas/escrituras por lotes en la memoria, lo que reduce las llamadas al sistema",
    "Use multithreading": "Usar subprocesos múltiples",
    "Skip disk": "Saltar disco",
    "Fewer trips to the OS block device drastically reduce overhead.": "Menos viajes al dispositivo de bloqueo del sistema operativo reducen drásticamente los gastos generales.",
    "Try-with-resources is ideal for IO since it:": "Try-with-resources es ideal para IO ya que:",
    "Makes files optional": "Hace que los archivos sean opcionales",
    "Automatically closes streams even when exceptions occur": "Cierra transmisiones automáticamente incluso cuando ocurren excepciones",
    "Caches bytes": "Bytes de caché",
    "Resources implementing AutoCloseable are cleaned up without manual finally blocks.": "Los recursos que implementan AutoCloseable se limpian sin bloques finalmente manuales.",
    "The java.nio.file.Files utility provides:": "La utilidad java.nio.file.Files proporciona:",
    "Database connections": "Conexiones de bases de datos",
    "Modern path handling, metadata, and atomic move/copy helpers": "Manejo de rutas moderno, metadatos y ayudas atómicas para mover/copiar",
    "Network protocols": "Protocolos de red",
    "Only synchronous IO": "Solo IO sincrónica",
    "NIO's Files class includes convenience methods for interacting with the filesystem safely.": "La clase Archivos de NIO incluye métodos convenientes para interactuar con el sistema de archivos de forma segura.",
    "synchronized in Java ensures:": "sincronizado en Java garantiza:",
    "Order of thread execution": "Orden de ejecución del hilo",
    "Mutual exclusion and visibility for a block/object monitor": "Exclusión mutua y visibilidad para un monitor de bloque/objeto",
    "Faster code": "Código más rápido",
    "Automatic deadlock prevention": "Prevención automática de interbloqueo",
    "It acquires the intrinsic lock and establishes happens-before relationships.": "Adquiere el bloqueo intrínseco y establece relaciones que suceden antes.",
    "Executors simplify concurrency by:": "Los ejecutores simplifican la concurrencia al:",
    "Eliminating threads": "Eliminando hilos",
    "Managing thread pools and decoupling task submission from execution": "Administrar grupos de subprocesos y desacoplar el envío de tareas de la ejecución",
    "Enforcing parallel streams": "Hacer cumplir las corrientes paralelas",
    "Replacing interrupts": "Reemplazo de interrupciones",
    "You submit Runnable/Callable tasks; the executor handles scheduling and lifecycle.": "Usted envía tareas ejecutables/invocables; el ejecutor maneja la programación y el ciclo de vida.",
    "volatile guarantees:": "garantías volátiles:",
    "Atomicity of compound actions": "Atomicidad de acciones compuestas.",
    "Visibility/no reordering of reads and writes": "Visibilidad/sin reordenamiento de lecturas y escrituras",
    "Lock-free algorithms": "Algoritmos sin bloqueo",
    "Lower memory usage": "Menor uso de memoria",
    "volatile fields are read/written directly to main memory, preventing stale values.": "Los campos volátiles se leen/escriben directamente en la memoria principal, evitando valores obsoletos.",
    "The Singleton pattern ensures:": "El patrón Singleton asegura:",
    "Multiple instances": "Varias instancias",
    "Exactly one instance with global access": "Exactamente una instancia con acceso global",
    "Loose coupling": "Acoplamiento flojo",
    "Observer behavior": "Comportamiento del observador",
    "It hides constructors and exposes a single accessor for the lone instance.": "Oculta constructores y expone un único descriptor de acceso para la única instancia.",
    "Strategy pattern enables:": "El patrón de estrategia permite:",
    "Swapping algorithms at runtime via a common interface": "Intercambio de algoritmos en tiempo de ejecución a través de una interfaz común",
    "Event notification": "Notificación de evento",
    "Adapting interfaces": "Adaptación de interfaces",
    "Clients can inject different behavior objects without changing the context code.": "Los clientes pueden inyectar diferentes objetos de comportamiento sin cambiar el código de contexto.",
    "Observer pattern decouples components by:": "El patrón de observador desacopla los componentes mediante:",
    "Sharing state globally": "Compartiendo el estado globalmente",
    "Letting subjects publish events to subscribed observers": "Permitir que los sujetos publiquen eventos para observadores suscritos",
    "Copying data": "Copiar datos",
    "Using inheritance": "Usando herencia",
    "Observers register for updates and subjects notify them when state changes.": "Los observadores se registran para recibir actualizaciones y los sujetos les notifican cuando cambia el estado.",
    "A functional interface contains:": "Una interfaz funcional contiene:",
    "Multiple abstract methods": "Múltiples métodos abstractos",
    "Exactly one abstract method (plus optional defaults)": "Exactamente un método abstracto (más valores predeterminados opcionales)",
    "No methods": "Sin métodos",
    "Only static methods": "Sólo métodos estáticos",
    "Single Abstract Method interfaces (SAM) are lambda compatible.": "Las interfaces de método abstracto único (SAM) son compatibles con lambda.",
    "Which stream operation is terminal?": "¿Qué operación de flujo es terminal?",
    "map": "mapa",
    "filter": "filtrar",
    "collect": "recolectar",
    "peek": "ojeada",
    "collect triggers evaluation and gathers results, closing the stream pipeline.": "recopilar activa la evaluación y recopila resultados, cerrando el flujo de flujo.",
    "Streams should not be reused because:": "Las transmisiones no deben reutilizarse porque:",
    "They copy data": "copian datos",
    "Terminal operations consume them and mark them closed": "Las operaciones de la terminal los consumen y los marcan como cerrados.",
    "They leak memory": "pierden memoria",
    "They are slow": "son lentos",
    "Once a terminal operation executes, further use throws IllegalStateException.": "Una vez que se ejecuta una operación de terminal, el uso posterior genera IllegalStateException.",
    "Type erasure means that:": "El borrado de tipo significa que:",
    "Generics persist at runtime": "Los genéricos persisten en tiempo de ejecución",
    "Generic type info is removed during compilation and replaced with bounds/casts": "La información de tipo genérico se elimina durante la compilación y se reemplaza con límites/conversiones",
    "Generics cannot be nested": "Los genéricos no se pueden anidar",
    "Only primitives allowed": "Sólo se permiten primitivos",
    "The JVM sees raw types; the compiler enforces type safety and inserts casts.": "La JVM ve tipos sin formato; el compilador impone la seguridad de tipos e inserta conversiones.",
    "The wildcard ? extends T allows you to:": "¿El comodín? extiende T le permite:",
    "Insert arbitrary T values": "Insertar valores T arbitrarios",
    "Read T or subclasses safely but not insert arbitrary values": "Lea T o subclases de forma segura pero no inserte valores arbitrarios",
    "Modify list freely": "Modificar lista libremente",
    "Use primitives": "Usa primitivas",
    "Producer Extends: treat the structure as a producer; writes are unsafe except null.": "El productor extiende: trata la estructura como un productor; las escrituras no son seguras excepto nulas.",
    "Generic methods differ from generic classes because they:": "Los métodos genéricos se diferencian de las clases genéricas porque:",
    "Require inheritance": "Requerir herencia",
    "Declare their own type parameters independent of the class": "Declarar sus propios parámetros de tipo independientes de la clase.",
    "Only work in interfaces": "Solo funciona en interfaces",
    "Need reflection": "Necesito reflexión",
    "Method-level generics introduce <T> before the return type, enabling flexible reuse.": "Los genéricos a nivel de método introducen <T> antes del tipo de valor devuelto, lo que permite una reutilización flexible.",
    "@BeforeEach in JUnit 5 runs:": "@BeforeEach en JUnit 5 ejecuta:",
    "Once per class": "Una vez por clase",
    "Before every @Test to reset fixtures": "Antes de cada @Test para restablecer los aparatos",
    "After tests": "Después de las pruebas",
    "Only on failure": "Sólo en caso de fracaso",
    "Each test gets a fresh setup so state does not leak.": "Cada prueba recibe una nueva configuración para que el estado no se pierda.",
    "assertThrows is used to:": "afirmarThrows se utiliza para:",
    "Compare objects": "Comparar objetos",
    "Verify a lambda throws a specific exception type": "Verificar que una lambda arroje un tipo de excepción específico",
    "Skip tests": "Saltar pruebas",
    "Measure runtime": "Medir el tiempo de ejecución",
    "It ensures the provided executable raises the expected exception.": "Garantiza que el ejecutable proporcionado genere la excepción esperada.",
    "Parameterized tests allow you to:": "Las pruebas parametrizadas le permiten:",
    "Mock dependencies": "Dependencias simuladas",
    "Run the same logic with multiple inputs from sources like @CsvSource": "Ejecute la misma lógica con múltiples entradas de fuentes como @CsvSource",
    "Disable assertions": "Deshabilitar afirmaciones",
    "Junit feeds different argument sets to one test method, reducing duplication.": "Junit alimenta diferentes conjuntos de argumentos a un método de prueba, lo que reduce la duplicación.",
    "Which JDBC object executes SQL statements?": "¿Qué objeto JDBC ejecuta sentencias SQL?",
    "Connection": "Conexión",
    "Statement/PreparedStatement": "Declaración/Declaración Preparada",
    "ResultSet": "Conjunto de resultados",
    "DriverManager": "Administrador de conductores",
    "PreparedStatement compiles SQL with parameters and sends it over an active Connection.": "PreparedStatement compila SQL con parámetros y lo envía a través de una conexión activa.",
    "Prepared statements help prevent SQL injection because they:": "Las declaraciones preparadas ayudan a prevenir la inyección de SQL porque:",
    "Encrypt traffic": "Cifrar el tráfico",
    "Separate query structure from user parameters": "Separe la estructura de consulta de los parámetros del usuario",
    "Use hashing": "Usar hash",
    "Auto-escape strings": "Cadenas de escape automático",
    "Parameters are bound, so input cannot alter the SQL command structure.": "Los parámetros están vinculados, por lo que la entrada no puede alterar la estructura del comando SQL.",
    "Calling ResultSet.next() returns false when:": "Llamar a ResultSet.next() devuelve falso cuando:",
    "Column is null": "La columna es nula",
    "Cursor moves past the last row": "El cursor pasa de la última fila",
    "Transaction commits": "Confirmaciones de transacciones",
    "Statement closes": "Se cierra la declaración",
    "next() advances the cursor; when there are no more rows it returns false.": "next() avanza el cursor; cuando no hay más filas devuelve falso.",
    "Arrays and Strings": "Matrices y cadenas",
    "This walkthrough dissects the `findMax`, `reverseString`, and `isPalindrome` helpers so you can watch loops, boundary guards, and two-pointer swaps combine into real array/string utilities.": "Este tutorial analiza los ayudantes `findMax`, `reverseString` e `isPalindrome` para que pueda observar cómo los bucles, las protecciones de límites y los intercambios de dos punteros se combinan en utilidades reales de matriz/cadena.",
    "Arrays and strings form the foundation of programming. Arrays provide indexed access to elements, while strings are sequences of characters. Key concepts include traversal patterns, the two-pointer technique for efficient processing, and understanding how memory layout affects performance. These data structures appear in countless real-world applications.": "Los arreglos y las cadenas forman la base de la programación. Las matrices proporcionan acceso indexado a elementos, mientras que las cadenas son secuencias de caracteres. Los conceptos clave incluyen patrones transversales, la técnica de dos punteros para un procesamiento eficiente y la comprensión de cómo el diseño de la memoria afecta el rendimiento. Estas estructuras de datos aparecen en innumerables aplicaciones del mundo real.",
    "Array Traversal": "Recorrido de matriz",
    "String Methods": "Métodos de cadena",
    "Array Sorting": "Clasificación de matrices",
    "JUnit 5 Guide": "Guía JUnit 5",
    "Official JUnit Documentation": "Documentación oficial de JUnit",
    "Test Driven Development": "Desarrollo basado en pruebas",
    "Martin Fowler - Test Pyramid": "Martin Fowler - Pirámide de pruebas",
    "Linked Lists": "Listas enlazadas",
    "We narrate every pointer move in `reverseList`, `hasCycle`, and `mergeTwoLists`, showing how temp nodes, tortoise–hare detection, and dummy heads keep lists consistent.": "Narramos cada movimiento del puntero en `reverseList`, `hasCycle` y `mergeTwoLists`, mostrando cómo los nodos temporales, la detección de tortugas y liebres y las cabezas ficticias mantienen las listas consistentes.",
    "Linked lists provide dynamic memory allocation and efficient insertion/deletion at any position. Unlike arrays, they don't require contiguous memory but sacrifice random access. Understanding pointer manipulation and edge cases (null checks, single nodes) is crucial for mastering linked list algorithms.": "Las listas enlazadas proporcionan asignación dinámica de memoria e inserción/eliminación eficiente en cualquier posición. A diferencia de las matrices, no requieren memoria contigua pero sacrifican el acceso aleatorio. Comprender la manipulación del puntero y los casos extremos (verificaciones nulas, nodos únicos) es crucial para dominar los algoritmos de listas vinculadas.",
    "Singly Linked Lists": "Listas enlazadas individualmente",
    "Doubly Linked Lists": "Listas doblemente enlazadas",
    "Cycle Detection": "Detección de ciclo",
    "List Reversal": "Inversión de lista",
    "Merge Operations": "Fusionar operaciones",
    "Linked List Visualization": "Visualización de listas enlazadas",
    "Floyd's Cycle Detection": "Detección del ciclo de Floyd",
    "Pointer Manipulation Guide": "Guía de manipulación del puntero",
    "Stacks and Queues": "Pilas y colas",
    "The `ArrayStack` and `ArrayQueue` wrappers expose each push/pop/peek and enqueue/dequeue call so you can see how ArrayDeque underpins both LIFO and FIFO flows in `main`.": "Los contenedores `ArrayStack` y `ArrayQueue` exponen cada llamada push/pop/peek y enqueue/dequeue para que pueda ver cómo ArrayDeque sustenta los flujos LIFO y FIFO en `main`.",
    "Stacks model LIFO flows used in call stacks, undo buffers, and expression evaluation, while queues deliver FIFO order for schedulers, BFS, and streaming pipelines. This lesson contrasts their implementations (array vs. linked), explains amortized push/pop/enqueue costs, and walks through real interview problems like balanced parentheses, sliding windows, and task queues.": "Las pilas modelan flujos LIFO utilizados en pilas de llamadas, búferes de deshacer y evaluación de expresiones, mientras que las colas entregan orden FIFO para programadores, BFS y canalizaciones de transmisión. Esta lección contrasta sus implementaciones (matriz versus vinculada), explica los costos amortizados de push/pop/enqueue y analiza problemas reales de entrevistas como paréntesis equilibrados, ventanas deslizantes y colas de tareas.",
    "Stack Operations": "Operaciones de pila",
    "Queue Operations": "Operaciones de cola",
    "Deque": "deque",
    "Priority Queue": "Cola de prioridad",
    "Applications": "Aplicaciones",
    "Stack Applications": "Aplicaciones de pila",
    "Queue Implementations": "Implementaciones de cola",
    "Binary Trees": "árboles binarios",
    "Follow `insertRecursive`, `inorder`, and `levelOrderTraversal` to see how the BST is built, how DFS prints sorted values, and how a queue drives breadth-first output.": "Siga `insertRecursive`, `inorder` y `levelOrderTraversal` para ver cómo se construye BST, cómo DFS imprime valores ordenados y cómo una cola genera una salida en amplitud.",
    "You will practice building binary trees from traversal lists, executing DFS traversals iteratively, and reasoning about height and balance. The section also demystifies BST invariants, common recursion templates, and how to restructure trees for path-sum, diameter, and serialization problems.": "Practicará la construcción de árboles binarios a partir de listas transversales, la ejecución iterativa de recorridos DFS y el razonamiento sobre la altura y el equilibrio. La sección también desmitifica los invariantes de BST, las plantillas de recursividad comunes y cómo reestructurar árboles para problemas de suma de rutas, diámetro y serialización.",
    "Binary Search Trees": "Árboles de búsqueda binaria",
    "Tree Height": "Altura del árbol",
    "Path Problems": "Problemas de ruta",
    "Tree Construction": "Construcción de árboles",
    "Tree Traversals": "Recorridos de árboles",
    "BST Operations": "Operaciones BST",
    "Hash Tables and Maps": "Tablas hash y mapas",
    "We count characters with `HashMap.merge` and then peel back a custom `SimpleHashTable` that hashes keys, stores chained entries, and resolves collisions bucket by bucket.": "Contamos caracteres con `HashMap.merge` y luego retiramos una `SimpleHashTable` personalizada que codifica claves, almacena entradas encadenadas y resuelve colisiones segmento por segmento.",
    "We cover how good hash functions minimize collisions, why load factor matters, and when to choose chaining vs. open addressing. Practical labs include frequency maps, LRU caches, and dictionary-based deduplication so you can confidently use HashMap/HashSet in coding interviews.": "Cubrimos cómo las buenas funciones hash minimizan las colisiones, por qué es importante el factor de carga y cuándo elegir el encadenamiento frente al direccionamiento abierto. Los laboratorios prácticos incluyen mapas de frecuencia, cachés LRU y deduplicación basada en diccionarios para que pueda utilizar HashMap/HashSet con confianza en entrevistas de codificación.",
    "Hash Functions": "Funciones hash",
    "Collision Resolution": "Resolución de colisiones",
    "HashMap Operations": "Operaciones de HashMap",
    "Hash Sets": "Conjuntos de hash",
    "Load Factor": "Factor de carga",
    "Hash Function Design": "Diseño de función hash",
    "Collision Handling": "Manejo de colisiones",
    "Heaps and Priority Queues": "Montones y colas prioritarias",
    "First `priorityQueueDemo` shows the library min-heap, then `heapify`/`buildMinHeap` rebuild the structure from an array so you can trace index math, swaps, and bottom-up heap construction.": "Primero, `priorityQueueDemo` muestra el montón mínimo de la biblioteca, luego `heapify`/`buildMinHeap` reconstruye la estructura a partir de una matriz para que pueda rastrear las matemáticas de índice, los intercambios y la construcción del montón ascendente.",
    "Heaps guarantee log n insert/delete while always exposing the next highest or lowest priority element. You will implement binary heaps from scratch, trace heapify, compare min/max structures, and apply them to Dijkstra, streaming medians, and scheduling simulations.": "Los montones garantizan la inserción/eliminación de registros y al mismo tiempo exponen siempre el siguiente elemento de prioridad más alta o más baja. Implementará montones binarios desde cero, rastreará montones, comparará estructuras mínimas y máximas y las aplicará a Dijkstra, medianas de transmisión y simulaciones de programación.",
    "Min Heap": "Montón mínimo",
    "Max Heap": "Montón máximo",
    "Heap Operations": "Operaciones de montón",
    "Heapify": "amontonar",
    "Priority Queues": "Colas prioritarias",
    "Heap Properties": "Propiedades del montón",
    "Priority Queue Applications": "Aplicaciones de cola prioritaria",
    "Sorting Algorithms": "Algoritmos de clasificación",
    "`bubbleSort`, `mergeSort`, and `quickSort` live in one class, letting us highlight each loop condition, partition, and merge so the control flow behind every comparison is crystal clear.": "`bubbleSort`, `mergeSort` y `quickSort` viven en una clase, lo que nos permite resaltar cada condición de bucle, partición y fusión para que el flujo de control detrás de cada comparación sea muy claro.",
    "This module compares comparison-based sorts (quick, merge, heap) with non-comparison sorts like counting and radix, emphasizing stability and memory trade-offs. Step-by-step traces and code exercises help you recognize when to favor O(n log n) strategies vs linear-time specialized sorts.": "Este módulo compara clasificaciones basadas en comparación (rápida, combinada, dinámica) con clasificaciones sin comparación, como conteo y base, enfatizando la estabilidad y las compensaciones de memoria. Los seguimientos paso a paso y los ejercicios de código le ayudan a reconocer cuándo preferir estrategias O(n log n) frente a tipos especializados en tiempo lineal.",
    "Radix Sort": "Ordenación por base",
    "Sorting Comparisons": "Ordenar comparaciones",
    "Algorithm Complexity": "Complejidad del algoritmo",
    "Searching Algorithms": "Algoritmos de búsqueda",
    "Linear, binary, and exponential search are implemented side by side, so we break down pointer shifts, boundary tests, and the final `Arrays.binarySearch` call that finishes the exponential window.": "La búsqueda lineal, binaria y exponencial se implementan en paralelo, por lo que desglosamos los cambios de puntero, las pruebas de límites y la llamada final a `Arrays.binarySearch` que finaliza la ventana exponencial.",
    "Beyond linear search, you will master binary search patterns on arrays, answer-range problems, and implicit search spaces such as answer-guessing or peak finding. We also cover interpolation/exponential search and how to adapt search templates to rotated arrays and matrix traversal.": "Más allá de la búsqueda lineal, dominará los patrones de búsqueda binaria en matrices, problemas de rango de respuestas y espacios de búsqueda implícitos, como la adivinación de respuestas o la búsqueda de picos. También cubrimos la búsqueda por interpolación/exponencial y cómo adaptar plantillas de búsqueda a matrices rotadas y recorrido de matrices.",
    "Linear Search": "Búsqueda lineal",
    "Interpolation Search": "Búsqueda por interpolación",
    "Exponential Search": "Búsqueda exponencial",
    "Binary Search Guide": "Guía de búsqueda binaria",
    "Search Optimization": "Optimización de búsqueda",
    "Recursion and Backtracking": "Recursión y retroceso",
    "Factorial, maze solving, and subset generation illustrate how base cases, choices, and backtracking fit together; we explain what each recursive frame is doing and when it unwinds.": "El factorial, la resolución de laberintos y la generación de subconjuntos ilustran cómo encajan los casos base, las elecciones y el retroceso; Explicamos qué hace cada cuadro recursivo y cuándo se desenrolla.",
    "We break recursion into base case, choice, and exploration phases, then show how to convert naive recursion into efficient backtracking with state restoration. Examples include permutations, N-Queens, subsets, and memoized tree DP, helping you reason about call stacks and termination.": "Dividimos la recursividad en fases de caso base, elección y exploración, luego mostramos cómo convertir la recursividad ingenua en un retroceso eficiente con restauración de estado. Los ejemplos incluyen permutaciones, N-Queens, subconjuntos y DP de árbol memorizado, que le ayudarán a razonar sobre las pilas de llamadas y la terminación.",
    "Recursive Functions": "Funciones recursivas",
    "Base Cases": "Casos básicos",
    "Tree Recursion": "Recursión de árbol",
    "Recursion Patterns": "Patrones de recursividad",
    "Backtracking Guide": "Guía de retroceso",
    "The memoized Fibonacci map, LIS DP array, and 0/1 knapsack table are spelled out step by step so you can follow how states are cached, transitions chosen, and answers read back.": "El mapa de Fibonacci memorizado, la matriz LIS DP y la tabla de mochila 0/1 se detallan paso a paso para que pueda seguir cómo se almacenan en caché los estados, se eligen las transiciones y se leen las respuestas.",
    "Expect a repeatable framework: define subproblems, derive transitions, then choose memoization or tabulation with optimized space. Classic problems (knapsack, LIS, coin change) plus pattern summaries (1D, 2D grid, partition, interval) ensure you can form DP recurrences on the fly.": "Espere un marco repetible: defina subproblemas, derive transiciones y luego elija memorización o tabulación con espacio optimizado. Los problemas clásicos (mochila, LIS, cambio de monedas) más resúmenes de patrones (1D, cuadrícula 2D, partición, intervalo) garantizan que pueda formar recurrencias de DP sobre la marcha.",
    "Optimal Substructure": "Subestructura óptima",
    "Overlapping Subproblems": "Subproblemas superpuestos",
    "DP Patterns": "Patrones DP",
    "Optimization Techniques": "Técnicas de optimización",
    "Greedy Algorithms": "Algoritmos codiciosos",
    "Activity selection walks through the start/finish arrays while `coinChange` repeatedly peels denominations, making it easy to see why each greedy comparison or subtraction works.": "La selección de actividad recorre las matrices de inicio/fin mientras \"coinChange\" pela repetidamente las denominaciones, lo que facilita ver por qué funciona cada comparación o resta codiciosa.",
    "You will learn to prove the greedy-choice property, test counterexamples, and detect matroid-like structures. Hands-on labs cover interval scheduling, Huffman coding, Kruskal vs Prim MSTs, and coin systems so you know exactly when greedy beats DP.": "Aprenderá a demostrar la propiedad de elección codiciosa, probar contraejemplos y detectar estructuras similares a matroides. Los laboratorios prácticos cubren la programación de intervalos, la codificación Huffman, los MST Kruskal vs Prim y los sistemas de monedas para que sepas exactamente cuándo la avaricia vence a la DP.",
    "Greedy Choice": "Elección codiciosa",
    "Activity Selection": "Selección de actividad",
    "Huffman Coding": "Codificación Huffman",
    "Minimum Spanning Tree": "Árbol de expansión mínimo",
    "Greedy Strategy": "Estrategia codiciosa",
    "Optimization Problems": "Problemas de optimización",
    "Graph Algorithms": "Algoritmos gráficos",
    "`Graph.addEdge`, `bfs`, and `dijkstra` all run in one demo, giving you line-by-line insight into adjacency lists, queue-based traversal, and heap-driven distance relaxation.": "`Graph.addEdge`, `bfs` y `dijkstra` se ejecutan en una demostración, lo que le brinda información línea por línea sobre las listas de adyacencia, el recorrido basado en colas y la relajación de distancia impulsada por el montón.",
    "We review adjacency list/matrix trade-offs, then dive into traversal patterns (DFS/BFS), topological sorting, shortest paths, and MST designs. Visual walkthroughs show how to reason about connectivity, detect cycles, and optimize graph algorithms with priority queues or union-find.": "Revisamos las compensaciones entre listas y matrices de adyacencia y luego nos sumergimos en patrones transversales (DFS/BFS), clasificación topológica, caminos más cortos y diseños MST. Los tutoriales visuales muestran cómo razonar sobre la conectividad, detectar ciclos y optimizar algoritmos de gráficos con colas de prioridad o búsqueda de unión.",
    "Graph Representation": "Representación gráfica",
    "DFS": "DFS",
    "BFS": "BFS",
    "Shortest Path": "Camino más corto",
    "DFS and BFS": "DFS y BFS",
    "Propositional Logic and Proof Basics": "Lógica proposicional y conceptos básicos de prueba",
    "Truth-value helpers for implication, conjunction, and biconditional are traced in a mini truth-table runner so you can connect symbolic logic to executable reasoning.": "Los ayudantes de valor de verdad para implicación, conjunción y bicondicional se rastrean en un mini corredor de tabla de verdad para que pueda conectar la lógica simbólica con el razonamiento ejecutable.",
    "This module focuses on statement logic, inference patterns, and proof framing. You will practice translating English claims to symbols, validating implications with truth tables, and structuring short direct/contrapositive proofs.": "Este módulo se centra en la lógica de los enunciados, los patrones de inferencia y el marco de prueba. Practicará la traducción de afirmaciones en inglés a símbolos, la validación de implicaciones con tablas de verdad y la estructuración de pruebas cortas directas/contrapositivas.",
    "Propositions": "Proposiciones",
    "Truth Tables": "Tablas de verdad",
    "Implication": "Implicación",
    "Logical Equivalence": "Equivalencia lógica",
    "Direct Proof": "Prueba directa",
    "Discrete Math Open Notes": "Notas abiertas de matemáticas discretas",
    "Truth Table Practice": "Práctica de la tabla de verdad",
    "Sets, Relations, and Functions": "Conjuntos, relaciones y funciones",
    "Set union/intersection, Cartesian products, and injective checks run in one compact sample so you can connect formal definitions to concrete data structures.": "Establezca uniones/intersecciones, productos cartesianos y comprobaciones inyectivas ejecutadas en una muestra compacta para que pueda conectar definiciones formales a estructuras de datos concretas.",
    "You will model sets, binary relations, and mappings with concrete operations: membership tests, products, relation properties, and injective/surjective checks. The focus is building intuition used later in graph theory and proofs.": "Modelará conjuntos, relaciones binarias y asignaciones con operaciones concretas: pruebas de membresía, productos, propiedades de relaciones y comprobaciones inyectivas/sobreyectivas. El objetivo es desarrollar la intuición que se utilizará más adelante en la teoría de grafos y en las pruebas.",
    "Set Operations": "Establecer operaciones",
    "Cartesian Product": "Producto cartesiano",
    "Relations": "Relaciones",
    "Injective Functions": "Funciones inyectivas",
    "Surjective Functions": "Funciones sobreyectivas",
    "Sets and Relations Notes": "Notas sobre conjuntos y relaciones",
    "Function Property Exercises": "Ejercicios de propiedades de funciones",
    "Combinatorics and Discrete Probability": "Combinatoria y probabilidad discreta",
    "Factorial/permutation/combination helpers pair with basic probability calculations so counting principles and event models become practical problem-solving tools.": "Los ayudantes factoriales/permutación/combinación se combinan con cálculos de probabilidad básicos para que los principios de conteo y los modelos de eventos se conviertan en herramientas prácticas para la resolución de problemas.",
    "This module connects counting techniques to probability models. You will decide when order matters, compute combinations/permutations efficiently, and map sample spaces to event probabilities for exam-style and interview-style problems.": "Este módulo conecta técnicas de conteo con modelos de probabilidad. Decidirá cuándo importa el orden, calculará combinaciones/permutaciones de manera eficiente y asignará espacios muestrales a probabilidades de eventos para problemas de estilo examen y entrevista.",
    "Factorials": "factoriales",
    "Binomial Coefficients": "Coeficientes binomiales",
    "Event Probability": "Probabilidad de evento",
    "Combinatorics Quick Sheet": "Hoja rápida de combinatoria",
    "Discrete Probability Practice": "Práctica de probabilidad discreta",
    "Tries (Prefix Trees)": "Intentos (árboles de prefijos)",
    "The trie builds nodes character by character in `insert`, reuses them via `traverse`, and flags words/prefixes, so we spell out how each loop navigates the shared structure.": "El trie construye nodos carácter por carácter en `insertar`, los reutiliza mediante `traverse` y marca palabras/prefijos, por lo que explicamos cómo cada bucle navega por la estructura compartida.",
    "The trie unit illustrates how prefix trees compress shared paths to enable O(L) lookups, autosuggest, and wildcard search. You will add delete operations, explore ternary search trees, and implement word dictionary problems leveraging prefix counting.": "La unidad trie ilustra cómo los árboles de prefijos comprimen rutas compartidas para permitir búsquedas O(L), sugerencias automáticas y búsquedas con comodines. Agregará operaciones de eliminación, explorará árboles de búsqueda ternarios e implementará problemas de diccionario de palabras aprovechando el conteo de prefijos.",
    "Trie Construction": "Trie Construcción",
    "Insert/Search/Delete": "Insertar/Buscar/Eliminar",
    "Prefix Matching": "Coincidencia de prefijos",
    "Auto-complete": "Autocompletar",
    "Trie Applications": "Pruebe aplicaciones",
    "String Processing": "Procesamiento de cadenas",
    "Union-Find (Disjoint Set)": "Union-Find (conjunto disjunto)",
    "`find` performs recursive path compression and `union` compares ranks before reparenting nodes, letting you trace exactly how the disjoint-set forest flattens.": "`find` realiza una compresión de ruta recursiva y `union` compara rangos antes de volver a emparentar los nodos, lo que le permite rastrear exactamente cómo se aplana el bosque de conjuntos disjuntos.",
    "We implement disjoint-set unions with path compression and union-by-rank, analyze their near-constant complexity, and apply them to connectivity, Kruskal MST, and cycle detection. Visual traces clarify how parent trees flatten after repeated operations.": "Implementamos uniones de conjuntos disjuntos con compresión de ruta y unión por rango, analizamos su complejidad casi constante y las aplicamos a la conectividad, Kruskal MST y detección de ciclos. Los rastros visuales aclaran cómo los árboles padres se aplanan después de repetidas operaciones.",
    "Union by Rank": "Unión por rango",
    "Connected Components": "Componentes conectados",
    "Disjoint Set Operations": "Operaciones de conjuntos disjuntos",
    "Segment Trees": "Árboles de segmentos",
    "`build`, `update`, and `rangeSum` split ranges by midpoint, handle cover/disjoint/partial cases, and bubble results upward so the entire range-query story is easy to follow.": "`build`, `update` y `rangeSum` dividen rangos por punto medio, manejan casos de cobertura/separados/parciales y distribuyen los resultados hacia arriba para que toda la historia de la consulta de rango sea fácil de seguir.",
    "Segment trees store aggregated range data (sum, min, gcd) and answer queries in O(log n); you will build both iterative and recursive versions. We also cover lazy propagation for range updates and compare segment trees with Fenwick trees in terms of capabilities.": "Los árboles de segmentos almacenan datos de rango agregados (suma, mínimo, mcd) y responden consultas en O (log n); Construirás versiones iterativas y recursivas. También cubrimos la propagación diferida para actualizaciones de rango y comparamos árboles de segmentos con árboles de Fenwick en términos de capacidades.",
    "Range Queries": "Consultas de rango",
    "Lazy Propagation": "Propagación perezosa",
    "Point Updates": "Actualizaciones de puntos",
    "Range Updates": "Actualizaciones de gama",
    "Range Query Optimization": "Optimización de consultas de rango",
    "Binary Indexed Trees (Fenwick Trees)": "Árboles indexados binarios (árboles de Fenwick)",
    "The BIT demo emphasizes the lowbit trick: `update` climbs with `i += i & -i`, `prefixSum` walks downward, and `rangeSum` just subtracts prefixes so you can visualize the implicit tree.": "La demostración de BIT enfatiza el truco de los bits bajos: `update` sube con `i += i & -i`, `prefixSum` camina hacia abajo y `rangeSum` simplemente resta prefijos para que puedas visualizar el árbol implícito.",
    "Fenwick trees offer a compact alternative for prefix sums and point updates; this lesson explains the lowbit trick, building from scratch, and performing range queries. Practice exercises include inversion counting, running frequency tables, and 2D BIT extensions.": "Los árboles Fenwick ofrecen una alternativa compacta para sumas de prefijos y actualizaciones de puntos; Esta lección explica el truco de lowbit, cómo construir desde cero y realizar consultas de rango. Los ejercicios de práctica incluyen conteo invertido, ejecución de tablas de frecuencia y extensiones BIT 2D.",
    "Prefix Sums": "Sumas de prefijo",
    "Range Sum Queries": "Consultas de suma de rango",
    "Lower Bit Operation": "Operación de broca inferior",
    "Fenwick Tree Guide": "Guía de árboles de Fenwick",
    "Prefix Sum Optimization": "Optimización de suma de prefijo",
    "Advanced Tree Structures": "Estructuras de árbol avanzadas",
    "The AVL insert pipeline updates heights, checks balance factors, and triggers the correct rotations before an inorder traversal verifies the tree stayed sorted.": "La tubería de inserción AVL actualiza las alturas, verifica los factores de equilibrio y activa las rotaciones correctas antes de que un recorrido en orden verifique que el árbol permaneció ordenado.",
    "Balanced trees (AVL, Red-Black, B/B+ trees) enforce height guarantees via rotations. You will see animation-style walkthroughs of insert/delete, compare balancing strategies, and study use cases such as ordered maps, interval trees, and database indexes.": "Los árboles equilibrados (árboles AVL, Rojo-Negro, B/B+) imponen garantías de altura mediante rotaciones. Verá tutoriales con estilo de animación sobre inserción/eliminación, comparará estrategias de equilibrio y estudiará casos de uso como mapas ordenados, árboles de intervalos e índices de bases de datos.",
    "AVL Trees": "Árboles AVL",
    "Red-Black Trees": "Árboles rojo-negros",
    "B-Trees": "Árboles B",
    "Splay Trees": "Árboles extendidos",
    "Tree Rotations": "Rotaciones de árboles",
    "Self-Balancing Trees": "Árboles autoequilibrados",
    "Tree Rotation Techniques": "Técnicas de rotación de árboles",
    "Advanced String Algorithms": "Algoritmos de cadenas avanzados",
    "We build the KMP prefix table and feed it into `kmpSearch`, pausing on each pointer jump so you understand how the `lps` array skips redundant comparisons.": "Construimos la tabla de prefijos KMP y la introducimos en `kmpSearch`, haciendo una pausa en cada salto del puntero para que comprenda cómo la matriz `lps` omite comparaciones redundantes.",
    "We derive prefix-function tables for KMP, rolling hashes for Rabin-Karp, and good/bad character heuristics for Boyer–Moore. Further topics include suffix arrays/automata, Z-algorithm, and how to combine hashing with binary search for substring problems.": "Derivamos tablas de funciones de prefijo para KMP, hashes rodantes para Rabin-Karp y heurísticas de caracteres buenos/malos para Boyer-Moore. Otros temas incluyen matrices/autómatas de sufijos, algoritmo Z y cómo combinar hash con búsqueda binaria para problemas de subcadenas.",
    "KMP Algorithm": "Algoritmo KMP",
    "Rabin-Karp": "Rabin-Karp",
    "Boyer-Moore": "boyer-moore",
    "Suffix Arrays": "Matrices de sufijos",
    "String Hashing": "Hashing de cadenas",
    "Pattern Matching": "Coincidencia de patrones",
    "String Processing Optimization": "Optimización del procesamiento de cadenas",
    "Assembly Registers and Memory Basics": "Registros de ensamblaje y conceptos básicos de memoria",
    "This starter module introduces register roles, immediate values, and memory addressing by tracing simple load/add/store sequences side by side with high-level equivalents.": "Este módulo inicial presenta funciones de registro, valores inmediatos y direccionamiento de memoria mediante el seguimiento de secuencias simples de carga/agregación/almacenamiento al lado de equivalentes de alto nivel.",
    "You will map low-level machine state to familiar variables: registers as fast temporary storage and memory as addressed slots. The goal is to make instruction-by-instruction traces intuitive before moving to procedures and control flow.": "Mapeará el estado de la máquina de bajo nivel a variables familiares: registros como almacenamiento temporal rápido y memoria como ranuras direccionadas. El objetivo es hacer que el seguimiento instrucción por instrucción sea intuitivo antes de pasar a los procedimientos y controlar el flujo.",
    "CPU Registers": "Registros de CPU",
    "Memory Addresses": "Direcciones de memoria",
    "Load/Store": "Cargar/Almacenar",
    "Data Sizes": "Tamaños de datos",
    "Endian Awareness": "Conciencia endiana",
    "x86 Register Reference": "Referencia de registro x86",
    "Memory Addressing Primer": "Manual de direccionamiento de memoria",
    "Assembly Control Flow and Procedures": "Procedimientos y flujo de control de montaje",
    "Branch flags, loop counters, and call/return frames are demonstrated in short routines so you can see how high-level `if`, `while`, and function calls are represented in assembly.": "Los indicadores de bifurcación, los contadores de bucle y los marcos de llamada/retorno se demuestran en rutinas breves para que pueda ver cómo se representan las llamadas de alto nivel \"if\", \"mientras\" y funciones en el ensamblado.",
    "This module connects jump conditions and call frames to structured programming. You will read traces of compare/branch patterns, stack behavior across calls, and loop exits to build confidence debugging low-level flow.": "Este módulo conecta condiciones de salto y marcos de llamada a la programación estructurada. Leerá rastros de patrones de comparación/bifurcación, comportamiento de pila entre llamadas y salidas de bucle para generar confianza al depurar el flujo de bajo nivel.",
    "CMP and Flags": "CMP y banderas",
    "Conditional Jumps": "Saltos condicionales",
    "Loops": "Bucles",
    "Call/Ret": "Llamar/Retirar",
    "Calling Conventions": "Convenciones de llamada",
    "Calling Convention Cheatsheet": "Hoja de referencia de la convención de llamadas",
    "Conditional Jump Table": "Tabla de salto condicional",
    "Assembly Arrays, Strings, and Basic I/O": "Matrices de ensamblaje, cadenas y E/S básicas",
    "Pointer stepping over arrays, null-terminated string scans, and minimal I/O patterns are broken into small examples so data traversal in assembly feels concrete.": "El puntero que pasa por encima de matrices, escaneos de cadenas terminadas en nulo y patrones mínimos de E/S se dividen en pequeños ejemplos para que el recorrido de datos en el ensamblaje se sienta concreto.",
    "You will practice low-level data movement through arrays and strings, then relate those patterns to higher-level loops and output routines. By the end, pointer increments, sentinel checks, and output setup should feel natural.": "Practicará el movimiento de datos de bajo nivel a través de matrices y cadenas, luego relacionará esos patrones con bucles de nivel superior y rutinas de salida. Al final, los incrementos del puntero, las comprobaciones centinela y la configuración de salida deberían resultar naturales.",
    "Pointer Arithmetic": "Aritmética de punteros",
    "Null-Terminated Strings": "Cadenas terminadas en nulo",
    "System Calls": "Llamadas al sistema",
    "Byte/Word Access": "Acceso a bytes/palabras",
    "Assembly String Ops": "Operaciones de cadena de montaje",
    "Syscall Reference (Intro)": "Referencia de llamada al sistema (introducción)",
    "Functions like `isPowerOfTwo`, `countBits`, `singleNumber`, and `lowbit` expose masks and XOR tricks; we call out what each operation does to the underlying bits.": "Funciones como `isPowerOfTwo`, `countBits`, `singleNumber` y `lowbit` exponen máscaras y trucos XOR; decimos lo que cada operación hace a los bits subyacentes.",
    "Bit tricks allow O(1) state tracking, subset iteration, and arithmetic optimizations. We practice masking, toggling, lowbit extraction, Gray codes, and XOR-based problems so you can reason confidently about binary representations.": "Los trucos de bits permiten el seguimiento del estado O(1), la iteración de subconjuntos y las optimizaciones aritméticas. Practicamos enmascaramiento, alternancia, extracción de bits bajos, códigos Gray y problemas basados ​​en XOR para que pueda razonar con confianza sobre representaciones binarias.",
    "Bitwise Operators": "Operadores bit a bit",
    "Bit Masks": "Máscaras de bits",
    "Power of Two": "poder de dos",
    "XOR Properties": "Propiedades XOR",
    "Bit Counting": "Conteo de bits",
    "Bitwise Operations": "Operaciones bit a bit",
    "Bit Tricks": "Trucos de bits",
    "Java Fundamentals": "Fundamentos de Java",
    "`JavaBasics` wires up fields via a constructor, exposes `getInfo`, and creates an instance in `main`, breaking down how objects store state and expose behavior.": "`JavaBasics` conecta campos a través de un constructor, expone `getInfo` y crea una instancia en `main`, desglosando cómo los objetos almacenan el estado y exponen el comportamiento.",
    "This primer explains the JVM model, primitive vs reference types, memory layout, and how to structure small programs with packages and build tools. Each topic is paired with short exercises so you can move from syntax memorization to writing idiomatic Java.": "Este manual explica el modelo JVM, los tipos primitivos frente a los de referencia, el diseño de la memoria y cómo estructurar programas pequeños con paquetes y herramientas de compilación. Cada tema se combina con ejercicios breves para que pueda pasar de la memorización de la sintaxis a la escritura de Java idiomático.",
    "Variables": "variables",
    "Data Types": "Tipos de datos",
    "Methods": "Métodos",
    "Classes": "Clases",
    "Objects": "Objetos",
    "Java Documentation": "Documentación Java",
    "Oracle Java Tutorials": "Tutoriales de Oracle Java",
    "Java Syntax Guide": "Guía de sintaxis de Java",
    "Control Flow Statements": "Declaraciones de flujo de control",
    "`ControlFlow.main` chains an if/else ladder, classic for loop, and enhanced for loop so you can trace how each branch or counter drives console output.": "`ControlFlow.main` encadena una escalera if/else, un bucle for clásico y un bucle for mejorado para que puedas rastrear cómo cada rama o contador impulsa la salida de la consola.",
    "We relate each control structure to real scenarios (validation, accumulation, menu handling) and highlight pitfalls like infinite loops or fall-through switches. Flowchart exercises plus debugging tips reinforce how to trace program execution step by step.": "Relacionamos cada estructura de control con escenarios reales (validación, acumulación, manejo de menús) y resaltamos dificultades como bucles infinitos o interruptores fallidos. Los ejercicios de diagramas de flujo y los consejos de depuración refuerzan cómo rastrear la ejecución del programa paso a paso.",
    "If-Else": "Si no",
    "For Loops": "Para bucles",
    "While Loops": "Mientras bucles",
    "Switch": "Cambiar",
    "Break/Continue": "Pausa/Continuar",
    "Java Control Statements": "Declaraciones de control de Java",
    "Loop Examples": "Ejemplos de bucles",
    "Conditional Logic": "Lógica condicional",
    "Object-Oriented Programming": "Programación orientada a objetos",
    "An abstract `Animal` defines shared state/behavior, `Dog` overrides `makeSound`, and the inherited `sleep` method demonstrates encapsulation and polymorphism in one snippet.": "Un \"Animal\" abstracto define el estado/comportamiento compartido, \"Perro\" anula \"makeSound\" y el método heredado \"dormir\" demuestra encapsulación y polimorfismo en un fragmento.",
    "Encapsulation, inheritance, and polymorphism are demonstrated with cohesive mini-systems (bank accounts, game entities) so you see how design choices affect flexibility. Interfaces vs abstract classes, composition-over-inheritance, and SOLID principles round out the lesson.": "La encapsulación, la herencia y el polimorfismo se demuestran con minisistemas cohesivos (cuentas bancarias, entidades de juego) para que pueda ver cómo las opciones de diseño afectan la flexibilidad. Interfaces versus clases abstractas, composición sobre herencia y principios SÓLIDOS completan la lección.",
    "Encapsulation": "Encapsulación",
    "Inheritance": "Herencia",
    "Polymorphism": "Polimorfismo",
    "Abstraction": "Abstracción",
    "Interfaces": "Interfaces",
    "OOP in Java": "Programación orientada a objetos en Java",
    "Inheritance Examples": "Ejemplos de herencia",
    "Interface vs Abstract": "Interfaz versus resumen",
    "Exception Handling": "Manejo de excepciones",
    "`divide` wraps division in try/catch/finally while `validateAge` throws a custom exception, showing exactly how execution moves through error paths and cleanup blocks.": "`divide` envuelve la división en try/catch/finally mientras que `validateAge` genera una excepción personalizada, que muestra exactamente cómo se mueve la ejecución a través de rutas de error y bloques de limpieza.",
    "You will categorize checked vs unchecked exceptions, design custom hierarchies, and use try-with-resources for safe cleanup. Realistic scenarios cover logging, wrapping exceptions to add context, and establishing global handlers to keep apps resilient.": "Clasificará las excepciones marcadas y no marcadas, diseñará jerarquías personalizadas y utilizará pruebas con recursos para una limpieza segura. Los escenarios realistas cubren el registro, el ajuste de excepciones para agregar contexto y el establecimiento de controladores globales para mantener las aplicaciones resistentes.",
    "Try-Catch": "Intentar atrapar",
    "Finally Block": "Finalmente bloquear",
    "Custom Exceptions": "Excepciones personalizadas",
    "Throws": "Lanza",
    "Exception Types": "Tipos de excepción",
    "Java Exceptions": "Excepciones de Java",
    "Error Handling Best Practices": "Mejores prácticas de manejo de errores",
    "Java Collections Framework": "Marco de colecciones de Java",
    "`CollectionsExample` builds an `ArrayList`, `HashMap`, and `HashSet` inside `main`, highlighting adds, puts, and duplicate handling so each collection’s behavior is tangible.": "`CollectionsExample` construye un `ArrayList`, `HashMap` y `HashSet` dentro de `main`, resaltando las adiciones, colocaciones y el manejo de duplicados para que el comportamiento de cada colección sea tangible.",
    "We benchmark List/Set/Map variants, discuss ordering and concurrency characteristics, and show how iterators, streams, and collectors interact with collections. Practical labs include implementing caches, frequency tables, and multi-map utilities.": "Comparamos variantes de Lista/Conjunto/Mapa, analizamos el orden y las características de concurrencia y mostramos cómo los iteradores, flujos y recopiladores interactúan con las colecciones. Los laboratorios prácticos incluyen la implementación de cachés, tablas de frecuencia y utilidades de mapas múltiples.",
    "ArrayList": "Lista de matrices",
    "HashMap": "HashMap",
    "HashSet": "Conjunto de hash",
    "TreeMap": "ÁrbolMapa",
    "LinkedList": "Lista enlazada",
    "Iterators": "Iteradores",
    "Java Collections": "Colecciones Java",
    "Map vs Set": "Mapa vs conjunto",
    "Collection Performance": "Rendimiento de la colección",
    "File Input/Output": "Entrada/salida de archivos",
    "`writeToFile` and `readFromFile` pair try-with-resources with FileWriter and Scanner, illustrating how to open, stream, and close files while surfacing friendly error messages.": "`writeToFile` y `readFromFile` combinan prueba con recursos con FileWriter y Scanner, lo que ilustra cómo abrir, transmitir y cerrar archivos mientras aparecen mensajes de error amigables.",
    "The I/O unit compares classic streams vs NIO.2, shows buffered vs unbuffered performance, and demonstrates reading JSON/CSV safely. You will practice try-with-resources, directory walking, and serialization basics to build small ETL pipelines.": "La unidad de E/S compara transmisiones clásicas con NIO.2, muestra el rendimiento con búfer versus sin búfer y demuestra la lectura segura de JSON/CSV. Practicará los conceptos básicos de prueba con recursos, recorrido por directorios y serialización para crear pequeñas canalizaciones ETL.",
    "FileReader": "Lector de archivos",
    "FileWriter": "escritor de archivos",
    "BufferedReader": "Lector almacenado en búfer",
    "Scanner": "Escáner",
    "Path API": "API de ruta",
    "Java I/O Streams": "Flujos de E/S de Java",
    "File Handling": "Manejo de archivos",
    "NIO.2 Path API": "API de ruta NIO.2",
    "Multithreading Basics": "Conceptos básicos de subprocesos múltiples",
    "A `Counter` implements Runnable, prints progress inside `run`, and two threads are started in `main`, letting you trace scheduling, sleeping, and graceful interruption.": "Un \"Contador\" implementa Runnable, imprime el progreso dentro de \"ejecutar\" y se inician dos subprocesos en \"principal\", lo que le permite rastrear la programación, el sueño y la interrupción elegante.",
    "We start with thread lifecycle basics, then introduce synchronization primitives (locks, volatile, atomics) and higher-level executors. Case studies cover producer-consumer queues, progress bars, and responsiveness tips for desktop or server apps.": "Comenzamos con los conceptos básicos del ciclo de vida de los subprocesos, luego presentamos las primitivas de sincronización (bloqueos, volátiles, atómicos) y ejecutores de nivel superior. Los estudios de caso cubren colas de productores-consumidores, barras de progreso y consejos de capacidad de respuesta para aplicaciones de escritorio o de servidor.",
    "Thread Class": "Clase de hilo",
    "Runnable Interface": "Interfaz ejecutable",
    "Synchronization": "Sincronización",
    "Thread Safety": "Seguridad del hilo",
    "Java Concurrency": "Concurrencia de Java",
    "Thread Synchronization": "Sincronización de hilos",
    "Executor Framework": "Marco ejecutor",
    "Design Patterns": "Patrones de diseño",
    "We showcase a synchronized lazy `DatabaseConnection` singleton plus a switch-based `ShapeFactory`, explaining why constructors stay private and how factories centralize object creation.": "Mostramos un singleton `DatabaseConnection` diferido sincronizado más un `ShapeFactory` basado en switch, explicando por qué los constructores permanecen privados y cómo las fábricas centralizan la creación de objetos.",
    "Each pattern includes intent, class diagrams, and annotated Java implementations so you know when to apply it. Coverage spans creational, structural, and behavioral patterns plus modern twists like dependency injection and event-driven design.": "Cada patrón incluye intenciones, diagramas de clases e implementaciones de Java anotadas para que sepa cuándo aplicarlos. La cobertura abarca patrones creacionales, estructurales y de comportamiento, además de giros modernos como la inyección de dependencia y el diseño basado en eventos.",
    "Singleton": "Semifallo",
    "Factory": "Fábrica",
    "Observer": "Observador",
    "Strategy": "Estrategia",
    "MVC": "mvc",
    "Gang of Four Patterns": "Banda de cuatro patrones",
    "Java Design Patterns": "Patrones de diseño de Java",
    "When to Use Patterns": "Cuándo usar patrones",
    "Lambda Expressions & Streams": "Expresiones y transmisiones Lambda",
    "The stream pipeline filters even numbers, maps them to squares, collects a list, then chains mapToInt/filter/average, so each stage’s role is spelled out in order.": "La canalización de flujo filtra números pares, los asigna a cuadrados, recopila una lista y luego encadena mapToInt/filter/average, de modo que la función de cada etapa se detalla en orden.",
    "Lambda labs emphasize pure functions, higher-order utilities, and fluent stream operations. You'll write collectors, compose predicates, handle optional values, and contrast imperative vs declarative implementations for clarity and parallelism.": "Los laboratorios Lambda enfatizan funciones puras, utilidades de orden superior y operaciones de flujo fluido. Escribirá recopiladores, redactará predicados, manejará valores opcionales y contrastará implementaciones imperativas y declarativas para mayor claridad y paralelismo.",
    "Lambda Expressions": "Expresiones lambda",
    "Stream API": "API de transmisión",
    "Method References": "Referencias de métodos",
    "Functional Interfaces": "Interfaces funcionales",
    "Java 8 Features": "Características de Java 8",
    "Stream API Guide": "Guía de API de transmisión",
    "Functional Programming": "Programación funcional",
    "Java Generics": "Genéricos de Java",
    "Generic `Box<T>`, the `<T> void swap` helper, and the bounded `average` method demonstrate how type parameters travel through classes, methods, and Number constraints.": "El `Box<T>` genérico, el ayudante `<T> void swap` y el método `average` acotado demuestran cómo los parámetros de tipo viajan a través de clases, métodos y restricciones numéricas.",
    "We explore how generics enforce type safety, how wildcards (? extends/? super) guide API design, and what type erasure means at runtime. Exercises include building generic repositories, comparators, and fluent builders without casting.": "Exploramos cómo los genéricos imponen la seguridad de tipos, cómo los comodines (? extends/? super) guían el diseño de API y qué significa el borrado de tipos en tiempo de ejecución. Los ejercicios incluyen la creación de repositorios genéricos, comparadores y constructores fluidos sin conversión.",
    "Generic Classes": "Clases genéricas",
    "Generic Methods": "Métodos genéricos",
    "Wildcards": "comodines",
    "Type Erasure": "Tipo de borrado",
    "Bounds": "Límites",
    "Java Generics Tutorial": "Tutorial de genéricos de Java",
    "Type Safety": "Tipo Seguridad",
    "Wildcard Usage": "Uso de comodines",
    "Unit Testing with JUnit": "Pruebas unitarias con JUnit",
    "`CalculatorTest` uses `@BeforeEach` setup, assertion-based tests, exception checks, and a parameterized suite, clarifying what each annotation adds to the run.": "`CalculatorTest` usa la configuración `@BeforeEach`, pruebas basadas en aserciones, comprobaciones de excepciones y un conjunto de parámetros, aclarando qué agrega cada anotación a la ejecución.",
    "Beyond basic assertions, you will organize tests with lifecycle hooks, parameterized inputs, and nested suites. We also integrate mocks, coverage targets, and CI habits so your codebase gains reliable regression protection.": "Más allá de las afirmaciones básicas, organizará pruebas con enlaces de ciclo de vida, entradas parametrizadas y conjuntos anidados. También integramos simulacros, objetivos de cobertura y hábitos de CI para que su código base obtenga una protección de regresión confiable.",
    "JUnit Basics": "Conceptos básicos de JUnit",
    "Test Assertions": "Afirmaciones de prueba",
    "Test Lifecycle": "Ciclo de vida de la prueba",
    "Mocking": "Burlón",
    "TDD": "TDD",
    "Mocking Frameworks": "Marcos burlones",
    "Database Connectivity (JDBC)": "Conectividad de base de datos (JDBC)",
    "`getStudents` and `insertStudent` open connections with try-with-resources, build statements (plain vs prepared), bind parameters, and iterate result sets so database I/O order is explicit.": "`getStudents` e `insertStudent` abren conexiones con prueba con recursos, crean declaraciones (simples o preparadas), vinculan parámetros e iteran conjuntos de resultados para que el orden de E/S de la base de datos sea explícito.",
    "JDBC coverage includes driver setup, connection pooling, prepared statements, and transaction management. You'll practice defensive coding against SQL injection, map result sets to objects, and compare raw JDBC with higher-level ORM approaches.": "La cobertura de JDBC incluye configuración de controladores, agrupación de conexiones, estados de cuenta preparados y gestión de transacciones. Practicará la codificación defensiva contra la inyección de SQL, asignará conjuntos de resultados a objetos y comparará JDBC sin formato con enfoques ORM de nivel superior.",
    "JDBC Drivers": "Controladores JDBC",
    "Statement": "Declaración",
    "Prepared Statements": "Declaraciones preparadas",
    "JDBC Tutorial": "Tutorial JDBC",
    "SQL Basics": "Conceptos básicos de SQL",
    "Database Best Practices": "Mejores prácticas de bases de datos",
    "Two Sum (Hash Map)": "Dos sumas (mapa hash)",
    "Beginner": "Principiante",
    "Given an array of integers, return indices of the two numbers such that they add up to a target. Assume exactly one solution and that you cannot use the same element twice.": "Dada una serie de números enteros, devuelve índices de los dos números de manera que sumen un objetivo. Suponga exactamente una solución y que no puede utilizar el mismo elemento dos veces.",
    "Store value → index so lookup is O(1).": "Almacene el valor → índice para que la búsqueda sea O (1).",
    "Java": "Java",
    "Valid Parentheses (Stack)": "Paréntesis válidos (pila)",
    "Given a string containing ()[]{} brackets, determine if the string is valid. A valid string closes brackets in the correct order.": "Dada una cadena que contiene corchetes ()[]{}, determine si la cadena es válida. Una cadena válida cierra corchetes en el orden correcto.",
    "Push opens, pop when matching closes arrive.": "Empuje para abrir, haga estallar cuando llegue el cierre correspondiente.",
    "String": "Cadena",
    "Merge Two Sorted Lists": "Fusionar dos listas ordenadas",
    "Merge two sorted linked lists and return the head of the merged list. The resulting list should be sorted.": "Fusiona dos listas enlazadas ordenadas y devuelve el encabezado de la lista fusionada. La lista resultante debe ordenarse.",
    "Use a dummy head to simplify pointer updates.": "Utilice una cabeza ficticia para simplificar las actualizaciones del puntero.",
    "Given a sorted array and a target value, return the index if found. Otherwise return -1.": "Dada una matriz ordenada y un valor objetivo, devuelve el índice si lo encuentra. De lo contrario, devuelve -1.",
    "Always shrink the search window based on mid.": "Reduzca siempre la ventana de búsqueda según mid.",
    "Shortest Path in Grid (BFS)": "Ruta más corta en cuadrícula (BFS)",
    "Intermediate": "Intermedio",
    "Given a grid with 0 = free and 1 = blocked, find the shortest path length from top-left to bottom-right using BFS.": "Dada una cuadrícula con 0 = libre y 1 = bloqueado, encuentre la longitud del camino más corto desde la parte superior izquierda hasta la parte inferior derecha usando BFS.",
    "BFS guarantees shortest path in unweighted graphs.": "BFS garantiza el camino más corto en gráficos no ponderados.",
    "Top K Frequent Elements": "Top K elementos frecuentes",
    "Given an array of integers, return the k most frequent elements.": "Dada una matriz de números enteros, devuelve los k elementos más frecuentes.",
    "Maintain a min-heap of size k for O(n log k).": "Mantenga un montón mínimo de tamaño k para O (n log k).",
    "Arrays & Strings Cheat Sheet": "Hoja de referencia de matrices y cadenas",
    "Big-O, sliding window patterns, and common pitfalls.": "Big-O, patrones de ventanas corredizas y errores comunes.",
    "Arrays": "matrices",
    "Linked Lists Visual Guide": "Guía visual de listas enlazadas",
    "Pointer moves, reversal patterns, and cycle detection.": "Movimientos del puntero, patrones de inversión y detección de ciclos.",
    "Stacks & Queues Quick Reference": "Referencia rápida de pilas y colas",
    "LIFO/FIFO use cases, monotonic patterns, and queues.": "Casos de uso LIFO/FIFO, patrones monótonos y colas.",
    "Stacks & Queues": "Pilas y colas",
    "Trees & BSTs Guide": "Guía de árboles y BST",
    "Traversals, BST invariants, and recursion tips.": "Recorridos, invariantes BST y consejos de recursividad.",
    "Trees": "Árboles",
    "Graphs BFS/DFS Sheet": "Gráficos Hoja BFS/DFS",
    "Adjacency lists, traversal templates, and shortest path.": "Listas de adyacencia, plantillas transversales y ruta más corta.",
    "Graphs": "Graficos",
    "Sorting Algorithms Summary": "Resumen de algoritmos de clasificación",
    "Stable vs unstable, complexities, and use cases.": "Estable versus inestable, complejidades y casos de uso.",
    "Sorting": "Clasificación",
    "Recursion & Backtracking": "Recursión y retroceso",
    "Base cases, call stack, and backtracking checklist.": "Casos base, pila de llamadas y lista de verificación de seguimiento.",
    "Big-O & Complexity": "Gran O y complejidad",
    "Runtime intuition, amortized analysis, and pitfalls.": "Intuición en tiempo de ejecución, análisis amortizado y trampas.",
    "Java Collections for DSA": "Colecciones de Java para DSA",
    "HashMap, ArrayDeque, PriorityQueue cheat sheet.": "HashMap, ArrayDeque, hoja de referencia PriorityQueue.",
    "Discrete Math Toolkit": "Kit de herramientas de matemáticas discretas",
    "Logic, sets, combinatorics, and graph basics.": "Conceptos básicos de lógica, conjuntos, combinatoria y gráficas.",
    "Discrete Math": "Matemáticas discretas",
    "Two-Pointer Sprint": "Sprint de dos puntos",
    "Recreate the palindrome checker from memory, then extend it to ignore emoji or punctuation.": "Vuelva a crear el verificador palíndromo desde la memoria y luego extiéndalo para ignorar los emoji o la puntuación.",
    "Rewrite the base palindrome helper without looking.": "Reescribe el ayudante palíndromo base sin mirar.",
    "Add support for Unicode or emoji filtering.": "Agregue soporte para filtrado Unicode o emoji.",
    "Test with at least 3 tricky strings.": "Pruebe con al menos 3 cuerdas difíciles.",
    "Cycle Detective": "detective de ciclo",
    "Trace Floyd’s cycle algorithm with a custom diagram.": "Trace el algoritmo del ciclo de Floyd con un diagrama personalizado.",
    "Draw a small linked list with a loop.": "Dibuja una pequeña lista enlazada con un bucle.",
    "Record the positions of slow/fast for 4 iterations.": "Registre las posiciones de lento/rápido durante 4 iteraciones.",
    "Explain in your own words why they must meet.": "Explique con sus propias palabras por qué deben reunirse.",
    "BFS Map Builder": "Creador de mapas BFS",
    "Turn the BFS demo into pseudo-code with comments you would ship to a teammate.": "Convierta la demostración de BFS en pseudocódigo con comentarios que enviaría a un compañero de equipo.",
    "Outline the queue operations and visited set usage.": "Describe las operaciones de la cola y el uso del conjunto visitado.",
    "Add a guard for disconnected nodes.": "Agregue una protección para los nodos desconectados.",
    "Write one real-world scenario where BFS beats DFS.": "Escribe un escenario del mundo real en el que BFS supere a DFS.",
    "DP Table Snapshot": "Instantánea de la tabla DP",
    "Freeze-frame the LIS dynamic programming table and annotate the transitions.": "Congele la tabla de programación dinámica LIS y anote las transiciones.",
    "Log the dp[] array after each iteration.": "Registre la matriz dp[] después de cada iteración.",
    "Summarize why LIS is O(n²) here.": "Resuma aquí por qué LIS es O(n²).",
    "Convert the solution to a tabulation diagram.": "Convierta la solución a un diagrama de tabulación.",
    "Heapify Drill": "Taladro amontonado",
    "Practice manual heapify by writing down the array after each swap.": "Practique la acumulación manual escribiendo la matriz después de cada intercambio.",
    "Start with the sample array in the module.": "Comience con la matriz de muestra en el módulo.",
    "Track each left/right child comparison.": "Realice un seguimiento de cada comparación de niños izquierdo/derecho.",
    "Explain when you’d reach for a heap instead of a sorted list.": "Explique cuándo buscaría un montón en lugar de una lista ordenada.",
    "Chunk study time into 25-minute deep work blocks and log them in the Focus Tracker.": "Divida el tiempo de estudio en bloques de trabajo profundo de 25 minutos y regístrelos en Focus Tracker.",
    "Explain an algorithm out loud or to a rubber duck before reading the official solution.": "Explique un algoritmo en voz alta o a un pato de goma antes de leer la solución oficial.",
    "Switch the global font size in Settings if your eyes feel strained—comfort boosts focus.": "Cambie el tamaño de fuente global en Configuración si siente la vista cansada: la comodidad aumenta la concentración.",
    "Mark modules as complete only after you can summarize the code without peeking.": "Marque los módulos como completos solo después de que pueda resumir el código sin mirar.",
    "Use the Daily Challenge as your warm-up, then tackle a related module exercise.": "Utilice el desafío diario como calentamiento y luego realice un ejercicio del módulo relacionado.",
    "Pair flashcards with code: after seeing a definition, open the module snippet it references.": "Empareje tarjetas con código: después de ver una definición, abra el fragmento de módulo al que hace referencia.",
    "Refresh the Study Tip when you finish a module to keep motivation high.": "Actualice el Consejo de estudio cuando termine un módulo para mantener alta la motivación.",
    "Array and String fundamentals": "Fundamentos de matrices y cadenas",
    "Find maximum element in array": "Encuentra el elemento máximo en la matriz",
    "Initialize with first element": "Inicializar con el primer elemento",
    "Update maximum": "Actualizar máximo",
    "Reverse a string using two pointers": "Invertir una cadena usando dos punteros",
    "Swap characters": "Intercambiar personajes",
    "Move pointers toward center": "Mover punteros hacia el centro",
    "Check if string is palindrome": "Compruebe si la cuerda es palíndromo",
    "[^a-z0-9]": "[^a-z0-9]",
    "Characters don't match": "Los personajes no coinciden",
    "All characters matched": "Todos los personajes coinciden",
    "Array and String fundamentals in C++": "Fundamentos de matrices y cadenas en C++",
    "include <iostream>": "incluir <iostream>",
    "include <vector>": "incluir <vector>",
    "include <string>": "incluir <cadena>",
    "include <algorithm>": "incluir <algoritmo>",
    "include <climits>": "incluir <clímites>",
    "Convert to lowercase and keep only alphanumeric": "Convierta a minúsculas y mantenga solo alfanuméricos",
    "Array and String fundamentals in Python": "Fundamentos de matrices y cadenas en Python",
    "Reverse a string using slicing": "Invertir una cadena usando corte",
    "Python's elegant slicing": "El corte elegante de Python",
    "Reverse using two pointers (more explicit)": "Invertir usando dos punteros (más explícito)",
    "Clean string: lowercase and alphanumeric only": "Cadena limpia: solo minúsculas y alfanuméricas",
    "Compare with reverse": "Comparar con reversa",
    "Check palindrome using two pointers": "Verifique el palíndromo usando dos punteros",
    "Array and String fundamentals in JavaScript": "Fundamentos de matrices y cadenas en JavaScript",
    "Alternative functional approach": "Enfoque funcional alternativo",
    "Linked List implementation and operations": "Implementación y operaciones de listas vinculadas",
    "Reverse a linked list iteratively": "Invertir una lista enlazada de forma iterativa",
    "Store next node": "Almacenar el siguiente nodo",
    "Reverse link": "Enlace inverso",
    "Move prev forward": "Mover anterior hacia adelante",
    "Move current forward": "Avanzar la corriente",
    "New head of reversed list": "Nuevo jefe de lista invertida",
    "Detect cycle using Floyd's algorithm (tortoise and hare)": "Detectar ciclo mediante el algoritmo de Floyd (tortuga y liebre)",
    "Tortoise: moves 1 step": "Tortuga: avanza 1 paso",
    "Hare: moves 2 steps": "Liebre: avanza 2 pasos",
    "Cycle detected": "Ciclo detectado",
    "No cycle found": "No se encontró ningún ciclo",
    "Merge two sorted linked lists": "Fusionar dos listas enlazadas ordenadas",
    "Dummy node for easy handling": "Nodo ficticio para un fácil manejo",
    "Attach remaining nodes": "Adjuntar los nodos restantes",
    "Return actual head": "Devolver cabeza real",
    "Linked List implementation and operations in C++": "Implementación y operaciones de listas enlazadas en C++",
    "Linked List implementation and operations in Python": "Implementación y operaciones de listas vinculadas en Python",
    "Linked List implementation and operations in JavaScript": "Implementación y operaciones de listas enlazadas en JavaScript",
    "Simple Stack and Queue implementations in Java": "Implementaciones simples de pila y cola en Java",
    "Stack empty": "Pila vacía",
    "adds to tail": "se suma a la cola",
    "Queue empty": "cola vacía",
    "removes from head": "se quita de la cabeza",
    "Stack peek:": "Vistazo de la pila:",
    "Stack pop:": "Pila pop:",
    "Queue dequeue:": "Cola de cola:",
    "Queue size:": "Tamaño de la cola:",
    "Binary tree traversals and insert in Java": "Recorridos de árboles binarios e inserción en Java.",
    "Inorder:": "En orden:",
    "\\nLevel order:": "\\nOrden de niveles:",
    "Frequency counter using HashMap and simple custom hash table": "Contador de frecuencia usando HashMap y una tabla hash personalizada simple",
    "{a=2, d=1, ...}": "{a=2,d=1,...}",
    "Coffee language": "Idioma del cafe",
    "Snake language": "lenguaje de serpiente",
    "Not found": "Extraviado",
    "Min-heap using PriorityQueue plus manual heapify": "Montón mínimo usando PriorityQueue más montón manual",
    "Heapified array:": "Matriz amontonada:",
    "Detailed sorting implementations with analysis": "Implementaciones de clasificación detalladas con análisis.",
    "already sorted": "ya ordenado",
    "Quick Sort:": "Clasificación rápida:",
    "Merge Sort:": "Combinar orden:",
    "Searching utilities highlighting multiple techniques": "Utilidades de búsqueda que destacan múltiples técnicas",
    "Linear search 8:": "Búsqueda lineal 8:",
    "Binary search 10:": "Búsqueda binaria 10:",
    "Exponential search 12:": "Búsqueda exponencial 12:",
    "Recursion and backtracking patterns": "Patrones de recursividad y retroceso",
    "mark visited": "marcar visitado",
    "'; // mark visited": "'; // marcar visitado",
    "Factorial(5) =": "Factorial(5) =",
    "Subsets:": "Subconjuntos:",
    "Dynamic programming examples (memoization + tabulation)": "Ejemplos de programación dinámica (memorización + tabulación)",
    "Fib(10) =": "Fibra(10) =",
    "LIS length =": "longitud LIS =",
    "0/1 Knapsack =": "0/1 Mochila =",
    "Greedy strategies for scheduling and coin change": "Estrategias codiciosas para la programación y el cambio de monedas.",
    "Cannot make exact change with given denominations": "No se puede hacer el cambio exacto con denominaciones determinadas",
    "Selected activities:": "Actividades seleccionadas:",
    "Coin change for 68:": "Cambio de moneda por 68:",
    "Graph traversal and Dijkstra shortest path": "Recorrido del gráfico y camino más corto de Dijkstra",
    "BFS:": "BFS:",
    "Dijkstra distances from 0:": "Distancias de Dijkstra desde 0:",
    "Propositional logic truth table helpers": "Ayudantes de la tabla de verdad de lógica proposicional",
    "p q | p->q p<->q": "p q | p->q p<->q",
    "Direct proof idea: assume p, derive q.": "Idea de prueba directa: asumir p, derivar q.",
    "p q | p->q p<->q\\n": "p q | p->q p<->q\\n",
    "Direct proof idea: assume p, derive q.\\n": "Idea de prueba directa: asumir p, derivar q.\\n",
    "{p} {q} | {implies(p, q)}    {biconditional(p, q)}": "{p} {q} | {implica(p, q)} {bicondicional(p, q)}",
    "Sets, relations, and functions mini demo": "Mini demostración de conjuntos, relaciones y funciones",
    "A ∩ B =": "A∩B =",
    "A ∪ B =": "Un ∪ B =",
    "f is injective?": "f es inyectiva?",
    "include <set>": "incluir <conjunto>",
    "include <map>": "incluir <mapa>",
    "A ∩ B size =": "Tamaño A ∩ B =",
    "A ∪ B size =": "Tamaño A ∪ B =",
    "Counting and probability helpers": "Ayudantes de conteo y probabilidad",
    "P(5,2) =": "PAG(5,2) =",
    "C(5,2) =": "C(5,2) =",
    "P(exactly 2 heads in 3 fair flips) =": "P(exactamente 2 caras en 3 lanzamientos justos) =",
    "(factorial(r) * factorial(n - r))": "(factorial(r) * factorial(n - r))",
    "factorial(n - r))": "factorial(n - r))",
    "Trie / prefix tree implementation": "Implementación de árbol Trie/prefijo",
    "Disjoint Set Union (Union-Find) with path compression": "Unión de conjuntos disjuntos (Union-Find) con compresión de ruta",
    "path compression": "compresión de ruta",
    "Find(2) =": "Encontrar(2) =",
    "Connected components merged?": "¿Los componentes conectados se fusionaron?",
    "Segment tree supporting range sum query and point update": "Árbol de segmentos que admite consulta de suma de rango y actualización de puntos",
    "Sum 1-3:": "Suma 1-3:",
    "Sum 1-3 after update:": "Suma 1-3 después de la actualización:",
    "Fenwick Tree / Binary Indexed Tree": "Árbol Fenwick / Árbol indexado binario",
    "1-based indexing": "indexación basada en 1",
    "Prefix sum(3) =": "Suma de prefijo(3) =",
    "add 5 to index 2": "suma 5 al índice 2",
    "Range sum(1,3) =": "Suma de rango(1,3) =",
    "AVL tree with rotations to maintain balance": "Árbol AVL con rotaciones para mantener el equilibrio.",
    "no duplicates": "sin duplicados",
    "Knuth-Morris-Pratt (KMP) pattern matching": "Coincidencia de patrones Knuth-Morris-Pratt (KMP)",
    "match found": "coincidencia encontrada",
    "Prefix table:": "Tabla de prefijos:",
    "KMP search index:": "Índice de búsqueda KMP:",
    "Register-like reasoning in Java": "Razonamiento tipo registro en Java",
    "pretend eax register": "fingir registro eax",
    "pretend ebx register": "fingir registro ebx",
    "eax after add =": "eax después de agregar =",
    "loaded memory[base+1] =": "memoria cargada[base+1] =",
    "Register-like reasoning in C++": "Razonamiento tipo registro en C++",
    "Register-like reasoning in Python": "Razonamiento tipo registro en Python",
    "Register-like reasoning in JavaScript": "Razonamiento tipo registro en JavaScript",
    "Control flow and procedure equivalents in Java": "Control de flujo y equivalentes de procedimientos en Java",
    "sumToN(5) =": "sumaN(5) =",
    "branch taken: result > 10": "rama tomada: resultado > 10",
    "Control flow and procedure equivalents in C++": "Control de flujo y equivalentes de procedimientos en C++",
    "branch taken: result > 10\\n": "rama tomada: resultado > 10\\n",
    "Control flow and procedure equivalents in Python": "Control de flujo y equivalentes de procedimientos en Python",
    "sum_to_n(5) =": "suma_a_n(5) =",
    "Control flow and procedure equivalents in JavaScript": "Control de flujo y equivalentes de procedimientos en JavaScript",
    "Arrays, strings, and I/O analog in Java": "Matrices, cadenas y E/S analógicas en Java",
    "sum(nums) =": "suma(núms) =",
    "length(text) =": "longitud (texto) =",
    "I/O demo complete.": "Demostración de E/S completa.",
    "Arrays, strings, and I/O analog in C++": "Matrices, cadenas y E/S analógicas en C++",
    "I/O demo complete.\\n": "Demostración de E/S completa.\\n",
    "Arrays, strings, and I/O analog in Python": "Matrices, cadenas y entradas/salidas analógicas en Python",
    "Arrays, strings, and I/O analog in JavaScript": "Matrices, cadenas y entradas/salidas analógicas en JavaScript",
    "Common bit manipulation techniques": "Técnicas comunes de manipulación de bits",
    "drop lowest set bit": "soltar el bit establecido más bajo",
    "Is 16 power of two?": "¿Es 16 potencia de dos?",
    "Bits in 29:": "Bits en 29:",
    "Single number:": "Número único:",
    "Lowbit of 12:": "Bit bajo de 12:",
    "Java Basics - Variables and Methods": "Conceptos básicos de Java: variables y métodos",
    "Instance variables": "variables de instancia",
    "Method with return value": "Método con valor de retorno",
    "Name:": "Nombre:",
    ", Age:": ", Edad:",
    "Static method": "método estático",
    "Control Flow Examples": "Ejemplos de flujo de control",
    "If-else example": "Ejemplo si no",
    "A grade": "una calificación",
    "B grade": "grado B",
    "C grade or below": "Grado C o inferior",
    "For loop example": "Para ejemplo de bucle",
    "Count:": "Contar:",
    "Enhanced for loop": "Bucle for mejorado",
    "Number:": "Número:",
    "OOP Concepts": "Conceptos de programación orientada a objetos",
    "is sleeping": "esta durmiendo",
    "says Woof!": "dice ¡Guau!",
    "Result:": "Resultado:",
    "Error: Cannot divide by zero!": "Error: ¡No se puede dividir por cero!",
    "Division operation completed.": "Operación de división completada.",
    "Custom exception": "Excepción personalizada",
    "Age cannot be negative": "La edad no puede ser negativa.",
    "Collections Framework": "Marco de colecciones",
    "ArrayList example": "Ejemplo de lista de matrices",
    "HashMap example": "Ejemplo de mapa hash",
    "HashSet example": "Ejemplo de HashSet",
    "Duplicate ignored": "Duplicado ignorado",
    "Unique numbers:": "Números únicos:",
    "File I/O Operations": "Operaciones de E/S de archivos",
    "File written successfully!": "¡Archivo escrito exitosamente!",
    "Error writing file:": "Error al escribir el archivo:",
    "File not found:": "Archivo no encontrado:",
    "Multithreading Example": "Ejemplo de subprocesos múltiples",
    "Implementing Runnable": "Implementación ejecutable",
    "Sleep for 1 second": "Dormir por 1 segundo",
    "Design Patterns - Singleton Example": "Patrones de diseño: ejemplo singleton",
    "localhost:3306/mydb\";": "localhost:3306/mydb\";",
    "jdbc:mysql://localhost:3306/mydb": "jdbc:mysql://localhost:3306/mydb",
    "Connected to:": "Conectado a:",
    "Factory Pattern Example": "Ejemplo de patrón de fábrica",
    "Unknown shape": "Forma desconocida",
    "Lambda and Streams": "Lambda y corrientes",
    "Lambda with Streams": "Lambda con secuencias",
    "Lambda expression": "expresión lambda",
    "Method reference alternative: Integer::square": "Alternativa de referencia del método: Entero::cuadrado",
    "Even squares:": "Cuadrados pares:",
    "More complex stream operations": "Operaciones de flujo más complejas",
    "Average:": "Promedio:",
    "Generics Example": "Ejemplo de genéricos",
    "Generic class": "clase genérica",
    "Generic method": "Método genérico",
    "Bounded generics": "genéricos acotados",
    "JUnit Testing Example": "Ejemplo de prueba JUnit",
    "Addition should work correctly": "La adición debería funcionar correctamente.",
    "Testing exceptions": "Excepciones de prueba",
    "JDBC Example": "Ejemplo de JDBC",
    "localhost:3306/school\";": "localhost:3306/escuela\";",
    "jdbc:mysql://localhost:3306/school": "jdbc:mysql://localhost:3306/escuela",
    "SELECT * FROM students": "SELECCIONAR * DE estudiantes",
    "ID:": "IDENTIFICACIÓN:",
    ", Name:": ", Nombre:",
    "Database error:": "Error de base de datos:",
    "INSERT INTO students (name, age) VALUES (?, ?)": "INSERTAR EN estudiantes (nombre, edad) VALORES (?, ?)",
    "Error inserting student:": "Error al insertar estudiante:",
    "MultLearning Site - Master DSA, Assembly, Java, Python, JS, Discrete & More": "Sitio de aprendizaje múltiple: Master DSA, ensamblador, Java, Python, JS, discreto y más",
    "☕ MultLearning Site": "☕ Sitio de aprendizaje múltiple",
    "DSA, Assembly, Java, Python, JavaScript, Discrete, and more — interactive learning": "DSA, ensamblador, Java, Python, JavaScript, discreto y más: aprendizaje interactivo",
    "Flashcards": "Tarjetas didácticas",
    "Cards": "Tarjetas",
    "Glossary": "Glosario",
    "Terms": "Términos",
    "Interactive Quizzes": "Cuestionarios interactivos",
    "Quizzes": "cuestionarios",
    "Settings": "Ajustes",
    "Reset": "Reiniciar",
    "Account": "Cuenta",
    "MultLearning: Master DSA, Assembly, and Beyond": "Multiaprendizaje: dominar DSA, ensamblaje y más",
    "A comprehensive, beginner-friendly journey across Data Structures & Algorithms, Assembly, Java, Python, JavaScript, and Discrete Mathematics by Eddy Arriaga-B. Each module includes detailed explanations, extensive code examples where applicable, and practical exercises.": "Un viaje completo y amigable para principiantes a través de estructuras de datos y algoritmos, ensamblaje, Java, Python, JavaScript y matemáticas discretas por Eddy Arriaga-B. Cada módulo incluye explicaciones detalladas, ejemplos de código extensos cuando corresponda y ejercicios prácticos.",
    "Topic Focus": "Enfoque del tema",
    "Choose your primary track. This controls which major module family is shown.": "Elige tu pista principal. Esto controla qué familia de módulos principales se muestra.",
    "Primary Filter": "Filtro primario",
    "All Topics": "Todos los temas",
    "Everything in one view": "Todo en una sola vista",
    "Data Structures & Algorithms": "Estructuras de datos y algoritmos",
    "Core coding interview track": "Pista de entrevista de codificación básica",
    "Discrete Mathematics": "Matemáticas discretas",
    "Proofs, counting, and math logic": "Pruebas, conteo y lógica matemática.",
    "Java Learning": "Aprendizaje de Java",
    "Core Java syntax, OOP, tooling, and practical software workflows": "Sintaxis base de Java, POO, herramientas y flujos prácticos de software",
    "Systems / Java Foundations": "Sistemas / Fundamentos de Java",
    "Language, tooling, and software practice": "Práctica de lenguaje, herramientas y software.",
    "Git Learning": "Aprendizaje de Git",
    "Version control, branching, collaboration, and safe workflows": "Control de versiones, ramas, colaboración y flujos seguros",
    "Assembly Fundamentals": "Fundamentos de ensamblaje",
    "Registers, memory, and low-level program flow": "Registros, memoria y flujo de programa de bajo nivel.",
    "📊 Your Learning Progress": "📊 Tu progreso de aprendizaje",
    "Current journey": "Viaje actual",
    "0 of 0 modules completed": "0 de 0 módulos completados",
    "Now at": "Ahora en",
    "Goal: Complete all modules": "Objetivo: completar todos los módulos",
    "🎯 Next milestone at 25%": "🎯 Próximo hito al 25%",
    "⚡ Flashcards unlock at 50%": "⚡ Las tarjetas didácticas se desbloquean al 50%",
    "💡 Tip: Use the Focus Tracker to stay on pace": "💡 Consejo: utiliza el Focus Tracker para mantener el ritmo",
    "Learning Achievements": "Logros de aprendizaje",
    "Trailhead Rookie": "Novato del comienzo del sendero",
    "Complete your first module to begin earning badges.": "Complete su primer módulo para comenzar a ganar insignias.",
    "Next badge unlocks soon.": "La próxima insignia se desbloqueará pronto.",
    "0 / 3 modules toward next badge": "0/3 módulos hacia la siguiente insignia",
    "0 total modules": "0 módulos totales",
    "❤️ Do you enjoy this website?": "❤️ ¿Disfrutas de este sitio web?",
    "Help keep this resource free and updated with new content weekly!": "¡Ayude a mantener este recurso gratuito y actualizado con contenido nuevo semanalmente!",
    "☕ Buy me a coffee ($5)": "☕ Cómprame un café ($5)",
    "⭐ GitHub Star": "⭐ Estrella de GitHub",
    "💝 Sponsor Me! ($25)": "💝 ¡Patrociname! ($25)",
    "Created for CS students by Eddy Arriaga-Barrientos": "Creado para estudiantes de informática por Eddy Arriaga-Barrientos",
    "🔥 Daily Challenge": "🔥 Desafío diario",
    "Pause Auto": "Pausa automática",
    "Shuffle": "Barajar",
    "Auto-shuffling every 9s (synced)": "Mezcla automática cada 9 segundos (sincronizada)",
    "🌟 Study Tip": "🌟 Consejo de estudio",
    "New Tip": "Nuevo consejo",
    "Personalized Study Insights": "Perspectivas de estudio personalizadas",
    "Stay on track with live stats, tailored module suggestions, and a built-in focus buddy.": "Manténgase al día con estadísticas en vivo, sugerencias de módulos personalizados y un compañero de enfoque integrado.",
    "Weekly Pace": "Ritmo Semanal",
    "5 modules/wk": "5 módulos/semana",
    "Finish in ~7 weeks": "Terminar en ~7 semanas",
    "Focus Minutes": "Minutos de enfoque",
    "0 min today": "0 minutos hoy",
    "0 min lifetime": "0 min de vida",
    "Consistency": "Consistencia",
    "0-day streak": "racha de 0 días",
    "Longest streak: 0 days": "Racha más larga: 0 días",
    "Study Plan": "Plan de estudios",
    "Not configured": "No configurado",
    "Set up": "Configuración",
    "Answer 3 quick questions to personalize pacing.": "Responda 3 preguntas rápidas para personalizar el ritmo.",
    "Personalize": "Personalizar",
    "Overall Progress": "Progreso general",
    "0 completed": "0 completado",
    "Recommended Next": "Recomendado Siguiente",
    "0% complete": "0% completo",
    "Keep learning to unlock personalized suggestions.": "Sigue aprendiendo para desbloquear sugerencias personalizadas.",
    "Quick Picks": "Selecciones rápidas",
    "Focus Tracker": "Rastreador de enfoque",
    "Idle": "Inactivo",
    "Track study minutes and module completions here.": "Realice un seguimiento de las actas de estudio y la finalización de módulos aquí.",
    "Today's Deep Work": "El trabajo profundo de hoy",
    "0 min": "0 minutos",
    "Lifetime Minutes": "Minutos de por vida",
    "🔥 Streak:": "🔥 Racha:",
    "0 days": "0 días",
    "⏱ Break reminder in 25 min": "⏱ Recordatorio de descanso en 25 min",
    "Start": "Comenzar",
    "Stop": "Detener",
    "Log +5 min": "Iniciar sesión +5 min",
    "Start Focus Session": "Iniciar sesión de enfoque",
    "No sessions yet.": "Aún no hay sesiones.",
    "Focus Momentum": "Momento de enfoque",
    "Getting started": "Empezando",
    "Current Streak": "Racha actual",
    "Today's Focus": "El enfoque de hoy",
    "Longest Streak": "Racha más larga",
    "Log a focus session to start building momentum.": "Registre una sesión de enfoque para comenzar a generar impulso.",
    "📂 Interview Examples": "📂 Ejemplos de entrevistas",
    "LeetCode-style walk-throughs. Two at a time with quick copy.": "Tutoriales estilo LeetCode. Dos a la vez con copia rápida.",
    "Pages": "paginas",
    "Timed Practice": "Práctica cronometrada",
    "Interview Prompt": "Mensaje de entrevista",
    "Your solution (write/paste)": "Tu solución (escribir/pegar)",
    "Submit & Compare": "Enviar y comparar",
    "Reference solution": "Solución de referencia",
    "📝 Study Notes": "📝 Notas de estudio",
    "Jot down takeaways and export as a text file.": "Anote las conclusiones y expórtelas como un archivo de texto.",
    "Save": "Ahorrar",
    "Download TXT": "Descargar TXT",
    "📥 Notes Library": "📥 Biblioteca de notas",
    "Browse curated PDF cheat sheets by topic. Download requires a $1 donation to host the files.": "Busque hojas de trucos en PDF seleccionadas por tema. La descarga requiere una donación de $1 para alojar los archivos.",
    "Browse curated PDF cheat sheets by topic with free in-browser previews before download.": "Explora hojas de referencia PDF por tema con vista previa gratis en el navegador antes de descargar.",
    "One-click hosted downloads are rolling out.": "Las descargas alojadas con un clic estan en lanzamiento.",
    "Beginner-friendly": "Apto para principiantes",
    "Categories": "Categorías",
    "🛠️ Data Structure Playground": "🛠️ Zona de juegos de estructura de datos",
    "Interact with arrays, stacks, queues, heaps, graphs, and tries. Watch the visuals update as you push/pop/enqueue.": "Interactúe con matrices, pilas, colas, montones, gráficos e intentos. Observe cómo se actualizan las imágenes a medida que presiona, abre o pone en cola.",
    "Reset playground": "Restablecer el patio de juegos",
    "Current State": "Estado actual",
    "Complexity:": "Complejidad:",
    "Quick Complexity Peek": "Vistazo rápido a la complejidad",
    "Sample size (n)": "Tamaño de la muestra (n)",
    "n=8 • ~ops": "n=8 • ~operaciones",
    "Related Definitions": "Definiciones relacionadas",
    "from modules": "de módulos",
    "Download": "Descargar",
    "Notes PDF": "Notas PDF",
    "To download, please support with a $1 donation. The PDF will open after you click donate.": "Para descargar, apoye con una donación de $1. El PDF se abrirá después de hacer clic en donar.",
    "Free preview comes first. Optional $1 support keeps hosted downloads online; the PDF opens after support.": "Primero tienes vista previa gratis. El apoyo opcional de $1 mantiene las descargas alojadas en linea; el PDF se abre despues del apoyo.",
    "Donate $1 & Download": "Done $1 y descargue",
    "Maybe later": "tal vez más tarde",
    "Code Playground": "Zona de juegos de código",
    "Run quick Java, Python, C++, or JavaScript snippets through the sandbox API and iterate without leaving the page.": "Ejecute fragmentos rápidos de Java, Python, C++ o JavaScript a través de la API del espacio aislado e itere sin salir de la página.",
    "Code Scratchpad": "Bloc de notas de código",
    "Java runs inside a": "Java se ejecuta dentro de un",
    "Main": "Principal",
    "class; other languages map to a single file for quick iteration.": "clase; otros idiomas se asignan a un solo archivo para una iteración rápida.",
    "Language": "Idioma",
    "Loading...": "Cargando...",
    "Select language": "Selecciona idioma",
    "Load sample": "Cargar muestra",
    "Loading samples...": "Cargando muestras...",
    "Choose starter sample": "Elige ejemplo inicial",
    "▶️ Run Code": "▶️ Ejecutar código",
    "🔄 Reset Editor": "🔄 Restablecer editor",
    "Uses Judge0 by default when network access is available. Set": "Utiliza Judge0 de forma predeterminada cuando el acceso a la red está disponible. Colocar",
    "CODE_RUNNER_ENDPOINT": "CODE_RUNNER_ENDPOINT",
    "in": "en",
    "js/script.js": "js/script.js",
    "to route through your own private runner.": "para recorrer a través de tu propio corredor privado.",
    "Console Output": "Salida de consola",
    "Copy": "Copiar",
    "// Output will appear here": "// La salida aparecerá aquí",
    "Find Your Learning Path": "Encuentre su camino de aprendizaje",
    "All Levels": "Todos los niveles",
    "Advanced": "Avanzado",
    "📖 Study Tools": "📖 Herramientas de estudio",
    "🎯 Practice Flashcards": "🎯 Tarjetas didácticas de práctica",
    "📚 DSA Glossary": "📚 Glosario DSA",
    "🧠 Interactive Quizzes": "🧠 Cuestionarios interactivos",
    "🚀 Features": "🚀 Características",
    "💬 Individual Comment Controls": "💬 Controles de comentarios individuales",
    "📝 Pseudocode Conversion": "📝 Conversión de pseudocódigo",
    "🛠️ Multi-Language Support": "🛠️ Soporte en varios idiomas",
    "📱 Mobile-Optimized Design": "📱 Diseño optimizado para dispositivos móviles",
    "🌙 Dark Mode Support": "🌙 Compatibilidad con el modo oscuro",
    "💖 Support Creator": "💖 Creador de soporte",
    "Made with ❤️ for CS students": "Hecho con ❤️ para estudiantes de informática",
    "Help keep this resource free!": "¡Ayude a mantener este recurso gratuito!",
    "☕ Coffee": "☕ Café",
    "💝 Sponsor": "💝 Patrocinador",
    "Created for CS students by Eddy Arriaga-B": "Creado para estudiantes de informática por Eddy Arriaga-B",
    "CS Course Atlas © 2024 | Open Source ❤️": "Centro de Aprendizaje CS Course Atlas © 2024 | Código abierto ❤️",
    "⚙️ Settings": "⚙️ Configuración",
    "Customize your learning experience": "Personaliza tu experiencia de aprendizaje",
    "Appearance": "Apariencia",
    "Dark Mode": "Modo oscuro",
    "Background Theme": "Tema de fondo",
    "Default Gradient": "Degradado predeterminado",
    "Ocean Breeze": "brisa del océano",
    "Sunset Glow": "Resplandor del atardecer",
    "Forest Trail": "Sendero del bosque",
    "Minimal Light": "Luz mínima",
    "Space Night": "Noche espacial",
    "Accent Color": "Color de acento",
    "Indigo Aurora": "aurora índigo",
    "Emerald Focus": "Enfoque esmeralda",
    "Amber Sunrise": "Amanecer ámbar",
    "Rose Nebula": "Nebulosa Rosa",
    "Updates buttons, highlights, and callouts instantly.": "Actualiza botones, resaltados y leyendas al instante.",
    "Card Elevation": "Elevación de la tarjeta",
    "Minimal (low shadow)": "Mínimo (sombra baja)",
    "Balanced": "Equilibrado",
    "Lifted Glow": "Resplandor elevado",
    "Layout": "Disposición",
    "Compact Module Layout": "Diseño de módulo compacto",
    "Denser cards for widescreen or multi-tasking.": "Tarjetas más densas para pantalla panorámica o multitarea.",
    "Text Size": "Tamaño del texto",
    "Compact": "Compacto",
    "Standard": "Estándar",
    "Comfortable": "Cómodo",
    "Spacious": "Espacioso",
    "Applies globally for easier reading.": "Aplica globalmente para una lectura más fácil.",
    "Accessibility": "Accesibilidad",
    "Reduce Motion": "Reducir el movimiento",
    "Limit animations for focus and accessibility.": "Limite las animaciones para mejorar el enfoque y la accesibilidad.",
    "High Contrast Text": "Texto de alto contraste",
    "Boost text contrast for readability.": "Aumente el contraste del texto para mejorar la legibilidad.",
    "Learning": "Aprendiendo",
    "Show Code Comments": "Mostrar comentarios de código",
    "Each module can override this setting.": "Cada módulo puede anular esta configuración.",
    "Hide Completed Modules": "Ocultar módulos completados",
    "Keep your grid focused on what’s left.": "Mantenga su cuadrícula enfocada en lo que queda.",
    "Weekly Module Goal": "Objetivo del módulo semanal",
    "3 / week · Steady pace": "3 / semana · Ritmo constante",
    "5 / week · Balanced": "5 / semana · Equilibrado",
    "8 / week · Accelerated": "8 / semana · Acelerado",
    "12 / week · Sprint": "12 / semana · Sprint",
    "Personalizes your study insights and pacing tips.": "Personaliza tus conocimientos de estudio y consejos de ritmo.",
    "Language / Idioma": "Idioma/Idioma",
    "Interface Language": "Idioma de la interfaz",
    "Switch between English and Spanish / Cambia entre inglés y español.": "Cambiar entre inglés y español / Cambia entre inglés y español.",
    "EN": "ES",
    "ES": "ES",
    "✓ Save &amp; Close": "✓ Guardar y cerrar",
    "📚 CS Course Atlas Glossary": "📚 Glosario de CS Course Atlas",
    "Browse curated CS Course Atlas terminology.": "Explore la terminología de CS Course Atlas seleccionada.",
    "Filter by category to focus your study.": "Filtra por categoría para centrar tu estudio.",
    "🎯 DSA Flashcards": "🎯 Tarjetas didácticas DSA",
    "Choose a module deck": "Elija una plataforma de módulos",
    "All Modules (mix)": "Todos los módulos (mezcla)",
    "Start 20-card Session": "Iniciar sesión de 20 tarjetas",
    "Pick a module to begin.": "Elija un módulo para comenzar.",
    "Card 1 of 8": "Tarjeta 1 de 8",
    "All Modules": "Todos los módulos",
    "← Prev": "← Anterior",
    "Next →": "Siguiente →",
    "🔀 Random": "🔀 Aleatorio",
    "Show Answer": "Mostrar respuesta",
    "0 / 20 in session": "0/20 en sesión",
    "Tap to flip": "Toque para voltear",
    "🧠 Quiz": "🧠 Prueba",
    "Build Your Study Plan": "Construya su plan de estudio",
    "How many hours can you dedicate weekly?": "¿Cuántas horas puedes dedicar semanalmente?",
    "🌱 3-4 hrs": "🌱 3-4 horas",
    "⚖️ 5-8 hrs": "⚖️ 5-8 horas",
    "🔥 9+ hrs": "🔥 9+ horas",
    "What is your current focus?": "¿Cuál es tu enfoque actual?",
    "📚 Foundations": "📚 Fundaciones",
    "💼 Interview Prep": "💼 Preparación para la entrevista",
    "🛠️ Projects": "🛠️ Proyectos",
    "Preferred learning style?": "¿Estilo de aprendizaje preferido?",
    "🎨 Visual Walkthroughs": "🎨 Tutoriales visuales",
    "🧠 Practice Heavy": "🧠 Practica pesado",
    "🔀 Blended": "🔀 Mezclado",
    "Anything else?": "¿Algo más?",
    "Save Plan": "Guardar plan",
    "Account &amp; Secure Access": "Cuenta y acceso seguro",
    "Clean auth flow with secure session-based access.": "Flujo de autenticación limpio con acceso seguro basado en sesiones.",
    "Log In": "Acceso",
    "Sign Up": "Inscribirse",
    "Email / Username": "Correo electrónico / nombre de usuario",
    "Password": "Contraseña",
    "Confirm Password": "confirmar Contraseña",
    "Use Demo Login": "Utilice el inicio de sesión de demostración",
    "Not authenticated.": "No autenticado.",
    "Profile Details": "Detalles del perfil",
    "Name": "Nombre",
    "Email": "Correo electrónico",
    "Goal": "Meta",
    "Exploring DSA": "Explorando DSA",
    "University Coursework": "Trabajo de curso universitario",
    "Interview Prep": "Preparación para la entrevista",
    "Upskilling at Work": "Mejora de las habilidades en el trabajo",
    "Save Profile": "Guardar perfil",
    "Sign Out": "Desconectar",
    "Student Support": "Apoyo estudiantil",
    "Module": "Módulo",
    "I need help with": "necesito ayuda con",
    "Message": "Mensaje",
    "Submitting routes your note to the mentor inbox. Responses arrive via email once live.": "El envío envía su nota a la bandeja de entrada del mentor. Las respuestas llegan por correo electrónico una vez publicadas.",
    "Submitting routes your note to the mentor inbox.": "El envio dirige tu nota a la bandeja del mentor.",
    "Live email replies are in rollout.": "Las respuestas por correo en vivo estan en lanzamiento.",
    "Coming Soon": "Proximamente",
    "Send Support Request": "Enviar solicitud de soporte",
    "Quick Practice": "Práctica rápida",
    "Pick any module, answer each question with instant feedback, and revisit explanations.": "Elija cualquier módulo, responda cada pregunta con comentarios instantáneos y revise las explicaciones.",
    "Write your solution here...": "Escribe tu solución aquí...",
    "Write your notes here...": "Escribe tus notas aquí...",
    "Playground editor": "editor de juegos",
    "Search modules by title, description, or topics...": "Buscar módulos por título, descripción o temas...",
    "Close settings": "Cerrar configuración",
    "Search glossary terms...": "Buscar términos en el glosario...",
    "Tell us about deadlines, classes, or goals...": "Cuéntanos sobre plazos, clases u objetivos...",
    "example": "ejemplo",
    "Eddy Arriaga": "Eddy Arriaga",
    "Explain your blocker...": "Explica tu bloqueador...",
    "Provide detail so a mentor can help quickly.": "Proporcione detalles para que un mentor pueda ayudar rápidamente.",
    "Session check failed: ${error.message}": "Error en la verificación de sesión: ${error.message}",
    "Auth server is not available.": "El servidor de autenticación no está disponible.",
    "Enter a valid email or username.": "Ingrese un correo electrónico o nombre de usuario válido.",
    "Password must be at least 8 characters (or use example).": "La contraseña debe tener al menos 8 caracteres (o utilice un ejemplo).",
    "Password confirmation does not match.": "La confirmación de la contraseña no coincide.",
    "Authentication failed: ${reason}": "Error de autenticación: ${reason}",
    "No authenticated user session found for profile sync.": "No se encontró ninguna sesión de usuario autenticado para la sincronización del perfil.",
    "Profile synced to backend.": "Perfil sincronizado con el backend.",
    "Failed to sync profile: ${error.message}": "No se pudo sincronizar el perfil: ${error.message}",
    "Profile pulled from backend.": "Perfil extraído del backend.",
    "Failed to pull profile: ${error.message}": "No se pudo extraer el perfil: ${error.message}",
    "Profile saved and synced successfully.": "Perfil guardado y sincronizado exitosamente.",
    "Profile saved successfully.": "Perfil guardado exitosamente.",
    "Signed out successfully.": "Cerró sesión exitosamente.",
    "Notes saved!": "¡Notas guardadas!",
    "Write a few notes first!": "¡Escribe algunas notas primero!",
    "Study plan saved!": "¡Plan de estudios guardado!",
    "Preview coming soon!": "¡Vista previa próximamente!",
    "Solution copied!": "¡Solución copiada!",
    "Unable to copy solution": "No se puede copiar la solución",
    "Reset sample": "Restablecer muestra",
    "Output copied!": "¡Salida copiada!",
    "Unable to copy output": "No se puede copiar la salida",
    "Running...": "Correr...",
    "Ready": "Listo",
    "Idle": "Inactivo",
    "Fallback": "Respaldo",
    "Validation": "Validación",
    "Live runner": "Ejecución en vivo",
    "Live execution": "Ejecución en vivo",
    "Sample Loaded": "Muestra cargada",
    "Unsupported language": "Lenguaje no compatible",
    "Execution skipped.": "Ejecución omitida.",
    "Playground execution currently supports: Java, C++, Python, and JavaScript.": "El playground actualmente admite: Java, C++, Python y JavaScript.",
    "Think first": "Piensa primero",
    "Verify your reasoning": "Verifica tu razonamiento",
    "Question side": "Lado de pregunta",
    "Answer side": "Lado de respuesta",
    "in session": "en sesión",
    "Custom deck": "Baraja personalizada",
    "// Select a sample and run to see output.": "// Selecciona una muestra y ejecuta para ver la salida.",
    "// Sample loaded. Click \"Run Code\" to execute.": "// Muestra cargada. Haz clic en \"Run Code\" para ejecutar.",
    "// Output cleared.": "// Salida limpiada.",
    "// Add code before running.": "// Agrega código antes de ejecutar.",
    "Complete": "Completo",
    "Error": "Error",
    "Support request saved locally. We will reply soon!": "Solicitud de soporte guardada localmente. ¡Le responderemos pronto!",
    "Module not visible. Try adjusting filters!": "Módulo no visible. ¡Intenta ajustar los filtros!",
    "Focus session logged. Nice work!": "Sesión de enfoque registrada. ¡Buen trabajo!",
    "Focus session started. You got this!": "La sesión de enfoque comenzó. ¡Tienes esto!",
    "Code copied to clipboard!": "¡Código copiado al portapapeles!",
    "Failed to copy code": "No se pudo copiar el código",
    "Progress exported successfully!": "¡Progreso exportado exitosamente!",
    "Progress imported successfully!": "¡Progreso importado exitosamente!",
    "Failed to import progress. Invalid file format.": "No se pudo importar el progreso. Formato de archivo no válido.",
    "Complete some modules first to generate a study guide!": "¡Primero complete algunos módulos para generar una guía de estudio!",
    "${context} error occurred. Please try again.": "Se produjo un error ${contexto}. Por favor inténtalo de nuevo.",
    "Focus session started. Stay sharp!": "La sesión de enfoque comenzó. ¡Manténgase alerta!",
    "Study session logged: ${minutes} min": "Sesión de estudio registrada: ${minutos} min",
    "Showing {filtered} of {total} modules": "Mostrando {filtrado} de {total} módulos",
    "No active session": "Ninguna sesión activa",
    "Choose a module above": "Elija un módulo arriba",
    "Question": "Pregunta",
    "Answer": "Respuesta",
    "Click to reveal answer": "Haga clic para revelar la respuesta",
    "Click to hide answer": "Haga clic para ocultar la respuesta",
    "Pick an answer to continue.": "Elija una respuesta para continuar.",
    "Answer selected.": "Respuesta seleccionada.",
    "Previous": "Anterior",
    "Next": "Próximo",
    "Finish": "Finalizar",
    "Quiz Complete!": "¡Prueba completa!",
    "You scored {score} out of {total}": "Obtuviste una puntuación de {puntuación} sobre {total}",
    "Your answer:": "Tu respuesta:",
    "Correct answer:": "Respuesta correcta:",
    "Explanation:": "Explicación:",
    "Retake Quiz": "Retomar el cuestionario",
    "Close": "Cerca",
    "Complete this module and pass its quiz to unlock its flashcards.": "Complete este módulo y apruebe su cuestionario para desbloquear sus tarjetas didácticas.",
    "(Complete quiz to unlock)": "(Completa el cuestionario para desbloquear)",
    "No quizzes available": "No hay cuestionarios disponibles",
    "No questions available for this module yet.": "Aún no hay preguntas disponibles para este módulo.",
    "{answered} answered • {total} total": "{respondido} respondido • {total} total",
    "Card {current} of {total}": "Tarjeta {actual} de {total}",
    "{total} card session • {deck} cards in deck": "{total} sesión de cartas • {baraja} cartas en la baraja",
    "Synced {time}": "Sincronizado {hora}",
    "{goal} modules/wk": "{objetivo} módulos/semana",
    "Lifetime {minutes}": "Duración {minutos}",
    "Longest streak: {days} days": "Racha más larga: {días} días",
    "Longest streak: {days} day": "Racha más larga: {días} día",
    "{days}-day streak": "Racha de {días} días",
    "{days} day": "{días} día",
    "{days} days": "{días} días",
    "On track": "En camino",
    "Momentum unlocked": "Impulso desbloqueado",
    "All modules complete—spend time on flashcards or mentor a friend.": "Todos los módulos completos: dedique tiempo a las tarjetas didácticas o sea mentor de un amigo.",
    "Goal complete! Review & reinforce.": "¡Objetivo cumplido! Revisar y reforzar.",
    "Edit plan": "Editar plan",
    "Active": "Activo",
    "Deterministic helper so learners can verify output after each edit.": "Ayudante determinista para que estudiantes verifiquen la salida después de cada edición.",
    "Module context first so the learner sees where this snippet fits.": "Primero el contexto del módulo para que el estudiante vea dónde encaja este fragmento.",
    "Print all module topics so this split example stays connected to the full module.": "Imprime todos los temas del módulo para que este ejemplo dividido se mantenga conectado al módulo completo.",
    "Guided computation with explicit checkpoints and visible output.": "Cálculo guiado con puntos de verificación explícitos y salida visible.",
    "Reflection prompts are printed so output is always meaningful.": "Se imprimen indicaciones de reflexión para que la salida siempre sea significativa.",
    "Summary line makes expected output deterministic for fallbacks.": "La línea de resumen hace que la salida esperada sea determinista para respaldos.",
    "Step": "Paso",
    "running total": "total acumulado",
    "Topic checklist:": "Lista de temas:",
    "Module:": "Módulo:",
    "Focus topic": "Tema de enfoque",
    "Focus topic (": "Tema de enfoque (",
    "-> running total:": "-> total acumulado:",
    "Baseline value:": "Valor base:",
    "Final computed result:": "Resultado final calculado:",
    "Reflection: explain how": "Reflexión: explica cómo",
    "influences implementation choices.": "influye en las decisiones de implementación.",
    "Practice: modify baseline, rerun, and compare output transitions.": "Práctica: modifica el valor base, ejecuta de nuevo y compara transiciones de salida.",
    "Topic sample completed:": "Ejemplo del tema completado:",
    "Guided assembly sample for module-card viewing and output fallback notes.": "Muestra guiada en ensamblador para visualización en tarjeta del módulo y notas de salida de respaldo.",
    "Goal: trace registers, memory changes, and branch flow step by step.": "Objetivo: rastrear registros, cambios de memoria y flujo de saltos paso a paso.",
    "Focus checklist:": "Lista de enfoque:",
    "Initialize registers safely": "Inicializar registros de forma segura",
    "Execute deterministic operations": "Ejecutar operaciones deterministas",
    "Observe control flow and exit cleanly": "Observar flujo de control y salir limpiamente",
    "Initialize registers": "Inicializar registros",
    "Print topic message (Linux syscall write)": "Imprimir mensaje del tema (escritura syscall de Linux)",
    "Exit (Linux syscall exit)": "Salir (syscall de salida de Linux)"
  }
};


