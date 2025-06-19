document.getElementById("cadastro_form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const senha_confirmacao = document.getElementById("senha_confirmacao").value

    if (senha != senha_confirmacao) {
        alert("As senhas devem ser iguais.")
    } else {
        try {
            const resposta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, email, senha })
            })

            let dados
            try {
                dados = await resposta.json()
            } catch {
                const texto = await resposta.text()
                console.error("Resposta não-JSON recebida:", texto)
                alert("Erro inesperado: resposta do servidor inválida.")
                return
            }

            if (resposta.ok) {
                alert("✅ Usuário cadastrado com sucesso!")
                window.location.href = "/confirmacao-cadastro.html";
            } else {
                console.log("Erro no login:", dados.message)
                console.log("Status da resposta:", resposta.status)
                alert("❌ Erro ao cadastrar usuário")
            }

        } catch (erro) {
            console.error("Erro de rede ou servidor: ", erro)
            alert("Erro ao enviar dados.")
        }
    }
})
