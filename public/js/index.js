const form = document.querySelector('form');
const container = document.querySelector('div.container');
const divMensagem = document.querySelector('div.mensagem');
const templateSource = document.querySelector('#template');
const alertSource = document.querySelector('#alert');
const sourceAlertComponent = alertSource.innerHTML;
const source = templateSource.innerHTML;
const template = Handlebars.compile(source);
const templateAlert = Handlebars.compile(sourceAlertComponent);
let cep = '00000000';

function mensagemErro(title, mensagem) {
    divMensagem.innerHTML += templateAlert({
        'title': title,
        'content': mensagem,
    });
}

form.cep.addEventListener('input', function (event) {
    form.cep.value = form.cep.value.replace(/^[0-9]/, '');
    if (form.cep.value.length > 8) {
        form.cep.value = form.cep.value.slice(0, 8);
    }
    if (form.cep.value.length < 8) {
        form.cep.value = cep;
    }
    if (cep[0] !== '0' && event.inputType === 'insertText') {
        form.cep.value = cep;
    }
    if (event.inputType === 'deleteContentBackward') {
        cep = '0' + cep;
        cep = cep.slice(0, cep.length - 1);
        form.cep.value = cep;
    }
    cep = form.cep.value;
});

/* function mostraCep() {
    let base = '00000000';
    form.cep.value = base.slice(0, base.length - cep.length) + cep;
} */
form.addEventListener('submit', function(event) {
    console.log(cep);
    if (cep[0] !== '0') {
        busca(cep);
    } else {
        mensagemErro('Erro!', 'O CEP precisa ter 8 dígitos.');
    }
    event.preventDefault();
});/* 
form.cep.addEventListener('keydown', function(event) {
    const keycode = event.keyCode;
    if (keycode === 8) {
        event.preventDefault();
    }
    if (keycode === 32) {
        event.preventDefault();
    }
    if (!(keycode <= 46) && !(keycode >= 91 && keycode <= 186)) {
        event.preventDefault();
    }
    if (keycode >= 48 && keycode <= 57 && cep.length < 8) {
        cep += keycode - 48;
        mostraCep();
    }
    if (keycode >= 96 && keycode <= 105 && cep.length < 8) {
        cep += keycode - 96;
        mostraCep();
    }
    if (keycode === 8) {
        cep = cep.slice(0, cep.length - 1);
        mostraCep();
    }
});
 */
form.querySelector('#remove').addEventListener('click', function(event) {
    limparCep();
});

function limparCep() {
    form.cep.value = '00000000';
}

function ajax(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = callback;
    xhr.send();
}

function busca(cep) {
    const url = 'https://viacep.com.br/ws/' + cep + '/json';
    console.log(url);
    ajax(url, function(e) {
        console.log(e);
        let response = JSON.parse(e.target.response);
        if (response.hasOwnProperty('erro')) {
            mensagemErro('Erro!', 'O CEP digitado não pode ser encontrado.');
        } else {
            let printable = {
                'cep': response.cep,
                'localidade': response.localidade,
                'logradouro': response.logradouro,
            };
            container.innerHTML += template(printable);
        }
    });
}
