# TaskMaster

TaskMaster est une application web développée avec **Next.js** et **Supabase**, permettant aux utilisateurs de créer et afficher leurs posts personnels. L'application propose une interface utilisateur simple pour publier et consulter des posts en temps réel. Grâce à l'intégration de Supabase, les utilisateurs bénéficient d'une gestion sécurisée des données et d'une mise à jour en temps réel des posts.

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Technologies utilisées](#technologies-utilisées)
3. [Installation](#installation)
4. [Utilisation](#utilisation)
5. [Contributions](#contributions)
6. [License](#license)

## Fonctionnalités

- **Création de posts** : Les utilisateurs peuvent créer de nouveaux posts avec un contenu.
- **Affichage des posts** : Tous les posts créés par l'utilisateur sont affichés en temps réel.
- **Authentification sécurisée** : Les utilisateurs peuvent créer un compte et se connecter pour accéder à leurs posts.
- **Mise à jour en temps réel** : Les posts sont automatiquement mis à jour en temps réel pour tous les utilisateurs connectés grâce à Supabase.
- **Interface réactive** : L'interface s'adapte à toutes les tailles d'écran grâce à l'utilisation de **Tailwind CSS**.
- **Téléchargement de photo de profil** : Les utilisateurs connectés peuvent télécharger une photo de profil qui s'affichera à côté de chaque post qu'ils créent.

## Technologies utilisées

- **Next.js** : Framework React pour le développement d'applications web modernes et performantes.
- **Supabase** : Backend as a Service (BaaS) pour gérer les utilisateurs et les données en temps réel.
- **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur interactives.
- **Tailwind CSS** : Framework CSS utility-first pour un design moderne et responsive.

## Installation

### Prérequis

Avant d'installer le projet, vous devez avoir **Node.js** (version 14 ou supérieure) installé, ainsi que **Yarn** ou **npm**.

### Étapes d'installation

1. Clonez le dépôt du projet :
    ```bash
    git clone https://github.com/votre-utilisateur/taskmaster.git
    cd taskmaster
    ```

2. Installez les dépendances :
    ```bash
    npm install
    # ou
    yarn install
    ```

3. Configurez les variables d'environnement dans un fichier `.env.local` :
    ```plaintext
    NEXT_PUBLIC_SUPABASE_URL= voir .env.local
    NEXT_PUBLIC_SUPABASE_ANON_KEY= voir .env.local
    ```

4. Démarrez le serveur de développement :
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

5. Accédez à l'application à l'adresse [http://localhost:3000](http://localhost:3000).

## Utilisation

Une fois l'application lancée, vous pouvez :

- **Inscription / Connexion** : Créez un compte ou connectez-vous pour commencer à publier vos posts.
- **Créer un post** : Une fois connecté, vous pouvez créer de nouveaux posts avec un titre et un contenu.
- **Afficher les posts** : Les posts sont affichés dans une liste, et chaque post est mis à jour en temps réel.
- **Mise à jour en temps réel** : Toute nouvelle publication de post est immédiatement visible pour tous les utilisateurs connectés.
- **Téléchargement de photo de profil** : Après vous être connecté, vous pouvez télécharger une photo de profil qui sera affichée à côté de chaque post que vous créez.

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
    ```bash
    git checkout -b feature/YourFeature
    ```
3. Apportez vos modifications et committez :
    ```bash
    git commit -m 'Ajout d'une nouvelle fonctionnalité'
    ```
4. Poussez votre branche sur GitHub :
    ```bash
    git push origin feature/YourFeature
    ```
5. Ouvrez une **Pull Request** pour que vos modifications soient examinées.

## License

Ce projet est sous la licence [MIT](https://opensource.org/licenses/MIT).
