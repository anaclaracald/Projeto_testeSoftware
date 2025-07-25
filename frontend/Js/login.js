document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
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
            alert("Login realizado com sucesso!")
            localStorage.setItem("token", dados.token)
            window.location.href = "/index.html"
        } else {
            console.log("Erro no login:", dados.message)
            console.log("Status da resposta:", resposta.status)
            alert("Falha no login: " + dados.message)
        }
    } catch (erro) {
        console.error("Erro de login:", erro)
        alert("Erro inesperado durante o login.")
    }


})