# Projet de Démonstration des Web Workers avec Next.js

Ce projet est une démonstration pratique de l'utilisation des **Web Workers** dans une application **Next.js**. Il montre comment les Web Workers peuvent améliorer les performances en **déchargeant des calculs intensifs** du thread principal vers des threads de travail parallèles.

## À propos du projet

Cette application démontre trois types d'implémentations de Web Workers :

- **Web Workers standard** - Dans la page `/webworker`
- **Shared Workers** - Dans les pages `/multiply` et `/square`

L'application permet de **comparer les performances** entre l'exécution de calculs intensifs dans le **thread principal** et leur exécution dans des **Web Workers séparés**.

## Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (généralement installé avec Node.js)
- **Un navigateur web moderne** qui prend en charge les **Web Workers**

## Installation

Installez les dépendances :

```sh
npm install
```

Configuration
Le projet utilise webpack avec worker-loader pour gérer les fichiers de Web Workers.
Cette configuration est déjà présente dans le fichier next.config.ts.

Lancement du projet
Pour démarrer l'application en mode développement :

```sh
npm run dev
```

## Structure du projet

### Fonctionnalités

#### Page Web Worker (/webworker)

Cette page démontre un Web Worker standard qui effectue le calcul d'une puissance cubique (x³) sur un nombre. Elle permet de :

- Exécuter le calcul dans le thread principal
- Exécuter le même calcul dans un Web Worker
- Comparer les temps d'exécution
- Observer l'impact sur la réactivité de l'interface utilisateur
- Pages Shared Worker (/multiply et /square)
- Ces pages démontrent l'utilisation d'un Shared Worker partagé entre différentes pages. Le même Worker est utilisé pour :

- Calculer le produit de deux nombres (/multiply)
- Calculer le carré d'un nombre (/square)

### Comment ça fonctionne

#### Web Workers standard

Le Web Worker principal est défini dans un fichier séparé pow3Worker.js. Quand un calcul est lancé :

1. La page envoie le nombre au Worker avec :

```js
worker.postMessage(number);
```

2. Le Worker effectue le calcul et renvoie le résultat à la page.
3. La page affiche le résultat et le temps d'exécution.

### Shared Workers

Le Shared Worker est défini dans sharedWorker.js. Il permet à plusieurs pages ou onglets de communiquer avec la même instance de Worker :

1. Chaque page se connecte au même Worker avec :

```js
new SharedWorker("/workers/sharedWorker.js");
```

2. Les pages envoient des opérations différentes (multiplication ou carré).
3. Le Worker traite les demandes et renvoie les résultats aux pages respectives.
   markdown
