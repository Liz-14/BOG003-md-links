const mdLinks = require('../src/mdLinks')

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

describe('Links analizados', () => {
  it('Retorna un array de objetos con los links validados para directorio', () => {
    return mdLinks.mdLinks('./.links', 'show').then(data => {
      expect(data).toEqual(linkResult)
    })
  })

  const absolutePath2 = 'C:/Users/User/OneDrive/Escritorio/Laboratoria/BOG003-md-links/.links/README.md'
  it('Retorna un array de objetos con los links validados para un archivo', () => {
    return mdLinks.mdLinks(absolutePath2, 'show').then(data => {
      expect(data).toEqual(linkResult2)
    })
  })

  it('Retorna un array de objetos con los links validados y algunas propiedades', () => {
    return mdLinks.mdLinks('./.links', 'validate').then(data => {
      expect(data).toEqual(linkStats)
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

  const absolutePath3 = 'C:/Users/User/OneDrive/Escritorio/Laboratoria/Mds/NoHay'
  it('Retorna mensaje de error para directorio sin archivos .md', () => {
    return mdLinks.mdLinks(absolutePath3, 'stats').catch(error => {
      expect(error).toBe('No hay ningun archivo .md')
    })
  })

  const absolutePath4 = 'C:/Users/User/OneDrive/Escritorio/Laboratoria/Mds/README7.md'
  it('Retorna mensaje de error si no hay coincidencia con links', () => {
    return mdLinks.mdLinks(absolutePath4, 'stats').catch(error => {
      expect(error).toBe('No se encontro ningun link')
    })
  })
})
