const mdLinks = require('../src/mdLinks')
const linkStats = require('./mdlFunctions.spec.js')

describe('Links analizados', () => {
  it('Retorna un array de objetos con los links validados y algunas propiedades', () => {
    return mdLinks.mdLinks('./.links', 'validate').then(data => {
      expect(data).toEqual(linkStats)
    })
  })
})
