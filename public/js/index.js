const form = document.querySelector('form');
const container = document.querySelector('div.container');
const templateSource = document.querySelector('#template');
const source = templateSource.innerHTML;
const template = Handlebars.compile(source);
form.addEventListener('submit', function(event) {
    busca(form.cep.value);
});
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
        let response = JSON.parse(e.target.response);
        let printable = {
            'cep': response.cep,
            'localidade': response.localidade,
            'logradouro': response.logradouro,
        };
        container.innerHTML += template(printable);
    });
    event.preventDefault();
}
