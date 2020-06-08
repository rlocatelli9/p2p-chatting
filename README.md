<h1>Chat peer-to-peer</h1>. 
<p>Protótipo de aplicação de chat ponto-a-ponto (P2P)</p>
<p>Projeto meramente didático, para compreender os principais pontos do módulo net do Node.js.</p>
<p>O primeiro peer, deve ouvir sua porta em questão e esperar por uma conexão.</p> 
<p>Os demais devem iniciar a conexão com ao menos um peer na rede.</p>

<h2>Para testar</h2>
<p>Abra diferentes terminais.</p>
<p>No primeiro inicie o programa para ouvir uma determinada porta.
<code>PORT=3333 node index.js</code>
<small>Portas abaixo de 1024 podem estar reservadas pelo sistema operacional</small>
<br/>
<p>Em outro terminal, informe outra porta e passe o endereço do primeiro como argumento. Desta forma:</p>
<code>PORT=3334 node index.js localhost:3333</code>
