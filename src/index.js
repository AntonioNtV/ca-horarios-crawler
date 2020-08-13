const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/');

  await page.type('#login', 'matricula');
  await page.type('#senha', 'tua senha');
  await page.keyboard.press('Enter');
  
  await page.waitForNavigation();
  
    await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoDisciplinasOfertadas')

    const data = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('tbody tr');

        const array = [...nodeList]

        const serializedNodes = array.map( (element) => {
            const horarios = element.childNodes[7].innerHTML.split('<br>')
            horarios.pop()

            const serializedHorarios = horarios.map(element => {
                return element.trim()
            })

         return {
            periodo: element.childNodes[1].innerText,
            turma: element.childNodes[3].innerText,
            disciplina: element.childNodes[5].innerHTML.split('<br>')[0].trim(),
            horarios: serializedHorarios,
            oferta: element.childNodes[9].innerText
        }
    })

       return serializedNodes
    })
  console.log('New Page URL:', page.url());
  console.log(JSON.stringify(data))
  await browser.close();
})();