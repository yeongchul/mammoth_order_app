USE mydb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS store;
DROP TABLE IF EXISTS my_store;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    kakao_id BIGINT NOT NULL UNIQUE,
    point INT NOT NULL,
    refresh_token VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    roles VARCHAR(255),
    PRIMARY KEY (user_id, roles),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE menu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    has_milk BOOLEAN NOT NULL DEFAULT FALSE,
    menu_type ENUM(
        'coffee',
        'coldBrew',
        'nonCoffee',
        'teaAde',
        'frappeBlended',
        'food'
    ) NOT NULL,
    is_new_menu BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE store (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    menu_id BIGINT NOT NULL,
    menu_quantity INT NOT NULL,
    cup_type ENUM('disposableCup', 'personalCup', 'storeCup'),
    is_ice BOOLEAN,
    size ENUM('s', 'm', 'l'),
    milk_type ENUM('milk', 'lowFatMilk', 'soyMilk', 'almondBreeze', 'oatSide'),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

CREATE TABLE my_store (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
);

-- coffee
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "아메리카노", 1600, "https://mmthcoffee.com/files/menu/f32901974928a36d3e5785397f94577e.png", false, "coffee", false),
(0, "꿀 커피", 2300, "https://mmthcoffee.com/files/menu/cc9e578f88cbbc9734365b237b725fe8.png", false, "coffee", false),
(0, "카페 라떼", 2700, "https://mmthcoffee.com/files/menu/62a2f2a957f02d34c86d4840673ff43c.png", true, "coffee", false),
(0, "꿀 라떼", 3100, "https://mmthcoffee.com/files/menu/dd889fd7d1265d386e18be6e1a2385a3.png", true, "coffee", false),
(0, "바닐라 라떼", 3100, "https://mmthcoffee.com/files/menu/21d76aa6a2ee91e0a6452447394aa3cd.png", true, "coffee", false),
(0, "아몬드 라떼", 3100, "https://mmthcoffee.com/files/menu/82b4719a19709c83ba8cd83113df42f4.png", true, "coffee", false),
(0, "카페 모카", 3300, "https://mmthcoffee.com/files/menu/cc1b1f50e7b7f9554e3ce51e999b1656.png", true, "coffee", false),
(0, "헤이즐넛 라떼", 2800, "https://mmthcoffee.com/files/menu/d7d29daccf27300f819cb7f87170c368.png", true, "coffee", false),
(0, "베트남 연유 커피", 3300, "https://mmthcoffee.com/files/menu/ecefaf7f4e96be5b41fb0610c16ca3c9.png", true, "coffee", false),
(0, "그린티 샷 라떼", 3700, "https://mmthcoffee.com/files/menu/504689de78fd01f6dd49f1df0f6a84da.png", true, "coffee", false),
(0, "아샷추 복숭아 아이스티", 3400, "https://mmthcoffee.com/files/menu/a4129e2fb405c305ba39c0dd2abc7467.png", false, "coffee", false);

-- coldBrew
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "콜드브루", 2300, "https://mmthcoffee.com/files/menu/f99fa209b8c8034cb7d31b1dc5694f2d.png", false, "coldBrew", false),
(0, "콜드브루 라떼", 3000, "https://mmthcoffee.com/files/menu/c4c9005cdb236d18c558491915033a91.png", true, "coldBrew", false),
(0, "돌체 콜드브루 라떼", 3500, "https://mmthcoffee.com/files/menu/415ddc8f57f1469419310ae96dd5d747.png", true, "coldBrew", false),
(0, "달고나 콜드브루 라떼", 4500, "https://mmthcoffee.com/files/menu/69263c143e4856ea2e92bc5d5c521e4e.png", true, "coldBrew", false),
(0, "디카페인 콜드브루", 2800, "https://mmthcoffee.com/files/menu/832cf5b5ba7f3d95042bf04fbf5dd283.png", false, "coldBrew", false),
(0, "디카페인 콜드브루 라떼", 3500, "https://mmthcoffee.com/files/menu/3ffe1e74d5f87da8907c9d93cd9eaa35.png", true, "coldBrew", false),
(0, "디카페인 돌체 콜드브루 라떼", 4000, "https://mmthcoffee.com/files/menu/a3980c26b9873bb31a963073fb13d63c.png", true, "coldBrew", false),
(0, "디카페인 달고나 콜드브루 라떼", 5000, "https://mmthcoffee.com/files/menu/3216e9be11f9fa71955889b121961f71.png", true, "coldBrew", false);

