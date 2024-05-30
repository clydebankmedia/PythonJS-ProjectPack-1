import sys
import random

DEFAULT_MIN = 1
DEFAULT_MAX = 100

if len(sys.argv) > 3:
  print(f"Usage: python {sys.argv[0]} [min] [max]")
  exit(1)

if len(sys.argv) == 1: # default values
  range_min, range_max = DEFAULT_MIN, DEFAULT_MAX
elif len(sys.argv) == 2: # 1 -- endpoint
  range_min, range_max = DEFAULT_MIN, int(sys.argv[1])
else:
  range_min, range_max = int(sys.argv[1]), int(sys.argv[2])

value = random.randint(range_min, range_max)  
print(value)
