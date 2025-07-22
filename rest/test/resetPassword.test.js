const request = require('supertest');
const assert = require('assert');
const app = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

describe('POST /reset-password', function () {
  it('Reset de senha com dados válidos deve retornar 200', async function () {
    const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'resetDeSenhaComDadosValidosDeveRetornar200.json')));
    const res = await request(app)
      .post('/reset-password')
      .send(testData.body);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.message, 'Senha redefinida com sucesso!');
  });

  it('Reset de senha com usuário inexistente deve retornar 404', async function () {
    const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'resetDeSenhaComUsuarioInexistenteDeveRetornar404.json')));
    const res = await request(app)
      .post('/reset-password')
      .send(testData.body);
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.message, 'Usuário não encontrado.');
  });
}); 