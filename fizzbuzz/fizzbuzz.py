import sys

def fizzbuzz(n):
  # Notice the extra protection we have added here -- 'defensive programming'.
  if type(n) is not int or n <= 0:
    raise ValueError(f"FizzBuzz requires a positive integer (given '{n}')")
  for i in range(1, n+1):
    if i % 3 == 0 and i % 5 == 0:
      print("FizzBuzz")
    elif i % 3 == 0:
      print("Fizz")
    elif i % 5 == 0:
      print("Buzz")
    else:
      print(i)

if __name__ == '__main__':      
  if len(sys.argv) != 2:
    print(f"Usage: python {sys.argv[0]} <endpoint>")
    exit(1)

  user_arg = sys.argv[1]
  try:
    end = int(user_arg)
    fizzbuzz(end)
  except ValueError as e:
    print(f"{user_arg} is not a positive integer.")
    exit(1)
