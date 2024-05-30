import sys
import random

# sys.argv[0] contains path to script
if len(sys.argv) != 3:
  print(f"Usage: python {sys.argv[0]} <min> <max>")
  exit(1)

range_min = int(sys.argv[1])
range_max = int(sys.argv[2])
value = random.randint(range_min, range_max)
print(value)
