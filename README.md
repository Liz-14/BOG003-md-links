# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen de la librería](#2-resumen-de-la-librería)
* [3. Documentación](#3-documentación)
* [4. Instalación](#4-instalación)
* [5. Ejecución](#5-ejecución)
* [6. Test](#6-test)
***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen de la librería

La siguiente librería te permite encontrar y extraer todos los enlaces dentro
de uno o varios archivos Markdown (.md) a la vez, además de analizarlos y
mostrarlos por consola, junto con características como: el texto que los
acompaña, la ruta donde se encuentran, si el enlace esta roto y su código de
error. Igualmente, permite navegar por medio de un menú y así ver las
estadísticas de los mismos, tales como: total de links encontrados, únicos y rotos.

## 3. Documentación

### Diagrama de flujo

![md-links](https://i.imgur.com/5wswlRs.jpg)

### Descripción
El proyecto consta de dos partes:
1. **API**: Se divide en dos partes:
    + **Síncrona**: Haciendo uso de módulos de Node.js como: file system, path, junto con sus métodos específicos para poder trabajar con archivos del sistema y sus correspondientes rutas. En esta parte se realizaron métodos que permiten resolver las rutas, encontrar los archivos .md de un directorio por medio de la recursividad, extraer los links de dichos archivos y retornar sus estadísticas.
    + **Asíncrona**: Se hizo uso del módulo Fetch para poder hacer las peticiones HTTP correspondientes y verificar así el estado de los links. Luego, también se hizo uso de promesas para el manejo de errores y la creación de la función mdLinks que hace el llamado de los métodos anteriores.

2. **CLI**: Se hizo uso del módulo inquirer para la entrada de argumentos, en este caso la ruta, y se realizó el menú que permite escoger al usuario entre diferentes opciones de visualización de los datos

## 4. Instalación

`npm i md-links-bylizdelrio`


## 5. Ejecución

Abrir una terminal y escribir: `mdLinks`

### Ejemplos
* Se ingresa la ruta que se desea analizar
![ejemplo1](https://i.imgur.com/45FDWd2.png)
* Luego se escoge entre las opciones del menú:
![ejemplo2](https://i.imgur.com/zDMYFM4.png)
* Resultado para opción **show**
![ejemplo3](https://i.imgur.com/tGD8g0U.png)
* Resultado para opción **validate**
![ejemplo4](https://i.imgur.com/NrbHSIk.png)
![ejemplo5](https://i.imgur.com/PZdGBlZ.png)
* Resultado para opción **validate-stats**
![ejemplo6](https://i.imgur.com/jI1gkrB.png)
* Resultado para opción **help**
![ejemplo7](https://i.imgur.com/MGI3uSP.png)

***

## 6. Test
![test](https://i.imgur.com/0AAApwV.png)
