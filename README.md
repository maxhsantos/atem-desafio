# Setup do pojeto

Vc vai precisar apenas fazer 3 passos para executar o projeto:
1 - execute: docker-compose up -d na raiz do projeto, isso ira subir todos os microserviços
2 - Após subir os serviços vc precisará criar um banco de dados chamado "db1"
3 - Conecte no serviço do mongo que vc subiu, ele tem usuário e senha "admin" como padrão para autenticar

4 - Dessa forma vc irá conseguir criar um usuário: "admin"com a senha "admin", dentro desse banco "db1"que vc acabou de criar.

# Rotas 
Foram criados 4 rotas, conforme a documentação:

# Criar Cliente
POST
curl --location 'http://localhost:3000/cliente' \
--header 'Content-Type: application/json' \
--data '{
    "nome": "Max",
    "telefone": "92 992941340"
}'

# Criar Transação
POST
curl --location 'http://localhost:3000/transacao/1' \
--header 'Content-Type: application/json' \
--data '{
    "valor": -1000, (quando for débito o valor é negativo)
    "tipo": "debito"
}'

curl --location 'http://localhost:3000/transacao/1' \
--header 'Content-Type: application/json' \
--data '{
    "valor": 1000,
    "tipo": "credito"
}'

# Listar Cliente Por clienteId
curl --location 'http://localhost:3000/cliente/1'

# Listar Saldo Por clienteId
curl --location 'http://localhost:3000/saldo/1'