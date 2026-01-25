# 🔍 Vérification Rapide SSL - healthy.sn

## ✅ Le Code est Correct

Votre code est **bien configuré** :
- ✅ Headers HTTPS dans `next.config.ts`
- ✅ HSTS activé
- ✅ Redirection HTTP → HTTPS automatique par Vercel

**Le problème SSL n'est PAS dans le code.**

---

## 🔍 Diagnostic en 3 Étapes

### Étape 1 : Vérifier dans Vercel Dashboard

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `healthy`
3. **Settings** → **Domains** → Cliquez sur `healthy.sn`
4. Regardez le **statut SSL** :

| Statut | Signification | Action |
|--------|---------------|--------|
| ✅ **Valid** | Certificat actif | Le problème vient d'ailleurs (voir étape 3) |
| ⏳ **Pending** | En attente | Attendre 5-30 minutes |
| ❌ **Error** | Problème DNS | Vérifier les DNS (étape 2) |

---

### Étape 2 : Vérifier les DNS

#### Option A : Si vous utilisez les Nameservers Vercel

1. Dans Vercel Dashboard → Settings → Domains → `healthy.sn`
2. Copiez les **nameservers** (ex: `ns1.vercel-dns.com`)
3. Allez chez votre **registraire** (où vous avez acheté `healthy.sn`)
4. Vérifiez que les nameservers sont **exactement** ceux de Vercel
5. ⏱️ Attendez **24-48h** pour la propagation

#### Option B : Si vous utilisez des Enregistrements DNS

1. Vérifiez avec [mxtoolbox.com](https://mxtoolbox.com/DNSLookup.aspx) :
   - Tapez `healthy.sn`
   - Sélectionnez "A Record"
   - L'IP doit correspondre à celle de Vercel

2. Si l'IP est incorrecte :
   - Allez chez votre registraire
   - Modifiez l'enregistrement A :
     ```
     Type: A
     Name: @ (ou healthy.sn)
     Value: [IP fournie par Vercel]
     ```
   - ⏱️ Attendez **24-48h** pour la propagation

---

### Étape 3 : Vérifier Mixed Content

Si le statut SSL est "Valid" mais le cadenas ne s'affiche pas :

1. Ouvrez `https://healthy.sn` dans Chrome
2. Appuyez sur **F12** (DevTools)
3. Onglet **Console**
4. Cherchez les erreurs :
   - `Mixed Content: The page was loaded over HTTPS, but requested an insecure resource`
   - `blocked:mixed-content`

**Si vous voyez ces erreurs** :
- Le site charge des ressources HTTP au lieu de HTTPS
- Vérifiez que toutes les URLs utilisent `https://` ou sont relatives (`/img/logo.jpeg`)

---

## 🚨 Causes Fréquentes

### 1. DNS pas encore propagés
**Symptôme** : Statut SSL "Pending" ou "Error"  
**Solution** : Attendre 24-48h après configuration DNS

### 2. DNS incorrects
**Symptôme** : Statut SSL "Error"  
**Solution** : Vérifier que les DNS pointent vers Vercel

### 3. Mixed Content
**Symptôme** : Statut SSL "Valid" mais pas de cadenas  
**Solution** : Vérifier la console (F12) pour les erreurs Mixed Content

### 4. Cache du navigateur
**Symptôme** : Le cadenas n'apparaît pas  
**Solution** : 
- Vider le cache (Ctrl+Shift+Delete)
- Tester en navigation privée
- Essayer un autre navigateur

---

## ✅ Checklist Complète

- [ ] Domaine `healthy.sn` ajouté dans Vercel Dashboard
- [ ] DNS configurés correctement (nameservers ou enregistrements A)
- [ ] Propagation DNS terminée (vérifié avec mxtoolbox.com)
- [ ] Statut SSL "Valid" dans Vercel Dashboard
- [ ] Site accessible en `https://healthy.sn`
- [ ] Aucune erreur Mixed Content dans la console (F12)
- [ ] Cache du navigateur vidé
- [ ] Testé en navigation privée

---

## 🆘 Si Rien Ne Fonctionne

1. **Vérifiez les logs Vercel** :
   - Dashboard → Deployments → Dernier déploiement → Logs

2. **Contactez le support Vercel** :
   - [vercel.com/support](https://vercel.com/support)
   - Fournissez :
     - Le nom de domaine (`healthy.sn`)
     - Le statut SSL dans Vercel Dashboard
     - Les résultats de [mxtoolbox.com](https://mxtoolbox.com/DNSLookup.aspx)

3. **Testez avec SSL Labs** :
   - [www.ssllabs.com/ssltest/analyze.html?d=healthy.sn](https://www.ssllabs.com/ssltest/analyze.html?d=healthy.sn)
   - Cela vous donnera un rapport détaillé

---

## 💡 Important

**Vercel génère automatiquement les certificats SSL** via Let's Encrypt. Vous n'avez **rien à faire** côté code. Le problème vient toujours de :
- La configuration DNS
- Le délai de propagation (24-48h)
- Le cache du navigateur

**Votre code est correct ✅**
