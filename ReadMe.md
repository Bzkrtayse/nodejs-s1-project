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