-- nonCoffee
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "딸기 커스터드 푸딩 라떼", 5300, "https://mmthcoffee.com/files/menu/c65e1ef76a650061e72363a0a2420c24.png", true, "nonCoffee", false),
(0, "그린티 라떼", 3300, "https://mmthcoffee.com/files/menu/d184debd1ca7938a80ff2240b1a004a6.png", true, "nonCoffee", false),
(0, "딸기 라떼", 4500, "https://mmthcoffee.com/files/menu/f17af5c8a8580325c8bf885eae3d8228.png", true, "nonCoffee", false),
(0, "초고 라떼", 2900, "https://mmthcoffee.com/files/menu/e361afc7a9549b6e8269da05f64f3964.png", true, "nonCoffee", false),
(0, "토피넛 라떼", 3300, "https://mmthcoffee.com/files/menu/46084c3cbef1d837dcc109d5593325e5.png", true, "nonCoffee", false),
(0, "고구마 라떼", 3400, "https://mmthcoffee.com/files/menu/149584b027f37949651152ad07fcca7f.png", true, "nonCoffee", false),
(0, "곡물 라떼", 3400, "https://mmthcoffee.com/files/menu/95d0f815891cb4de28a15f06c91b39e8.png", true, "nonCoffee", false),
(0, "달고나 라떼", 4000, "https://mmthcoffee.com/files/menu/cccc0d9647629f9bd76de7c8ffa12b24.png", true, "nonCoffee", false),
(0, "로얄 밀크티", 3500, "https://mmthcoffee.com/files/menu/26587b33d52b6d6dcf57db59a17f8353.png", true, "nonCoffee", false),
(0, "아몬드 밀크티", 3700, "https://mmthcoffee.com/files/menu/ed307cbbd4340a2580b0f545b5074fb3.png", true, "nonCoffee", false);

-- teaAde
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "복숭아 아이스티", 3000, "https://mmthcoffee.com/files/menu/ba3e649b4375c729b825e61ef6ea4801.png", false, "teaAde", false),
(0, "제로 복숭아 아이스티", 3000, "https://mmthcoffee.com/files/menu/db3b34e0696ffd644ab72ec43a0bd51a.png", false, "teaAde", false),
(0, "히비스커스 유자티", 3500, "https://mmthcoffee.com/files/menu/61064d9088551455dd71989baad7bfbb.png", false, "teaAde"),
(0, "페퍼민트티", 3700, "https://mmthcoffee.com/files/menu/28a0999fed4b2f983f2023ccdf810ca2.png", false, "teaAde", false),
(0, "레몬밤 민트티", 3500, "https://mmthcoffee.com/files/menu/6c5d59b38e6b119135d58d3e9a2b859f.png", false, "teaAde", false),
(0, "유자 티 / 에이드", 2300, "https://mmthcoffee.com/files/menu/a97e5d7c2e68a1a25c7873e2496855ae.png", false, "teaAde", false),
(0, "청포도 에이드", 3500, "https://mmthcoffee.com/files/menu/4fe424686ab5c14b48d32c36477531f2.png", false, "teaAde", false),
(0, "깔라만시 에이드", 3600, "https://mmthcoffee.com/files/menu/c77ff17d91b29c1e79f8536764dcc8b0.png", false, "teaAde", false),
(0, "매머드 에이드", 3900, "https://mmthcoffee.com/files/menu/1375c0c858bd54dda1d4563f696fcd2b.png", false, "teaAde", false),
(0, "한라봉 티 / 에이드", 3500, "https://mmthcoffee.com/files/menu/72f320265a6b44c8ee608373f99727cb.png", false, "teaAde", false),
(0, "자몽 티 / 에이드", 3500, "https://mmthcoffee.com/files/menu/bf9628fc7b85c4094250eb745329efa4.png", false, "teaAde", false);

-- frappeBlended
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "초코 프라페", 4500, "https://mmthcoffee.com/files/menu/263eccdb8a709318f70832439d5b020f.png", true, "frappeBlended", false),
(0, "그린티 프라페", 4500, "https://mmthcoffee.com/files/menu/e96ac52c146e16a4bc48f9fdfe75dd86.png", true, "frappeBlended", false),
(0, "민트 초코 프라페", 4500, "https://mmthcoffee.com/files/menu/c1a6ca4bea06911597917a31701ea5df.png", true, "frappeBlended", false),
(0, "피스타치오 아몬드 프라페", 4500, "https://mmthcoffee.com/files/menu/17b1cf763e06ff4e9375199f4c5fa29d.png", true, "frappeBlended", false),
(0, "자바칩 프라페", 4500, "https://mmthcoffee.com/files/menu/84cf76c75f8fd7081e12be01f0cd09b8.png", true, "frappeBlended", false),
(0, "플레인 요거트 스무디", 3900, "https://mmthcoffee.com/files/menu/a97e5d7c2e68a1a25c7873e2496855ae.png", true, "frappeBlended", false),
(0, "딸기 요거트 스무디", 4000, "https://mmthcoffee.com/files/menu/8203bae47947c8e8bf7a1e45b8c9b485.png", true, "frappeBlended", false),
(0, "블루베리 요거트 스무디", 4000, "https://mmthcoffee.com/files/menu/4847df240c9bf2f15285086f54f47f48.png", true, "frappeBlended", false),
(0, "밀크쉐이크", 4000, "https://mmthcoffee.com/files/menu/96089f2b91e59b6d9e0cd7f71e344c38.png", true, "frappeBlended", false);

