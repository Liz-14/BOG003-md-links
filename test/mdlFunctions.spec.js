const mdlFuncs = require('../src/mdlFunctions')

const absolutePath = 'C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-md-links/.links'
const arrayResult = [
  'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\jojo\\README4.md',
  'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README.md',
  'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README1.md',
  'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README2.md',
  'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\ñami\\README6.md'
]

const linkResult = [
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\jojo\\README4.md'
  },
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README.md'
  },
  {
    href: 'https://liz-14.github.io/BOG003-social-network/src/#/',
    text: 'Proyecto Final',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README1.md'
  },
  {
    href: 'https://liz-14.github.io/BOG003-social-network/src/#/',
    text: 'Proyecto Final',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README1.md'
  },
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README2.md'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
    text: 'Arreglos',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\ñami\\README6.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Arraysh/',
    text: 'Toy Malito :c',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\ñami\\README6.md'
  }
]

const linkStats = [
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\jojo\\README4.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://liz-14.github.io/BOG003-social-network/src/#/',
    text: 'Proyecto Final',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README1.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://liz-14.github.io/BOG003-social-network/src/#/',
    text: 'Proyecto Final',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README1.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\README2.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
    text: 'Arreglos',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\ñami\\README6.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Arraysh',
    text: 'Toy Malito :c',
    file: 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links\\ñami\\README6.md',
    status: 404,
    ok: 'FAIL'
  }
]

const linkResult2 = [
  {
    href: 'https://liz-14.github.io/BOG003-data-lovers/src/',
    text: 'PokeWeb Link',
    file: 'C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-md-links/.links/README.md'
  }
]

describe('path absoluto', () => {
  it('Deberia retornar ruta absoluta', () => {
    expect(mdlFuncs.absolutFile(absolutePath)).toBe(absolutePath)
  })
  const absolutePath2 = 'C:\\Users\\User\\OneDrive\\Escritorio\\Laboratoria\\BOG003-md-links\\.links'
  it('Resuelve ruta relativa', () => {
    expect(mdlFuncs.absolutFile('./.links')).toBe(absolutePath2)
  })
})

describe('Encontrar archivos .md de un directorio', () => {
  it('Deberia retornar array con las rutas de todos los archivos .md encontrados en el directorio', () => {
    expect(mdlFuncs.findeFile(absolutePath)).toEqual(arrayResult)
  })
})

describe('Extrae los links de los archivos .md', () => {
  it('Deberia retornar un array de objetos de los links de varios archivos .md', () => {
    expect(mdlFuncs.filesUrls(arrayResult)).toEqual(linkResult)
  })

  it('Deberia retornar un array de objetos de los links de un solo archivo .md', () => {
    expect(mdlFuncs.filesUrls('C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-md-links/.links/README.md'))
      .toEqual(linkResult2)
  })
})

describe('Links analizados', () => {
  it('Retorna un array de objetos con los links validados y algunas propiedades', () => {
    return mdlFuncs.filesUrlsVerify(linkResult).then(data => {
      expect(data).toEqual(linkStats)
    })
  })
})

describe('Estadisticas de los links', () => {
  it('Deberia retornar la cantidad de links existentes', () => {
    expect(mdlFuncs.statistics(linkStats).totalLinks).toEqual(7)
  })

  it('Deberia retornar la cantidad de links unicos', () => {
    expect(mdlFuncs.statistics(linkStats).unique).toEqual(4)
  })

  it('Deberia retornar la cantidad de links rotos', () => {
    expect(mdlFuncs.statistics(linkStats).brokenLinks).toEqual(1)
  })
})

exports.linkResult = linkResult
exports.linkStats = linkStats
exports.linkResult2 = linkResult2
