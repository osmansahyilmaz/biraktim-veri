# Günlük altın fiyatları

1. GitHub'da `osmansahyilmaz/biraktim-veri` adlı **public** depoyu oluştur; varsayılan dal `main` olsun.
2. Bu klasörün içeriğini (`.github` dahil) yeni deponun köküne kopyala.
3. Dosyaları commit edip `main` dalına push et.
4. Actions sekmesinde “Günlük altın” işini bir kez elle çalıştır (`Run workflow`).

Sonraki çalıştırmalar her gün Türkiye saatiyle 09:17'de planlanır (GitHub geciktirebilir).
Node 20; bağımlılık yok. Satış fiyatları Truncgil Finans'tan alınır. Kaynak günü korunur;
aynı gün tekrar çalıştırılırsa satır güncellenir. Geçersiz veri dosyayı değiştirmez.
Yerelde: `node scripts/update-gold.mjs [history.json yolu]`.

Gizlilik politikası: https://github.com/osmansahyilmaz/biraktim-veri/blob/main/gizlilik.md

Kullanım koşulları: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
