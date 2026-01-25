# Configuration SSL/HTTPS pour healthy.sn

## 🔒 Vérification SSL sur Vercel

Vercel fournit **automatiquement** des certificats SSL gratuits via Let's Encrypt pour tous les domaines configurés. Si votre site n'a pas de certificat SSL, suivez ces étapes :

## 📋 Étapes de Configuration

### 1. Vérifier le domaine dans Vercel

1. Allez sur [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `healthy`
3. Allez dans **Settings** → **Domains**
4. Vérifiez que `healthy.sn` est bien ajouté

### 2. Configurer les enregistrements DNS

Pour que Vercel puisse délivrer un certificat SSL, votre domaine doit pointer vers Vercel :

#### Option A : Utiliser les nameservers Vercel (Recommandé)

1. Dans Vercel Dashboard → Settings → Domains → `healthy.sn`
2. Copiez les **nameservers** fournis par Vercel
3. Allez dans votre registraire de domaine (où vous avez acheté `healthy.sn`)
4. Remplacez les nameservers par ceux de Vercel
5. Attendez 24-48h pour la propagation DNS

#### Option B : Utiliser des enregistrements DNS (Alternative)

Si vous ne pouvez pas changer les nameservers, ajoutez ces enregistrements DNS :

**Pour le domaine principal :**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Pour le sous-domaine www :**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Pour le sous-domaine wildcard (optionnel) :**
```
Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

### 3. Vérifier la configuration SSL

1. Dans Vercel Dashboard → Settings → Domains → `healthy.sn`
2. Vérifiez que le statut SSL est **"Valid"** (peut prendre quelques minutes après la configuration DNS)
3. Si le statut est "Pending", attendez quelques minutes et rafraîchissez

### 4. Forcer HTTPS (déjà configuré dans le code)

Le fichier `next.config.ts` et les headers HTTP sont configurés pour forcer HTTPS. Vercel redirige automatiquement HTTP → HTTPS.

## 🔍 Vérification

### Tester le certificat SSL

1. Visitez `https://healthy.sn` (avec https)
2. Vérifiez que le cadenas vert apparaît dans la barre d'adresse
3. Testez avec [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=healthy.sn)

### Vérifier la redirection HTTPS

1. Visitez `http://healthy.sn` (sans s)
2. Vous devriez être automatiquement redirigé vers `https://healthy.sn`

## ⚠️ Problèmes Courants

### Le certificat SSL n'apparaît pas / Le cadenas ne s'affiche pas

**Causes possibles :**
- Les enregistrements DNS ne pointent pas correctement vers Vercel
- Le domaine n'est pas ajouté dans Vercel
- La propagation DNS n'est pas terminée (attendre 24-48h)
- Le certificat SSL est en cours de génération (peut prendre 5-30 minutes)
- Mixed Content : le site charge des ressources HTTP au lieu de HTTPS

**Solutions étape par étape :**

1. **Vérifier dans Vercel Dashboard :**
   - Allez dans Settings → Domains → `healthy.sn`
   - Vérifiez le statut SSL :
     - ✅ "Valid" = Le certificat est actif
     - ⏳ "Pending" = En attente (attendre 5-30 min)
     - ❌ "Error" = Problème de configuration DNS

2. **Vérifier les enregistrements DNS :**
   - Utilisez [mxtoolbox.com](https://mxtoolbox.com/DNSLookup.aspx) ou `dig healthy.sn`
   - Si vous utilisez les **nameservers Vercel**, vérifiez qu'ils sont bien configurés chez votre registraire
   - Si vous utilisez des **enregistrements DNS**, vérifiez :
     ```
     Type: A
     Name: @ (ou healthy.sn)
     Value: 76.76.21.21 (ou l'IP fournie par Vercel)
     ```

3. **Vérifier la propagation DNS :**
   - Utilisez [whatsmydns.net](https://www.whatsmydns.net/#A/healthy.sn)
   - Tous les serveurs DNS doivent pointer vers la même IP
   - Si certains pointent encore vers l'ancienne IP, attendez la propagation complète

4. **Vérifier le certificat SSL :**
   - Visitez `https://healthy.sn` (avec https)
   - Ouvrez les DevTools (F12) → Onglet Security
   - Vérifiez les erreurs de certificat
   - Testez avec [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=healthy.sn)

5. **Vérifier Mixed Content :**
   - Ouvrez les DevTools (F12) → Console
   - Cherchez les erreurs "Mixed Content" ou "blocked:mixed-content"
   - Si vous voyez ces erreurs, le site charge des ressources HTTP au lieu de HTTPS
   - Solution : Vérifiez que toutes les URLs dans le code utilisent `https://` ou des URLs relatives

6. **Forcer le rafraîchissement :**
   - Videz le cache du navigateur (Ctrl+Shift+Delete)
   - Testez en navigation privée
   - Essayez un autre navigateur

### Erreur "Certificate Pending"

**Solution :**
- Attendez 5-30 minutes après la configuration DNS correcte
- Vérifiez que les enregistrements DNS sont corrects et propagés
- Si après 1h le statut est toujours "Pending", vérifiez les logs Vercel
- Contactez le support Vercel si le problème persiste après 24h

### Erreur "Invalid Certificate" ou "Certificate Error"

**Causes :**
- Les DNS ne pointent pas vers Vercel
- Le domaine n'est pas correctement configuré dans Vercel
- Conflit avec un ancien certificat

**Solutions :**
1. Vérifiez que le domaine est bien dans Vercel Dashboard → Settings → Domains
2. Vérifiez que les DNS pointent vers Vercel (utilisez [mxtoolbox.com](https://mxtoolbox.com/DNSLookup.aspx))
3. Supprimez et réajoutez le domaine dans Vercel si nécessaire
4. Attendez 30 minutes après la correction DNS

### Le site fonctionne en HTTP mais pas en HTTPS

**Solution :**
- Vérifiez que le domaine est bien configuré dans Vercel
- Vérifiez que les enregistrements DNS pointent vers Vercel
- Attendez la propagation DNS complète

## 📞 Support

Si le problème persiste :
1. Vérifiez les logs Vercel : Dashboard → Deployments → Logs
2. Contactez le support Vercel : [vercel.com/support](https://vercel.com/support)
3. Vérifiez la documentation : [vercel.com/docs/security/encryption](https://vercel.com/docs/security/encryption)

## ✅ Checklist

- [ ] Domaine `healthy.sn` ajouté dans Vercel Dashboard
- [ ] Enregistrements DNS configurés correctement
- [ ] Propagation DNS terminée (24-48h)
- [ ] Certificat SSL "Valid" dans Vercel Dashboard
- [ ] Site accessible en HTTPS
- [ ] Redirection HTTP → HTTPS fonctionne
- [ ] Cadenas vert visible dans le navigateur
