# Desarrollo De Sistemas Informáticos
## Practica 09. Aplicación de procesamiento de notas de texto
## Jonay Estévez Díaz
  
## 1) Introducción  
  
Para el desarrollo de esta practica se han usado las mismas herramientas que en prácticas anteriores, pero han añadido tres más. La primera es **chalk**, que permite colorear de distintos colores y modos los textos que se imprimen por pantalla. La segunda es **yargs** que permite ayudar a crear herramientas de línea de comandos interactivas mediante el análisis de argumentos. Por último, hemos usado la **API síncrona** que nos otorga **Node.js**.  
  
Se han desarrollado tres ficheros, una clase para la descripción de una nota de texto, otra clase para gestionar las operaciones que se pueden realizar con las mismas y por último un fichero que describe los comandos para usar la aplicacion por terminal.  

## 2) Código Desarrollado
  
### 2.1) Clase Notes 
  
Para su diseño, se optó por tres atributos, título de la nota, texto y el color de la misma, todos ellos strings. Es por ello que se dispondrá de métodos **get** y **set**. Un ejemplo del diseño de éstos métodos es el siguiente:  

```typescript
getTitle(): string {
  return this.title;
}

setTitle(new_title: string): void {
  this.title = new_title;
}
```

Luego se diseñó un método para imprimir por pantalla los títulos de las notas formateado con el color especificado con la creacion del objeto de tipo **Notes**. Su funcionamiento se basa en 4 posibles ramas, que el texto tenga que ser amarillo, azul, verde y rojo. Éste último se usa para colores que son rojos o sean algun color que no esté dentro de los cuatro ya mencionados. Es por ello que se utilizó la estructura de un `switch`. Para que cada opcion tenga su color correspondiente. El método se diseño de la siguiente manera:  
  
```typescript
printHead(): void {
  switch (this.color) {
    case ('amarillo'||'Amarillo'):
      console.log(chalk.yellow(this.title));
      break;

    case ('azul'||'Azul'):
      console.log(chalk.blue(this.title));
      break;

    case ('verde'||'Verde'):
      console.log(chalk.green(this.title));
      break;

    default: 
      console.log(chalk.red(this.title));
      break;
  }
}
```
  
Para finalizar se hizo una función de nombre `printText()` que es homologo de la funcion antes descrita, pero teniendo en cuenta el atributo `this.text`.  

```typescript
printText(): void {
  switch (this.color) {
    case ('amarillo'||'Amarillo'):
      console.log(chalk.yellow(this.text));
      break;

    case ('azul'||'Azul'):
      console.log(chalk.blue(this.text));
      break;

    case ('verde'||'Verde'):
      console.log(chalk.green(this.text));
      break;

    default: 
      console.log(chalk.red(this.text));
      break;
  }
}
```
  
Para más consultas sobre el código de la practica, se podrá consultar el fichero entero en sl siguiente [link](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101100586/blob/main/src/Text_Notes/classes/notes.ts).  
  
### 2.2) Clase Gestor
  
Una vez se termino la clase **Notes** se diseñó una clase que permite gestionar y realizar operaciones con las notas, y dicha clase es **Gestor**.  
  
Ésta presenta tres atributos, `path`, `slah` y `ext`, los cuales son strings y almacenan siempre la siguientes cadenas:  

```typescript
private path: string;
private slash: string;
private ext: string;

constructor() { 
  this.path = 'database/';
  this.slash = '/';
  this.ext = '.json';
}
```

Luego se diseñaron los métodos `add`, `modify`, `remove`, `listHeads` y `read`, los cuales hacen uso de la API sincrona, concretamente, usamos las siguientes funciones:  
 - existsSync
 - writeFileSync
 - readdirSync
 - readFileSync
 - rmSync
 - mkdirSync
  
Con ellas nos permitimos desarrollar los métodos antes mencionados, comprobando que existe la ruta del archivo que queremos leer, excribir, modificar y remover.  
  
Un ejemplo de lo que se ha comentado es la siguiente función:  
  
```typescript
add(note: Notes, user: string) {
  if(fs.existsSync(this.path + user)) {
    if(fs.existsSync(this.path + user + this.slash + note.getTitle() + this.ext)) {
      console.log(chalk.red.inverse('ERROR: The Note Already Exits'));
    } else {
      const note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
      const aux_note_data = JSON.stringify(note_data);
      fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
      console.log(chalk.green.inverse('The Note Has Been Created Successfully'));
    }
  } else {
    fs.mkdirSync(this.path + user);
    const note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
    const aux_note_data = JSON.stringify(note_data);
    fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
    console.log(chalk.green.inverse('The Note Has Been Created Successfully'));
  }
}
```
  
Para más consultas sobre el código de la practica, se podrá consultar el fichero entero en sl siguiente [link](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101100586/blob/main/src/Text_Notes/classes/gestor.ts)
  
### 2.3) Comandos APP  
  
Para finalizar, se debe crear los comandos, para ello se utiliza la herramienta `yargs`, para describir los argumantos que tendrá a la hora de ejecutar el programa. Se crearon tantos comandos como metodos de la clase **Gestor**, para llamarlos directamente en cada comando, es por ello que cada comando tendrá como argumantos tanta informacion como necesite el método, para poder ejecutarse. Un ejemplo de comando es `add`

```typescript
yargs.command({
  command: 'add',
  describe: 'New note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title',
      demandOption: true,
      type: 'string',
    },
    text: {
      describe: 'Text',
      demandOption: true,
      type: 'string'
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' 
       && typeof argv.text === 'string' && typeof argv.color === 'string') {
      const note = new Notes(argv.title, argv.text, argv.color);
      const gestor = new Gestor();
      gestor.add(note, argv.user);
    }
  },
});
```
  
Para más consultas sobre el código de la practica, se podrá consultar el fichero entero en sl siguiente [link](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101100586/blob/main/src/Text_Notes/funcionality/app.ts)
  
