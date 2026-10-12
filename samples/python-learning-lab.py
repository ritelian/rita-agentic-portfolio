"""Fictional beginner learning lab, created for Rita Martins' portfolio.
No external dependencies. Run: python3 python-learning-lab.py
"""

learners = [
    {"name": "Alex", "complete": True},
    {"name": "Sam", "complete": False},
    {"name": "Jo", "complete": True},
]

completed = 0
for learner in learners:
    if learner["complete"]:
        completed += 1

print(completed)  # Expected: 2

# Your task:
# 1. Predict the output before running this programme.
# 2. Change one completion value and explain the new result.
# 3. Write a function returning the names of learners not yet complete.
# 4. What should the function return for an empty list?
# Assessment: correct names, correct empty-list behaviour, clear reasoning.
