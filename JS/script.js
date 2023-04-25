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
async function carregarDadosMapa() {
    //ocultando div de erro (se estiver visivel)//
    let divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';

    //chamar API para obter dados------------------------------//
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries')
        .then(response => response.json())      //recebendo a resposta
        .then(dados => prepararDadosMapa(dados))    //preparando os dados
        .catch(e => exibirErro(e.mensagem));    //mostrando o erro
}

//função para preparar e exibir os dados adquiridos------------------------------//
function prepararDadosMapa(dados) {
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

//--------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ PARA A TABELA -----------------------------------------------------
//---------------------------------- https://covid19-brazil-api.now.sh/api/report/v1 ---------------------------------------

//buscando os dados na API------------------------------//
async function carregarDadosTabela() {

    //chamar API para obter dados------------------------------//
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')
        .then(response => response.json())      //recebendo a resposta
        .then(dados => prepararDadosTabela(dados))    //preparando os dados
        .catch(e => exibirErro(e.mensagem));    //mostrando o erro
}

//função para preparar e exibir os dados no HTML
function prepararDadosTabela(dados) {

    let linhas = document.getElementById('linhas');

    linhas.innerHTML = '';

    // laço para percorrer todos os dados recebidos
    for (let i = 0; i < dados['data'].length; i++) {
        let auxLinha = '';

        if (i % 2 != 0)
            auxLinha = '<tr class="listra">';
        else
            auxLinha = '<tr>';

        auxLinha += '<td>' + dados['data'][i].uf + '</td>' +
                    '<td>' + dados['data'][i].state + '</td>' +
                    '<td>' + dados['data'][i].cases + '</td>' +
                    '<td>' + dados['data'][i].deaths + '</td>' +
                    '<td>' + dados['data'][i].suspects + '</td>' +
                    '<td>' + dados['data'][i].refuses + '</td>' +
                '</tr>';

        linhas.innerHTML += auxLinha;
    }
}

console.log(dados_tabela);