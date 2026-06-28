import random

def random_number():
    number = random.randint(1,100)
    return number

def user_guess():
    guess = int(input("Enter your number: "))
    return guess

def checker(secret_number,user_number):

        if secret_number > user_number:
            return 'too low, guess higher'
        elif secret_number < user_number:
            return 'too high, guess low'
        else: 
            return 'correct'
    
secret_number = random_number()

attempts=0
while True:
    user_number = user_guess()
    attempts += 1
    result = checker(secret_number,user_number)
    print(result)

    if result == 'correct':
        print(f'you guessed it in {attempts} attempts')
        break