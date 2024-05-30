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


while True:
  user_input = input("How high should FizzBuzz go? ")
  try:
    end = int(user_input)

    # Note: Doesn't check for negative. It just won't print anything.
    fizzbuzz(end)
    break
  
  except ValueError:
    print(f"{user_input} is not a valid integer.")
