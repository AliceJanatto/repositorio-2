//exibir div de erro e mensagem------------------------------//
function exibirErro(mensagem) {
    let erro = document.getElementById('div-erro');
    erro.style.display = 'block';
    erro.innerHTML = '<b>Houve um erro ao acessar a API:</ b> <br />' + mensagem;
}

//--------------------------------------------------------------------------------------------------------------------------
//----------------------------------------PROGRAMAÇÃO PARA O MAPA MUNDI-----------------------------------------------------
//------------------------------- dados API: https://covid19-brazil-api-docs.vercel.app/  ----------------------------------

//buscando os dados na API------------------------------//
async function carregarDados() {
    //ocultando div de erro (se estiver visivel)//
    let erro = document.getElementById('div-erro');
    erro.style.display = 'none';

    //chamar API para obter dados------------------------------//
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries')
        .then(response => response.json())      //recebendo a resposta
        .then(dados => prepararDados(dados))    //preparando os dados
        .catch(e => exibirErro(e.mensagem));    //mostrando o erro
}

//função para preparar e exibir os dados adquiridos------------------------------//
function prepararDados(dados) {
    //console.table(dados['data'])
    if (dados['data'].length > 0) {    //só faz alguma coisa se tiver dados

        //esvaziando as variáveis de dados
        dados_mapamundi = [['País', 'casos']];

        //variáveis para acumular casos
        let casos = 0;

        //laço para percorrer todos os dados obtidos
        for (let i = 0; i < dados['data'].length; i++) {

            //adicionar registro na variável de dados(mapa mundi)
            dados_mapamundi.push(
                [
                    dados['data'][i].country, dados['data'][i].confirmed
                ]
            )
        }
    }

    console.log(dados_mapamundi)
    desenharMapa();

}

//--------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------VARIAVEIS PARA MANTER OS DADOS-----------------------------------------------------------//

var dados_mapamundi = [
    ['país', 'casos'],
    ['0', 0]
];

var dados_graficoPizza = [
    ['status', 'total'],
    ['0', 0]
];

var dados_tabela = [
    ['estado', 'casos'],
    ['0', 0]
];

//--------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------mapa mundi COVID------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(desenharMapa);

function desenharMapa() {
    let data = google.visualization.arrayToDataTable(dados_mapamundi);

    let options = {
        title: 'Casos de COVID-19 no mundo'
    };

    let chart = new google.visualization.GeoChart(document.getElementById('grafico-casos'));

    chart.draw(data, options);
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- GRAFICO DE PIZZA -----------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(desenharGraficoPizza);

function desenharGraficoPizza() {

    let data = google.visualization.arrayToDataTable(obterDados());

    let options = {
        title: 'Casos de COVID',
        is3D: true
    };

    let chart = new google.visualization.PieChart(document.getElementById('grafico-pizza'));

    chart.draw(data, options);
}

// Função para simular obtenção de dados
function obterDados() {
    let dados = [obterDados()];
    return dados;
}

//--------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ PARA A TABELA -----------------------------------------------------
//---------------------------------- https://covid19-brazil-api.now.sh/api/report/v1 ---------------------------------------

//buscando os dados na API------------------------------
async function obterDados() {
    //ocultando div de erro (se estiver visivel)
    let erro = document.getElementById('div-erro');
    erro.style.display = 'none';

    //chamar API para obter dados------------------------------
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')
        .then(response => response.json())      //recebendo a resposta
        .then(dados => prepararDados(dados))    //preparando os dados
        .catch(e => exibirErro(e.mensagem));    //mostrando o erro
}

//função para preparar e exibir os dados adquiridos------------------------------
function prepararDados(dados) {
    //console.table(dados['data'])
    if (dados['data'].length > 0) {    //só faz alguma coisa se tiver dados

        //esvaziando as variáveis de dados
        dados_tabela = [['Sigla', 'Estado', 'Casos', 'Mortes', 'Suapeitos', 'Descartados']];

        //variáveis para acumular casos
        let casos = 0;

        //laço para percorrer todos os dados obtidos
        for (let i = 0; i < dados['data'].length; i++) {

            //adicionar registro na variável de dados(mapa mundi)
            dados_tabela.push(
                [
                    dados['data'][i].country, dados['data'][i].confirmed
                ]
            )
        }
    }
}

let linhas = document.getElementById('linhas');

linhas.innerHTML = '';

// laço para percorrer todos os dados recebidos
for (let i = 0; i < dados['data'].length; i++) {
    let auxLinha = '';

    if (i % 2 != 0)
        auxLinha = '<tr class="listra">';
    else
        auxLinha = '<tr>';

    auxLinha += '<td>' + dados['data'][i].id + '</td>' +
        '<td>' + dados['data'][i].name + '</td>' +
        '</tr>';

    linhas.innerHTML += auxLinha;
}