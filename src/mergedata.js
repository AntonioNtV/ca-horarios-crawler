const horarios = require('../horarios.json')
const tipos = require('../tipos.json')

const fs = require('fs')


const mergedHorarios = horarios.map(element => {
    const tipoPossivel = tipos.find(tipo => tipo.codigo === element.codigoTurma)
    let tipo = 'desconhecido'

    if (tipoPossivel) {
        tipo = tipoPossivel.categoria
    }


    return {
        ...element,
        tipo,
    }
})

fs.writeFile('./horarios2.json', JSON.stringify(mergedHorarios), err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})

console.log(mergedHorarios);