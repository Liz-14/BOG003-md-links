const mdLinks = require('../src/mdLinks')
const linkStats = require('./mdlFunctions.spec.js')
const linkResult = require('./mdlFunctions.spec.js')
const linkResult2 = require('./mdlFunctions.spec.js')

describe('Links analizados', () => {
  it('Retorna un array de objetos con los links validados para directorio', () => {
    return mdLinks.mdLinks('./.links', 'show').then(data => {
      expect(data).toEqual(linkResult.linkResult)
    })
  })

  const absolutePath2 = 'C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-md-links/.links/README.md'
  it('Retorna un array de objetos con los links validados para un archivo', () => {
    return mdLinks.mdLinks(absolutePath2, 'show').then(data => {
      expect(data).toEqual(linkResult2.linkResult2)
    })
  })

  it('Retorna un array de objetos con los links validados y algunas propiedades', () => {
    return mdLinks.mdLinks('./.links', 'validate').then(data => {
      expect(data).toEqual(linkStats.linkStats)
    })
  })

  const statisticsLinks = { Total: 7, Unique: 4 }
  it('Retorna un objeto con las estadisticas de los links', () => {
    return mdLinks.mdLinks('./.links', 'stats').then(data => {
      expect(data).toEqual(statisticsLinks)
    })
  })

  const statisticsLinks2 = { Total: 7, Unique: 4, Broken: 1 }
  it('Retorna un objeto con las estadisticas de los links + links rotos', () => {
    return mdLinks.mdLinks('./.links', 'validate-stats').then(data => {
      expect(data).toEqual(statisticsLinks2)
    })
  })

  it('Retorna mensaje de error para opcion incorrecta', () => {
    return mdLinks.mdLinks('./.links', 'otra').catch(error => {
      expect(error).toBe('opcion incorrecta')
    })
  })

  it('Retorna mensaje de error para ruta incorrecta', () => {
    return mdLinks.mdLinks('./.linkis', 'stats').catch(error => {
      expect(error).toBe('La ruta ingresada no existe')
    })
  })

  it('Retorna mensaje de error para ruta vacia', () => {
    return mdLinks.mdLinks('', 'stats').catch(error => {
      expect(error).toBe('No se ingreso ninguna ruta')
    })
  })
})
