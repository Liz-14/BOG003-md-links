const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const Functions = {

  // METODO QUE RESUELVE RUTA RELATIVA-ABSOLUTA
  absolutFile: (validPath) => path.isAbsolute(validPath) ? validPath : path.resolve(validPath),

  // FUNCION RECURSIVA PARA ENCONTRAR ARCHIVOS .md DE UN DIRECTORIO
  findeFile: function directory (initialPath) {
    // Array de los archivos encontrados en la ruta
    const listFiles = fs.readdirSync(initialPath)
    let mdFiles = []
    listFiles.forEach((el) => {
      // Union de la ruta incial con el archivo encontrado para crear la ruta absoluta
      const filePath = path.join(initialPath, el)
      // Stats de la ruta
      const stat = fs.statSync(filePath)
      // Validacion si la ruta es un directorio para recursion
      if (stat.isDirectory()) {
        mdFiles = mdFiles.concat(directory(filePath)) // Recusrsion
        // Obtencion en un array de rutas con archivos .md
      } else if (path.extname(filePath) === '.md') {
        mdFiles.push(filePath)
      }
    })
    return mdFiles
  },

  // METODO QUE EXTRAE LAS URLs
  filesUrls: (filePath) => {
    // Regex para encontrar URLs
    const url = /\[([a-zÀ-ÿ.—()\s-¿?,:]+)\]\((http[s]?:\/\/(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-a-z0-9@:%_\+.~#?&//=]*)\)/gi
    let linksStats = {}
    const arrayLinks = []
    if (typeof filePath === 'object') {
      filePath.forEach((el, i) => {
      // lee el archivo .md
        const fileContent = fs.readFileSync(el, 'utf8')
        // exec para extraer lo links usando regex
        let urls2 = url.exec(fileContent)
        while (urls2 !== null) {
          linksStats = {
            href: urls2[2],
            text: urls2[1],
            file: filePath[i]
          }
          arrayLinks.push(linksStats)
          urls2 = url.exec(fileContent)
        }
      })
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      // exec para extraer lo links usando regex
      let urls2 = url.exec(fileContent)
      while (urls2 !== null) {
        linksStats = {
          href: urls2[2],
          text: urls2[1],
          file: filePath
        }
        arrayLinks.push(linksStats)
        urls2 = url.exec(fileContent)
      }
    }
    return arrayLinks
  },

  // METODO QUE VERIFICA ESTADO DE LOS LINKS
  filesUrlsVerify: (dataLinks) => {
    const verifyLinks = dataLinks.map(el => {
      let linksResult = {}
      return fetch(el.href)
        .then(response => {
          let ok = ''
          if (response.ok) {
            ok = 'OK'
          } else {
            ok = 'FAIL'
          }
          linksResult = {
            href: response.url,
            text: el.text,
            file: el.file,
            status: response.status,
            ok: ok
          }
          return linksResult
        })

        .catch(error => {
          console.error(error)
          linksResult = {
            href: el.url,
            text: el.text,
            file: el.file,
            status: 'sin status',
            ok: 'no encontrado'
          }
          return linksResult
        })
    })
    return Promise.all(verifyLinks)
  },

  // METODO QUE RETORNA LAS ESTADISTICAS DE LOS LINKS
  statistics: (dataLinks) => {
    const validLinks = dataLinks.filter(el => el.ok === 'OK').length
    const brokenLinks = dataLinks.filter(el => el.ok === 'FAIL').length
    return { validLinks, brokenLinks }
  }
}

module.exports = Functions
