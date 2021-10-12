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
    return mdLinks.mdLinks(answer.path, answer.options)
  })
  .then(answer => console.log(answer))
  .catch(error => console.error(error))
