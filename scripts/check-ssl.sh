#!/bin/bash

echo "🔍 Vérification SSL pour healthy.sn"
echo "===================================="
echo ""

echo "1. Vérification DNS (enregistrements A/CNAME):"
echo "----------------------------------------------"
dig +short healthy.sn A
dig +short www.healthy.sn CNAME
echo ""

echo "2. Vérification du certificat SSL:"
echo "-----------------------------------"
echo | openssl s_client -servername healthy.sn -connect healthy.sn:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || echo "❌ Certificat SSL non trouvé"
echo ""

echo "3. Vérification HTTPS:"
echo "----------------------"
curl -I https://healthy.sn 2>&1 | head -5 || echo "❌ HTTPS non accessible"
echo ""

echo "4. Vérification HTTP (redirection):"
echo "------------------------------------"
curl -I http://healthy.sn 2>&1 | grep -i "location\|301\|302" || echo "⚠️  Redirection HTTP → HTTPS non détectée"
echo ""

echo "5. Test avec SSL Labs (lien):"
echo "https://www.ssllabs.com/ssltest/analyze.html?d=healthy.sn"
echo ""
