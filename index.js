#!/usr/bin/env node

const mdLinks = require('./src/mdLinks')
const inquirer = require('inquirer')

const option = undefined

inquirer.prompt({
  name: 'path',
  message: 'por favor ingrese la ruta del archivo o directorio'
})

  .then(answer => {
    mdLinks.mdLinks(answer, option)
      .then(res => console.log(res))
      .catch(error => console.error(error))
  })
