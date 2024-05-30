import random

NUM_FLIPS = 10

total = 0
for i in range(NUM_FLIPS):
  flip = random.randint(0, 1)
  total += flip
  side = 'H' if flip else 'T'
  print(f"Flip #{i+1}: {side}")
print(f"Results: {total} heads, {NUM_FLIPS-total} tails. "
      f"({total/NUM_FLIPS*100:.2f}% heads)")
