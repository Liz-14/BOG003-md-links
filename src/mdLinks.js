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
        .then(res => {
          const linksValidator = mdFuncs.filesUrlsVerify(res)
          linksValidator
            .then(resol => resolve(resol))
            .catch(err => resolve(err))
        })
        .catch(error => reject(error))
    } else if (option === 'stats') {
      arrayLinksStats(path)
        .then(res => {
          const linksValidator = mdFuncs.filesUrlsVerify(res)
          linksValidator
            .then(resol => {
              const validLinks = mdFuncs.statistics(resol).validLinks
              const totalLinks = resol.length
              const statisticsLinks = {
                Total: totalLinks,
                Valids: validLinks
              }
              resolve(statisticsLinks)
            })

            .catch(err => resolve(err))
        })
        .catch(error => reject(error))
    } else if (option === 'validate-stats') {
      arrayLinksStats(path)
        .then(res => {
          const linksValidator = mdFuncs.filesUrlsVerify(res)
          linksValidator
            .then(resol => {
              const validLinks = mdFuncs.statistics(resol).validLinks
              const brokenLinks = mdFuncs.statistics(resol).brokenLinks
              const totalLinks = resol.length
              const statisticsLinks = {
                Total: totalLinks,
                Valids: validLinks,
                Broken: brokenLinks
              }
              resolve(statisticsLinks)
            })
            .catch(err => resolve(err))
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

// C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-data-lovers/README.md
// C:/Users/User/OneDrive/Escritorio/Laboratoria/Mds

// https://regex101.com/
