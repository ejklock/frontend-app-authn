export const cnpjMask = (value) =>
  value
    .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
    .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura os dois últimos 2 números, com um - antes dos dois números

export const cpfMask = (value) =>
  value
    .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de números o primeiro com 3 digitos e o segundo com 3 digitos, separados por .
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2') // captura 2 grupos de números o primeiro e o segundo com 3 digitos, separados por -
    .slice(0, 14); // limita máximo de 14 caracteres
