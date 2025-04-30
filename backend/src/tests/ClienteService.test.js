const ClienteService = require("../services/ClienteService");

// describe("ClienteService", () => {
//     let service;

//     beforeEach(() => {
//         service = new ClienteService();
//     });

//     test("deve cadastrar um cliente", () => {
//         const resultado = service.cadastrarCliente("Maria", "maria@example.com", "senha123");
//         expect(resultado.cliente).toMatchObject({
//             _id: 1,
//             _nome: "Maria",
//             _email: "maria@example.com",
//             _senha: "senha123"
//         });
//         expect(service.listarTodosClientes().clientes).toHaveLength(1);
//         expect(resultado.mensagem).toBe("Cliente cadastrado com sucesso!");
//     });

//     test("deve autenticar cliente com email e senha corretos", () => {
//         service.cadastrarCliente("Maria", "maria@example.com", "senha123");
//         const resultado = service.autenticarCliente("maria@example.com", "senha123");
//         expect(resultado.cliente._email).toBe("maria@example.com");
//         expect(resultado.mensagem).toBe("Autenticação realizada com sucesso!");
//     });

//     test("deve lançar erro ao autenticar cliente com senha errada", () => {
//         service.cadastrarCliente("Maria", "maria@example.com", "senha123");
//         expect(() => {
//             service.autenticarCliente("maria@example.com", "errado");
//         }).toThrow("Email ou senha inválidos.");
//     });

//     test("deve deletar cliente existente", () => {
//         service.cadastrarCliente("Maria", "maria@example.com", "senha123");
//         const resultado = service.deletarCliente("maria@example.com");
//         expect(service.listarTodosClientes().clientes).toHaveLength(0);
//         expect(resultado.mensagem).toBe("Cliente deletado com sucesso!");
//     });

//     test("deve lançar erro ao deletar cliente inexistente", () => {
//         expect(() => {
//             service.deletarCliente("inexistente@example.com");
//         }).toThrow("Cliente não encontrado.");
//     });

//     test("deve buscar cliente por email", () => {
//         const service = new ClienteService();
//         service.cadastrarCliente("Maria", "maria@example.com", "senha123");
//         const resultado = service.buscarCliente("maria@example.com");
//         expect(resultado.cliente._nome).toBe("Maria");
//         expect(resultado.mensagem).toBe("Cliente encontrado com sucesso!");
//     });

//     test("deve lançar erro ao buscar cliente inexistente", () => {
//         expect(() => {
//             service.buscarCliente("naoexiste@example.com");
//         }).toThrow("Cliente não encontrado.");
//     });
// });

describe('ClienteService', () => {
    let service;

    beforeEach(() => {
        service = new ClienteService();
    });

    it('deve cadastrar um cliente', () => {
        const cliente = service.cadastrarCliente("Ana", "ana@email.com", "1234");
        expect(cliente.nome).toBe("Ana");
        expect(service.listarTodosClientes()).toHaveLength(1);
    });

    it('deve autenticar cliente com email e senha corretos', () => {
        service.cadastrarCliente("Ana", "ana@email.com", "1234");
        const cliente = service.autenticarCliente("ana@email.com", "1234");
        expect(cliente.nome).toBe("Ana");
    });

    it('deve lançar erro ao autenticar cliente com senha errada', () => {
        service.cadastrarCliente("Ana", "ana@email.com", "1234");
        expect(() => {
            service.autenticarCliente("ana@email.com", "0000");
        }).toThrow("Email ou senha inválidos.");
    });

    it('deve deletar cliente existente', () => {
        service.cadastrarCliente("Ana", "ana@email.com", "1234");
        service.deletarCliente("ana@email.com");
        expect(service.listarTodosClientes()).toHaveLength(0);
    });

    it('deve lançar erro ao deletar cliente inexistente', () => {
        expect(() => {
            service.deletarCliente("naoexiste@email.com");
        }).toThrow("Cliente não encontrado.");
    });

    it('deve buscar cliente por email', () => {
        service.cadastrarCliente("Ana", "ana@email.com", "1234");
        const cliente = service.buscarCliente("ana@email.com");
        expect(cliente.nome).toBe("Ana");
    });

    it('deve lançar erro ao buscar cliente inexistente', () => {
        expect(() => {
            service.buscarCliente("naoexiste@email.com");
        }).toThrow("Cliente não encontrado.");
    });
});