-- food
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "우유 크림 크로슈", 3000, "https://mmthcoffee.com/files/menu/c2c355295932679a87914facdbcc9afc.png", false, "food", false),
(0, "초코 덮인 크로슈", 3500, "https://mmthcoffee.com/files/menu/10f5dcff586936932ac1eb01faba61e6.png", false, "food", false),
(0, "매머드 크룽지", 3000, "https://mmthcoffee.com/files/menu/dda4a96e1476f43805e8c661f3406edd.png", false, "food", false),
(0, "바닐라 비스킷 슈", 1900, "https://mmthcoffee.com/files/menu/3a9316cd0c3da820d6f9e276a4ad6ccd.png", false, "food", false),
(0, "초코 비스킷 슈", 1900, "https://mmthcoffee.com/files/menu/78e5515b6f76ab35805509c167b0afa4.png", false, "food", false),
(0, "크로플", 2500, "https://mmthcoffee.com/files/menu/6b9ab7b3b27d6d78472d46ff9b64a7e3.png", false, "food", false),
(0, "치즈 크로플", 2800, "https://mmthcoffee.com/files/menu/563ecfd4c15cbd30a8c87424682bba9b.png", false, "food", false),
(0, "끼리 쿠키앤 크림 치즈 스틱 케이크", 2700, "https://mmthcoffee.com/files/menu/e0ae3a40665317edc10c3e42c4876cd8.png", false, "food", false),
(0, "끼리 플레인 치즈 스틱 케이스", 2700, "https://mmthcoffee.com/files/menu/d98880c9f5f5e6a8a00318c42602e1ad.png", false, "food", false);

-- new menu
insert into menu(id, name, price, image, has_milk, menu_type, is_new_menu) values
(0, "매머드 파워드링크", 4000, "https://mmthcoffee.com/files/menu/359cefafd4e12a87931718b753d1e83e.png", false, "teaAde", true),
(0, "말차 클래식 라떼", 4300, "https://mmthcoffee.com/files/menu/7bc529c39d60460b65ffe8abf3560bd9.png", true, "nonCoffee", true),
(0, "핑크블라썸 말차 라떼", 4800, "https://mmthcoffee.com/files/menu/1d9c9747e8b429a0f6024432c4edc976.png", true, "nonCoffee", true),
(0, "말차 골든 살구 블랙티", 4000, "https://mmthcoffee.com/files/menu/48420e544a5e1c7f29ddc6914c743434.png", false, "teaAde", true),
(0, "말차 제주레몬 크러쉬", 4500, "https://mmthcoffee.com/files/menu/6b8e08c648a0c6ee533938b6130573f7.png", false, "frappeBlended", true),
(0, "말차 비스킷 슈", 2300, "https://mmthcoffee.com/files/menu/650469c09a22aec82ca3a51af2a9b306.png", false, "food", true),
(0, "말차 화이트초콜릿 쿠키", 2800, "https://mmthcoffee.com/files/menu/ce0af971cd064f91375b8c0fe6e93bac.png", false, "food", true);

-- store
insert into store(id, name, address) values
(0, "신방화역점", "서울시 강서구 마곡중앙5로 87, 1층 121호"),
(0, "중림한국경제점", "서울시 중구 청파로 641, 1층(중림동)"),
(0, "충정로역센트럴타워점", "서소문로 38, 센트럴타워 1층 104호, 105호, 106호"),
(0, "충정로역점", "서울시 중구 퇴계로 192, 1층 103호(필동1가, 거봉빌딩)"),
(0, "시청점", "서울시 중구 세종대로 91, 1층(태평로2가)"),
(0, "무교점", "서울시 중구 남대문로9길 24, 1층 107호(다동, 패스트파이브타워)"),
(0, "청계다동점", "서울시 중구 다동길 43, 1층 118,119,120호(다동,한외빌딩)"),
(0, "을지로입구점", "서울시 중구 남대문로10길 15 1층"),
(0, "북창동점", "서울시 중구 남대문로1길 14, 1층(북창동)"),
(0, "서소문점", "서울시 중구 서소문로11길 14, 1층(서소문동)"),
(0, "덕수궁롯데캐슬점", "서울시 중구 서소문로9길 28, 지1층B101호(순화동,덕수궁롯데캐슬)"),
(0, "정동점", "서울시 중구 정동길 6, 1층(정동)"),
(0, "회현역점", "서울시 중구 퇴계로10길 16-1, 1층(회현동1가)"),
(0, "남산점", "서울시 중구 소공로 46 B01gh(1층)");
