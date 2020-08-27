const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch( { headless: false} );
  const page = await browser.newPage();

  await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/');

  await page.type('#login', '118110885');
  await page.type('#senha', '04032000');
  await page.keyboard.press('Enter');
  
  await page.waitForNavigation();
  
    await page.goto('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoCurriculo')

    const data = await page.evaluate(() => {

        const nodeList = document.querySelectorAll('tbody tr');

        const array = [...nodeList]

        const serializedNodes = array.map( (element) => {


            let codigo = null
            if(element.childNodes[3]) {
                codigo = element.childNodes[3].innerText;
            } 

            let categoria = null
            if(element.childNodes[11]) {
                categoria = element.childNodes[11].innerText
            } 

            return {
                codigo,
                categoria
            }

    })
      

        console.log(serializedNodes);
       return serializedNodes
       
    })
  
  fs.writeFile('./tipos.json', JSON.stringify(data), err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })
  await browser.close();
})();
