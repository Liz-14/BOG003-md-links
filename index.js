#!/usr/bin/env node

const mdLinks = require('./src/mdLinks')
const inquirer = require('inquirer')

inquirer.prompt([{
  name: 'path',
  message: 'por favor ingrese la ruta del archivo o directorio'
}, {
  type: 'list',
  name: 'options',
  message: 'Por favor escoja entre las opciones',
  choices: ['show', 'validate', 'stats', 'validate-stats', 'help']
}])

  .then(answer => {
    mdLinks.mdLinks(answer.path, answer.options)
      .then(res => console.log(res))
      .catch(error => console.error(error))
  })
