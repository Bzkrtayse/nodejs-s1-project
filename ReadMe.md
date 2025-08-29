# Sprint 1 Proje Çalışması

## Task 1: Project Setup

- NodeJS HTTP modülü kullanarak yeni bir web server package oluştur.
- `nodemon` kütüphanesini ekle
- `package.json` içerisine `dev` komutu ekle. Proje `npm run dev` komutu ile nodemon tarafından çalıştırılmalı.

## Task 2: HTML Pages

Uygulamada 3 tane HTML sayfası olmalı

1. Ana Sayfa (index.html) <br />

- Uygulama ilk açıldığında bu sayfa gelmeli [http://localhost:3000](http://localhost:3000/)
- [Ana Sayfa](http://localhost:3000/) | [Ürünler](http://localhost:3000/products) | [İletişim](http://localhost:3000/connect) linklerinden oluşan bir header menüsü olmalı (stillendirme önemli değil ve bu menü tüm sayfalarda olmalı)
  - Ana Sayfa: http://localhost:3000/
  - Ürünler: http://localhost:3000/products
  - İletişim: http://localhost:3000/connect
- İçerik olarak dummy conent eklenebilir.

2. Ürünler (products.html)

- Products URLi products.html sayfasını getirmeli [http://localhost:3000/products](http://localhost:3000/products)
- [Ana Sayfa](http://localhost:3000/) | [Ürünler](http://localhost:3000/products) | [İletişim](http://localhost:3000/connect) linklerinden oluşan bir header menüsü olmalı (stillendirme önemli değil ve bu menü tüm sayfalarda olmalı)
- İçerik olarak dummy conent eklenebilir.

3. İletişim (contact.html)

- Contact URLi contact.html sayfasını getirmeli [http://localhost:3000/contact](http://localhost:3000/contact)
- [Ana Sayfa](http://localhost:3000/) | [Ürünler](http://localhost:3000/products) | [İletişim](http://localhost:3000/connect) linklerinden oluşan bir header menüsü olmalı (stillendirme önemli değil ve bu menü tüm sayfalarda olmalı)
- İçerik olarak dummy conent eklenebilir.

## Task 3: API Endpoints ⚡

Bu görevde `employeeList.json` dosyası içerisindeki datalar kullanılacak. Aşağıda belirtilen endpointlere istek atıldığı zaman `JSON` formatında data dönülmesi gerekiyor.

1. [http://localhost:3000/employeeList](http://localhost:3000/employeeList) <br />
   Tüm listeyi maaş bilgisi olmadan `JSON` formatında döndürmeli.

2. [http://localhost:3000/oldestEmployee](http://localhost:3000/oldestEmployee) <br />
   En kıdemli çalışan bilgisini `JSON` formatında döndürmeli.

3. [http://localhost:3000/averageSalary](http://localhost:3000/averageSalary) <br />
   Çalışanların maaş ortalaması bilgisini döndürmeli.

## Task 4: Push to GitLab

- Yapılan tüm çalışmalar kişisel GitLab hesabınızda remote repository ye yüklenmeli.

**☝ RULE:** Yapılan herbir minor değişiklik ayrı ayrı commitlenmeli

# Sprint 2 Proje Çalışması: Async, TypeScript, Docker

Geçen hafta oluşturduğun projeyi temel alarak bu hafta aşağıdaki görevleri tamamlaman beklenmektedir:

---

## ✅ Görev 1: Projeyi Typescript'e çevir

- `src/` klasörü oluştur ve tüm `.js` dosyalarını `.ts` olarak taşı.
- `tsconfig.json` dosyası oluştur.
- `ts-node`, `typescript`, `@types/node` paketlerini yükle.
- Proje `ts-node` ile çalıştırılabilir olmalı.
- Örnek komut: `npx ts-node src/index.ts`

---

## ✅ Görev 2: Tip tanımlamaları yap

- Tüm değişken, parametre ve dönüş tipleri açıkça belirtilmeli.
- Fonksiyonların input/output türleri TypeScript ile yazılmalı.
- `any` tipi kullanılmamalı.

---

## ✅ Görev 3: Type ile veri modeli oluştur

- `employeeList.json` verisine uygun bir `Employee` tipi tanımla.
- API endpoint'lerinde bu tipi kullanarak veri güvenliği sağla.
- Örnek:

```ts
type Employee = {
  id: number;
  name: string;
  ...
};
```

## ✅ Görev 4: API JSON response tipi oluştur

- `api/employeeList`, `api/oldestEmployee`, `api/averageSalary` enpointlerine gönderilen `GET` requestlerinin hepsi aşağıdaki yapıda response döndürmelidir.

```js
{
  success: boolean
  data: Generic
  error: string veya undefined
}
```

## ✅ Görev 5: Api üzerinden ürün listesi çekme (çoklu asenkron)

`/api/top100products` endpointi oluşturulacak. Bu endpointe `GET` tipinde request atıldığında,
`https://e-commerce-m3d4.onrender.com/products` endpointinden ürün listesini çekilecek, ve kullanıcıya `JSON` formatında döndürülecek.
<br />
<br />
TS'e uyumlu olmalı ve `Product` tipi aşağıdaki örnek dataya göre yapılandırılmalıdır:

```js
{
  "id": 145,
  "name": "Unisex Pamuk Siyah",
  "description": "Unisex Pamuk Siyah Bisiklet Yaka Oversize Boyfriend T-shirt",
  "price": 139,
  "stock": 108,
  "store_id": 1,
  "category_id": 1,
  "rating": 4.76,
  "sell_count": 143,
  "images": [
      {
          "url": "https://cdn.dsmcdn.com/ty807/product/media/images/20230331/21/316480940/901765807/1/1_org_zoom.jpg",
          "index": 0
      }
  ]
},
```

Bu endpoint `sort`, `limit` ve `offset` olarak üç parametre alır. <br />

- `sort` sırlama bilgisini içerir ve `rating:desc` olmalıdır.
- `limit` bir kerede kaç ürün çekileceği bilgisini verir `10` olmalıdır.
- `offset` başlangıç index değeridir ve `[0, 10, 20, 30 ... 90]` değerleri almalıdır.

`https://e-commerce-m3d4.onrender.com/products?sort=rating:desc&limit=10&offset=30` <br />

Yukarıdaki request limit olarak 10 değerini offset olarak 30 değerini almıştır. Yani 30. ürün ile 40. ürün arasındaki 10 ürün datasını getirmektedir.
<br />
Sizden beklenilen limit 10 kalacak şekilde aynı anda 10 request atıp toplamda 100 ürün bilgisinin çekilmesi. Tüm request `Promise`ları sonuçlandıktan sonra data client a döndürülecek (Hint: `Promise.all()`)
<br />

## ✅ Görev 6: Hava durumu bilgisi endpointi oluşturun

Bu görevde amaç, gelen kullanıcı isteğine göre IP adresi üzerinden konum belirleyip, bu konum bilgisiyle ücretsiz bir hava durumu API'sinden güncel bilgileri alarak kullanıcıya JSON formatında dönen basit bir `Node.js + TypeScript` API'si geliştirmektir.

---

### Hedefler

- IP adresinden yaklaşık konum belirleme (ülke, şehir, koordinat vs.)
- Koordinatları kullanarak hava durumu verisi alma
- API endpoint yazma
- Tip güvenliği (TypeScript) ile geliştirme
- Async işlemleri yönetme

### Kullanılacak paket ve servisler

- `geoip-lite` IP adresinden konum tahmini için (lokal)
- `axios` veya `fetch` HTTP isteklerini yönetmek için
- `dotenv` API key gibi bilgileri `.env` dosyasından çekmek için
- [Open weather Map](https://openweathermap.org/)

Bu görevde oluşturacağınız `/api/how-is-your-weather` enpointine `GET` requesti atıldığı zaman:

- IP bilgisine göre client'ın yaklaşık konumu bulunacak
- Open weather API'ndan hava durumu bilgisi çekilecek
- Güncel hava durumu bilgisi client'a gönderilecek

### Yapılacaklar

#### 📌 1. `/api/weather` endpoint’i oluştur

- `GET` isteği alacak
- IP adresi `req.connection.remoteAddress` veya `x-forwarded-for` header ile alınmalı
- `geoip-lite` kullanılarak IP'ye ait yaklaşık lokasyon (lat/lon) bulunmalı

#### 📌 2. Hava Durumu API'ye İstek At

- Koordinatlar ile birlikte hava durumu datası istenecek
- Bkz: [Open Weather Official Doc](https://openweathermap.org/api/one-call-3)

### 📌 3. Kullanıcıya JSON Yanıt Döndür

- Şehir adı, sıcaklık, hava durumu gibi alanları içeren sade bir JSON

```json
{
  "success": true,
  "data": {
    "city": "Istanbul",
    "temperature": 22.4,
    "condition": "Sunny"
  }
}
```

## ✅ Görev 7: Postman

Tüm endpointler için bir `postmen collection` oluşturun ve test edin.

## ✅ Görev 8: Docker!

- Kullandığınız node versionu ile uyumlu image Dockerfile oluşturup proje dockerize edilmeli. Not: kullanacağınız base image dosyasının güvenlik açıklarını kontrol edin.
- BONUS: Docker ile dev ortamında çalışırken kod değişikliklerinin otomatik yüklenmesini sağlayın.
