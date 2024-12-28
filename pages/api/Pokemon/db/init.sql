-- Usersテーブル
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cardsテーブル
CREATE TABLE Cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  english_name VARCHAR(255) NOT NULL,
  hp INT NOT NULL,
  type ENUM('fire', 'water', 'grass') NOT NULL,
  attack VARCHAR(255) NOT NULL,
  attack_energy INT NOT NULL,
  attack_damage INT NOT NULL,
  reality ENUM('god', 'high', 'medium', 'low') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
