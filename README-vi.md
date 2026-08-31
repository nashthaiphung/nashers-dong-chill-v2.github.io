# Nashers Đồng Chill 2026

Website giới thiệu và lưu trữ nội dung cho chuyến đi company trip / team trip mang tên "Nashers Đồng Chill" với chủ đề "Season 2: La Cà Lô Cồ".

Dự án này là một landing page tĩnh theo phong cách tương tác, tập trung vào truyền tải trải nghiệm du lịch, lịch trình, bản đồ điểm đến, khách sạn và hoạt động của nhóm trong chuyến đi Đà Nẵng.

## Tổng quan dự án

- Tên dự án: nashers-dong-chill-v2.github.io
- Phạm vi: website tĩnh, không cần framework/phụ thuộc build phức tạp
- Mục tiêu: tạo một portal trực quan, dễ chia sẻ và trình bày cho sự kiện / hành trình công ty
- Giao diện chính: tối ưu cho desktop và mobile, nhiều hiệu ứng chuyển động, nền kính (glassmorphism), màu sắc tươi sáng mang cảm giác du lịch và mùa hè

## Chức năng chính

- Trang chủ giới thiệu chủ đề và không khí chuyến đi
- Trang hành trình (journey) thể hiện story-telling trải nghiệm theo từng mốc
- Trang agenda hiển thị lịch trình theo ngày / theo thời điểm
- Trang map tổng hợp địa điểm và trải nghiệm, giúp người xem hình dung quãng đường / vị trí hoạt động
- Trang hotel map cho phép xem danh sách khách sạn, vị trí trên bản đồ, hình ảnh, thông tin chi tiết và Google Street View
- Tích hợp nhạc nền nhẹ nhàng, âm thanh phát triển theo nhịp để tăng cảm giác trải nghiệm
- Hỗ trợ tương tác trên màn hình, hover effects, scroll-based animation, modal, panel

## Cấu trúc file chính

```text
.
├── index.html                 # Trang chủ / landing page chính
├── journey.html               # Trang hành trình tương tác
├── agenda.html                # Trang lịch trình sự kiện
├── experience-map.html        # Trang bản đồ trải nghiệm / địa điểm
├── hotel-map.html             # Trang bản đồ khách sạn, street view + chi tiết nơi ở
├── music/
│   └── summer-music.js        # Logic phát nhạc nền / âm thanh nền
├── image/                     # Ảnh hỗ trợ giao diện và nội dung
├── README.md                  # Tài liệu dự án
└── .gitignore                 # (nếu có trong repo) hoặc các file phụ trợ
```

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript thuần
- Tailwind CSS CDN
- GSAP + ScrollTrigger cho animation theo scroll
- Leaflet cho bản đồ interative
- Google Fonts và Material Symbols
- Google Street View embed / liên kết địa lý

## Tính năng giao diện đáng chú ý

- Glassmorphism: card, pills, panel trong suốt, nền mờ
- Layout hiện đại với gradient màu xanh biển, vàng nắng, cam, xanh lá
- Animation khi cuộn trang và hover vào các yếu tố
- Map tương tác với marker và popup thông tin
- Nút bật/tắt nhạc nền với hình ảnh/hiệu ứng âm thanh
- Thiết kế tối ưu cho mobile và tablet

## Mô tả từng trang

### 1) index.html
Trang chủ của dự án, là "mặt tiền" của trải nghiệm. Nội dung thường tập trung vào khái niệm chuyến đi, cảm xúc, tổng quan và các điểm nhấn của Seasion 2.

### 2) journey.html
Trang tiếp nối hành trình, kể lại câu chuyện đi qua các giai đoạn của chuyến đi dưới dạng scrollytelling. Đây là trang mang nhiều hiệu ứng animation nhất.

### 3) agenda.html
Hiển thị lịch trình theo thời gian, giúp người xem nắm bắt sự kiện / hoạt động của từng ngày mốc trong chuyến đi.

### 4) experience-map.html
Tạo không gian không gian địa lý để người xem hiểu được các điểm đến mà cả nhóm đã trải nghiệm.

### 5) hotel-map.html
Trang chuyên về khách sạn/địa điểm lưu trú với các tính năng:

- Danh sách khách sạn
- Bản đồ vị trí
- Chế độ xem theo khu vực hoặc điểm lựa chọn
- Hình ảnh minh họa
- Rating / đặc điểm / tiện ích
- Google Street View trực tiếp

### 6) music/summer-music.js
File JS điều khiển nhạc nền, xây dựng âm thanh theo nhịp và gắn với trải nghiệm người dùng.

## Cách chạy project

Vì đây là website tĩnh, bạn không cần npm install hay build tool.

### Phương án 1: mở trực tiếp
- Mở file index.html trong trình duyệt
- Hoặc mở trực tiếp bất kỳ file HTML nào tùy mục đích

### Phương án 2: chạy local server
Từ thư mục gốc của project:

```bash
python3 -m http.server 8000
```

Sau đó truy cập:

```text
http://localhost:8000/
```

## Lưu ý khi phát triển

- Đây là project dạng static page nên mọi thay đổi giao diện chủ yếu là chỉnh sửa file HTML/CSS/JS trực tiếp.
- Nếu cần thêm hình ảnh, nên lưu trong thư mục image/ để dễ quản lý.
- Nếu chỉnh sửa nhạc nền, làm việc trong file music/summer-music.js.
- Nếu cần thêm bản đồ / marker / hotel mới, ưu tiên cập nhật trong hotel-map.html và các cấu trúc dữ liệu liên quan.

## Mục tiêu thiết kế

Website này không chỉ là một trang giới thiệu đơn thuần, mà còn là một sản phẩm storytelling tổng hợp về trải nghiệm đội nhóm: từ kế hoạch, địa điểm, lịch trình, hình ảnh, cảm xúc đến môi trường du lịch. Nó mang phong cách hiện đại, sống động và dễ chia sẻ cho cộng đồng hoặc khách mời tham dự.

## Ghi chú

Dự án đang được phát triển dưới dạng static web experience, rất phù hợp cho:

- Team trip / company trip
- Landing page sự kiện
- Website lưu khoảnh khắc du lịch
- Portfolio / personal travel story

## Tác giả / author

- Thai Phung
- 2026
