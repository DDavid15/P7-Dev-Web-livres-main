# 🛠️ P7 - Développeur Web - Projet Livres

Bienvenue sur le projet "Mon Vieux Grimoire" !

Ce projet est un site de partage de livres avec notation et gestion d'images.
Il a été développé dans le cadre du parcours OpenClassrooms "Développeur Web".

---

## ✨ Fonctionnalités

* Authentification sécurisée des utilisateurs (bcrypt + JWT)
* Inscription et connexion avec stockage en base MongoDB
* Ajout, modification, suppression et affichage des livres
* Notation des livres (1 à 5 étoiles) avec moyenne automatique
* Upload d'images (via Multer) et optimisation (Sharp)
* API REST sécurisée avec gestion CORS
* Frontend statique fourni pour tester l'application

---

## 📂 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/DDavid15/P7-Dev-Web-livres-main.git
cd P7-Dev-Web-livres-main
```

### 2. Backend

Aller dans le dossier `back-end` :

```bash
cd back-end
```

Installer les dépendances :

```bash
npm install
```

Modifier le fichier `.env.example` en `.env` à la racine de `back-end/` et intégrez votre_URI_MongoDB, une Une_chaine_secrete_au_choix, l'URL de votre frontend et vos identifiants Cloudinary :

```
MONGO_URI=Votre_URI_MongoDB
TOKEN_SECRET=Une_chaine_secrete_au_choix
CLIENT_ORIGIN=https://your-frontend-domain
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```
### Configuration Cloudinary

La gestion des images utilise [Cloudinary](https://cloudinary.com). Trois variables doivent 
être renseignées dans votre fichier `.env` :

- `CLOUDINARY_CLOUD_NAME` : le nom de votre espace Cloudinary.
- `CLOUDINARY_API_KEY` : la clé API permettant l'accès aux ressources.
- `CLOUDINARY_API_SECRET` : la clé secrète liée à votre clé API.

Vous pouvez prendre exemple sur le fichier `back-end/.env.example` pour remplir ces valeurs.

Exemple :

```
MONGO_URI=mongodb+srv://votre_user:votre_motdepasse@votre_cluster.mongodb.net/votre_db
TOKEN_SECRET=MySuperSecretTokenKey123
CLIENT_ORIGIN=https://your-frontend-domain
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Lancer le serveur Backend :

```bash
npm start
```

Si tout fonctionne, vous verrez :

```
> mon-vieux-grimoire-backend@1.0.0 start
> node server.js
```

---

### 3. Frontend

Aller dans le dossier `front-end` :

```bash
cd ../front-end
```

Pour lancer le frontend :

⚡ Prérequis
Le projet a été développé et testé sous Node.js version 19.

❗️Attention : la version 22 de Node n'est pas compatible sans modifications.

Pour garantir un fonctionnement correct, veuillez utiliser Node.js 19.

Si besoin, voici comment repasser sur Node 19 avec nvm :

```bash
nvm install 19
nvm use 19
```
(N'oubliez pas de vérifier votre version avec node -v.)

Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet.

### Images bloquées par AdBlock ?
Certaines extensions de blocage de publicité peuvent empêcher l'affichage des images.
Si les couvertures ne se chargent pas dans l'interface, essayez de désactiver
votre bloqueur de publicités ou d'ajouter le site local (par exemple
`http://localhost:3000`) à la liste blanche pendant le développement.

---

## 🧪 Tests API

Les tests fonctionnels de l'API ont été réalisés avec Postman :

* Test de l'inscription / connexion
* Test de la création, édition, suppression et récupération de livres
* Test du système de notation
* Test de l'upload et optimisation d'image

---

## ⚙️ Stack Technique

* Backend :

  * Node.js
  * Express
  * MongoDB + Mongoose
  * Bcrypt
  * JWT
  * Multer
  * Sharp
  * Dotenv

---

## ❗ Important

* **Le fichier `.env` n'est pas fourni pour des raisons de sécurité.**
* **Pensez à le créer manuellement avant de lancer le Backend.**
* Un exemple est disponible dans le fichier `.env.example`.

---

## 👨‍💻 Auteur

David DURIBREUX
[duribreuxdavid15@gmail.com](mailto:duribreuxdavid15@gmail.com)
[GitHub - DDavid15](https://github.com/DDavid15)

---

## 📜 Licence

Projet réalisé dans le cadre du parcours OpenClassrooms, à but pédagogique.
