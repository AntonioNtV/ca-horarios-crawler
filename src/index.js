const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/');

  await page.type('#login', '118110885');
  await page.type('#senha', '04032000');
  await page.keyboard.press('Enter');
  
  await page.waitForNavigation();
  
    await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoDisciplinasOfertadas')

    const data = await page.evaluate(() => {

      function parseTurma(turma) {
        const parsedData = turma.split(' - ')
        return parsedData[1]
      }
      
      
      function parseCodigoDaTurma(turma) {
        const parsedData = turma.split(' - ')
        return parsedData[0]
      }
        const nodeList = document.querySelectorAll('tbody tr');

        const array = [...nodeList]

        const serializedNodes = array.map( (element) => {
            const horarios = element.childNodes[7].innerHTML.split('<br>')
            horarios.pop()

            const serializedHorarios = horarios.map(element => {
                const horarios = element.split(' ')
                console.log(horarios)

                return {
                  dia: horarios[0].trim(),
                  horario: horarios[1].trim()
                }
            })

            const salas = horarios.map(element => {
              return element.split(' ')[2]
          })

            const sala = `${salas[0]} / ${salas[1]}`

         return {
            periodo: element.childNodes[1].innerText,
            codigoTurma: parseCodigoDaTurma(element.childNodes[3].innerText),
            turma: parseTurma(element.childNodes[3].innerText),
            sala,
            disciplina: element.childNodes[5].innerHTML.split('<br>')[0].trim(),
            horarios: serializedHorarios,
            oferta: element.childNodes[9].innerText
        }
    })
      

       return serializedNodes
    })
  
  fs.writeFile('./horarios.json', JSON.stringify(data), err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })
  await browser.close();
})();
