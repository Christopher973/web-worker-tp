// Si l'interface SharedWorker n'est pas reconnue par TypeScript
interface SharedWorkerGlobalScope {
  onconnect: (event: MessageEvent) => void;
}

declare var self: SharedWorkerGlobalScope;

// Si vous avez besoin de déclarer d'autres types pour les Web Workers
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}
