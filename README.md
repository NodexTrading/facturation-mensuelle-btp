# Facturation Mensuelle BTP — Forma Interim

App web pour convertir les calculs hebdomadaires (heures × taux) du
[Calculateur de Marge](https://github.com/Nahel-Forma-Interim/calculateur-de-marge)
en facturation mensuelle (jours × taux journalier net) prête à transmettre
à la paie et au client.

## Fonctionnement

1. **Source** : tableau Équipe du Calculateur de Marge (en heures, hebdo).
2. **Conversion** : taux journalier net = salaire net hebdo / 5 ; tarif facture/jour = TF hebdo / 5.
3. **Saisie présence** : pour chaque semaine du mois (S14 à S18 pour avril 2026 par ex.), on saisit le nombre de jours travaillés.
4. **Sortie** : tableau de facturation mensuel par chantier, avec total salaires (paie) et total facture (client).

## Architecture

- 1 fichier HTML autonome (Plus Jakarta Sans + design system Forma Interim)
- Aucun backend, aucune donnée sensible côté serveur
- Persistance via localStorage (theme uniquement)
- Communication avec le Calculateur via URL hash : `#data=base64(JSON)`
- Déploiement statique sur Vercel

## Pont avec le Calculateur

Le bouton "📤 Vers facturation mensuelle" dans le calculateur encode l'équipe en base64 et ouvre cette app avec les intérimaires pré-remplis.

Format des données importées :
```json
{
  "chantier": "ACTIBAT — Bois sacré actibat Leonardo",
  "year": 2026,
  "month": 3,
  "emps": [
    { "nom": "Pereira Varela Edgar", "salNetHebdo": 850, "factureHebdo": 1547 }
  ]
}
```

## Licence

Privé — Forma Interim BTP.
