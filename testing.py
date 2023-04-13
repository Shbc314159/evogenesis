import random 

class Enemy: 
    def __init__(self, name, hp): 
        self.name = name 
        self.hp = hp 

    def attack(self, other_enemy): 
        damage = random.randint(1, 10) 
        print(self.name, " attacks ", other_enemy.name, " for ", damage, " damage!") 
        other_enemy.hp -= damage 
        if other_enemy.hp <= 0: 
            print(other_enemy.name, " has been defeated!") 

enemies = [] 
for i in range(10): 
    enemy = Enemy("Enemy" + str(i+1), 50) 
    enemies.append(enemy) 

while enemies: 
    for enemy in enemies: 
        target_enemy = random.choice(enemies) 
        enemy.attack(target_enemy) 
        print(enemy.name, " has ", enemy.hp, " hp remaining.") 
        if target_enemy.hp <= 0: 
            enemies.remove(target_enemy) 
            if not enemies: 
                print("All enemies have been defeated!") 
                break 