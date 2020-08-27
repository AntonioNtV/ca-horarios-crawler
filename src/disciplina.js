const horarios = require('../horarios.json')
const fs = require('fs')

const disciplinas = horarios.map(element => {
    return element.disciplina
})


const uniqueArray = disciplinas.filter(function(item, pos) {
    return disciplinas.indexOf(item) == pos;
})


fs.writeFile('./disciplinas.json', JSON.stringify(uniqueArray), err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})