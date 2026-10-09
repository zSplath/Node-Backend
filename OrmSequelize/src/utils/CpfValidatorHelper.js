module.exports = (cpf) => {
  if (!/^\d{11}$/.test(cpf)) throw new Error('CPF inválido');
  
  if (/^(\d)\1{10}$/.test(cpf)) throw new Error('CPF inválido');
  
  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) soma += cpf[i - 1] * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto != cpf[9]) throw new Error('CPF inválido');

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += cpf[i - 1] * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto != cpf[10]) throw new Error('CPF inválido');

  return true;
};
