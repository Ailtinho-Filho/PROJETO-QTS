
var grupo = 1 // 1 é o Id do professor
var Id_Participante = localStorage.getItem("Id_Participante")
function IniciarPesquisa() {

    //let url = "https://localhost:7045/api/Participante";https://pesquisa.fernandograciano.com.br/
    let url = "https://pesquisa.fernandograciano.com.br/api/Participante";
    var conexao = new XMLHttpRequest();
    conexao.open("post", url);
    conexao.setRequestHeader("Content-type", "application/json");
    conexao.send(JSON.parse(document.querySelector("#Idade").value));
    conexao.onload = function () {
        let retorno = JSON.parse(conexao.response)
        console.log(retorno)
        console.log(conexao.response)
        localStorage.setItem("Id_Participante", retorno.id_participante)
        window.location.href = "passo1.html";
    }
}

function carregamento(passo) {
    let Id_Participante = localStorage.getItem("Id_Participante");
    let url = "https://pesquisa.fernandograciano.com.br/api/Respostas";
    let dados = `{ 
            "id_participante": "${Id_Participante}",
            "IsSaida": "false",
            "passo": "${passo}",
            "grupoId": "${grupo}"
    }`
    var conexao = new XMLHttpRequest();
    conexao.open("post", url);
    conexao.setRequestHeader("Content-type", "application/json");
    console.log(dados)
    conexao.send(dados)
    conexao.onload = function () {
        console.log("Carregado")
        console.log(conexao.response)
    }

}


function trocarPasso(passoAtual, proximoPasso) {

    let url = "https://pesquisa.fernandograciano.com.br/api/Respostas";
    let dados = `{ 
        "id_participante": "${Id_Participante}",
        "IsSaida": "false",
        "passo": "${passoAtual}",
        "grupoId": "${grupo}"
}`
    var conexao = new XMLHttpRequest();
    conexao.open("post", url);
    conexao.setRequestHeader("Content-type", "application/json");
    conexao.send(dados)
    conexao.onload = function () {
        console.log("Carregado")
        console.log(conexao.response)
        let resposta = JSON.parse(conexao.response)
        console.log(resposta)
        console.log(resposta.liberado)
        if (resposta.liberado) {
            window.location.href = proximoPasso;
        } else {
            alert("erro verfique o console")
        }
    }

}

function Finalizar(){
    
    let url = "https://pesquisa.fernandograciano.com.br/api/Participante/Finalizar";
    var conexao = new XMLHttpRequest();
    conexao.open("post", url);
    conexao.setRequestHeader("Content-type", "application/json");
    conexao.send(
        `{
            "comentario" : "${document.querySelector("#interface").value + document.querySelector("#melhoria").value }", 
            "id" : "${Id_Participante}" 
        }`)
    conexao.onload = function () {
        let resposta = JSON.parse(conexao.response)
        console.log(resposta)
        if(resposta.sucesso){
            alert("Obrigado por participar da pesquisa")
        }
        
    }
}
