class Usuario {
    constructor(id, nome, email, senha) {
        if (this.constructor === Usuario) {
            throw new Error("Classe Usuario não pode ser instanciada diretamente.")
        }
        this._id = id
        this._nome = nome
        this._email = email
        this._senha = senha
    }

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }

    get email() {
        return this._email
    }

    get senha() {
        return this._senha
    }
}
module.exports = Usuario