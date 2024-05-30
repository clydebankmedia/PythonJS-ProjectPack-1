import sys
import random

DEFAULT_MIN = 1
DEFAULT_MAX = 100

if len(sys.argv) > 3:
  print(f"Usage: python {sys.argv[0]} [min] [max]")
  sys.exit(1)

try:  
  if len(sys.argv) == 1: # default values
    range_min, range_max = DEFAULT_MIN, DEFAULT_MAX
  elif len(sys.argv) == 2: # 1 -- endpoint
    range_min, range_max = DEFAULT_MIN, int(sys.argv[1])
  else:
    range_min, range_max = int(sys.argv[1]), int(sys.argv[2])
except ValueError:
  print("Random number generator endpoints must be integers.")
  exit(1)

if range_max < range_min:
  print("Range max cannot be smaller than range min.")
  exit(1)
  
print(random.randint(range_min, range_max))
