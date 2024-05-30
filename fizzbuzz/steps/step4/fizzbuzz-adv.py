import sys

def fizzbuzz(n):
  for i in range(1, n+1):
    if i % 3 == 0 and i % 5 == 0:
      print("FizzBuzz")
    elif i % 3 == 0:
      print("Fizz")
    elif i % 5 == 0:
      print("Buzz")
    else:
      print(i)

if len(sys.argv) != 2:
  print(f"Usage: python {sys.argv[0]} <endpoint>")
  exit(1)

user_arg = sys.argv[1]
try:
  end = int(user_arg)
except ValueError:
  print(f"{user_arg} is not a valid integer.")
  exit(1)
  
if end <= 0:
  print("Need a positive integer.")
  exit(1)

fizzbuzz(end)
