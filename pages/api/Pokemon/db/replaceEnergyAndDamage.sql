UPDATE Cards AS c1
JOIN Cards AS c2
ON c1.id = 2 AND c2.id = 3
SET c1.attack_energy = 3,
    c1.attack_damage = 80,
    c2.attack_energy = 3,
    c2.attack_damage = 70;
