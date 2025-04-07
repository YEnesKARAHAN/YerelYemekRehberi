-- Kullanıcılar tablosu
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Kategoriler tablosu
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) -- Örnek: 'local-cafe'
);

-- Restoranlar tablosu
CREATE TABLE Restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    rating FLOAT DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
        ON DELETE SET NULL
);

-- Chat mesajları tablosu
CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    text TEXT NOT NULL,
    is_bot BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
        ON DELETE CASCADE
);

-- Favori restoranlar tablosu (çoktan çoğa ilişki)
CREATE TABLE Favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
        ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
        ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, restaurant_id)
);

-- (Opsiyonel) Yemek tarifleri tablosu
CREATE TABLE Recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    ingredients TEXT,
    instructions TEXT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);