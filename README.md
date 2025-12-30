Frontend d’une application REST – Gestion des personnes

Description du projet:

Ce projet consiste à développer le frontend d’une application REST
permettant la gestion des personnes (Person).

Le backend REST a été développé en JEE avec JAX-RS et expose plusieurs
services permettant :
- l’ajout d’une personne
- la modification d’une personne
- la suppression d’une personne
- la recherche par ID ou par nom
- l’affichage de la liste des personnes

Le rôle du frontend est de consommer ces services REST et d’afficher
les données de manière dynamique côté client, en respectant
l’architecture Client / Serveur.

---

Architecture globale:

L’architecture du projet est basée sur le modèle suivant :

Frontend (HTML / CSS / JavaScript)  
⬇  
Services REST (JAX-RS)  
⬇  
Base de données  

- Le frontend communique avec le backend via des requêtes HTTP
  (GET, POST, PUT, DELETE)
- Les données échangées sont au format JSON
- Aucun accès direct à la base de données depuis le frontend

---

Technologies utilisées:
Frontend:

- HTML5
- CSS3
- JavaScript
- Fetch API (appels REST)

Backend :

- Java EE
- JAX-RS
- JPA 
- Apache Tomcat

Outils :
- Eclipse IDE
- Git
- GitHub
-Postman (pour tester )

---

Fonctionnalités réalisées:

-  Affichage de la liste des personnes
-  Ajout d’une personne via un formulaire
-  Validation des champs côté client
-  Modification d’une personne existante
-  Suppression d’une personne avec confirmation
-  Recherche d’une personne par ID ou par nom
-  Communication REST avec gestion du format JSON

---

 Endpoints REST consommés :
- `GET /api/personnes` → liste des personnes
- `GET /api/personnes/id/{id}` → recherche par ID
- `GET /api/personnes/nom/{nom}` → recherche par nom
- `POST /api/personnes` → ajout
- `PUT /api/personnes/{id}` → modification
- `DELETE /api/personnes/{id}` → suppression


---

 Vidéo de démonstration : 
 ajouté avec le lien Github du projet . 


La vidéo présente :
- l’architecture du projet
- la communication frontend / backend
- les fonctionnalités CRUD
- l’utilisation des services REST



