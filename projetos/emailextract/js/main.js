const recrutador = "Bruno Soares Nunes"; // RECRUTADOR/BP
const emailRecrutador = "nunes.bruno@lojasrenner.com.br"; // E-MAIL RECRUTADOR
const modeloTrabalho = "híbrido"; // MODELO DE TRABALHO
function limpar(valor) {
  return valor ? valor.replace(/[\t\n\r]+/g, " ").trim() : "";
}

function extrairDados() {
  const texto = document.getElementById("textoEmail").value;

  // Simulação de extração de dados com regex
  const nomeMatch = texto.match(/Nome completo[:\-]?\s*(.+)/i);
  const dataMatch = texto.match(/Data de nascimento[:\-]?\s*(.+)/i);
  const cpfMatch = texto.match(/CPF[:\-]?\s*(.+)/i);
  const rgMatch = texto.match(/RG[:\-]?\s*(.+)/i);
  const telefoneMatch = texto.match(
    /Telefone\s*\(DDD\)[\s\S]*?(\(?\d{2}\)?\s*\d{4,5}-?\d{4}|\d{8})/i
  );
  const emailMatch = texto.match(/E[-]?mail[:\-]?\s*([\w.-]+@[\w.-]+\.\w+)/i);
  const cidadeEstadoMatch = texto.match(
    /Cidade\/Estado[\s\S]*?([A-Za-zÀ-ÿ\s]+\/[A-Z]{2})/i
  );
  const enderecoMatch = texto.match(
    /Endereço com CEP – para a entrega do material de trabalho  é preciso ter alguém para receber\.[\s\S]*?([^\n]+,\s*\d+\s*[-–]\s*\d{4,5}-?\d{3})/i
  );
  const dataInicioMatch = texto.match(
    /DATA DE IN[IÍ]CIO PREVISTA[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i
  );
  const vagaMatch = texto.match(/–\s+.*?-\s+(.*?)\s+-\s+Gestor/i);
  const gestorMatch = texto.match(/Gestor\s+(.+)/i);

  const vaga = limpar(vagaMatch ? vagaMatch[1] : "Vaga Não encontrada");
  const gestor = limpar(gestorMatch ? gestorMatch[1] : "Gestor não encontrado");

  const nome = limpar(nomeMatch ? nomeMatch[1] : "Nome não encontrado");
  const data = limpar(
    dataMatch ? dataMatch[1] : "Data de Nascimento não encontrada"
  );
  const cpf = limpar(cpfMatch ? cpfMatch[1] : "CPF não encontrado");
  const rg = limpar(rgMatch ? rgMatch[1] : "RG não encontrado");
  const telefone = limpar(
    telefoneMatch ? telefoneMatch[1] : "Telefone não encontrado"
  );
  const email = limpar(emailMatch ? emailMatch[1] : "Email não encontrado");
  const cidadeEstado = limpar(
    cidadeEstadoMatch ? cidadeEstadoMatch[1] : "Cidade/Estado não encontrada"
  );
  const endereco = limpar(
    enderecoMatch ? enderecoMatch[1] : "Endereço não encontrado"
  );
  const dataInicio = limpar(
    dataInicioMatch
      ? dataInicioMatch[1]
      : "Data de Início Prevista não encontrada"
  );

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `
    <h5>Dados extraídos:</h5>
    <ul>
      <li><strong>Nome:</strong> ${nome}</li>
      <li><strong>Data de Nascimento:</strong> ${data}</li>
      <li><strong>CPF:</strong> ${cpf}</li>
      <li><strong>RG:</strong> ${rg}</li>
      <li><strong>Telefone:</strong> ${telefone}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Cidade/Estado:</strong> ${cidadeEstado}</li>
      <li><strong>Endereço:</strong> ${endereco}</li>
      <li><strong>Data de Admissão/Integração:</strong> ${dataInicio}</li>
      <li><strong>Cargo:</strong> ${vaga}</li>
      <li><strong>Gestor:</strong> ${gestor}</li>
      <li><strong>Recrutador:</strong> ${recrutador}</li>
      <li><strong>E-mail Recrutador:</strong> ${emailRecrutador}</li>
      <li><strong>Modelo de Trabalho:</strong> ${modeloTrabalho}</li>


    </ul>
  `;
  const linhaExcel = [
    dataInicio, // ADMISSÃO
    dataInicio, // INTEGRAÇÃO
    recrutador, // RECRUTADOR/BP
    emailRecrutador, // E-MAIL RECRUTADOR
    "", // DIRETORIA
    modeloTrabalho, // MODELO DE TRABALHO
    gestor, // GESTOR
    nome, // NOME COMPLETO COLABORADOR
    vaga, // CARGO
    email, // E-MAIL
    telefone, // TELEFONE
    endereco, // ENDEREÇO
    cidadeEstado, // CIDADE-ESTADO
    "", // CHAMADO
    "", // OBSERVAÇÃO
    "", // Pessoa com Deficiência? Se sim, qual?
    "", // "POSIÇÃO VAGA (Nova ou Reposição)"
    "", // Trâmites Documentação
  ].join("\t");
  // Exibir na tela para visualização (opcional)
  /*document.getElementById("resultado").innerHTML += `
  <hr>
  <h5>Para Excel (copiado automaticamente):</h5>
  <pre>${linhaExcel}</pre>
`;*/

  // Copiar para área de transferência
  navigator.clipboard
    .writeText(linhaExcel)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Copiado!",
        text: "Os dados foram copiados para a área de transferência.",
        timer: 2000,
        showConfirmButton: false,
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Erro ao copiar",
        text: "Não foi possível copiar os dados para o clipboard.",
      });
      console.error("Erro ao copiar para o clipboard: ", err);
    });
}
