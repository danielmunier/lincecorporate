const form = document.querySelector('.php-email-form');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit', async (event) => {
  // evitar que o formulário seja submetido
  event.preventDefault();

  // obter os valores dos campos do formulário
  const subject = form.querySelector('input[name="assunto"]').value.trim();
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="mensagem"]').value.trim();
  const dataForm = {assunto: subject, name: name, email: email, mensagem: message};

  if (!subject || !name || !email || !message) {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Por favor, preencha todos os campos.';
    return;
  }

  // mostrar mensagem de "loading"
  const loadingMessage = document.querySelector('.loading');
  loadingMessage.style.display = 'block';

  // enviar a requisição para a API
  const formData = new FormData(form);
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm),
    });
    const data = await response.json();

    // ocultar mensagem de "loading" e exibir mensagem de sucesso ou erro
    loadingMessage.style.display = 'none';
    const successMessage = document.querySelector('.sent-message');
    const errorMessage = document.querySelector('.error-message');
    if (data.success) {
      successMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = data.message;
    }
  } catch (error) {
    console.error(error);

    // ocultar mensagem de "loading" e exibir mensagem de erro
    loadingMessage.style.display = 'none';
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Ocorreu um erro ao enviar a mensagem.';
  }
});
