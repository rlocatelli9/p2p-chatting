const sha = require("sha256");

if (!process.env.PORT) throw Error("Variável de ambiente PORT não informada");
const port = process.env.PORT;
const receivedMessageSignatures = [];
const timestamp = Date.now();
const randomNumber = Math.floor(Math.random() * 10000 + 1000);
const myKey = sha(port + "" + timestamp + "" + randomNumber);

const Peer = require("./Peer");
const peer = new Peer(port);

process.argv
  .slice(2)
  .forEach((otherPeerAddress) => peer.connectTo(otherPeerAddress));

peer.onConnection = (socket) => {
  const message = "Olá! Estou na porta " + port;
  const signature = sha(message + myKey + Date.now());
  receivedMessageSignatures.push(signature);
  const firstPayload = {
    signature,
    message,
  };
  socket.write(JSON.stringify(firstPayload));
};

/**
 * listener do evento “data”
 * faz um broadcast dos dados inputados com Peer.broadcast.
 * com assinatura
 */
process.stdin.on("data", (data) => {
  const message = data.toString().replace(/\n/g, "");
  const signature = sha(message + myKey + Date.now());
  //add própria assinatura para evitar receber a própria msg
  receivedMessageSignatures.push(signature);
  peer.broadcast(JSON.stringify({ signature, message }));
});

/**
 * verifica se a assinatura da payload recebida já não foi recebida anteriormente.
 * Se não, adiciona ela à lista de assinaturas recebidas,
 * imprime a mensagem na tela e envia a payload novamente para a rede, no formato json.
 */
peer.onData = (socket, data) => {
  const json = data.toString();
  const payload = JSON.parse(json);
  if (receivedMessageSignatures.includes(payload.signature)) return;
  receivedMessageSignatures.push(payload.signature);
  console.log("recebido> ", payload.message);
  peer.broadcast(json);
};
