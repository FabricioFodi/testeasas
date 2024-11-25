const express = require('express');
const servidor = express();
servidor.use(express.json());
PORTA = 3000;

let usuarios = [];
let produtos = [];
let contadorUserID = 1;

function validarUsuario(req, res, next) {
    const { nameUsuario, CPF, email } = req.body;
    if (!nameUsuario || nameUsuario.length < 3) {
        return res.status(400).json({ mensagem: "'Nome' deve conter no mínimo 3 caracteres" });
    }
    if (nameUsuario.length > 150) {
        return res.status(400).json({ mensagem: "'Nome' deve conter no máximo 150 caracteres" });
    }

    if (!CPF || CPF.length !== 11) {
        return res.status(400).json({ mensagem: "'CPF' deve conter 11 caracteres númericos" })
    }
    if (!/^\d+$/.test(CPF)) {
        return res.status(400).json({ mensagem: "'CPF' deve conter apenas números" });
    }

    if (!email || email.length < 3) {
        return res.status(400).json({ mensagem: "'Email' deve conter no mínimo 3 caracteres" });
    }
    if (email.length > 150) {
        return res.status(400).json({ mensagem: "'Email' deve conter no máximo 150 caracteres" });
    }
    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ mensagem: "'Email' deve conter '@' e '.'" });
    }
    next();
}

 function validarProduto(req, res, next) {
    const { namePreco, preco } = req.body;
    if(!namePreco || namePreco.length < 3) {
        return res.status(400).json({ mensagem: "'Nome' deve conter no mínimo 3 caracteres" });
    }
    if (namePreco.length > 100) {
        return res.status(400).json({ mensagem: "'Nome' deve conter no máximo 100 caracteres" });
    }
    if(!preco || preco <= 0) {
        return res.status(400).json({ mensagem: "'Preço' deve ser maior que 0"})
    }
    next();
}


//GET /users
servidor.get('/usuarios', (req, res) => {
    if (!usuarios) {
        return res.status(404).json({ mensagem: "Nenhum usuário cadastrado" });
    }
    res.json(usuarios);
});


//POST /users
servidor.post('/usuarios', validarUsuario, (req, res) => {
    const { nameUsuario, CPF, email } = req.body;
    
    const id = contadorUserID++;
    usuarios.push({ id, nameUsuario, CPF, email });
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
});


//GET /users/:id
servidor.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id === Number(id));
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" })
    }
    res.json(usuario);
});

//PUT /users/:id
servidor.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nameUsuario, CPF, email } = req.body;
    const usuario = usuarios.find((usuario) => usuario.id === Number(id));
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuario.nameUsuario = nameUsuario;
    usuario.CPF = CPF;
    usuario.email = email;
    res.status(200).json({ usuario });
})

//DELETE /users/:id
servidor.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id === Number(id));
    if (!usuario) {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    usuarios = usuarios.filter((usuario) => usuario.id !== Number(id));
    res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
});

//GET /produtos
servidor.get('/produtos', (req, res) => {
    if (!produtos) {
        return res.status(404).json({ mensagem: "Nenhum produto cadastrado" });
    }
    res.json(produtos);
});

let contadorProdutoID = 1;
//POST /produtos
servidor.post('/produtos', (req, res) => {
    const { namePreco, preco } = req.body;
    const id = contadorProdutoID++;
    produtos.push({id, namePreco, preco});
    res.status(201).json({ mensgame: "Produto não encontrado" });
});

//GET /produtos/:id
servidor.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produto = produtos.find((produtpo) => produto.id === Number(id));
    if (!produto){
        return res.status(400).json({ mensagem: "Produto não encontrado" });
    }
    res.json(produto);
});

//PUT /produtos/:id
servidor.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { namePreco, preco } = req.body;
    const produto = produtos.find((produto) => produto.id === Number(id));
    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    produto.namePreco = namePreco;
    produto.preco = preco;
    res.status(200).json({ produto });
});

//DELETE /produtos/:id
servidor.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produto = produtos.find((produto) => produto.id === Number(id));
    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    produtos = produtos.filter((produto) => produto.id !== Number(id));
    res.status(200).json({ mensagem: "Produto deletado com sucesso"});
});


//PORTA 3000
servidor.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});