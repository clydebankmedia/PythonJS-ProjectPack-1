def div_by(num, den):
  return num % den == 0

for i in range(1, 21):
  if div_by(i, 3) and div_by(i, 5):
    print("FizzBuzz")
  elif div_by(i, 3):
    print("Fizz")
  elif div_by(i, 5):
    print("Buzz")
  else:
    print(i)
