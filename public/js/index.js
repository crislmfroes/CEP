const form = document.querySelector('form');
const templateSource = document.querySelector('#templateRow');
const table = document.querySelector('table');
const source = templateSource.innerHTML;
const templateRow = Handlebars.compile(source);
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
        for (let attribute in response) {
            if (response.hasOwnProperty(attribute)) {
                console.log(attribute);
                let rowElements = {
                    'atributo': attribute,
                    'valor': response[attribute],
                };
                table.innerHTML += templateRow(rowElements);
            }
        }
    });
    event.preventDefault();
}
