import random

for i in range(10):
  flip = random.randint(0, 1)
  side = 'H' if flip else 'T'
  print(f"Flip #{i+1}: {side}")
