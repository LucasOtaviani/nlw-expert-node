# NLW Expert - Trilha de Node
O intuito do evento foi desenvolver uma API em Node.

A aplicação tem o intuito de fornecer uma API para cadastrar enquetes e otimizar a busca de número de votos por meio
do Redis além de fornecer a atualização dos votos em tempo real para o usuário por meio de websockets.

Ao fim do evento, foi emitido a certificação de conclusão: [Certificação Rocketseat](https://app.rocketseat.com.br/certificates/f7f2a184-08b2-4f45-9065-8d7daf48c4bb).

### Pré requisitos
1. Node 20 (Ou mais recente)
2. Docker

### Configurando o projeto
1. Copiar o arquivo `.env.example` para o arquivo `.env`
2. Rodar o Postgress e o Redis por meio do docker: `docker compose up -d`
3. (Opcional) Utilize o arquivo insomania.json para acessar a documentação da API
