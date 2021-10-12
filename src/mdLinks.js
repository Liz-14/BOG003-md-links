/* ------------------------------------------------------------------------------------
  *fs --> modulo file system permite operaciones de acceso al sistema de archivos
          que se tienen en local
  *path --> permite trabajar con rutas de ficheros
  *process --> Permite trabajar con los argumentos que se pasan por la linea de comandos
----------------------------------------------------------------------------------------
  *Fetch --> modulo que me permite hacer las peticiones HTTP
    **response.ok => devuelve true o false; true para codigos de error entre 200-299
    **response.status => número del código de error
    **response.statusText => nombre asociado al código de error
------------------------------------------------------------------------------------- */

const fs = require('fs')
const mdFuncs = require('./mdlFunctions')

const arrayLinksStats = (path) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      const absolutePath = mdFuncs.absolutFile(path)
      const stats = fs.statSync(absolutePath)

      if (stats.isDirectory()) {
        const arrayFiles = mdFuncs.findeFile(absolutePath)
        const urlEtractor = mdFuncs.filesUrls(arrayFiles)
        resolve(urlEtractor)
      } else {
        const urlEtractor = mdFuncs.filesUrls(absolutePath)
        resolve(urlEtractor)
      }
    } else if (path === undefined || path === '') {
      const error = 'No se ingreso ninguna ruta'
      reject(error)
    } else {
      const error = 'La ruta ingresada no existe'
      reject(error)
    }
  })
}

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    if (option === undefined || option === 'show') {
      arrayLinksStats(path)
        .then(res => resolve(res))
        .catch(error => reject(error))
    } else if (option === 'validate') {
      arrayLinksStats(path)
        .then(resolve => {
          return mdFuncs.filesUrlsVerify(resolve)
        })
        .then(linkStats => resolve(linkStats))
        .catch(error => reject(error))
    } else if (option === 'stats') {
      arrayLinksStats(path)
        .then(res => {
          return mdFuncs.filesUrlsVerify(res)
        })
        .then(linkStats => {
          const statisticsLinks = {
            Total: mdFuncs.statistics(linkStats).totalLinks,
            Unique: mdFuncs.statistics(linkStats).unique
          }
          resolve(statisticsLinks)
        })
        .catch(error => reject(error))
    } else if (option === 'validate-stats') {
      arrayLinksStats(path)
        .then(res => {
          return mdFuncs.filesUrlsVerify(res)
        })
        .then(linkStats => {
          const statisticsLinks = {
            Total: mdFuncs.statistics(linkStats).totalLinks,
            Unique: mdFuncs.statistics(linkStats).unique,
            Broken: mdFuncs.statistics(linkStats).brokenLinks
          }
          resolve(statisticsLinks)
        })
        .catch(error => reject(error))
    } else if (option === 'help') {
      console.log(`
      -----------------------------------------HELP-----------------------------------------
      | show           | * Muestra lista de objetos de cada link: href, title y file       |
      | validate       | * Muestra lista de objetos de cada link href, title,              |
      |                |   file, status y OK/FAIL segun el caso                            |
      | stats          | * Muestra un objeto con las estadísticas de los links en totales  |
      |                |   y unicos                                                        |
      | validate-stats | * Realiza la validación y muestra un objeto con las estadística   |
      |                |   de los links                                                    |
      --------------------------------------------------------------------------------------
            `)
    } else {
      const error = 'opcion incorrecta'
      reject(error)
    }
  })
}

exports.mdLinks = mdLinks
// exports.arrayLinksStats = arrayLinksStats

// C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-data-lovers/README.md
// C:/Users/User/OneDrive/Escritorio/Laboratoria/Mds

// C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-md-links/.links/ñami/README6.md

// https://regex101.com/
