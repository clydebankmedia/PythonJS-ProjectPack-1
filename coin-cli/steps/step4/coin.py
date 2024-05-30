import random
from argparse import ArgumentParser

parser = ArgumentParser(description="Simulate coin flips and optionally show statistics.")

# could specify `action="store"`, but that's the default.
parser.add_argument("-n", "--num-flips", type=int, default=1,
                    help="specify the number of coin flips [default %(default)s]")
args = parser.parse_args()


total = 0
for _ in range(args.num_flips):
  flip = random.randint(0, 1)
  total += flip
  print('H' if flip else 'T')
print(f"Results: {total} heads, {args.num_flips-total} tails. "
      f"({total/args.num_flips*100:.2f}% heads)")
