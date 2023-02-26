ekleme
çıkartma
düzenleme
hepsini listeleme (ajans_id ye göre listeleme olarak 'WHERE ajans_id = 1' gibi)
bir tane listeleme (ajans_id ve kaynak id ye göre listeleme 'WHERE ajans_id = 1 AND id = 2' gibi)

middlewareda istek atan kullanıcının ajans_id si alınacak ve ona göre çekilecek.
istek atan kullanıcı is_ajans değil ise bu işlem için yetkiniz yoktur hatası 401 kodu ile döndürülecek.