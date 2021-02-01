## Charte de projet

#### Description du projet

____

##### Nom : Application de finance personnel pour les Québécois

##### Vision globale du projet : 

* Cette application permettra au Québécois et Québécoises de gérer leurs finances personnelles pour être en mesure de planifier leur retraite et leurs projets personnels.

#### Les objectifs du projet

____

1. Augmenter le taux d'épargne des utilisateurs de la plateforme
   * "En 2018, les Québécois ont épargné 15,6 milliards de dollars. Cela représente 6,2 % du total de leurs revenus personnels disponibles, selon les chiffres de Statistique Canada [cités par *La Presse*](https://www.lapresse.ca/affaires/economie/201911/14/01-5249625-le-taux-depargne-des-quebecois-a-un-sommet.php)."
   * Le but de cette application est de fournir des outils permettant de faciliter le suivi des finances personnelles québécoises et de cette façon augmenter considérablement le taux d'épargne.
2. Fournir des outils de calculs pour prendre de meilleures décisions financières
   * Cette application permettra aussi aux Québécois et Québécoises d'avoir des outils de calculs permettant de comparer des décision financières adaptées à leur situation. 
   * Fournir des outils pour suivre le progrès de leurs investissements et la répartition de leur portefeuille.
   * Quelques exemples :
     * Établir le montant à épargner pour se construire une retraite confortable selon l'âge de la retraite prévue.
     * Établir s'il est mieux de louer ou d'acheter une propriété selon les revenus du ménage.
     * Calculer le temps requis pour payer une dette selon le taux d'intérêt en vigueur.

#### Modules à implémenter et les critères de succès

____

1. Une page d'accueil
2. Un module "Prévision budgétaire" qui comprend au minimum :
   * Une section pour les différents revenus 
   * Une section pour les différentes dépenses
3. Un module "Outils de calculs" qui comporte au minimum :
   * Une calculatrice de paiement de dettes
   * Une calculatrice d'intérêts composés
   * Une calculatrice de prêt hypothécaire
4. Un module "Investissement"  qui comprend au minimum :
   * Représentation graphique de la répartition des investissements (selon la région)
   * Représentation graphique de l'évolution de l'avoir net
   * Une section pour obtenir des informations rapides sur l'évolution d'une action
   * Une section comptabilisant tous les ordres d'achats effectués 

#### Risques planifiés et plan de contingence

____

| Risques                                                      | Actions de contingence                                       |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Modéliser et établir une base de données fonctionnelles et hébergement de cette base de données | Effectuer des recherches pour établir le type de base de données à choisir. Ex : SQL ou No-SQL |
| Frais d'une API pour les données financières                 | Essayer de trouver une API gratuite qui fournit des données sur les marchés globaux. |
| Apprentissage de Chart.Js pour la représentation graphique de certaines données | Lire la documentation de Chart.Js et prévoir un temps d'apprentissage pour cette librairie. |
| Frais d'hébergement du site internet                         | Utilisation de Firebase qui offre de l'hébergement gratuitement et un nom de domaine gratuit. |
| Trouver un framework de test                                 | Apprendre un framework de test                               |

#### Temps d'implémentation

____

| Module                                                       | Temps d'implementation |
| ------------------------------------------------------------ | ---------------------- |
| Page authentification (inscription + conn) + Accueil         | 1 à 2 semaines         |
| Module budget                                                | 1 à 2 semaines         |
| Outils de calcul et investissement (Fonctionnalités + tests) | 1 à 2 semaines         |

#### Echéanciers du projet

____

Le projet s'effectuera en 3 sprints et dans chacun, une fonctionnalité sera livrée et fonctionnelle pour l'utilisateur. Le premier sprint sera dédié à la réalisation du module "Page authentification", le deuxième sera dédié à la réalisation du module "Budget" et le dernier sprint au développement du module "Outils de calculs et investissement".

#### Repartition des tâches

____

À déterminer .

