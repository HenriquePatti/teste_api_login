const request = require('supertest');
const assert = require('assert');
const app = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

describe('POST /login', function () {

    beforeEach(async function () {
        const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'resetDeSenhaComDadosValidosDeveRetornar200.json')));
        const res = await request(app)
            .post('/reset-password')
            .send(testData.body);
        assert.strictEqual(res.status, 200);
        //assert.strictEqual(res.body.message, 'Senha redefinida com sucesso!');
    })

    it('Login com dados válidos deve retornar 200', async function () {
        const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'loginComDadosValidosDeveRetornar200.json')));
        const res = await request(app)
            .post('/login')
            .send(testData.body);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.message, 'Login efetuado com sucesso!');
    });


    it('Login com senha inválida deve retornar 401', async function () {
        const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'loginComSenhaInvalidaDeveRetornar401.json')));
        const res = await request(app)
            .post('/login')
            .send(testData.body);
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.message, 'Usuário ou senha inválidos.');
    });

    it('Login com usuário inexistente deve retornar 401', async function () {
        const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'loginComUsuarioInexistenteDeveRetornar401.json')));
        const res = await request(app)
            .post('/login')
            .send(testData.body);
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.message, 'Usuário ou senha inválidos.');
    });

    it('Login com 3 tentativas inválidas bloqueia usuário', async function () {
        const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'loginCom3TentativasInvalidasBloqueiaUsuario.json')));
        for (const tentativa of testData.tentativas) {
            await request(app)
                .post('/login')
                .send(tentativa);
        }
        const res = await request(app)
            .post('/login')
            .send(testData.tentativas[0]);
        assert.strictEqual(res.status, 423);
        assert.strictEqual(res.body.message, 'Usuário bloqueado por tentativas inválidas.');
    });
}); 