# 🔧 Dépannage SSL - Le cadenas ne s'affiche pas

## ✅ Checklist Rapide

Si vous avez configuré le domaine sur Vercel mais le cadenas SSL ne s'affiche pas, suivez cette checklist :

### 1. Vérifier dans Vercel Dashboard

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `healthy`
3. **Settings** → **Domains** → Cliquez sur `healthy.sn`
4. Vérifiez le **statut SSL** :
   - ✅ **"Valid"** = Le certificat est actif (le problème vient d'ailleurs)
   - ⏳ **"Pending"** = En attente (attendre 5-30 minutes)
   - ❌ **"Error"** = Problème de configuration DNS

### 2. Vérifier les Enregistrements DNS

#### Si vous utilisez les Nameservers Vercel :

1. Dans Vercel Dashboard → Settings → Domains → `healthy.sn`
2. Copiez les **nameservers** (ex: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
3. Allez chez votre **registraire de domaine** (où vous avez acheté `healthy.sn`)
4. Vérifiez que les nameservers sont bien configurés :
   - Ils doivent être **exactement** ceux fournis par Vercel
   - Pas d'espaces, pas de points en trop
5. Attendez 24-48h pour la propagation complète

#### Si vous utilisez des Enregistrements DNS :

1. Vérifiez que vous avez bien ajouté :
   ```
   Type: A
   Name: @ (ou healthy.sn selon votre registraire)
   Value: 76.76.21.21 (ou l'IP fournie par Vercel)
   TTL: 3600 (ou Auto)
   ```

2. Pour www (optionnel) :
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. Vérifiez avec [mxtoolbox.com](https://mxtoolbox.com/DNSLookup.aspx) :
   - Tapez `healthy.sn`
   - Sélectionnez "A Record"
   - Vérifiez que l'IP correspond à celle de Vercel

### 3. Vérifier la Propagation DNS

1. Utilisez [whatsmydns.net](https://www.whatsmydns.net/#A/healthy.sn)
2. Tous les serveurs DNS doivent pointer vers la **même IP** (celle de Vercel)
3. Si certains pointent encore vers une autre IP, attendez la propagation complète (24-48h)

### 4. Vérifier le Certificat SSL

1. Visitez `https://healthy.sn` (avec https)
2. Ouvrez les **DevTools** (F12) → Onglet **Security**
3. Vérifiez les erreurs de certificat
4. Testez avec [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=healthy.sn)

### 5. Vérifier Mixed Content

Le cadenas peut ne pas s'afficher si le site charge des ressources HTTP :

1. Ouvrez les **DevTools** (F12) → Onglet **Console**
2. Cherchez les erreurs :
   - `Mixed Content: The page was loaded over HTTPS, but requested an insecure resource`
   - `blocked:mixed-content`
3. Si vous voyez ces erreurs :
   - Vérifiez que toutes les URLs dans le code utilisent `https://`
   - Vérifiez les images, scripts, CSS
   - Utilisez des URLs relatives (`/img/logo.jpeg`) au lieu d'URLs absolues (`http://...`)

### 6. Forcer le Rafraîchissement

1. **Videz le cache du navigateur** :
   - Chrome/Edge : `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
   - Cochez "Images et fichiers en cache"
   - Cliquez sur "Effacer les données"

2. **Testez en navigation privée** :
   - Ouvrez une fenêtre privée
   - Visitez `https://healthy.sn`

3. **Essayez un autre navigateur** :
   - Chrome, Firefox, Safari, Edge

### 7. Vérifier les Headers HTTP

1. Utilisez [securityheaders.com](https://securityheaders.com/?q=https://healthy.sn)
2. Vérifiez que les headers de sécurité sont présents

## 🔍 Commandes de Diagnostic

### Vérifier les DNS (macOS/Linux) :
```bash
dig healthy.sn A
dig healthy.sn NS
```

### Vérifier le certificat SSL :
```bash
echo | openssl s_client -servername healthy.sn -connect healthy.sn:443 2>/dev/null | openssl x509 -noout -dates
```

### Tester HTTPS :
```bash
curl -I https://healthy.sn
```

## ⏱️ Délais Normaux

- **Propagation DNS** : 24-48 heures (parfois jusqu'à 72h)
- **Génération certificat SSL** : 5-30 minutes après propagation DNS
- **Mise à jour navigateur** : Immédiat après rafraîchissement cache

## 🆘 Si Rien Ne Fonctionne

1. **Vérifiez les logs Vercel** :
   - Dashboard → Deployments → Cliquez sur le dernier déploiement → Logs

2. **Contactez le support Vercel** :
   - [vercel.com/support](https://vercel.com/support)
   - Fournissez :
     - Le nom de domaine (`healthy.sn`)
     - Le statut SSL dans Vercel Dashboard
     - Les résultats de `dig healthy.sn A`

3. **Vérifiez votre registraire** :
   - Certains registraires ont des délais supplémentaires
   - Vérifiez qu'il n'y a pas de restrictions sur votre domaine

## ✅ Vérification Finale

Une fois que tout est configuré :

1. ✅ Le statut SSL dans Vercel est "Valid"
2. ✅ Les DNS pointent vers Vercel (vérifié avec mxtoolbox)
3. ✅ `https://healthy.sn` est accessible
4. ✅ Le cadenas vert s'affiche dans le navigateur
5. ✅ Aucune erreur dans la console (F12)
6. ✅ SSL Labs donne une note A ou A+

Si tous ces points sont ✅, votre SSL est correctement configuré !
